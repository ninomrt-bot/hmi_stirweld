"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

/**************************** Config jauges ****************************/
interface GaugeConfig {
  min: number;
  max: number;
  alarmLow?: number;
  alarmHigh?: number;
  unit?: string;
}

const CONFIGS: Record<string, GaugeConfig> = {
  "TOOL TEMP": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  "TOOL TEMP DEVICE": { min: 0, max: 120, alarmLow: 5, alarmHigh: 100, unit: "°C" },
  "HEAD TEMPERATURE N°1": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  "HEAD TEMPERATURE N°2": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  FORCE: { min: 0, max: 20000, alarmHigh: 18000, unit: "N" },
  "Z POSITION": { min: -50, max: 50, unit: "mm" },
  "ROTATION SPEED": { min: 0, max: 11000, alarmHigh: 10000, unit: "rpm" },
};

const OPTIONS = Object.keys(CONFIGS);

/**************************** Mapping PLC ****************************/
const API = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

type PlcType = "REAL" | "UDINT" | string;
const PLC: Record<string, { name: string; type: PlcType; scale?: number }> = {
  "TOOL TEMP": { name: "GVL_Public.g_tool_temp", type: "REAL" },
  "TOOL TEMP DEVICE": { name: "GVL_Public.g_tool_device", type: "REAL" },
  "HEAD TEMPERATURE N°1": { name: "GVL_Public.real_g_head_temperature_n1", type: "REAL" },
  "HEAD TEMPERATURE N°2": { name: "GVL_Public.g_head_temperature_n2", type: "REAL" },
  FORCE: { name: "GVL_Public.g_force", type: "REAL" },
  "Z POSITION": { name: "GVL_Public.g_ZPos", type: "REAL" },
  "ROTATION SPEED": { name: "GVL_Public.g_rotation_speed", type: "UDINT" },
};

/**************************** Types ****************************/
interface Point { t: number; v: number }

type TimeScale = "s" | "m" | "h";

/**************************** Fréquences & limites ****************************/
// Rendu UI (découplé du polling)
const UI_FPS = 10; // 10 fps → fluide sans charger le CPU
const UI_TICK_MS = Math.round(1000 / UI_FPS);

// Échantillonnage historique
const SAMPLE_WHEN_VISIBLE_MS = 200; // 5 Hz
const SAMPLE_WHEN_HIDDEN_MS = 1000; // 1 Hz onglet masqué

// Historique conservé (points)
const HISTORY_LIMIT = 300;

/**************************** Ring buffer (sans hooks) ****************************/
function createRingBuffer(limit: number) {
  let buf: Point[] = [];
  return {
    push(p: Point) {
      if (buf.length < limit) buf.push(p);
      else { buf.splice(0, 1); buf.push(p); }
    },
    getData() { return buf.slice(); },
    clearAndSeed(p: Point) { buf = [p]; },
  } as const;
}

/**************************** Helper JSON sûr ****************************/
async function safeJson(r: Response) {
  const ct = r.headers.get("content-type") || "";
  const text = await r.text();
  if (ct.includes("application/json")) {
    try { return JSON.parse(text); }
    catch (e) { console.error("JSON parse error:", e, text.slice(0, 200)); throw new Error("Bad JSON from backend"); }
  }
  console.error("Expected JSON, got:", ct || "unknown", "payload:", text.slice(0, 200));
  throw new Error("Backend returned non-JSON (HTML?)");
}

