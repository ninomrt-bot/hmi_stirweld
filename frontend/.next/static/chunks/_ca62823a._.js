(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/control/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/app/control/page.tsx
__turbopack_context__.s({
    "default": ()=>ControlPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ControlPage() {
    _s();
    // --------------------- Etats "machine" simples ---------------------
    const [faultOk, setFaultOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [autoReady, setAutoReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [airCooling, setAirCooling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // --------------------- Enregistrement ---------------------
    const [isRecording, setIsRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recordName, setRecordName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Weld_Recording");
    const [samplesCount, setSamplesCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [elapsedText, setElapsedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("00:00:00:00");
    // Temps t0 (départ du chrono relatif)
    const startTsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Buffer d'échantillons
    const bufferRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // rAF id
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Dernier échantillon (pour lisser la simu)
    const lastRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    var _process_env_NEXT_PUBLIC_BACKEND_URL;
    const API = (_process_env_NEXT_PUBLIC_BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:3001")) !== null && _process_env_NEXT_PUBLIC_BACKEND_URL !== void 0 ? _process_env_NEXT_PUBLIC_BACKEND_URL : "http://localhost:3001";
    // --------------------- Boucle de collecte pendant l'enregistrement ---------------------
    // --------------------- Boucle chrono ---------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlPage.useEffect": ()=>{
            let chronoTimer;
            if (isRecording) {
                chronoTimer = setInterval({
                    "ControlPage.useEffect": ()=>{
                        setElapsedText(fmtElapsed(Date.now())); // <- ici: Date.now()
                    }
                }["ControlPage.useEffect"], 50);
            }
            return ({
                "ControlPage.useEffect": ()=>chronoTimer && clearInterval(chronoTimer)
            })["ControlPage.useEffect"];
        }
    }["ControlPage.useEffect"], [
        isRecording
    ]);
    // --------------------- Boucle de collecte ---------------------
    const isRecordingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlPage.useEffect": ()=>{
            isRecordingRef.current = isRecording;
        }
    }["ControlPage.useEffect"], [
        isRecording
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ControlPage.useEffect": ()=>{
            let cancelled = false;
            const periodMs = 20;
            async function loop() {
                // boucle tant qu'on est en enregistrement
                while(!cancelled && isRecordingRef.current){
                    const t0 = performance.now();
                    try {
                        const s = await readLiveSample();
                        bufferRef.current.push(s);
                        setSamplesCount({
                            "ControlPage.useEffect.loop": (prev)=>prev + 1
                        }["ControlPage.useEffect.loop"]);
                    } catch (err) {
                        console.warn("Erreur lecture sample", err);
                    }
                    // attend le reste de la période (pas de chevauchement)
                    const spent = performance.now() - t0;
                    const wait = Math.max(0, periodMs - spent);
                    await new Promise({
                        "ControlPage.useEffect.loop": (r)=>setTimeout(r, wait)
                    }["ControlPage.useEffect.loop"]);
                }
            }
            if (isRecording) loop();
            return ({
                "ControlPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["ControlPage.useEffect"];
        }
    }["ControlPage.useEffect"], [
        isRecording
    ]);
    // --------------------- Actions ---------------------
    function onStart() {
        bufferRef.current = [];
        lastRef.current = null;
        setSamplesCount(0);
        setElapsedText("00:00:00:00");
        startTsRef.current = Date.now(); // départ du chrono
        setIsRecording(true);
    }
    async function onStop() {
        let saveZip = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        setIsRecording(false);
        if (!saveZip) return;
        try {
            // 1) Fabrique le CSV (Blob)
            const csvBlob = buildCSVBlob(bufferRef.current, (ts)=>fmtElapsed(ts));
            // 2) Fabrique les PNG de courbes (Blobs)
            const xs = bufferRef.current.map((s)=>startTsRef.current ? s.ts - startTsRef.current : 0); // ms relatifs
            const ff = bufferRef.current.map((s)=>s.FORGING_FORCE);
            const zp = bufferRef.current.map((s)=>s.Z_POSITION);
            const ht = bufferRef.current.map((s)=>s.HEAD_TEMPERATURE);
            const width = 1400;
            const height = 700;
            const ffPng = await makePlotPng({
                title: "FORGING FORCE (kN)",
                xLabel: "Time (s)",
                yLabel: "kN",
                xsMs: xs,
                ys: ff,
                width,
                height
            });
            const zpPng = await makePlotPng({
                title: "Z POSITION (mm)",
                xLabel: "Time (s)",
                yLabel: "mm",
                xsMs: xs,
                ys: zp,
                width,
                height
            });
            const htPng = await makePlotPng({
                title: "HEAD TEMPERATURE (°C)",
                xLabel: "Time (s)",
                yLabel: "°C",
                xsMs: xs,
                ys: ht,
                width,
                height
            });
            // 3) Zip {csv + 3 png} et télécharge
            await downloadZip({
                baseName: (recordName === null || recordName === void 0 ? void 0 : recordName.trim()) || "Recording",
                files: [
                    {
                        name: "data.csv",
                        blob: csvBlob
                    },
                    {
                        name: "FORGING_FORCE.png",
                        blob: ffPng
                    },
                    {
                        name: "Z_POSITION.png",
                        blob: zpPng
                    },
                    {
                        name: "HEAD_TEMPERATURE.png",
                        blob: htPng
                    }
                ]
            });
        } catch (e) {
            console.error(e);
            alert("Erreur pendant la sauvegarde ZIP.");
        }
    }
    // --------------------- Helpers ---------------------
    /** Formate l'écoulé depuis t0 en hh:mm:ss:cc (centièmes) */ function fmtElapsed(ts) {
        if (startTsRef.current == null) return "00:00:00:00";
        const delta = Math.max(0, ts - startTsRef.current);
        const hh = String(Math.floor(delta / 3_600_000)).padStart(2, "0");
        const mm = String(Math.floor(delta % 3_600_000 / 60_000)).padStart(2, "0");
        const ss = String(Math.floor(delta % 60_000 / 1_000)).padStart(2, "0");
        const cc = String(Math.floor(delta % 1_000 / 10)).padStart(2, "0");
        return "".concat(hh, ":").concat(mm, ":").concat(ss, ":").concat(cc);
    }
    /** Arrondi propre → string (point décimal) */ function n(x) {
        let digits = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
        const m = Math.pow(10, digits);
        return String(Math.round(x * m) / m);
    }
    /** Construit un Blob CSV (4 colonnes ; séparateur ;) */ function buildCSVBlob(samples, fmtTs) {
        const SEP = ";"; // Excel FR -> colonnes A/B/C/D
        const headers = [
            "TIMESTAMP (hh:mm:ss:cc)",
            "FORGING FORCE (kN)",
            "Z POSITION (mm)",
            "HEAD TEMPERATURE (°C)"
        ];
        const rows = [];
        rows.push(headers.join(SEP));
        for (const s of samples){
            const line = [
                fmtTs(s.ts),
                n(s.FORGING_FORCE, 4),
                n(s.Z_POSITION, 4),
                n(s.HEAD_TEMPERATURE, 3)
            ];
            rows.push(line.join(SEP));
        }
        const csv = "\uFEFF" + rows.join("\n"); // BOM UTF‑8
        return new Blob([
            csv
        ], {
            type: "text/csv;charset=utf-8"
        });
    }
    async function readLiveSample() {
        const ts = Date.now();
        const items = [
            {
                name: "GVL_Public.g_force",
                type: "REAL"
            },
            {
                name: "GVL_Public.g_ZPos",
                type: "REAL"
            },
            // choisis la tête que tu veux :
            {
                name: "GVL_Public.real_g_head_temperature_n1",
                type: "real"
            }
        ];
        const r = await fetch("".concat(API, "/api/read-many"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify({
                items
            })
        });
        if (!r.ok) throw new Error("PLC read failed");
        const data = await r.json();
        // petit helper pour retrouver la valeur d’un symbole
        const getVal = function(sym) {
            let def = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            var _data_results;
            const it = data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : _data_results.find((x)=>(x === null || x === void 0 ? void 0 : x.name) === sym && (x === null || x === void 0 ? void 0 : x.ok));
            const v = Number(it === null || it === void 0 ? void 0 : it.value);
            return Number.isFinite(v) ? v : def;
        };
        // récupère les valeurs
        let force = getVal("GVL_Public.g_force", 0);
        const zPos = getVal("GVL_Public.g_ZPos", 0);
        const headT = getVal("GVL_Public.real_g_head_temperature_n1", 0);
        // ⚠️ Unités : si ton PLC renvoie la FORCE en Newtons, passe-la en kN :
        // force = force / 1000;
        return {
            ts,
            FORGING_FORCE: force,
            Z_POSITION: zPos,
            HEAD_TEMPERATURE: headT
        };
    }
    // --------------------- UI ---------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen w-full bg-[#ecf2f6]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-6 py-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-2xl font-extrabold tracking-wide text-[#0f1c3a] mb-4",
                    children: "CONTROL & DATA RECORD"
                }, void 0, false, {
                    fileName: "[project]/src/app/control/page.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFaultOk((v)=>!v),
                                                    className: "w-10 h-10 rounded-full border flex items-center justify-center\n                    ".concat(faultOk ? "bg-emerald-500 text-white border-emerald-600" : "bg-gray-200 border-gray-300 text-gray-500"),
                                                    title: "Fault state",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-6 h-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/control/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-semibold text-[#0f1c3a]",
                                                    children: "Fault"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setAutoReady((v)=>!v),
                                                    className: "w-10 h-10 rounded-full border flex items-center justify-center\n                    ".concat(autoReady ? "bg-emerald-400 text-white border-emerald-500" : "bg-gray-200 border-gray-300 text-gray-500"),
                                                    title: "Auto readiness",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/control/page.tsx",
                                                        lineNumber: 289,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xl font-semibold text-[#0f1c3a]",
                                                    children: "Auto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[#0f1c3a]/70 text-sm",
                                            children: "Besoin des conditions initiales pour lancer le mode Auto."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 294,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/control/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-3",
                                            children: [
                                                !isRecording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onStart,
                                                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-sky-600 text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/control/page.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Start Record"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onStop(true),
                                                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-rose-600 text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/control/page.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Stop & Save ZIP"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 19
                                                }, this),
                                                !isRecording && bufferRef.current.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onStop(true),
                                                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow bg-white border border-gray-300 text-[#0f1c3a]",
                                                    title: "Télécharger le CSV + PNG (ZIP)",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/control/page.tsx",
                                                            lineNumber: 326,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Download ZIP"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-[#0f1c3a] mb-1",
                                                    children: "Recording file name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400",
                                                    value: recordName,
                                                    onChange: (e)=>setRecordName(e.target.value),
                                                    placeholder: "Weld_Recording_001"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/control/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsPanel, {
                                            isRecording: isRecording,
                                            elapsed: elapsedText,
                                            samples: samplesCount,
                                            columns: "TIMESTAMP; FORGING FORCE; Z POSITION; HEAD TEMPERATURE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/control/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/control/page.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/control/page.tsx",
                            lineNumber: 267,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-200/60 border-t border-gray-300 p-4 md:p-6 rounded-b-2xl flex items-center justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAirCooling((v)=>!v),
                                className: "flex items-center gap-3 px-5 py-3 rounded-full font-semibold shadow\n                ".concat(airCooling ? "bg-[#0f1c3a] text-white" : "bg-gray-300 text-gray-700"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/control/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this),
                                    "Air Cooling"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/control/page.tsx",
                            lineNumber: 355,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/control/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/control/page.tsx",
            lineNumber: 259,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/control/page.tsx",
        lineNumber: 258,
        columnNumber: 5
    }, this);
}
_s(ControlPage, "RncDadJCkoT9yGNdXK0KZfK7mHE=");
_c = ControlPage;
/** Panneau de stats propre */ function StatsPanel(param) {
    let { isRecording, elapsed, samples, columns } = param;
    const statusColor = isRecording ? "bg-emerald-500" : "bg-gray-400";
    const statusText = isRecording ? "Recording..." : "Idle";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-xl border border-gray-200 shadow-sm p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-3 h-3 rounded-full ".concat(statusColor, " animate-pulse")
                        }, void 0, false, {
                            fileName: "[project]/src/app/control/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-semibold text-[#0f1c3a]",
                            children: statusText
                        }, void 0, false, {
                            fileName: "[project]/src/app/control/page.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/control/page.tsx",
                    lineNumber: 389,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/control/page.tsx",
                lineNumber: 388,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] uppercase tracking-wide text-gray-500",
                                children: "Elapsed"
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-bold text-[#0f1c3a]",
                                children: elapsed
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/control/page.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] uppercase tracking-wide text-gray-500",
                                children: "Samples"
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 401,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-bold text-[#0f1c3a]",
                                children: samples
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/control/page.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] uppercase tracking-wide text-gray-500",
                                children: "Columns"
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 405,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-[#0f1c3a] break-words",
                                children: columns
                            }, void 0, false, {
                                fileName: "[project]/src/app/control/page.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/control/page.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/control/page.tsx",
                lineNumber: 395,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/control/page.tsx",
        lineNumber: 387,
        columnNumber: 5
    }, this);
}
_c1 = StatsPanel;
/* -----------------------------------------------------------
 * Utils: génération PNG de courbe et création ZIP
 * ---------------------------------------------------------*/ /** Dessine une courbe simple sur un canvas offscreen et renvoie un Blob PNG */ async function makePlotPng(opts) {
    var _opts_width;
    const width = (_opts_width = opts.width) !== null && _opts_width !== void 0 ? _opts_width : 1200;
    var _opts_height;
    const height = (_opts_height = opts.height) !== null && _opts_height !== void 0 ? _opts_height : 600;
    const margin = {
        top: 60,
        right: 40,
        bottom: 60,
        left: 80
    };
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    // Fond
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const x0 = margin.left;
    const y0 = margin.top;
    // Echelles
    const xs = opts.xsMs.map((ms)=>ms / 1000); // s
    const minX = 0;
    const maxX = Math.max(1e-6, Math.max(...xs));
    const minY = Math.min(...opts.ys);
    const maxY = Math.max(...opts.ys);
    const padY = (maxY - minY) * 0.1 || 1;
    const yMin = minY - padY;
    const yMax = maxY + padY;
    const xToPx = (x)=>x0 + (x - minX) / (maxX - minX || 1) * plotW;
    const yToPx = (y)=>y0 + (1 - (y - yMin) / (yMax - yMin || 1)) * plotH;
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
    for(let i = 0; i <= ticks; i++){
        const tx = minX + i / ticks * (maxX - minX);
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
    for(let i = 0; i <= ticks; i++){
        const ty = yMin + i / ticks * (yMax - yMin);
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
    for(let i = 0; i < xs.length; i++){
        const px = xToPx(xs[i]);
        const py = yToPx(opts.ys[i]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // Retour Blob PNG
    const blob = await new Promise((resolve)=>{
        canvas.toBlob((b)=>resolve(b), "image/png");
    });
    return blob;
}
/** Crée et télécharge un ZIP nommé <baseName>_YYYYMMDD-HHMMSS.zip */ async function downloadZip(params) {
    // @ts-ignore - import dynamique pour éviter d’alourdir le bundle si non utilisé
    const JSZip = (await __turbopack_context__.r("[project]/node_modules/jszip/lib/index.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i)).default;
    const zip = new JSZip();
    for (const f of params.files){
        zip.file(f.name, f.blob);
    }
    const now = new Date();
    const stamp = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("") + "-" + [
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
        String(now.getSeconds()).padStart(2, "0")
    ].join("");
    const blob = await zip.generateAsync({
        type: "blob"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "".concat(params.baseName, "_").concat(stamp, ".zip");
    a.click();
    URL.revokeObjectURL(a.href);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "ControlPage");
__turbopack_context__.k.register(_c1, "StatsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>CircleCheck
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }
    ]
];
const CircleCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("circle-check", __iconNode);
;
 //# sourceMappingURL=circle-check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CheckCircle2": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Info
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
];
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("info", __iconNode);
;
 //# sourceMappingURL=info.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Info": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Play
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
            key: "10ikf1"
        }
    ]
];
const Play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("play", __iconNode);
;
 //# sourceMappingURL=play.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Play": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Square
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "3",
            rx: "2",
            key: "afitv7"
        }
    ]
];
const Square = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("square", __iconNode);
;
 //# sourceMappingURL=square.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Square": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": ()=>__iconNode,
    "default": ()=>Download
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 15V3",
            key: "m9g1x1"
        }
    ],
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ],
    [
        "path",
        {
            d: "m7 10 5 5 5-5",
            key: "brsn70"
        }
    ]
];
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("download", __iconNode);
;
 //# sourceMappingURL=download.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Download": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)");
}),
}]);

//# sourceMappingURL=_ca62823a._.js.map