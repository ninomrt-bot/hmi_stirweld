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

/**************************** Configuration des capteurs ****************************/
interface SensorConfig {
  min: number;
  max: number;
  alarmLow?: number;
  alarmHigh?: number;
  unit?: string;
}

const SENSOR_CONFIGS: Record<string, SensorConfig> = {
  "TOOL TEMP": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  "TOOL TEMP DEVICE": { min: 0, max: 120, alarmLow: 5, alarmHigh: 100, unit: "°C" },
  "HEAD TEMPERATURE N°1": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  "HEAD TEMPERATURE N°2": { min: 0, max: 250, alarmLow: 10, alarmHigh: 220, unit: "°C" },
  FORCE: { min: 0, max: 20000, alarmHigh: 18000, unit: "N" },
  "Z POSITION": { min: -50, max: 50, unit: "mm" },
  "ROTATION SPEED": { min: 0, max: 11000, alarmHigh: 10000, unit: "rpm" },
};

const SENSOR_OPTIONS = Object.keys(SENSOR_CONFIGS);

/**************************** Types ****************************/
interface DataPoint {
  timestamp: number; // ms epoch
  value: number;
  t: number; // temps normalisé pour l'affichage (0..WINDOW)
}

/**************************** Configuration temporelle ****************************/
const DISPLAY_FPS = 12;
const DISPLAY_INTERVAL = Math.floor(1000 / DISPLAY_FPS);

const TIME_WINDOW_SECONDS = 60;
const TIME_WINDOW_MS = TIME_WINDOW_SECONDS * 1000;

// On limite les points pour éviter l'embonpoint. Buffer > fenêtre.
const MAX_POINTS = Math.ceil(TIME_WINDOW_MS / 150) + 50; // ~7 pt/s + marge

/**************************** Buffer circulaire ****************************/
class TimeSeriesBuffer {
  private buffer: { ts: number; value: number }[] = [];
  private startTs = 0; // pour relative time brut
  private lastShift = 0; // pour éviter les recalculs inutiles

  constructor(private readonly maxSize: number) {}

  add(ts: number, value: number) {
    if (!this.startTs) this.startTs = ts;
    // push
    this.buffer.push({ ts, value });
    // trim taille max
    if (this.buffer.length > this.maxSize) this.buffer.splice(0, this.buffer.length - this.maxSize);
    // trim plus vieux que fenêtre * 1.2 (tampon)
    const cutoff = ts - TIME_WINDOW_MS * 1.2;
    while (this.buffer.length && this.buffer[0].ts < cutoff) this.buffer.shift();
  }

  // Renvoie points transformés avec t dans [0..WINDOW], donc axe X fixe
  getVisible(): DataPoint[] {
    if (!this.buffer.length) return [];
    
    const latest = this.buffer[this.buffer.length - 1].ts;
    let currentShift = Math.max(0, (latest - (this.startTs || latest)) / 1000 - TIME_WINDOW_SECONDS);
    
    // Évite les recalculs inutiles qui causent le clignotement
    if (Math.abs(currentShift - this.lastShift) < 0.1) {
      currentShift = this.lastShift;
    } else {
      this.lastShift = currentShift;
    }
    
    // shift est en secondes; on convertit chaque point -> t = seconds - shift
    const out: DataPoint[] = this.buffer.map((p) => ({
      timestamp: p.ts,
      value: p.value,
      t: (p.ts - (this.startTs || p.ts)) / 1000 - currentShift,
    }));
    
    // garde seulement [0..WINDOW] avec une marge plus large pour éviter les coupures
    return out.filter((p) => p.t >= -2 && p.t <= TIME_WINDOW_SECONDS + 2);
  }

  reset(initialValue = 0) {
    const now = Date.now();
    this.startTs = now;
    this.lastShift = 0;
    this.buffer = [{ ts: now, value: initialValue }];
  }

  isEmpty() {
    return this.buffer.length === 0;
  }
}

/**************************** Utils jauge ****************************/
function computeGauge(config: SensorConfig, value: number) {
  const range = config.max - config.min || 1;
  const percentage = Math.min(100, Math.max(0, ((value - config.min) / range) * 100));
  const isHigh = config.alarmHigh !== undefined && value >= config.alarmHigh!;
  const isLow = config.alarmLow !== undefined && value <= config.alarmLow!;
  let color = "#10b981"; // vert
  if (isHigh) color = "#ef4444"; // rouge
  else if (isLow) color = "#f59e0b"; // orange
  return { percentage, color };
}

