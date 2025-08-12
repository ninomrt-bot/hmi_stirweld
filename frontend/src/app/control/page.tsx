// src/app/control/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Info, Play, Square, Download } from "lucide-react";
import { usePLCWebSocket } from "../../lib/usePLCWebSocket";

/**
 * Echantillon live. Remplace la génération par tes vraies mesures.
 */
type LiveSample = {
  ts: number;                // Date.now()
  FORGING_FORCE: number;     // kN
  Z_POSITION: number;        // mm
  HEAD_TEMPERATURE: number;  // °C
};

export default function ControlPage() {
  // --------------------- Etats "machine" simples ---------------------
  const [faultOk, setFaultOk] = useState(true);
  const [autoReady, setAutoReady] = useState(false);
  const [airCooling, setAirCooling] = useState(true);

  // --------------------- Enregistrement ---------------------
  const [isRecording, setIsRecording] = useState(false);
  const [recordName, setRecordName] = useState("Weld_Recording");
  const [samplesCount, setSamplesCount] = useState(0);
  const [elapsedText, setElapsedText] = useState("00:00:00:00");

  // Temps t0 (départ du chrono relatif)
  const startTsRef = useRef<number | null>(null);
  // Buffer d'échantillons
  const bufferRef = useRef<LiveSample[]>([]);
  // rAF id
  const rafRef = useRef<number | null>(null);
  // Dernier échantillon (pour lisser la simu)
  const lastRef = useRef<LiveSample | null>(null);

  const { lastSample, sendCommand } = usePLCWebSocket();
  const lastSampleRef = useRef<LiveSample | null>(null);
  useEffect(() => { if (lastSample) lastSampleRef.current = lastSample as LiveSample; }, [lastSample]);

  // --------------------- Boucle de collecte pendant l'enregistrement ---------------------
    // --------------------- Boucle chrono ---------------------
    useEffect(() => {
    let chronoTimer: NodeJS.Timeout;

    if (isRecording) {
        chronoTimer = setInterval(() => {
        setElapsedText(fmtElapsed(Date.now())); // <- ici: Date.now()
        }, 50);
    }

    return () => chronoTimer && clearInterval(chronoTimer);
    }, [isRecording]);


    // --------------------- Boucle de collecte ---------------------
    const isRecordingRef = useRef(false);
    useEffect(() => { isRecordingRef.current = isRecording; }, [isRecording]);

    useEffect(() => {
    let cancelled = false;
    const periodMs = 20;

    async function loop() {
        // boucle tant qu'on est en enregistrement
        while (!cancelled && isRecordingRef.current) {
        const t0 = performance.now();
        try {
            const s = await readLiveSample();
            bufferRef.current.push(s);
            setSamplesCount((prev) => prev + 1);
        } catch (err) {
            console.warn("Erreur lecture sample", err);
        }
        // attend le reste de la période (pas de chevauchement)
        const spent = performance.now() - t0;
        const wait = Math.max(0, periodMs - spent);
        await new Promise((r) => setTimeout(r, wait));
        }
    }

    if (isRecording) loop();
    return () => { cancelled = true; };
    }, [isRecording]);





  // --------------------- Actions ---------------------
  function onStart() {
    bufferRef.current = [];
    lastRef.current = null;
    setSamplesCount(0);
    setElapsedText("00:00:00:00");
    startTsRef.current = Date.now(); // départ du chrono
    setIsRecording(true);
  }

  async function onStop(saveZip = true) {
    setIsRecording(false);
    if (!saveZip) return;

    try {
      // 1) Fabrique le CSV (Blob)
      const csvBlob = buildCSVBlob(bufferRef.current, (ts) => fmtElapsed(ts));

      // 2) Fabrique les PNG de courbes (Blobs)
      const xs = bufferRef.current.map(s => (startTsRef.current ? s.ts - startTsRef.current : 0)); // ms relatifs
      const ff = bufferRef.current.map(s => s.FORGING_FORCE);
      const zp = bufferRef.current.map(s => s.Z_POSITION);
      const ht = bufferRef.current.map(s => s.HEAD_TEMPERATURE);

      const width = 1400;
      const height = 700;
      const ffPng = await makePlotPng({
        title: "FORGING FORCE (kN)",
        xLabel: "Time (s)",
        yLabel: "kN",
        xsMs: xs,
        ys: ff,
        width,
        height,
      });
      const zpPng = await makePlotPng({
        title: "Z POSITION (mm)",
        xLabel: "Time (s)",
        yLabel: "mm",
        xsMs: xs,
        ys: zp,
        width,
        height,
      });
      const htPng = await makePlotPng({
        title: "HEAD TEMPERATURE (°C)",
        xLabel: "Time (s)",
        yLabel: "°C",
        xsMs: xs,
        ys: ht,
        width,
        height,
      });

      // 3) Zip {csv + 3 png} et télécharge
      await downloadZip({
        baseName: recordName?.trim() || "Recording",
        files: [
          { name: "data.csv", blob: csvBlob },
          { name: "FORGING_FORCE.png", blob: ffPng },
          { name: "Z_POSITION.png", blob: zpPng },
          { name: "HEAD_TEMPERATURE.png", blob: htPng },
        ],
      });
    } catch (e) {
      console.error(e);
      alert("Erreur pendant la sauvegarde ZIP.");
    }
  }

  // --------------------- Helpers ---------------------
  /** Formate l'écoulé depuis t0 en hh:mm:ss:cc (centièmes) */
  function fmtElapsed(ts: number) {
    if (startTsRef.current == null) return "00:00:00:00";
    const delta = Math.max(0, ts - startTsRef.current);
    const hh = String(Math.floor(delta / 3_600_000)).padStart(2, "0");
    const mm = String(Math.floor((delta % 3_600_000) / 60_000)).padStart(2, "0");
    const ss = String(Math.floor((delta % 60_000) / 1_000)).padStart(2, "0");
    const cc = String(Math.floor((delta % 1_000) / 10)).padStart(2, "0");
    return `${hh}:${mm}:${ss}:${cc}`;
  }

  /** Arrondi propre → string (point décimal) */
  function n(x: number, digits = 3) {
    const m = Math.pow(10, digits);
    return String(Math.round(x * m) / m);
  }

  /** Construit un Blob CSV (4 colonnes ; séparateur ;) */
  function buildCSVBlob(samples: LiveSample[], fmtTs: (ts: number) => string): Blob {
    const SEP = ";"; // Excel FR -> colonnes A/B/C/D
    const headers = [
      "TIMESTAMP (hh:mm:ss:cc)",
      "FORGING FORCE (kN)",
      "Z POSITION (mm)",
      "HEAD TEMPERATURE (°C)",
    ];

    const rows: string[] = [];
    rows.push(headers.join(SEP));

    for (const s of samples) {
      const line = [
        fmtTs(s.ts),
        n(s.FORGING_FORCE, 4),
        n(s.Z_POSITION, 4),
        n(s.HEAD_TEMPERATURE, 3),
      ];
      rows.push(line.join(SEP));
    }

    const csv = "\uFEFF" + rows.join("\n"); // BOM UTF‑8
    return new Blob([csv], { type: "text/csv;charset=utf-8" });
  }

  /**
   * LECTURE DES VALEURS LIVE
   * 👉 Remplace cette fonction par ta vraie acquisition (OPC UA, Modbus, WebSocket...).
   * Retourne toujours { ts: Date.now(), FORGING_FORCE, Z_POSITION, HEAD_TEMPERATURE }.
   */
    async function readLiveSample(): Promise<LiveSample> {
    const ts = Date.now();
    const sample = lastSampleRef.current;
    return sample ?? { ts, FORGING_FORCE: 0, Z_POSITION: 0, HEAD_TEMPERATURE: 0 };
    }


  // --------------------- UI ---------------------
  return (
    <div className="min-h-screen w-full bg-[#ecf2f6]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* En-tête */}
        <div className="text-2xl font-extrabold tracking-wide text-[#0f1c3a] mb-4">
          CONTROL & DATA RECORD
        </div>

        {/* Carte conditions + contrôle */}
        <div className="bg-white rounded-2xl shadow border border-gray-200">
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Conditions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFaultOk(v => !v)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center
                    ${faultOk ? "bg-emerald-500 text-white border-emerald-600" : "bg-gray-200 border-gray-300 text-gray-500"}`}
                  title="Fault state"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
                <span className="text-xl font-semibold text-[#0f1c3a]">Fault</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAutoReady(v => !v)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center
                    ${autoReady ? "bg-emerald-400 text-white border-emerald-500" : "bg-gray-200 border-gray-300 text-gray-500"}`}
                  title="Auto readiness"
                >
                  <Info className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold text-[#0f1c3a]">Auto</span>
              </div>

              <div className="text-[#0f1c3a]/70 text-sm">
                Besoin des conditions initiales pour lancer le mode Auto.
              </div>
            </div>

            {/* Data Record */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={onStart}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-sky-600 text-white"
                  >
                    <Play className="w-4 h-4" />
                    Start Record
                  </button>
                ) : (
                  <button
                    onClick={() => onStop(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-rose-600 text-white"
                  >
                    <Square className="w-4 h-4" />
                    Stop & Save ZIP
                  </button>
                )}

                {!isRecording && bufferRef.current.length > 0 && (
                  <button
                    onClick={() => onStop(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-white border border-gray-300 text-[#0f1c3a]"
                    title="Télécharger le CSV + PNG (ZIP)"
                  >
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0f1c3a] mb-1">
                  Recording file name
                </label>
                <input
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                  value={recordName}
                  onChange={(e) => setRecordName(e.target.value)}
                  placeholder="Weld_Recording_001"
                />
              </div>

              {/* Stats live */}
              <StatsPanel
                isRecording={isRecording}
                elapsed={elapsedText}
                samples={samplesCount}
                columns="TIMESTAMP; FORGING FORCE; Z POSITION; HEAD TEMPERATURE"
              />
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => sendCommand('Start')}
                  className="px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold"
                >
                  Start
                </button>
                <button
                  onClick={() => sendCommand('Stop')}
                  className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold"
                >
                  Stop
                </button>
                <button
                  onClick={() => sendCommand('Reset')}
                  className="px-4 py-2 rounded-full bg-gray-500 text-white font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Bandeau bas */}
          <div className="bg-gray-200/60 border-t border-gray-300 p-4 md:p-6 rounded-b-2xl flex items-center justify-end">
            <button
              onClick={() => setAirCooling(v => !v)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full font-semibold shadow
                ${airCooling ? "bg-[#0f1c3a] text-white" : "bg-gray-300 text-gray-700"}`}
            >
              <CheckCircle2 className="w-5 h-5" />
              Air Cooling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Panneau de stats propre */
function StatsPanel({
  isRecording,
  elapsed,
  samples,
  columns,
}: {
  isRecording: boolean;
  elapsed: string;
  samples: number;
  columns: string;
}) {
  const statusColor = isRecording ? "bg-emerald-500" : "bg-gray-400";
  const statusText = isRecording ? "Recording..." : "Idle";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}></span>
          <span className="text-sm font-semibold text-[#0f1c3a]">{statusText}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-gray-500">Elapsed</span>
          <span className="text-lg font-bold text-[#0f1c3a]">{elapsed}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-gray-500">Samples</span>
          <span className="text-lg font-bold text-[#0f1c3a]">{samples}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-wide text-gray-500">Columns</span>
          <span className="text-xs text-[#0f1c3a] break-words">{columns}</span>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 * Utils: génération PNG de courbe et création ZIP
 * ---------------------------------------------------------*/

/** Dessine une courbe simple sur un canvas offscreen et renvoie un Blob PNG */
async function makePlotPng(opts: {
  title: string;
  xLabel: string;
  yLabel: string;
  xsMs: number[]; // temps relatif en ms
  ys: number[];
  width?: number;
  height?: number;
}): Promise<Blob> {
  const width = opts.width ?? 1200;
  const height = opts.height ?? 600;
  const margin = { top: 60, right: 40, bottom: 60, left: 80 };

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);

  // Fond
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const x0 = margin.left;
  const y0 = margin.top;

  // Echelles
  const xs = opts.xsMs.map(ms => ms / 1000); // s
  const minX = 0;
  const maxX = Math.max(1e-6, Math.max(...xs));
  const minY = Math.min(...opts.ys);
  const maxY = Math.max(...opts.ys);
  const padY = (maxY - minY) * 0.1 || 1;
  const yMin = minY - padY;
  const yMax = maxY + padY;

  const xToPx = (x: number) => x0 + (x - minX) / (maxX - minX || 1) * plotW;
  const yToPx = (y: number) => y0 + (1 - (y - yMin) / (yMax - yMin || 1)) * plotH;

  // Axes
  ctx.strokeStyle = "#cbd5e1"; // slate-300
  ctx.lineWidth = 1;
  // X axis
  ctx.beginPath();
  ctx.moveTo(x0, y0 + plotH);
  ctx.lineTo(x0 + plotW, y0 + plotH);
  ctx.stroke();
  // Y axis
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y0 + plotH);
  ctx.stroke();

  // Graduations X (5)
  ctx.fillStyle = "#475569"; // slate-600
  ctx.font = "12px ui-sans-serif, system-ui, -apple-system, 'Segoe UI'";
  const ticks = 5;
  for (let i = 0; i <= ticks; i++) {
    const tx = minX + (i / ticks) * (maxX - minX);
    const px = xToPx(tx);
    ctx.strokeStyle = "#e2e8f0"; // slate-200
    ctx.beginPath();
    ctx.moveTo(px, y0);
    ctx.lineTo(px, y0 + plotH);
    ctx.stroke();
    ctx.fillStyle = "#475569";
    ctx.textAlign = "center";
    ctx.fillText(tx.toFixed(2), px, y0 + plotH + 18);
  }

  // Graduations Y (5)
  for (let i = 0; i <= ticks; i++) {
    const ty = yMin + (i / ticks) * (yMax - yMin);
    const py = yToPx(ty);
    ctx.strokeStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(x0, py);
    ctx.lineTo(x0 + plotW, py);
    ctx.stroke();
    ctx.fillStyle = "#475569";
    ctx.textAlign = "right";
    ctx.fillText(ty.toFixed(2), x0 - 8, py + 4);
  }

  // Titre
  ctx.fillStyle = "#0f172a"; // slate-900
  ctx.font = "bold 18px ui-sans-serif, system-ui, -apple-system, 'Segoe UI'";
  ctx.textAlign = "center";
  ctx.fillText(opts.title, x0 + plotW / 2, margin.top - 24);

  // Labels
  ctx.font = "12px ui-sans-serif, system-ui, -apple-system, 'Segoe UI'";
  ctx.fillStyle = "#475569";
  // X label
  ctx.fillText(opts.xLabel, x0 + plotW / 2, y0 + plotH + 40);
  // Y label (vertical)
  ctx.save();
  ctx.translate(24, y0 + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(opts.yLabel, 0, 0);
  ctx.restore();

  // Courbe
  ctx.strokeStyle = "#0ea5e9"; // sky-500
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < xs.length; i++) {
    const px = xToPx(xs[i]);
    const py = yToPx(opts.ys[i]);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Retour Blob PNG
  const blob: Blob = await new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b!), "image/png");
  });
  return blob;
}

/** Crée et télécharge un ZIP nommé <baseName>_YYYYMMDD-HHMMSS.zip */
async function downloadZip(params: { baseName: string; files: { name: string; blob: Blob }[] }) {
  // @ts-ignore - import dynamique pour éviter d’alourdir le bundle si non utilisé
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (const f of params.files) {
    zip.file(f.name, f.blob);
  }

  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("") + "-" + [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  const blob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${params.baseName}_${stamp}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
}