/**************************** Chart (mémoïsé) ****************************/
const ChartArea = React.memo(function ChartArea({
  data,
  unit,
  pathColor,
  timeFormatter,
  timeUnitLabel,
  yMin,
  yMax,
}: {
  data: Point[];
  unit: string;
  pathColor: string;
  timeFormatter: (t: number) => string;
  timeUnitLabel: string;
  yMin: number;
  yMax: number;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="t"
          type="number"
          domain={[-60, 0]}
          ticks={[-60, -48, -36, -24, -12, 0]}
          tickFormatter={timeFormatter}
          minTickGap={35}
        >
          <Label value={`Temps (${timeUnitLabel})`} position="insideBottom" offset={-5} style={{ fill: "#6b7280", fontSize: 12 }} />
        </XAxis>
        <YAxis domain={[yMin, yMax]}>
          <Label value={unit} angle={-90} position="insideLeft" style={{ fill: "#6b7280", fontSize: 12 }} />
        </YAxis>
        <Tooltip labelFormatter={(l) => `t=${timeFormatter(Number(l))} ${timeUnitLabel}`} formatter={(v: number) => [`${(v as number).toFixed(2)} ${unit}`.trim(), ""]} />
        <Line type="linear" dataKey="v" stroke={pathColor} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
});

/**************************** Page ****************************/
export default function DashboardPage() {
  // Sélection métrique
  const [selected, setSelected] = useState<string>(OPTIONS[0]);
  const selectedRef = useRef(selected);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  // Valeurs affichées (throttle 10 fps)
  const [displayValues, setDisplayValues] = useState<Record<string, number>>(
    () => Object.fromEntries(OPTIONS.map(k => [k, 0]))
  );

  // Valeurs brutes en ref (pour éviter les re-renders à chaque poll)
  const liveValuesRef = useRef<Record<string, number>>(
    Object.fromEntries(OPTIONS.map(k => [k, 0])) as Record<string, number>
  );

  // Buffers par métrique (fabriqués une seule fois)
  const buffersRef = useRef<Record<string, ReturnType<typeof createRingBuffer>> | null>(null);
  if (!buffersRef.current) {
    buffersRef.current = Object.fromEntries(OPTIONS.map(k => [k, createRingBuffer(HISTORY_LIMIT)])) as Record<string, ReturnType<typeof createRingBuffer>>;
  }

  // Flags
  const [isReady, setIsReady] = useState(false);
  const [timeScale, setTimeScale] = useState<TimeScale>("s");
  const [error, setError] = useState<string | null>(null);

  const cfg = CONFIGS[selected];
  const value = displayValues[selected] ?? 0;
  const unit = cfg.unit ?? "";

  /************ jauge ************/
  const { percentage, pathColor, min, max } = useMemo(() => {
    const span = cfg.max - cfg.min || 1;
    let pct = ((value - cfg.min) / span) * 100;
    pct = Math.min(100, Math.max(0, pct));
    const hi = cfg.alarmHigh !== undefined && value >= cfg.alarmHigh;
    const lo = cfg.alarmLow !== undefined && value <= cfg.alarmLow;
    const color = hi ? "#ef4444" : lo ? "#f59e0b" : "#10b981";
    return { percentage: pct, pathColor: color, min: cfg.min, max: cfg.max };
  }, [cfg, value]);

  /************ Seed à chaque changement de métrique ************/
  useEffect(() => {
    setIsReady(false);
    setError(null);
    const map = PLC[selected];
    let cancelled = false;

    if (!map) { setIsReady(true); return; }

    (async () => {
      try {
        const url = `${API}/api/read?name=${encodeURIComponent(map.name)}&type=${encodeURIComponent(map.type)}`;
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok) throw new Error(`seed read failed: ${r.status}`);
        const data = await safeJson(r);
        const raw = Number((data as any)?.value);
        if (!Number.isFinite(raw)) throw new Error("seed NaN");
        const v0 = (map.scale ?? 1) * raw;
        if (cancelled) return;

        liveValuesRef.current[selected] = v0;
        const now = Date.now();
        buffersRef.current![selected].clearAndSeed({ t: now - SAMPLE_WHEN_VISIBLE_MS, v: v0 });
        buffersRef.current![selected].push({ t: now, v: v0 });
        setIsReady(true);
      } catch (e: any) {
        console.error(e);
        if (!cancelled) setError(e?.message || "Erreur seed");
      }
    })();

    return () => { cancelled = true; };
  }, [selected]);

  /************ Polling PLC (maj ref) ************/
  useEffect(() => {
    let stop = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const schedule = (ms: number) => { if (!stop) timer = setTimeout(pollOnce, ms); };

    const pollOnce = async () => {
      const key = selectedRef.current;
      const map = PLC[key];
      if (!map) return schedule(document.hidden ? 1000 : 200);
      try {
        const url = `${API}/api/read?name=${encodeURIComponent(map.name)}&type=${encodeURIComponent(map.type)}`;
        const r = await fetch(url, { cache: "no-store" });
        if (r.ok) {
          try {
            const data = await safeJson(r);
            const raw = Number((data as any)?.value);
            if (Number.isFinite(raw)) {
              liveValuesRef.current[key] = (map.scale ?? 1) * raw;
            }
          } catch (e) {
            // garde silencieux pour éviter de spammer, mais log console
            console.warn("poll JSON issue", e);
          }
        } else {
          console.warn("poll status", r.status);
        }
      } catch (e) {
        console.warn("poll error", e);
      }
      schedule(document.hidden ? 1000 : 200);
    };

    pollOnce();
    return () => { stop = true; if (timer) clearTimeout(timer); };
  }, []);

  /************ Sampling -> push historique ************/
  useEffect(() => {
    let stop = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (stop) return;
      if (isReady) {
        const key = selectedRef.current;
        const v = liveValuesRef.current[key] ?? 0;
        buffersRef.current![key].push({ t: Date.now(), v });
      }
      const ms = document.hidden ? SAMPLE_WHEN_HIDDEN_MS : SAMPLE_WHEN_VISIBLE_MS;
      timer = setTimeout(tick, ms);
    };

    tick();
    return () => { stop = true; if (timer) clearTimeout(timer); };
  }, [isReady]);

  /************ UI ticker (10 fps) ************/
  const [uiTick, setUiTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setUiTick(v => v + 1), UI_TICK_MS);
    return () => clearInterval(id);
  }, []);

  // Sync valeur affichée (métrique sélectionnée)
  useEffect(() => {
    const key = selected;
    setDisplayValues(prev => ({ ...prev, [key]: liveValuesRef.current[key] ?? 0 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiTick, selected]);

  /************ Données chart + axes ************/
  const history = useMemo(() => buffersRef.current![selected].getData(), [uiTick, selected]);

  // Convert absolute timestamps to relative seconds so that the most recent
  // sample is at t = 0 s (right side of the graph) and the oldest visible
  // sample is at t = -60 s. This stabilises the X-axis and prevents the
  // constant re-scaling / flickering that occurred when feeding epoch
  // timestamps directly to Recharts.
  const relHistory = useMemo<Point[]>(() => {
    if (!history.length) return [];
    const latest = history[history.length - 1].t; // ms epoch of the newest point
    return history
      .map((p) => ({ t: (p.t - latest) / 1000, v: p.v })) // → seconds, negative…0
      .filter((p) => p.t >= -60); // keep only the last 60 s
  }, [history]);

  // Simple formatter that turns -t into a positive, human-readable value
  // (e.g. t = -12 → "12").
  const timeFormatter = useCallback((t: number) => `${(-t).toFixed(0)}`, []);
  const timeUnitLabel = "s";

  const [yMin, yMax] = useMemo<[number, number]>(() => {
    const c = CONFIGS[selected];
    const maxObserved = history.length ? Math.max(...history.map(p => p.v), displayValues[selected] || 0) : displayValues[selected] || 0;
    const baseMax = maxObserved === 0 ? 1 : maxObserved * 1.1;
    const step = c.max >= 1000 ? 100 : 10;
    const upper = Math.min(c.max, Math.ceil(baseMax / step) * step);
    const lower = c.min >= 0 ? 0 : c.min;
    return [lower, upper];
  }, [selected, history, displayValues]);

  return (
    <div className="h-full w-full p-8 bg-gray-100 flex flex-col gap-6">
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm">
          <b>Erreur lecture:</b> {error}
        </div>
      )}

      <div className="w-full bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-6">
        {/* --- Colonne jauge --- */}
        <div className="md:w-1/4 flex flex-col items-center">
          <div className="relative w-full md:w-4/5">
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 text-center text-lg font-bold appearance-none"
              value={selected}
              onChange={(e) => setSelected(e.currentTarget.value)}
            >
              {OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <div className="mt-6 w-full max-w-xs h-[140px] overflow-hidden">
            <CircularProgressbar
              value={percentage}
              maxValue={100}
              circleRatio={0.5}
              strokeWidth={5}
              text=""
              styles={buildStyles({ rotation: 0.75, pathColor, trailColor: "#e5e7eb", strokeLinecap: "butt" })}
            />
          </div>

          <div className="-mt-12 text-center select-none pointer-events-none">
            <span className="text-4xl font-bold text-[#071039]">
              {value.toFixed(1)}
              {unit ? <span className="ml-1 text-base font-medium text-gray-500">{unit}</span> : null}
            </span>
          </div>

          <div className="mt-1 flex justify-between w-full md:w-4/5 text-xs text-gray-500 font-medium">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>

        {/* --- Colonne graph --- */}
        <div className="md:w-3/4 h-[360px]">
          <ChartArea
            data={relHistory}
            unit={unit}
            pathColor={pathColor}
            timeFormatter={timeFormatter}
            timeUnitLabel={timeUnitLabel}
            yMin={yMin}
            yMax={yMax}
          />
        </div>
      </div>

      {/* Slider de test (désactivé si la métrique est lue en live) */}
      <input
        type="range"
        min={CONFIGS[selected].min}
        max={CONFIGS[selected].max}
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.currentTarget.value);
          liveValuesRef.current[selected] = v;
          setDisplayValues((prev) => ({ ...prev, [selected]: v }));
        }}
        className="w-full"
        disabled={!!PLC[selected]}
      />

      {/* Contrôle de l'échelle de temps */}
      <div className="flex gap-2 items-center text-sm text-gray-600">
        <span>Échelle temps:</span>
        <button onClick={() => setTimeScale("s")} className={`px-2 py-1 rounded ${timeScale === "s" ? "bg-gray-200" : ""}`}>s</button>
        <button onClick={() => setTimeScale("m")} className={`px-2 py-1 rounded ${timeScale === "m" ? "bg-gray-200" : ""}`}>min</button>
        <button onClick={() => setTimeScale("h")} className={`px-2 py-1 rounded ${timeScale === "h" ? "bg-gray-200" : ""}`}>h</button>
      </div>
    </div>
  );
}