/**************************** Chart ****************************/
const ChartComponent = React.memo(function ChartComponent({
  data,
  unit,
  color,
  config,
}: {
  data: DataPoint[];
  unit: string;
  color: string;
  config: SensorConfig;
}) {
  // Auto-scale Y avec logique améliorée
  const [yMin, yMax] = useMemo(() => {
    if (!data.length) {
      // Valeurs par défaut basées sur la config
      return [config.min, config.max];
    }
    
    const vals = data.map(p => p.value).filter(v => !isNaN(v) && isFinite(v));
    if (vals.length === 0) return [config.min, config.max];
    
    const dmin = Math.min(...vals);
    const dmax = Math.max(...vals);
    
    // Si toutes les valeurs sont identiques, on ajoute une marge
    if (dmin === dmax) {
      const margin = Math.abs(dmin) * 0.1 || 1;
      return [dmin - margin, dmax + margin];
    }
    
    // Marge adaptative basée sur la plage des données
    const range = dmax - dmin;
    const margin = range * 0.15; // 15% de marge
    
    // Respecte les limites de la config
    let ymin = Math.max(config.min, dmin - margin);
    let ymax = Math.min(config.max, dmax + margin);
    
    // Si la plage est trop petite, on l'étend
    if (ymax - ymin < range * 0.3) {
      const center = (ymin + ymax) / 2;
      const halfRange = range * 0.2;
      ymin = Math.max(config.min, center - halfRange);
      ymax = Math.min(config.max, center + halfRange);
    }
    
    return [ymin, ymax];
  }, [data, config]);

  // Axe X fixe et stable
  const xAxisDomain = useMemo(() => [0, TIME_WINDOW_SECONDS], []);
  const xAxisTicks = useMemo(() => [0, 15, 30, 45, 60], []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 15, right: 25, bottom: 15, left: 15 }}>
        <CartesianGrid strokeDasharray="2 2" opacity={0.3} />
        <XAxis
          dataKey="t"
          type="number"
          domain={xAxisDomain}
          ticks={xAxisTicks}
          tickFormatter={(s) => `${s.toFixed(0)}s`}
          allowDataOverflow={false}
        >
          <Label value="Temps (secondes)" position="insideBottom" offset={-8} />
        </XAxis>
        <YAxis 
          domain={[yMin, yMax]} 
          tickFormatter={(v) => v.toFixed(1)}
          allowDataOverflow={false}
        >
          <Label value={unit} angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip
          labelFormatter={(v) => `Temps: ${Number(v).toFixed(1)}s`}
          formatter={(v: number) => [`${v.toFixed(2)} ${unit}`, "Valeur"]}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2.5} 
          dot={false} 
          isAnimationActive={false}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

