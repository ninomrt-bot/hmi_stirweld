module.exports = {

"[project]/src/app/dashboard/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>DashboardPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-circular-progressbar/dist/index.esm.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'uplot'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'uplot/dist/uPlot.min.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
;
const CONFIGS = {
    "TOOL TEMP": {
        min: 0,
        max: 250,
        alarmLow: 10,
        alarmHigh: 220,
        unit: "°C"
    },
    "TOOL TEMP DEVICE": {
        min: 0,
        max: 120,
        alarmLow: 5,
        alarmHigh: 100,
        unit: "°C"
    },
    "HEAD TEMPERATURE N°1": {
        min: 0,
        max: 250,
        alarmLow: 10,
        alarmHigh: 220,
        unit: "°C"
    },
    "HEAD TEMPERATURE N°2": {
        min: 0,
        max: 250,
        alarmLow: 10,
        alarmHigh: 220,
        unit: "°C"
    },
    FORCE: {
        min: 0,
        max: 20000,
        alarmHigh: 18000,
        unit: "N"
    },
    "Z POSITION": {
        min: -50,
        max: 50,
        unit: "mm"
    },
    "ROTATION SPEED": {
        min: 0,
        max: 11000,
        alarmHigh: 10000,
        unit: "rpm"
    }
};
const OPTIONS = Object.keys(CONFIGS);
/**************************** Mapping PLC ****************************/ const API = ("TURBOPACK compile-time value", "http://localhost:3001") ?? "http://localhost:3001";
const PLC = {
    "TOOL TEMP": {
        name: "GVL_Public.g_tool_temp",
        type: "REAL"
    },
    "TOOL TEMP DEVICE": {
        name: "GVL_Public.g_tool_device",
        type: "REAL"
    },
    "HEAD TEMPERATURE N°1": {
        name: "GVL_Public.real_g_head_temperature_n1",
        type: "REAL"
    },
    "HEAD TEMPERATURE N°2": {
        name: "GVL_Public.g_head_temperature_n2",
        type: "REAL"
    },
    FORCE: {
        name: "GVL_Public.g_force",
        type: "REAL"
    },
    "Z POSITION": {
        name: "GVL_Public.g_ZPos",
        type: "REAL"
    },
    "ROTATION SPEED": {
        name: "GVL_Public.g_rotation_speed",
        type: "UDINT"
    }
};
/**************************** Fréquences & limites ****************************/ // FPS cible pour le rendu (React ne fait qu'invalider, uPlot dessine en Canvas)
const DEFAULT_TARGET_FPS = 60; // 30 ou 60
// Échantillonnage historique (push en buffer)
const SAMPLE_WHEN_VISIBLE_MS = 100; // 10 Hz (fluidité sans bruit réseau)
const SAMPLE_WHEN_HIDDEN_MS = 1000; // 1 Hz onglet masqué
// Historique conservé (points)
const HISTORY_LIMIT = 600; // 60 s à 10 Hz
/**************************** Ring buffer optimisé (no-copy + extrema) ****************************/ function createRingBuffer(limit) {
    const buf = [];
    let max = -Infinity, min = Infinity, ver = 0;
    function recomputeExtrema() {
        max = -Infinity;
        min = Infinity;
        for(let i = 0; i < buf.length; i++){
            const v = buf[i].v;
            if (v > max) max = v;
            if (v < min) min = v;
        }
    }
    return {
        push (p) {
            if (buf.length < limit) {
                buf.push(p);
            } else {
                const removed = buf.shift();
                buf.push(p);
                if (removed.v === max || removed.v === min) recomputeExtrema();
            }
            if (p.v > max) max = p.v;
            if (p.v < min) min = p.v;
            ver++;
        },
        clearAndSeed (p) {
            buf.length = 0;
            max = min = p.v;
            buf.push(p);
            ver++;
        },
        view () {
            return buf;
        },
        stats () {
            return {
                max,
                min,
                ver,
                len: buf.length
            };
        }
    };
}
/**************************** Helper JSON sûr ****************************/ async function safeJson(r) {
    const ct = r.headers.get("content-type") || "";
    const text = await r.text();
    if (ct.includes("application/json")) {
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("JSON parse error:", e, text.slice(0, 200));
            throw new Error("Bad JSON from backend");
        }
    }
    console.error("Expected JSON, got:", ct || "unknown", "payload:", text.slice(0, 200));
    throw new Error("Backend returned non-JSON (HTML?)");
}
/**************************** Composant uPlot (Canvas ultra fluide) ****************************/ function UplotLine({ dataRef, yMin, yMax, timeFormatter, height = 360 }) {
    const elRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const plotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const xsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const ysRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const verRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(-1); // version déjà rendue
    // Création une fois
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!elRef.current) return;
        const opts = {
            width: elRef.current.clientWidth,
            height,
            scales: {
                x: {
                    time: false
                },
                y: {
                    auto: false
                }
            },
            axes: [
                {
                    grid: {
                        show: true
                    },
                    values: (_, vals)=>vals.map((v)=>timeFormatter(Number(v)))
                },
                {
                    grid: {
                        show: true
                    }
                }
            ],
            series: [
                {},
                {
                    stroke: "#0ea5e9",
                    width: 2
                }
            ],
            // options perf
            hooks: {
                ready: [
                    ()=>{
                        verRef.current = -1;
                    }
                ]
            }
        };
        plotRef.current = new uPlot(opts, [
            xsRef.current,
            ysRef.current
        ], elRef.current);
        const ro = new ResizeObserver(()=>{
            if (!plotRef.current || !elRef.current) return;
            plotRef.current.setSize({
                width: elRef.current.clientWidth,
                height
            });
        });
        ro.observe(elRef.current);
        return ()=>{
            ro.disconnect();
            plotRef.current?.destroy();
            plotRef.current = null;
        };
    }, [
        height,
        timeFormatter
    ]);
    // Mise à jour des données (référence inchangée => on lit directement)
    const sync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((ver)=>{
        if (!plotRef.current) return;
        const data = dataRef();
        // Si on a déjà rendu cette version, skip
        if (verRef.current === ver) return;
        verRef.current = ver;
        const n = data.length;
        xsRef.current.length = n;
        ysRef.current.length = n;
        for(let i = 0; i < n; i++){
            xsRef.current[i] = data[i].t; // t en secondes (voir page principale)
            ysRef.current[i] = data[i].v;
        }
        plotRef.current.setData([
            xsRef.current,
            ysRef.current
        ], false);
    }, [
        dataRef
    ]);
    // Mise à jour de l'échelle Y
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!plotRef.current) return;
        plotRef.current.setScale("y", {
            min: yMin,
            max: yMax
        });
    }, [
        yMin,
        yMax
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: elRef,
        className: "w-full h-[360px]"
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 184,
        columnNumber: 10
    }, this);
}
function DashboardPage() {
    // Sélection métrique
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(OPTIONS[0]);
    const selectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(selected);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        selectedRef.current = selected;
    }, [
        selected
    ]);
    // Valeurs affichées (RAF)
    const [displayValues, setDisplayValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>Object.fromEntries(OPTIONS.map((k)=>[
                k,
                0
            ])));
    // Valeurs brutes en ref
    const liveValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Object.fromEntries(OPTIONS.map((k)=>[
            k,
            0
        ])));
    // Buffers par métrique (1 seule fois)
    const buffersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!buffersRef.current) {
        buffersRef.current = Object.fromEntries(OPTIONS.map((k)=>[
                k,
                createRingBuffer(HISTORY_LIMIT)
            ]));
    }
    // Flags
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timeScale, setTimeScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("s");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [targetFps, setTargetFps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_TARGET_FPS);
    const cfg = CONFIGS[selected];
    const value = displayValues[selected] ?? 0;
    const unit = cfg.unit ?? "";
    /************ jauge ************/ const { percentage, pathColor, min, max } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const span = cfg.max - cfg.min || 1;
        let pct = (value - cfg.min) / span * 100;
        pct = Math.min(100, Math.max(0, pct));
        const hi = cfg.alarmHigh !== undefined && value >= cfg.alarmHigh;
        const lo = cfg.alarmLow !== undefined && value <= cfg.alarmLow;
        const color = hi ? "#ef4444" : lo ? "#f59e0b" : "#10b981";
        return {
            percentage: pct,
            pathColor: color,
            min: cfg.min,
            max: cfg.max
        };
    }, [
        cfg,
        value
    ]);
    /************ Seed à chaque changement de métrique ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsReady(false);
        setError(null);
        const map = PLC[selected];
        let cancelled = false;
        if (!map) {
            setIsReady(true);
            return;
        }
        (async ()=>{
            try {
                const url = `${API}/api/read?name=${encodeURIComponent(map.name)}&type=${encodeURIComponent(map.type)}`;
                const r = await fetch(url, {
                    cache: "no-store"
                });
                if (!r.ok) throw new Error(`seed read failed: ${r.status}`);
                const data = await safeJson(r);
                const raw = Number(data?.value);
                if (!Number.isFinite(raw)) throw new Error("seed NaN");
                const v0 = (map.scale ?? 1) * raw;
                if (cancelled) return;
                liveValuesRef.current[selected] = v0;
                const nowS = performance.now() / 1000; // temps monotone en secondes
                const buf = buffersRef.current[selected];
                buf.clearAndSeed({
                    t: nowS - SAMPLE_WHEN_VISIBLE_MS / 1000,
                    v: v0
                });
                buf.push({
                    t: nowS,
                    v: v0
                });
                setIsReady(true);
            } catch (e) {
                console.error(e);
                if (!cancelled) setError(e?.message || "Erreur seed");
            }
        })();
        return ()=>{
            cancelled = true;
        };
    }, [
        selected
    ]);
    /************ Polling PLC (maj ref, sans re-render) ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let stop = false;
        let timer = null;
        const schedule = (ms)=>{
            if (!stop) timer = setTimeout(pollOnce, ms);
        };
        const pollOnce = async ()=>{
            const key = selectedRef.current;
            const map = PLC[key];
            if (!map) return schedule(document.hidden ? 1000 : 200);
            try {
                const url = `${API}/api/read?name=${encodeURIComponent(map.name)}&type=${encodeURIComponent(map.type)}`;
                const r = await fetch(url, {
                    cache: "no-store"
                });
                if (r.ok) {
                    try {
                        const data = await safeJson(r);
                        const raw = Number(data?.value);
                        if (Number.isFinite(raw)) {
                            liveValuesRef.current[key] = (map.scale ?? 1) * raw;
                        }
                    } catch (e) {
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
        return ()=>{
            stop = true;
            if (timer) clearTimeout(timer);
        };
    }, []);
    /************ Sampling -> push historique (thread UI très léger) ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let stop = false;
        let timer = null;
        const tick = ()=>{
            if (stop) return;
            if (isReady) {
                const key = selectedRef.current;
                const v = liveValuesRef.current[key] ?? 0;
                const nowS = performance.now() / 1000;
                buffersRef.current[key].push({
                    t: nowS,
                    v
                });
            }
            const ms = document.hidden ? SAMPLE_WHEN_HIDDEN_MS : SAMPLE_WHEN_VISIBLE_MS;
            timer = setTimeout(tick, ms);
        };
        tick();
        return ()=>{
            stop = true;
            if (timer) clearTimeout(timer);
        };
    }, [
        isReady
    ]);
    /************ Boucle de rendu (requestAnimationFrame) ************/ const [uiTick, setUiTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let id = 0;
        let last = 0;
        const loop = (t)=>{
            if (!document.hidden) {
                const targetMs = 1000 / targetFps;
                if (t - last >= targetMs) {
                    setUiTick((v)=>v + 1);
                    last = t;
                }
            }
            id = requestAnimationFrame(loop);
        };
        id = requestAnimationFrame(loop);
        return ()=>cancelAnimationFrame(id);
    }, [
        targetFps
    ]);
    // Sync valeur affichée (métrique sélectionnée)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const key = selected;
        setDisplayValues((prev)=>({
                ...prev,
                [key]: liveValuesRef.current[key] ?? 0
            }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        uiTick,
        selected
    ]);
    /************ Données chart + axes (no-copy) ************/ const buf = buffersRef.current[selected];
    const { max: maxObs, min: minObs, ver } = buf.stats();
    const historyView = buf.view; // fonction stable
    // t0 = premier point en secondes monotones
    const t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const d = historyView();
        return d.length ? d[0].t : performance.now() / 1000;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selected
    ]);
    const timeUnitLabel = timeScale === "s" ? "s" : timeScale === "m" ? "min" : "h";
    const timeFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((t)=>{
        const dt = Math.max(0, t - t0); // secondes
        if (timeScale === "s") return `${dt.toFixed(1)}`;
        if (timeScale === "m") return `${(dt / 60).toFixed(2)}`;
        return `${(dt / 3600).toFixed(3)}`;
    }, [
        t0,
        timeScale
    ]);
    // Échelle Y très stable: privilégie les limites config; garde un léger headroom basé sur maxObs
    const [yMin, yMax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const c = CONFIGS[selected];
        const headroom = 1.05;
        const upper = Math.min(c.max, (Number.isFinite(maxObs) ? maxObs : c.max) * headroom || c.max);
        const lower = c.min >= 0 ? 0 : c.min;
        // borne minimale si pas de points
        const u = upper <= lower ? c.max : upper;
        return [
            lower,
            u
        ];
    }, [
        selected,
        maxObs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full p-8 bg-gray-100 flex flex-col gap-6",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: "Erreur lecture:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 384,
                        columnNumber: 11
                    }, this),
                    " ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 383,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:w-1/4 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full md:w-4/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full border border-gray-300 rounded px-3 py-2 text-center text-lg font-bold appearance-none",
                                        value: selected,
                                        onChange: (e)=>setSelected(e.currentTarget.value),
                                        children: OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: opt
                                            }, opt, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 20,
                                        className: "absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 w-full max-w-xs h-[140px] overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CircularProgressbar"], {
                                    value: percentage,
                                    maxValue: 100,
                                    circleRatio: 0.5,
                                    strokeWidth: 5,
                                    text: "",
                                    styles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildStyles"])({
                                        rotation: 0.75,
                                        pathColor,
                                        trailColor: "#e5e7eb",
                                        strokeLinecap: "butt"
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "-mt-12 text-center select-none pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-4xl font-bold text-[#071039]",
                                    children: [
                                        value.toFixed(1),
                                        unit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 text-base font-medium text-gray-500",
                                            children: unit
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 418,
                                            columnNumber: 23
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex justify-between w-full md:w-4/5 text-xs text-gray-500 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: min
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: max
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center gap-2 text-sm text-gray-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "FPS:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this),
                                    [
                                        30,
                                        60
                                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTargetFps(f),
                                            className: `px-2 py-1 rounded border ${targetFps === f ? "bg-gray-200" : "bg-white"}`,
                                            children: f
                                        }, f, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-2 text-sm text-gray-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Échelle temps:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTimeScale("s"),
                                        className: `px-2 py-1 rounded ${timeScale === "s" ? "bg-gray-200" : ""}`,
                                        children: "s"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTimeScale("m"),
                                        className: `px-2 py-1 rounded ${timeScale === "m" ? "bg-gray-200" : ""}`,
                                        children: "min"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setTimeScale("h"),
                                        className: `px-2 py-1 rounded ${timeScale === "h" ? "bg-gray-200" : ""}`,
                                        children: "h"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 390,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:w-3/4 h-[360px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UplotLine, {
                            dataRef: buffersRef.current[selected].view,
                            yMin: yMin,
                            yMax: yMax,
                            timeFormatter: (x)=>{
                                // x = secondes monotones; formattage relatif selon timeScale
                                const dt = Math.max(0, x - (buffersRef.current[selected].view()[0]?.t ?? x));
                                if (timeScale === "s") return dt.toFixed(1);
                                if (timeScale === "m") return (dt / 60).toFixed(2);
                                return (dt / 3600).toFixed(3);
                            },
                            height: 360
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 443,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "range",
                min: CONFIGS[selected].min,
                max: CONFIGS[selected].max,
                value: value,
                onChange: (e)=>{
                    const v = parseFloat(e.currentTarget.value);
                    liveValuesRef.current[selected] = v;
                    setDisplayValues((prev)=>({
                            ...prev,
                            [selected]: v
                        }));
                },
                className: "w-full",
                disabled: !!PLC[selected]
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>ChevronDown
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chevron-down", __iconNode);
;
 //# sourceMappingURL=chevron-down.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ChevronDown": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/react-circular-progressbar/dist/index.esm.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CircularProgressbar": ()=>CircularProgressbar,
    "CircularProgressbarWithChildren": ()=>CircularProgressbarWithChildren,
    "buildStyles": ()=>buildStyles
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */ /* global Reflect, Promise */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }
    return t;
}
var VIEWBOX_WIDTH = 100;
var VIEWBOX_HEIGHT = 100;
var VIEWBOX_HEIGHT_HALF = 50;
var VIEWBOX_CENTER_X = 50;
var VIEWBOX_CENTER_Y = 50;
function Path(_a) {
    var className = _a.className, counterClockwise = _a.counterClockwise, dashRatio = _a.dashRatio, pathRadius = _a.pathRadius, strokeWidth = _a.strokeWidth, style = _a.style;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("path", {
        className: className,
        style: Object.assign({}, style, getDashStyle({
            pathRadius: pathRadius,
            dashRatio: dashRatio,
            counterClockwise: counterClockwise
        })),
        d: getPathDescription({
            pathRadius: pathRadius,
            counterClockwise: counterClockwise
        }),
        strokeWidth: strokeWidth,
        fillOpacity: 0
    });
}
function getPathDescription(_a) {
    var pathRadius = _a.pathRadius, counterClockwise = _a.counterClockwise;
    var radius = pathRadius;
    var rotation = counterClockwise ? 1 : 0;
    return "\n      M " + VIEWBOX_CENTER_X + "," + VIEWBOX_CENTER_Y + "\n      m 0,-" + radius + "\n      a " + radius + "," + radius + " " + rotation + " 1 1 0," + 2 * radius + "\n      a " + radius + "," + radius + " " + rotation + " 1 1 0,-" + 2 * radius + "\n    ";
}
function getDashStyle(_a) {
    var counterClockwise = _a.counterClockwise, dashRatio = _a.dashRatio, pathRadius = _a.pathRadius;
    var diameter = Math.PI * 2 * pathRadius;
    var gapLength = (1 - dashRatio) * diameter;
    return {
        strokeDasharray: diameter + "px " + diameter + "px",
        strokeDashoffset: (counterClockwise ? -gapLength : gapLength) + "px"
    };
}
var CircularProgressbar = function(_super) {
    __extends(CircularProgressbar, _super);
    function CircularProgressbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CircularProgressbar.prototype.getBackgroundPadding = function() {
        if (!this.props.background) {
            return 0;
        }
        return this.props.backgroundPadding;
    };
    CircularProgressbar.prototype.getPathRadius = function() {
        return VIEWBOX_HEIGHT_HALF - this.props.strokeWidth / 2 - this.getBackgroundPadding();
    };
    CircularProgressbar.prototype.getPathRatio = function() {
        var _a = this.props, value = _a.value, minValue = _a.minValue, maxValue = _a.maxValue;
        var boundedValue = Math.min(Math.max(value, minValue), maxValue);
        return (boundedValue - minValue) / (maxValue - minValue);
    };
    CircularProgressbar.prototype.render = function() {
        var _a = this.props, circleRatio = _a.circleRatio, className = _a.className, classes = _a.classes, counterClockwise = _a.counterClockwise, styles = _a.styles, strokeWidth = _a.strokeWidth, text = _a.text;
        var pathRadius = this.getPathRadius();
        var pathRatio = this.getPathRatio();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("svg", {
            className: classes.root + " " + className,
            style: styles.root,
            viewBox: "0 0 " + VIEWBOX_WIDTH + " " + VIEWBOX_HEIGHT,
            "data-test-id": "CircularProgressbar"
        }, this.props.background ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("circle", {
            className: classes.background,
            style: styles.background,
            cx: VIEWBOX_CENTER_X,
            cy: VIEWBOX_CENTER_Y,
            r: VIEWBOX_HEIGHT_HALF
        }) : null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Path, {
            className: classes.trail,
            counterClockwise: counterClockwise,
            dashRatio: circleRatio,
            pathRadius: pathRadius,
            strokeWidth: strokeWidth,
            style: styles.trail
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Path, {
            className: classes.path,
            counterClockwise: counterClockwise,
            dashRatio: pathRatio * circleRatio,
            pathRadius: pathRadius,
            strokeWidth: strokeWidth,
            style: styles.path
        }), text ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("text", {
            className: classes.text,
            style: styles.text,
            x: VIEWBOX_CENTER_X,
            y: VIEWBOX_CENTER_Y
        }, text) : null);
    };
    CircularProgressbar.defaultProps = {
        background: false,
        backgroundPadding: 0,
        circleRatio: 1,
        classes: {
            root: 'CircularProgressbar',
            trail: 'CircularProgressbar-trail',
            path: 'CircularProgressbar-path',
            text: 'CircularProgressbar-text',
            background: 'CircularProgressbar-background'
        },
        counterClockwise: false,
        className: '',
        maxValue: 100,
        minValue: 0,
        strokeWidth: 8,
        styles: {
            root: {},
            trail: {},
            path: {},
            text: {},
            background: {}
        },
        text: ''
    };
    return CircularProgressbar;
}(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"]);
function CircularProgressbarWithChildren(props) {
    var children = props.children, circularProgressbarProps = __rest(props, [
        "children"
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("div", {
        "data-test-id": "CircularProgressbarWithChildren"
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            height: '100%'
        }
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(CircularProgressbar, __assign({}, circularProgressbarProps)), props.children ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("div", {
        "data-test-id": "CircularProgressbarWithChildren__children",
        style: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            marginTop: '-100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }, props.children) : null));
}
function buildStyles(_a) {
    var rotation = _a.rotation, strokeLinecap = _a.strokeLinecap, textColor = _a.textColor, textSize = _a.textSize, pathColor = _a.pathColor, pathTransition = _a.pathTransition, pathTransitionDuration = _a.pathTransitionDuration, trailColor = _a.trailColor, backgroundColor = _a.backgroundColor;
    var rotationTransform = rotation == null ? undefined : "rotate(" + rotation + "turn)";
    var rotationTransformOrigin = rotation == null ? undefined : 'center center';
    return {
        root: {},
        path: removeUndefinedValues({
            stroke: pathColor,
            strokeLinecap: strokeLinecap,
            transform: rotationTransform,
            transformOrigin: rotationTransformOrigin,
            transition: pathTransition,
            transitionDuration: pathTransitionDuration == null ? undefined : pathTransitionDuration + "s"
        }),
        trail: removeUndefinedValues({
            stroke: trailColor,
            strokeLinecap: strokeLinecap,
            transform: rotationTransform,
            transformOrigin: rotationTransformOrigin
        }),
        text: removeUndefinedValues({
            fill: textColor,
            fontSize: textSize
        }),
        background: removeUndefinedValues({
            fill: backgroundColor
        })
    };
}
function removeUndefinedValues(obj) {
    Object.keys(obj).forEach(function(key) {
        if (obj[key] == null) {
            delete obj[key];
        }
    });
    return obj;
}
;
 //# sourceMappingURL=index.esm.js.map
}),

};

//# sourceMappingURL=_5ef00b16._.js.map