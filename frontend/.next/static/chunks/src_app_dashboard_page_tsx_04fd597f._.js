(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>DashboardPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-circular-progressbar/dist/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/LineChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Line.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Label.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
_c = OPTIONS;
var _process_env_NEXT_PUBLIC_BACKEND_URL;
/**************************** Mapping PLC ****************************/ const API = (_process_env_NEXT_PUBLIC_BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:3001")) !== null && _process_env_NEXT_PUBLIC_BACKEND_URL !== void 0 ? _process_env_NEXT_PUBLIC_BACKEND_URL : "http://localhost:3001";
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
/**************************** Fréquences & limites ****************************/ // Rendu UI (découplé du polling)
const UI_FPS = 10; // 10 fps → fluide sans charger le CPU
const UI_TICK_MS = Math.round(1000 / UI_FPS);
// Échantillonnage historique
const SAMPLE_WHEN_VISIBLE_MS = 200; // 5 Hz
const SAMPLE_WHEN_HIDDEN_MS = 1000; // 1 Hz onglet masqué
// Historique conservé (points)
const HISTORY_LIMIT = 300;
/**************************** Ring buffer (sans hooks) ****************************/ function createRingBuffer(limit) {
    let buf = [];
    return {
        push (p) {
            if (buf.length < limit) buf.push(p);
            else {
                buf.splice(0, 1);
                buf.push(p);
            }
        },
        getData () {
            return buf.slice();
        },
        clearAndSeed (p) {
            buf = [
                p
            ];
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
/**************************** Chart (mémoïsé) ****************************/ const ChartArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(function ChartArea(param) {
    let { data, unit, pathColor, timeFormatter, timeUnitLabel, yMin, yMax } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$LineChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LineChart"], {
            data: data,
            margin: {
                top: 10,
                right: 20,
                bottom: 10,
                left: 0
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: "t",
                    type: "number",
                    domain: [
                        "dataMin",
                        "dataMax"
                    ],
                    minTickGap: 35,
                    tickFormatter: timeFormatter,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        value: "Temps (".concat(timeUnitLabel, ")"),
                        position: "insideBottom",
                        offset: -5,
                        style: {
                            fill: "#6b7280",
                            fontSize: 12
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                    domain: [
                        yMin,
                        yMax
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        value: unit,
                        angle: -90,
                        position: "insideLeft",
                        style: {
                            fill: "#6b7280",
                            fontSize: 12
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 120,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    labelFormatter: (l)=>"t=".concat(timeFormatter(Number(l)), " ").concat(timeUnitLabel),
                    formatter: (v)=>[
                            "".concat(v.toFixed(2), " ").concat(unit).trim(),
                            ""
                        ]
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                    type: "linear",
                    dataKey: "v",
                    stroke: pathColor,
                    dot: false,
                    isAnimationActive: false
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
});
_c1 = ChartArea;
function DashboardPage() {
    _s();
    // Sélection métrique
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(OPTIONS[0]);
    const selectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selected);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            selectedRef.current = selected;
        }
    }["DashboardPage.useEffect"], [
        selected
    ]);
    // Valeurs affichées (throttle 10 fps)
    const [displayValues, setDisplayValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DashboardPage.useState": ()=>Object.fromEntries(OPTIONS.map({
                "DashboardPage.useState": (k)=>[
                        k,
                        0
                    ]
            }["DashboardPage.useState"]))
    }["DashboardPage.useState"]);
    // Valeurs brutes en ref (pour éviter les re-renders à chaque poll)
    const liveValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Object.fromEntries(OPTIONS.map({
        "DashboardPage.useRef[liveValuesRef]": (k)=>[
                k,
                0
            ]
    }["DashboardPage.useRef[liveValuesRef]"])));
    // Buffers par métrique (fabriqués une seule fois)
    const buffersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!buffersRef.current) {
        buffersRef.current = Object.fromEntries(OPTIONS.map((k)=>[
                k,
                createRingBuffer(HISTORY_LIMIT)
            ]));
    }
    // Flags
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timeScale, setTimeScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("s");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const cfg = CONFIGS[selected];
    var _displayValues_selected;
    const value = (_displayValues_selected = displayValues[selected]) !== null && _displayValues_selected !== void 0 ? _displayValues_selected : 0;
    var _cfg_unit;
    const unit = (_cfg_unit = cfg.unit) !== null && _cfg_unit !== void 0 ? _cfg_unit : "";
    /************ jauge ************/ const { percentage, pathColor, min, max } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo": ()=>{
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
        }
    }["DashboardPage.useMemo"], [
        cfg,
        value
    ]);
    /************ Seed à chaque changement de métrique ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            setIsReady(false);
            setError(null);
            const map = PLC[selected];
            let cancelled = false;
            if (!map) {
                setIsReady(true);
                return;
            }
            ({
                "DashboardPage.useEffect": async ()=>{
                    try {
                        var _this;
                        const url = "".concat(API, "/api/read?name=").concat(encodeURIComponent(map.name), "&type=").concat(encodeURIComponent(map.type));
                        const r = await fetch(url, {
                            cache: "no-store"
                        });
                        if (!r.ok) throw new Error("seed read failed: ".concat(r.status));
                        const data = await safeJson(r);
                        const raw = Number((_this = data) === null || _this === void 0 ? void 0 : _this.value);
                        if (!Number.isFinite(raw)) throw new Error("seed NaN");
                        var _map_scale;
                        const v0 = ((_map_scale = map.scale) !== null && _map_scale !== void 0 ? _map_scale : 1) * raw;
                        if (cancelled) return;
                        liveValuesRef.current[selected] = v0;
                        const now = Date.now();
                        buffersRef.current[selected].clearAndSeed({
                            t: now - SAMPLE_WHEN_VISIBLE_MS,
                            v: v0
                        });
                        buffersRef.current[selected].push({
                            t: now,
                            v: v0
                        });
                        setIsReady(true);
                    } catch (e) {
                        console.error(e);
                        if (!cancelled) setError((e === null || e === void 0 ? void 0 : e.message) || "Erreur seed");
                    }
                }
            })["DashboardPage.useEffect"]();
            return ({
                "DashboardPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        selected
    ]);
    /************ Polling PLC (maj ref) ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            let stop = false;
            let timer = null;
            const schedule = {
                "DashboardPage.useEffect.schedule": (ms)=>{
                    if (!stop) timer = setTimeout(pollOnce, ms);
                }
            }["DashboardPage.useEffect.schedule"];
            const pollOnce = {
                "DashboardPage.useEffect.pollOnce": async ()=>{
                    const key = selectedRef.current;
                    const map = PLC[key];
                    if (!map) return schedule(document.hidden ? 1000 : 200);
                    try {
                        const url = "".concat(API, "/api/read?name=").concat(encodeURIComponent(map.name), "&type=").concat(encodeURIComponent(map.type));
                        const r = await fetch(url, {
                            cache: "no-store"
                        });
                        if (r.ok) {
                            try {
                                var _this;
                                const data = await safeJson(r);
                                const raw = Number((_this = data) === null || _this === void 0 ? void 0 : _this.value);
                                if (Number.isFinite(raw)) {
                                    var _map_scale;
                                    liveValuesRef.current[key] = ((_map_scale = map.scale) !== null && _map_scale !== void 0 ? _map_scale : 1) * raw;
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
                }
            }["DashboardPage.useEffect.pollOnce"];
            pollOnce();
            return ({
                "DashboardPage.useEffect": ()=>{
                    stop = true;
                    if (timer) clearTimeout(timer);
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    /************ Sampling -> push historique ************/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            let stop = false;
            let timer = null;
            const tick = {
                "DashboardPage.useEffect.tick": ()=>{
                    if (stop) return;
                    if (isReady) {
                        const key = selectedRef.current;
                        var _liveValuesRef_current_key;
                        const v = (_liveValuesRef_current_key = liveValuesRef.current[key]) !== null && _liveValuesRef_current_key !== void 0 ? _liveValuesRef_current_key : 0;
                        buffersRef.current[key].push({
                            t: Date.now(),
                            v
                        });
                    }
                    const ms = document.hidden ? SAMPLE_WHEN_HIDDEN_MS : SAMPLE_WHEN_VISIBLE_MS;
                    timer = setTimeout(tick, ms);
                }
            }["DashboardPage.useEffect.tick"];
            tick();
            return ({
                "DashboardPage.useEffect": ()=>{
                    stop = true;
                    if (timer) clearTimeout(timer);
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        isReady
    ]);
    /************ UI ticker (10 fps) ************/ const [uiTick, setUiTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const id = setInterval({
                "DashboardPage.useEffect.id": ()=>setUiTick({
                        "DashboardPage.useEffect.id": (v)=>v + 1
                    }["DashboardPage.useEffect.id"])
            }["DashboardPage.useEffect.id"], UI_TICK_MS);
            return ({
                "DashboardPage.useEffect": ()=>clearInterval(id)
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    // Sync valeur affichée (métrique sélectionnée)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const key = selected;
            setDisplayValues({
                "DashboardPage.useEffect": (prev)=>{
                    var _liveValuesRef_current_key;
                    return {
                        ...prev,
                        [key]: (_liveValuesRef_current_key = liveValuesRef.current[key]) !== null && _liveValuesRef_current_key !== void 0 ? _liveValuesRef_current_key : 0
                    };
                }
            }["DashboardPage.useEffect"]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["DashboardPage.useEffect"], [
        uiTick,
        selected
    ]);
    /************ Données chart + axes ************/ const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[history]": ()=>buffersRef.current[selected].getData()
    }["DashboardPage.useMemo[history]"], [
        uiTick,
        selected
    ]);
    const t0 = history.length ? history[0].t : Date.now();
    const timeUnitLabel = timeScale === "s" ? "s" : timeScale === "m" ? "min" : "h";
    const timeFormatter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[timeFormatter]": (t)=>{
            const dt = Math.max(0, t - t0) / 1000; // s
            if (timeScale === "s") return "".concat(dt.toFixed(1));
            if (timeScale === "m") return "".concat((dt / 60).toFixed(2));
            return "".concat((dt / 3600).toFixed(3));
        }
    }["DashboardPage.useCallback[timeFormatter]"], [
        t0,
        timeScale
    ]);
    const [yMin, yMax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo": ()=>{
            const c = CONFIGS[selected];
            const maxObserved = history.length ? Math.max(...history.map({
                "DashboardPage.useMemo": (p)=>p.v
            }["DashboardPage.useMemo"]), displayValues[selected] || 0) : displayValues[selected] || 0;
            const baseMax = maxObserved === 0 ? 1 : maxObserved * 1.1;
            const step = c.max >= 1000 ? 100 : 10;
            const upper = Math.min(c.max, Math.ceil(baseMax / step) * step);
            const lower = c.min >= 0 ? 0 : c.min;
            return [
                lower,
                upper
            ];
        }
    }["DashboardPage.useMemo"], [
        selected,
        history,
        displayValues
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full p-8 bg-gray-100 flex flex-col gap-6",
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 text-red-700 border border-red-200 rounded-lg p-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: "Erreur lecture:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this),
                    " ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 304,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:w-1/4 flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full md:w-4/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full border border-gray-300 rounded px-3 py-2 text-center text-lg font-bold appearance-none",
                                        value: selected,
                                        onChange: (e)=>setSelected(e.currentTarget.value),
                                        children: OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                children: opt
                                            }, opt, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        size: 20,
                                        className: "absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 w-full max-w-xs h-[140px] overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CircularProgressbar"], {
                                    value: percentage,
                                    maxValue: 100,
                                    circleRatio: 0.5,
                                    strokeWidth: 5,
                                    text: "",
                                    styles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$circular$2d$progressbar$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildStyles"])({
                                        rotation: 0.75,
                                        pathColor,
                                        trailColor: "#e5e7eb",
                                        strokeLinecap: "butt"
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "-mt-12 text-center select-none pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-4xl font-bold text-[#071039]",
                                    children: [
                                        value.toFixed(1),
                                        unit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 text-base font-medium text-gray-500",
                                            children: unit
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 339,
                                            columnNumber: 23
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex justify-between w-full md:w-4/5 text-xs text-gray-500 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: min
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: max
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 311,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:w-3/4 h-[360px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartArea, {
                            data: history,
                            unit: unit,
                            pathColor: pathColor,
                            timeFormatter: timeFormatter,
                            timeUnitLabel: timeUnitLabel,
                            yMin: yMin,
                            yMax: yMax
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 351,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 items-center text-sm text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Échelle temps:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeScale("s"),
                        className: "px-2 py-1 rounded ".concat(timeScale === "s" ? "bg-gray-200" : ""),
                        children: "s"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 381,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeScale("m"),
                        className: "px-2 py-1 rounded ".concat(timeScale === "m" ? "bg-gray-200" : ""),
                        children: "min"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTimeScale("h"),
                        className: "px-2 py-1 rounded ".concat(timeScale === "h" ? "bg-gray-200" : ""),
                        children: "h"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 379,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 302,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "o+SYHM2hf1TY8fBLLXf9W/QMaBg=");
_c2 = DashboardPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "OPTIONS");
__turbopack_context__.k.register(_c1, "ChartArea");
__turbopack_context__.k.register(_c2, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_dashboard_page_tsx_04fd597f._.js.map