/**************************** WebSocket Manager ****************************/
class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private onDataCallback: ((data: Record<string, number>) => void) | null = null;
  private onStatusCallback: ((status: "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR") => void) | null = null;

  constructor(private url: string, private token: string) {}

  connect(): void {
    try {
      this.onStatusCallback?.("CONNECTING");
      this.ws = new WebSocket(`${this.url}?token=${encodeURIComponent(this.token)}`);

      this.ws.onopen = () => {
        this.onStatusCallback?.("CONNECTED");
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message?.type === "sample" && message?.data) {
            this.onDataCallback?.(message.data);
          }
        } catch (e) {
          console.warn("Erreur parsing WebSocket:", e);
        }
      };

      this.ws.onclose = () => {
        this.onStatusCallback?.("DISCONNECTED");
        this.scheduleReconnect();
      };

      this.ws.onerror = () => {
        this.onStatusCallback?.("ERROR");
      };
    } catch {
      this.onStatusCallback?.("ERROR");
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 3000);
  }

  onData(callback: (data: Record<string, number>) => void) {
    this.onDataCallback = callback;
  }

  onStatus(callback: (status: "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR") => void) {
    this.onStatusCallback = callback;
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

/**************************** Panneau (jauge + courbe) ****************************/
function SensorPanel({
  sensorKey,
  onChange,
  displayValues,
  dataBuffers,
  tick,
}: {
  sensorKey: string;
  onChange: (v: string) => void;
  displayValues: Record<string, number>;
  dataBuffers: React.MutableRefObject<Record<string, TimeSeriesBuffer>>;
  tick: number; // force re-render chart à 12 FPS
}) {
  const config = SENSOR_CONFIGS[sensorKey];
  const value = displayValues[sensorKey] ?? 0;
  const unit = config.unit ?? "";
  const gauge = computeGauge(config, value);

  // données visibles prêtes pour le chart (t dans 0..WINDOW)
  const data = useMemo(() => dataBuffers.current[sensorKey].getVisible(), [sensorKey, dataBuffers, tick]);

  useEffect(() => {
    const b = dataBuffers.current[sensorKey];
    if (b.isEmpty()) b.reset(displayValues[sensorKey] ?? 0);
  }, [sensorKey, displayValues, dataBuffers]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[32vh]">
        {/* Col gauche : sélecteur + jauge */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="relative mb-4">
            <select
              value={sensorKey}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-2 text-center font-semibold text-gray-800 appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 cursor-pointer"
            >
              {SENSOR_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          {/* Jauge */}
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-56 h-36 md:w-60 md:h-40 lg:w-64 lg:h-44">
              <CircularProgressbar
                value={gauge.percentage}
                maxValue={100}
                circleRatio={0.5}
                strokeWidth={8}
                styles={buildStyles({
                  rotation: 0.75,
                  strokeLinecap: "round",
                  pathColor: gauge.color,
                  trailColor: "#f1f5f9",
                  pathTransitionDuration: 0.2,
                })}
              />
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-8">
                <div className="text-5xl font-bold text-gray-900">
                  {value.toFixed(1)}
                  <span className="ml-1 text-xl font-medium text-gray-500">{unit}</span>
                </div>
              </div>
              <span className="absolute left-0 bottom-0 text-sm text-gray-500 font-medium">{config.min}</span>
              <span className="absolute right-0 bottom-0 text-sm text-gray-500 font-medium">{config.max}</span>
            </div>
          </div>
        </div>

        {/* Col droite : courbe */}
        <div className="lg:col-span-3 bg-gray-50 rounded-lg p-4">
          <ChartComponent data={data} unit={unit} color={gauge.color} config={config} />
        </div>
      </div>
    </div>
  );
}

/**************************** Composant principal ****************************/
export default function IndustrialDashboard() {
  const [wsStatus, setWsStatus] = useState<"CONNECTING" | "CONNECTED" | "DISCONNECTED" | "ERROR">("DISCONNECTED");

  // valeurs courantes (ref) et affichées (state)
  const currentValues = useRef<Record<string, number>>(Object.fromEntries(SENSOR_OPTIONS.map((s) => [s, 0])));
  const [displayValues, setDisplayValues] = useState<Record<string, number>>(
    Object.fromEntries(SENSOR_OPTIONS.map((s) => [s, 0]))
  );

  // buffers par capteur
  const dataBuffers = useRef<Record<string, TimeSeriesBuffer>>(
    Object.fromEntries(SENSOR_OPTIONS.map((s) => [s, new TimeSeriesBuffer(MAX_POINTS)]))
  );

  // WebSocket
  const wsManager = useRef<WebSocketManager | null>(null);

  const handleIncomingData = useCallback((data: Record<string, number>) => {
    const now = Date.now();
    for (const [sensor, value] of Object.entries(data)) {
      if (sensor in currentValues.current) {
        const num = Number(value) || 0;
        currentValues.current[sensor] = num;
        dataBuffers.current[sensor].add(now, num);
      }
    }
  }, []);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000";
    const wsToken = process.env.NEXT_PUBLIC_JWT_TOKEN || "";
    wsManager.current = new WebSocketManager(wsUrl, wsToken);
    wsManager.current.onStatus(setWsStatus);
    wsManager.current.onData(handleIncomingData);
    wsManager.current.connect();
    return () => wsManager.current?.disconnect();
  }, [handleIncomingData]);

  // Tick d'affichage à FPS stable; on copie les valeurs vers l'état UI
  const [displayTick, setDisplayTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDisplayTick((t) => t + 1), DISPLAY_INTERVAL) as unknown as ReturnType<
      typeof setInterval
    >;
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setDisplayValues(Object.fromEntries(SENSOR_OPTIONS.map((s) => [s, currentValues.current[s] ?? 0])));
  }, [displayTick]);

  // 2 panneaux indépendants
  const [panelSensors, setPanelSensors] = useState<string[]>(["HEAD TEMPERATURE N°1", "HEAD TEMPERATURE N°2"]);
  const changePanelSensor = (i: number, v: string) => setPanelSensors((prev) => prev.map((s, idx) => (idx === i ? v : s)));

  // bandeau statut en haut (simple)
  const statusBadge = useMemo(() => {
    const common = "px-2 py-0.5 rounded text-xs font-semibold";
    if (wsStatus === "CONNECTED") return <span className={`${common} bg-emerald-100 text-emerald-700`}>WS: OPEN</span>;
    if (wsStatus === "CONNECTING") return <span className={`${common} bg-amber-100 text-amber-700`}>WS: CONNECTING</span>;
    if (wsStatus === "ERROR") return <span className={`${common} bg-red-100 text-red-700`}>WS: ERROR</span>;
    return <span className={`${common} bg-gray-200 text-gray-700`}>WS: CLOSED</span>;
  }, [wsStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="w-full max-w-none mx-auto space-y-6 px-2 md:px-6">
        <div className="flex items-center gap-3 mb-2">{statusBadge}<span className="text-sm text-gray-500">Fenêtre: {TIME_WINDOW_SECONDS}s · {DISPLAY_FPS} FPS</span></div>

        <SensorPanel
          sensorKey={panelSensors[0]}
          onChange={(v) => changePanelSensor(0, v)}
          displayValues={displayValues}
          dataBuffers={dataBuffers}
          tick={displayTick}
        />

        <SensorPanel
          sensorKey={panelSensors[1]}
          onChange={(v) => changePanelSensor(1, v)}
          displayValues={displayValues}
          dataBuffers={dataBuffers}
          tick={displayTick}
        />
      </div>
    </div>
  );
}