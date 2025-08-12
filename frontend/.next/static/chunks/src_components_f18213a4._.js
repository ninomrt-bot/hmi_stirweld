(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/Topbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Topbar": ()=>Topbar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as User2>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Topbar() {
    _s();
    const deepBlue = "#0b1235";
    // horloge live (anti-SSR mismatch avec suppressHydrationWarning)
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Topbar.useEffect": ()=>{
            setNow(new Date());
            const id = setInterval({
                "Topbar.useEffect.id": ()=>setNow(new Date())
            }["Topbar.useEffect.id"], 1000);
            return ({
                "Topbar.useEffect": ()=>clearInterval(id)
            })["Topbar.useEffect"];
        }
    }["Topbar.useEffect"], []);
    var _now_toLocaleTimeString;
    // Format FR + fuseau Paris
    const timeStr = (_now_toLocaleTimeString = now === null || now === void 0 ? void 0 : now.toLocaleTimeString("fr-FR", {
        hour12: false,
        timeZone: "Europe/Paris"
    })) !== null && _now_toLocaleTimeString !== void 0 ? _now_toLocaleTimeString : "";
    var _now_toLocaleDateString;
    const dateStr = (_now_toLocaleDateString = now === null || now === void 0 ? void 0 : now.toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris"
    })) !== null && _now_toLocaleDateString !== void 0 ? _now_toLocaleDateString : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: {
            display: "flex",
            alignItems: "center",
            background: deepBlue,
            height: 75,
            padding: "0 16px",
            color: "#ffffff",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            display: "flex",
                            alignItems: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 150,
                                height: 75,
                                position: "relative"
                            },
                            title: "Stirweld",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/logo-blanc.png",
                                alt: "Stirweld",
                                fill: true,
                                priority: true,
                                sizes: "150px",
                                style: {
                                    objectFit: "contain"
                                },
                                onError: (e)=>{
                                    // fallback simple: masque l'image si introuvable
                                    e.target.style.display = "none";
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/Topbar.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Topbar.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Topbar.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 850,
                            letterSpacing: 0.5
                        },
                        children: "V4 v3.0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Topbar.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Topbar.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "right",
                            lineHeight: 1.1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                suppressHydrationWarning: true,
                                style: {
                                    fontSize: 28,
                                    fontWeight: 900
                                },
                                children: timeStr
                            }, void 0, false, {
                                fileName: "[project]/src/components/Topbar.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                suppressHydrationWarning: true,
                                style: {
                                    fontSize: 22,
                                    fontWeight: 900
                                },
                                children: dateStr
                            }, void 0, false, {
                                fileName: "[project]/src/components/Topbar.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Topbar.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    background: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: deepBlue,
                                    fontWeight: 800
                                },
                                "aria-label": "User",
                                title: "Utilisateur",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User2$3e$__["User2"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Topbar.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Topbar.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 700,
                                    fontSize: 14,
                                    marginTop: 2
                                },
                                children: "_SystemUser"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Topbar.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Topbar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Topbar.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Topbar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(Topbar, "z7BF03mi9TSA+mHelO7IwQHRwX4=");
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StatusBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>StatusBar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/handshake.js [app-client] (ecmascript) <export default as Handshake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/* ===== Thème & constantes ===== */ const COLORS = {
    deepBlue: "#0f143b",
    grey: "#d5d7dd",
    greyDark: "#c8cad1",
    orange: "#ff6600",
    textDark: "#0b1235",
    fieldBg: "#f5f6f8"
};
const Z_TOP = 2147483647;
const STATUS_HEIGHT = 100;
const MENU_WIDTH = 200;
const ITEM_HEIGHT = 150;
const SLANT_OFFSET = 60;
var _process_env_NEXT_PUBLIC_BACKEND_URL;
/* ===== Backend & mapping PLC ===== */ const API = (_process_env_NEXT_PUBLIC_BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:3001")) !== null && _process_env_NEXT_PUBLIC_BACKEND_URL !== void 0 ? _process_env_NEXT_PUBLIC_BACKEND_URL : "http://localhost:3001";
const PLC_ITEMS = [
    {
        key: "F",
        name: "GVL_Public.g_force",
        type: "REAL",
        scale: 1 / 1000,
        decimals: 2,
        unit: "kN"
    },
    {
        key: "TT",
        name: "GVL_Public.g_tool_temp",
        type: "REAL",
        scale: 1,
        decimals: 1,
        unit: "°C"
    },
    {
        key: "RS",
        name: "GVL_Public.g_rotation_speed",
        type: "UDINT",
        scale: 1,
        decimals: 0,
        unit: "RPM"
    },
    {
        key: "ZP",
        name: "GVL_Public.g_ZPos",
        type: "REAL",
        scale: 1,
        decimals: 2,
        unit: "mm"
    }
];
/** Statut PLI (équivalent à ton SwitchCase TwinCAT) */ const PLI_STATUS = {
    1: {
        label: "IDLE",
        bg: "#e5e7eb",
        fg: "#111827"
    },
    2: {
        label: "RUNNING",
        bg: "#d1fae5",
        fg: "#065f46"
    },
    5: {
        label: "HELD",
        bg: "#fffbeb",
        fg: "#92400e"
    },
    11: {
        label: "LOCKED",
        bg: "#fee2e2",
        fg: "#991b1b"
    }
};
const PLI_DEFAULT = {
    label: "UNKNOWN",
    bg: "#f3f4f6",
    fg: "#374151"
};
/* ===== Utils ===== */ function useMounted() {
    _s();
    const [m, setM] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMounted.useEffect": ()=>setM(true)
    }["useMounted.useEffect"], []);
    return m;
}
_s(useMounted, "IdAIgmHqs+S7nLx9Fzod1yhYfK4=");
function Portal(param) {
    let { children } = param;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(children, document.body);
}
_c = Portal;
function useBodyScrollLock(locked) {
    _s1();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBodyScrollLock.useEffect": ()=>{
            if (typeof document === "undefined") return;
            const prev = document.body.style.overflow;
            document.body.style.overflow = locked ? "hidden" : prev || "";
            return ({
                "useBodyScrollLock.useEffect": ()=>{
                    document.body.style.overflow = prev;
                }
            })["useBodyScrollLock.useEffect"];
        }
    }["useBodyScrollLock.useEffect"], [
        locked
    ]);
}
_s1(useBodyScrollLock, "OD7bBpZva5O2jO+Puf00hKivP7c=");
const fmt = function(v) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return v == null || Number.isNaN(v) ? "—" : v.toFixed(d);
};
function StatusBar(param) {
    let { headerHeight = 64, title = "Textblock" } = param;
    var _PLI_STATUS_pliStatus;
    _s2();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mounted = useMounted();
    useBodyScrollLock(open);
    // valeurs live affichées
    const [vals, setVals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        F: null,
        TT: null,
        RS: null,
        ZP: null
    });
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pliStatus, setPliStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ===== REFRESH: read-many puis fallback read-one =====
    const doRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StatusBar.useCallback[doRefresh]": async ()=>{
            // 1) read-many
            try {
                const body = {
                    items: [
                        {
                            name: "GVL_Public.g_force",
                            type: "REAL"
                        },
                        {
                            name: "GVL_Public.g_tool_temp",
                            type: "REAL"
                        },
                        {
                            name: "GVL_Public.g_rotation_speed",
                            type: "UDINT"
                        },
                        {
                            name: "GVL_Public.g_ZPos",
                            type: "REAL"
                        },
                        {
                            name: "MAIN.PLI.Status",
                            type: "INT"
                        }
                    ]
                };
                const r = await fetch("".concat(API, "/api/read-many"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    cache: "no-store",
                    body: JSON.stringify(body)
                });
                if (!r.ok) throw new Error("read-many HTTP ".concat(r.status));
                const data = await r.json();
                const get = {
                    "StatusBar.useCallback[doRefresh].get": (name)=>{
                        var _data_results_find, _data_results;
                        return Number(data === null || data === void 0 ? void 0 : (_data_results = data.results) === null || _data_results === void 0 ? void 0 : (_data_results_find = _data_results.find({
                            "StatusBar.useCallback[doRefresh].get": (x)=>(x === null || x === void 0 ? void 0 : x.name) === name
                        }["StatusBar.useCallback[doRefresh].get"])) === null || _data_results_find === void 0 ? void 0 : _data_results_find.value);
                    }
                }["StatusBar.useCallback[doRefresh].get"];
                const f = get("GVL_Public.g_force");
                const tt = get("GVL_Public.g_tool_temp");
                const rs = get("GVL_Public.g_rotation_speed");
                const zp = get("GVL_Public.g_ZPos");
                const st = get("MAIN.PLI.Status");
                setVals({
                    F: Number.isFinite(f) ? f / 1000 : null,
                    TT: Number.isFinite(tt) ? tt : null,
                    RS: Number.isFinite(rs) ? rs : null,
                    ZP: Number.isFinite(zp) ? zp : null
                });
                setPliStatus(Number.isFinite(st) ? st : null);
                setOnline(true);
                return;
            } catch (e) {
            // passe au fallback
            }
            // 2) fallback: lectures individuelles
            try {
                const readOne = {
                    "StatusBar.useCallback[doRefresh].readOne": async (name, type)=>{
                        const u = "".concat(API, "/api/read?name=").concat(encodeURIComponent(name), "&type=").concat(encodeURIComponent(type));
                        const r = await fetch(u, {
                            cache: "no-store"
                        });
                        if (!r.ok) throw new Error("read ".concat(name, " HTTP ").concat(r.status));
                        const d = await r.json();
                        return Number(d === null || d === void 0 ? void 0 : d.value);
                    }
                }["StatusBar.useCallback[doRefresh].readOne"];
                const [f, tt, rs, zp, st] = await Promise.all([
                    readOne("GVL_Public.g_force", "REAL"),
                    readOne("GVL_Public.g_tool_temp", "REAL"),
                    readOne("GVL_Public.g_rotation_speed", "UDINT"),
                    readOne("GVL_Public.g_ZPos", "REAL"),
                    readOne("MAIN.PLI.Status", "INT")
                ]);
                setVals({
                    F: Number.isFinite(f) ? f / 1000 : null,
                    TT: Number.isFinite(tt) ? tt : null,
                    RS: Number.isFinite(rs) ? rs : null,
                    ZP: Number.isFinite(zp) ? zp : null
                });
                setPliStatus(Number.isFinite(st) ? st : null);
                setOnline(true);
            } catch (e) {
                setOnline(false);
            }
        }
    }["StatusBar.useCallback[doRefresh]"], []);
    // ===== Polling: 200ms (visible) / 1000ms (onglet caché) =====
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusBar.useEffect": ()=>{
            let stop = false;
            let t = null;
            const tick = {
                "StatusBar.useEffect.tick": async ()=>{
                    try {
                        await doRefresh();
                    } catch (e) {
                        setOnline(false);
                    }
                    if (!stop) t = setTimeout(tick, document.hidden ? 1000 : 200);
                }
            }["StatusBar.useEffect.tick"];
            tick();
            return ({
                "StatusBar.useEffect": ()=>{
                    stop = true;
                    if (t) clearTimeout(t);
                }
            })["StatusBar.useEffect"];
        }
    }["StatusBar.useEffect"], [
        doRefresh
    ]);
    // ===== ESC pour fermer le menu =====
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusBar.useEffect": ()=>{
            const onKey = {
                "StatusBar.useEffect.onKey": (e)=>e.key === "Escape" && setOpen(false)
            }["StatusBar.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "StatusBar.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["StatusBar.useEffect"];
        }
    }["StatusBar.useEffect"], []);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StatusBar.useCallback[toggle]": ()=>setOpen({
                "StatusBar.useCallback[toggle]": (v)=>!v
            }["StatusBar.useCallback[toggle]"])
    }["StatusBar.useCallback[toggle]"], []);
    const firstLinkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusBar.useEffect": ()=>{
            if (open) {
                const t = setTimeout({
                    "StatusBar.useEffect.t": ()=>{
                        var _firstLinkRef_current;
                        return (_firstLinkRef_current = firstLinkRef.current) === null || _firstLinkRef_current === void 0 ? void 0 : _firstLinkRef_current.focus();
                    }
                }["StatusBar.useEffect.t"], 0);
                return ({
                    "StatusBar.useEffect": ()=>clearTimeout(t)
                })["StatusBar.useEffect"];
            }
        }
    }["StatusBar.useEffect"], [
        open
    ]);
    // rendu des 4 champs dans l'ordre F/TT/RS/ZP
    const fields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StatusBar.useMemo[fields]": ()=>{
            const map = {
                F: {
                    value: vals.F,
                    unit: "kN",
                    decimals: 2
                },
                TT: {
                    value: vals.TT,
                    unit: "°C",
                    decimals: 1
                },
                RS: {
                    value: vals.RS,
                    unit: "RPM",
                    decimals: 0
                },
                ZP: {
                    value: vals.ZP,
                    unit: "mm",
                    decimals: 2
                }
            };
            return [
                [
                    "F",
                    map.F.unit,
                    fmt(map.F.value, map.F.decimals)
                ],
                [
                    "TT",
                    map.TT.unit,
                    fmt(map.TT.value, map.TT.decimals)
                ],
                [
                    "RS",
                    map.RS.unit,
                    fmt(map.RS.value, map.RS.decimals)
                ],
                [
                    "ZP",
                    map.ZP.unit,
                    fmt(map.ZP.value, map.ZP.decimals)
                ]
            ];
        }
    }["StatusBar.useMemo[fields]"], [
        vals
    ]);
    var _PLI_STATUS_pliStatus_label;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            zIndex: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: STATUS_HEIGHT,
                    background: COLORS.grey,
                    color: COLORS.textDark,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    borderTop: "1px solid ".concat(COLORS.greyDark),
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": true,
                        style: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: MENU_WIDTH + 60,
                            height: STATUS_HEIGHT,
                            background: COLORS.deepBlue,
                            clipPath: "polygon(0 0, 100% 0, calc(100% - ".concat(SLANT_OFFSET, "px) 100%, 0 100%)"),
                            pointerEvents: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: toggle,
                        "aria-label": "Open menu",
                        style: {
                            position: "absolute",
                            left: 40,
                            top: (STATUS_HEIGHT - 12 * 3 - 8 * 2) / 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            cursor: "pointer",
                            zIndex: Z_TOP,
                            background: "transparent",
                            border: "none",
                            padding: 0
                        },
                        children: [
                            0,
                            1,
                            2
                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 125,
                                    height: 8,
                                    background: COLORS.orange,
                                    borderRadius: 2,
                                    display: "block"
                                }
                            }, i, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingLeft: MENU_WIDTH + 16,
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "0 24px",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    color: online ? "#10b981" : "#ef4444"
                                },
                                children: online ? "Online" : "Offline"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "0 24px",
                                    fontSize: 36,
                                    fontWeight: 800
                                },
                                children: pliStatus != null ? (_PLI_STATUS_pliStatus_label = (_PLI_STATUS_pliStatus = PLI_STATUS[pliStatus]) === null || _PLI_STATUS_pliStatus === void 0 ? void 0 : _PLI_STATUS_pliStatus.label) !== null && _PLI_STATUS_pliStatus_label !== void 0 ? _PLI_STATUS_pliStatus_label : "UNKNOWN" : "UNKNOWN"
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this),
                    fields.map((param, idx)=>{
                        let [label, unit, text] = param;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "0 24px",
                                borderLeft: "1px solid ".concat(COLORS.greyDark),
                                marginLeft: idx === 0 ? 16 : 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 700
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StatusBar.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 140,
                                        height: 40,
                                        background: COLORS.fieldBg,
                                        border: "1px solid ".concat(COLORS.greyDark),
                                        borderRadius: 4,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        padding: "0 12px",
                                        fontSize: 20,
                                        fontWeight: 800,
                                        color: COLORS.textDark
                                    },
                                    title: "".concat(label, " ").concat(unit),
                                    children: text
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StatusBar.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 700
                                    },
                                    children: unit
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StatusBar.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/src/components/StatusBar.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto",
                            paddingRight: 24
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Refresh",
                            onClick: ()=>void doRefresh().catch(()=>{}),
                            style: {
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: COLORS.deepBlue,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                cursor: "pointer"
                            },
                            title: "Rafraîchir maintenant",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                style: {
                                    color: "white"
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/StatusBar.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatusBar.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            mounted && open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Portal, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>setOpen(false),
                        "aria-hidden": true,
                        style: {
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.001)",
                            zIndex: Z_TOP - 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 364,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        role: "dialog",
                        "aria-label": "Navigation",
                        style: {
                            position: "fixed",
                            top: headerHeight + STATUS_HEIGHT,
                            left: 0,
                            bottom: 0,
                            width: MENU_WIDTH,
                            background: COLORS.deepBlue,
                            zIndex: Z_TOP,
                            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
                            display: "flex",
                            flexDirection: "column",
                            borderRight: "4px solid rgba(0,0,0,0.15)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                style: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                    padding: "4px 0 8px 0"
                                },
                                children: [
                                    {
                                        href: "/control",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__["Handshake"],
                                        label: "CONTROL"
                                    },
                                    {
                                        href: "/dashboard",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"],
                                        label: "DASHBOARD"
                                    },
                                    {
                                        href: "/events",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
                                        label: "EVENTS"
                                    },
                                    {
                                        href: "/data",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"],
                                        label: "DATA"
                                    },
                                    {
                                        href: "/recipe",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"],
                                        label: "RECIPE"
                                    },
                                    {
                                        href: "/settings",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"],
                                        label: "SETTINGS"
                                    }
                                ].map((item, idx)=>{
                                    const Icon = item.icon;
                                    const isFirst = idx === 0;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        ref: isFirst ? firstLinkRef : undefined,
                                        href: item.href,
                                        "aria-label": item.label,
                                        onClick: ()=>setOpen(false),
                                        style: {
                                            position: "relative",
                                            textDecoration: "none",
                                            color: "#fff",
                                            height: ITEM_HEIGHT,
                                            display: "grid",
                                            placeItems: "center",
                                            outline: "none"
                                        },
                                        children: [
                                            idx > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 16,
                                                    right: 16,
                                                    height: 1,
                                                    background: "rgba(255,255,255,0.25)"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/StatusBar.tsx",
                                                lineNumber: 430,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 60,
                                                    color: "#FFFFFF"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/StatusBar.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/StatusBar.tsx",
                                                lineNumber: 441,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/src/components/StatusBar.tsx",
                                        lineNumber: 413,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 393,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "8px 12px 12px 12px",
                                    display: "flex",
                                    justifyContent: "flex-end"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpen(false),
                                    "aria-label": "Close menu",
                                    style: {
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 8
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        color: "#fff"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/StatusBar.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/StatusBar.tsx",
                                    lineNumber: 464,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/StatusBar.tsx",
                                lineNumber: 457,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/StatusBar.tsx",
                        lineNumber: 376,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/StatusBar.tsx",
                lineNumber: 362,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/StatusBar.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_s2(StatusBar, "p/EPk0nADpdTWUpzc+rJJd23bsg=", false, function() {
    return [
        useMounted,
        useBodyScrollLock
    ];
});
_c1 = StatusBar;
var _c, _c1;
__turbopack_context__.k.register(_c, "Portal");
__turbopack_context__.k.register(_c1, "StatusBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_f18213a4._.js.map