// server.js — CommonJS
'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ADS = require('ads-client');

// ---------- Config (ENV avec defaults) ----------
const cfg = {
  PORT: Number(process.env.PORT ?? 3001),

  TARGET_AMS_NET_ID: process.env.TARGET_AMS_NET_ID ?? '192.168.128.12.1.1',
  TARGET_ADS_PORT: Number(process.env.TARGET_ADS_PORT ?? 851),

  ROUTER_ADDRESS: process.env.ROUTER_ADDRESS ?? '127.0.0.1',
  ROUTER_TCP_PORT: Number(process.env.ROUTER_TCP_PORT ?? 48898),

  ADS_TIMEOUT_MS: Number(process.env.ADS_TIMEOUT_MS ?? 4000),
  DEFAULT_PULSE_MS: Number(process.env.DEFAULT_PULSE_MS ?? 50),

  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*'
};

// ---------- Express ----------
const app = express();
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
app.use(cors({ origin: cfg.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

// ---------- ADS client (v2.x) ----------
const AdsClient = ADS.AdsClient || ADS.Client || ADS.default || ADS;
const plc = new AdsClient({
  targetAmsNetId: cfg.TARGET_AMS_NET_ID,
  targetAdsPort: cfg.TARGET_ADS_PORT,
  routerAddress: cfg.ROUTER_ADDRESS,
  routerTcpPort: cfg.ROUTER_TCP_PORT,
  timeout: cfg.ADS_TIMEOUT_MS,
});

// ---------- Types binaires ----------
const Types = {
  BOOL:  { size:1, read: b=>!!b.readUInt8(0),   write:v=>Buffer.from([v?1:0]) },
  BYTE:  { size:1, read: b=>b.readUInt8(0),     write:v=>Buffer.from([Number(v)&0xFF]) },
  SINT:  { size:1, read: b=>b.readInt8(0),      write:v=>{const x=Buffer.alloc(1); x.writeInt8(Number(v)); return x;} },
  USINT: { size:1, read: b=>b.readUInt8(0),     write:v=>Buffer.from([Number(v)&0xFF]) },
  INT:   { size:2, read: b=>b.readInt16LE(0),   write:v=>{const x=Buffer.alloc(2); x.writeInt16LE(Number(v)); return x;} },
  UINT:  { size:2, read: b=>b.readUInt16LE(0),  write:v=>{const x=Buffer.alloc(2); x.writeUInt16LE(Number(v)); return x;} },
  DINT:  { size:4, read: b=>b.readInt32LE(0),   write:v=>{const x=Buffer.alloc(4); x.writeInt32LE(Number(v)); return x;} },
  UDINT: { size:4, read: b=>b.readUInt32LE(0),  write:v=>{const x=Buffer.alloc(4); x.writeUInt32LE(Number(v)); return x;} },
  REAL:  { size:4, read: b=>b.readFloatLE(0),   write:v=>{const x=Buffer.alloc(4); x.writeFloatLE(Number(v)); return x;} },
  LREAL: { size:8, read: b=>b.readDoubleLE(0),  write:v=>{const x=Buffer.alloc(8); x.writeDoubleLE(Number(v)); return x;} },
  STRING: { size:80, read: b=>b.toString('latin1').split('\0')[0],
    write:v=>{const s=String(v); const x=Buffer.alloc(80,0); x.write(s,'latin1'); return x;} },
};
function useStringType(n=80){
  return {
    size: n,
    read: b => b.toString('latin1').split('\0')[0],
    write: v => { const s=String(v); const x=Buffer.alloc(n,0); x.write(s,'latin1'); return x; }
  };
}
function getType(t='INT'){
  const key = String(t||'INT').toUpperCase();
  if (key.startsWith('STRING(') && key.endsWith(')')) {
    const n = Number(key.slice(7, -1));
    if (!Number.isFinite(n) || n <= 0) throw new Error(`STRING length invalide: ${key}`);
    return useStringType(n);
  }
  if (!Types[key]) throw new Error(`Type inconnu: ${key}`);
  return Types[key];
}

// ---------- Capabilities (v2.1.0) ----------
const HAS_HANDLE_API =
  typeof plc.createVariableHandle === 'function' &&
  typeof plc.readRawByHandle === 'function' &&
  typeof plc.writeRawByHandle === 'function' &&
  typeof plc.deleteVariableHandle === 'function';

const HAS_RAW_BY_NAME_R = typeof plc.readRawByName === 'function';
const HAS_RAW_BY_NAME_W = typeof plc.writeRawByName === 'function';

// ---------- Helpers handles ----------
async function getHandleByName(symbolName) {
  if (!HAS_HANDLE_API) throw new Error('API handle indisponible.');
  return plc.createVariableHandle(symbolName);
}
async function releaseHandle(handle) {
  if (!HAS_HANDLE_API) return;
  try { await plc.deleteVariableHandle(handle); } catch {}
}
async function readByHandle(handle, size) {
  if (!HAS_HANDLE_API) throw new Error('API handle indisponible.');
  return plc.readRawByHandle(handle, size); // Buffer
}
async function writeByHandle(handle, buffer) {
  if (!HAS_HANDLE_API) throw new Error('API handle indisponible.');
  return plc.writeRawByHandle(handle, buffer);
}

// ---------- Connexion ----------
let connected = false;
(async () => {
  try {
    await plc.connect();
    connected = true;
    console.log('✅ CONNECTED to PLC');
    try { const st = await plc.readState(); console.log('State:', st); } catch {}
    try { const info = await plc.readDeviceInfo(); console.log('Device:', info); } catch {}
  } catch (e) {
    console.error('❌ Connect error:', e.message || e);
  } finally {
    console.log(`Caps: handle=${HAS_HANDLE_API} rawR=${HAS_RAW_BY_NAME_R} rawW=${HAS_RAW_BY_NAME_W}`);
  }
})();

// ---------- Utils ----------
function requireName(req, res){
  const name = String((req.query?.name ?? req.body?.name) || '');
  if (!name) { res.status(400).json({ error: "Missing 'name'" }); return null; }
  return name;
}
function num(v, def){ const n = Number(v); return Number.isFinite(n) ? n : def; }

// ---------- Routes utilitaires ----------
app.get('/api/ping', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.get('/api/health', async (_req, res) => {
  try {
    const st = await plc.readState();
    res.json({ ok: true, connected: true, state: st, caps: {
      handle: HAS_HANDLE_API, readRawByName: HAS_RAW_BY_NAME_R, writeRawByName: HAS_RAW_BY_NAME_W
    }});
  } catch (e) {
    res.status(503).json({ ok: false, connected: false, error: e.message || String(e) });
  }
});

app.get('/api/device', async (_req, res) => {
  try { res.json(await plc.readDeviceInfo()); }
  catch (e) { res.status(500).json({ error: e.message || String(e) }); }
});

app.get('/api/state', async (_req, res) => {
  try { res.json(await plc.readState()); }
  catch (e) { res.status(500).json({ error: e.message || String(e) }); }
});

app.get('/api/caps', (_req, res) => {
  res.json({ handle: HAS_HANDLE_API, readRawByName: HAS_RAW_BY_NAME_R, writeRawByName: HAS_RAW_BY_NAME_W });
});

// ---------- Routes HAUTES (choix auto: handle -> rawByName) ----------
// GET /api/read?name=MAIN.counter&type=INT
app.get('/api/read', async (req, res) => {
  try {
    const name = requireName(req, res); if (!name) return;
    const type = String(req.query.type ?? 'INT').toUpperCase();
    const T = getType(type);

    // 1) handles
    if (HAS_HANDLE_API) {
      const h = await getHandleByName(name);
      try {
        const buf = await readByHandle(h, T.size);
        return res.json({ name, type, value: T.read(buf), path: 'handle/raw' });
      } finally { await releaseHandle(h); }
    }
    // 2) rawByName
    if (HAS_RAW_BY_NAME_R) {
      const buf = await plc.readRawByName(name, T.size);
      return res.json({ name, type, value: T.read(buf), path: 'rawByName' });
    }

    return res.status(500).json({ error: 'Aucune API de lecture disponible (handles/readRawByName).' });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

// POST /api/write { "name":"MAIN.bp_arret","value":true,"type":"BOOL" }
app.post('/api/write', async (req, res) => {
  try {
    const name = requireName(req, res); if (!name) return;
    const type = String(req.body.type ?? 'BOOL').toUpperCase();
    const value = req.body.value;
    if (typeof value === 'undefined') return res.status(400).json({ error: "Missing 'value'" });
    const T = getType(type);

    // 1) handles
    if (HAS_HANDLE_API) {
      const h = await getHandleByName(name);
      try {
        await writeByHandle(h, T.write(value));
        return res.json({ ok: true, name, type, value, path: 'handle/raw' });
      } finally { await releaseHandle(h); }
    }
    // 2) rawByName
    if (HAS_RAW_BY_NAME_W) {
      await plc.writeRawByName(name, T.write(value));
      return res.json({ ok: true, name, type, value, path: 'rawByName' });
    }

    return res.status(500).json({ error: "Aucune API d'écriture disponible (handles/writeRawByName)." });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});



// POST /api/pulse { "name":"MAIN.bp_marche","ms":80 }
app.post('/api/pulse', async (req, res) => {
  try {
    const name = requireName(req, res); if (!name) return;
    const ms = num(req.body?.ms, cfg.DEFAULT_PULSE_MS);

    // 1) handles
    if (HAS_HANDLE_API) {
      const h = await getHandleByName(name);
      try {
        await writeByHandle(h, Types.BOOL.write(true));
        setTimeout(() => writeByHandle(h, Types.BOOL.write(false)).catch(()=>{}), ms);
        return res.json({ ok: true, name, ms, path: 'handle/raw' });
      } finally { await releaseHandle(h); }
    }
    // 2) rawByName
    if (HAS_RAW_BY_NAME_W) {
      await plc.writeRawByName(name, Types.BOOL.write(true));
      setTimeout(() => plc.writeRawByName(name, Types.BOOL.write(false)).catch(()=>{}), ms);
      return res.json({ ok: true, name, ms, path: 'rawByName' });
    }

    return res.status(500).json({ error: 'Aucune API disponible pour pulse (handles/writeRawByName).' });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

// ---------- Debug BRUT explicite ----------
app.get('/api/read-raw', async (req, res) => {
  try {
    if (!HAS_RAW_BY_NAME_R) return res.status(400).json({ error: 'readRawByName indisponible' });
    const name = requireName(req, res); if (!name) return;
    const T = getType(req.query.type ?? 'INT');
    const buf = await plc.readRawByName(name, T.size);
    res.json({ name, type: req.query.type ?? 'INT', value: T.read(buf) });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});
app.post('/api/write-raw', async (req, res) => {
  try {
    if (!HAS_RAW_BY_NAME_W) return res.status(400).json({ error: 'writeRawByName indisponible' });
    const name = requireName(req, res); if (!name) return;
    const T = getType(req.body.type ?? 'BOOL');
    const { value } = req.body;
    if (typeof value === 'undefined') return res.status(400).json({ error: "Missing 'value'" });
    await plc.writeRawByName(name, T.write(value));
    res.json({ ok: true, name, type: req.body.type ?? 'BOOL', value });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});
app.post('/api/pulse-raw', async (req, res) => {
  try {
    if (!HAS_RAW_BY_NAME_W) return res.status(400).json({ error: 'writeRawByName indisponible' });
    const name = requireName(req, res); if (!name) return;
    const ms = num(req.body?.ms, cfg.DEFAULT_PULSE_MS);
    await plc.writeRawByName(name, Types.BOOL.write(true));
    setTimeout(() => plc.writeRawByName(name, Types.BOOL.write(false)).catch(()=>{}), ms);
    res.json({ ok: true, name, ms });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

app.post("/api/read-many", async (req, res) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (!items.length) return res.status(400).json({ error: "Body must be { items:[{name,type}] }" });

    const results = [];
    for (const it of items) {
      const name = String(it?.name || "");
      const type = String(it?.type || "REAL").toUpperCase();
      if (!name) { results.push({ ok:false, name, type, error:"Missing name" }); continue; }
      try {
        const T = getType(type);
        if (HAS_HANDLE_API) {
          const h = await getHandleByName(name);
          try {
            const buf = await readByHandle(h, T.size);
            results.push({ ok:true, name, type, value: T.read(buf), path:"handle/raw" });
          } finally { await releaseHandle(h); }
        } else if (HAS_RAW_BY_NAME_R) {
          const buf = await plc.readRawByName(name, T.size);
          results.push({ ok:true, name, type, value: T.read(buf), path:"rawByName" });
        } else {
          results.push({ ok:false, name, type, error:"No read API available" });
        }
      } catch (e) {
        results.push({ ok:false, name, type, error: e.message || String(e) });
      }
    }
    res.json({ ok:true, results });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

// ---------- Start & Shutdown ----------
const server = app.listen(cfg.PORT, () => {
  console.log(`🚀 API on http://localhost:${cfg.PORT}`);
});

async function shutdown(signal='SIGINT'){
  console.log(`\n⏹️  ${signal} reçu, arrêt...`);
  try { server.close(); } catch {}
  try { await plc.disconnect(); } catch {}
  process.exit(0);
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
