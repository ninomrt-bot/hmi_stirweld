import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ADS from 'ads-client';
import winston from 'winston';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const WS_PORT = Number(process.env.WS_PORT || 4000);
const PLC_HOST = process.env.PLC_HOST || '127.0.0.1';
const PLC_PORT = Number(process.env.PLC_PORT || 851);

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console({ format: winston.format.simple() })]
});

const AdsClient = (ADS as any).AdsClient || (ADS as any).Client || (ADS as any).default || ADS;
const plc = new AdsClient({
  targetAmsNetId: PLC_HOST,
  targetAdsPort: PLC_PORT,
});

async function connectPlc() {
  try {
    await plc.connect();
    logger.info('Connected to PLC');
  } catch (err) {
    logger.error('PLC connection failed: ' + (err as Error).message);
  }
}
connectPlc();

interface CommandMsg {
  type: 'command';
  command: 'Start' | 'Stop' | 'Reset';
}

interface SampleMsg {
  type: 'sample';
  data: Record<string, unknown>;
}

function broadcast(obj: SampleMsg) {
  const msg = JSON.stringify(obj);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

const wss = new WebSocketServer({ port: WS_PORT });
logger.info(`WebSocket server on ws://localhost:${WS_PORT}`);

wss.on('connection', (ws, req) => {
  const url = new URL(req.url || '', `http://localhost:${WS_PORT}`);
  const token = (req.headers['authorization']?.split(' ')[1]) || url.searchParams.get('token');
  if (!token) {
    ws.close();
    return;
  }
  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    ws.close();
    return;
  }

  logger.info('Client connected');

  ws.on('message', async (data) => {
    try {
      const msg = JSON.parse(data.toString()) as CommandMsg;
      if (msg.type === 'command') {
        logger.info(`Command ${msg.command}`);
        // Ici, envoyer la commande réelle au PLC si nécessaire
        // await plc.writeRawByName(...)
      }
    } catch (err) {
      logger.error('Invalid message: ' + (err as Error).message);
    }
  });

  ws.on('close', () => {
    logger.info('Client disconnected');
  });
});

// Exemple : diffuser un timestamp toutes les secondes
setInterval(() => {
  broadcast({ type: 'sample', data: { ts: Date.now() } });
}, 1000);
