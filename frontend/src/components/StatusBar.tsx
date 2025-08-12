"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Handshake, Gauge, Bell, LineChart, List, Settings2, RotateCcw, X,
} from "lucide-react";

/* ===== Thème & constantes ===== */
const COLORS = {
  deepBlue: "#0f143b",
  grey: "#d5d7dd",
  greyDark: "#c8cad1",
  orange: "#ff6600",
  textDark: "#0b1235",
  fieldBg: "#f5f6f8",
};

const Z_TOP = 2147483647;
const STATUS_HEIGHT = 100;
const MENU_WIDTH = 200;
const ITEM_HEIGHT = 150;
const SLANT_OFFSET = 60;

/* ===== Backend & mapping PLC ===== */
const API = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3001";

/** Variables affichées dans la barre (ordre F/TT/RS/ZP) */
type PlcKey = "F" | "TT" | "RS" | "ZP";
type PlcItem = {
  key: PlcKey;
  name: string;
  type: "REAL" | "UDINT" | "INT" | "BOOL";
  scale?: number;
  decimals?: number;
  unit: string;
};

const PLC_ITEMS: PlcItem[] = [
  { key: "F",  name: "GVL_Public.g_force",           type: "REAL",  scale: 1/1000, decimals: 2, unit: "kN"  }, // N -> kN
  { key: "TT", name: "GVL_Public.g_tool_temp",       type: "REAL",  scale: 1,      decimals: 1, unit: "°C"  },
  { key: "RS", name: "GVL_Public.g_rotation_speed",  type: "UDINT", scale: 1,      decimals: 0, unit: "RPM" },
  { key: "ZP", name: "GVL_Public.g_ZPos",            type: "REAL",  scale: 1,      decimals: 2, unit: "mm"  },
];

/** Statut PLI (équivalent à ton SwitchCase TwinCAT) */
const PLI_STATUS: Record<number, { label: string; bg: string; fg?: string }> = {
  1:  { label: "IDLE",    bg: "#e5e7eb", fg: "#111827" },
  2:  { label: "RUNNING", bg: "#d1fae5", fg: "#065f46" },
  5:  { label: "HELD",    bg: "#fffbeb", fg: "#92400e" },
  11: { label: "LOCKED",  bg: "#fee2e2", fg: "#991b1b" },
};
const PLI_DEFAULT = { label: "UNKNOWN", bg: "#f3f4f6", fg: "#374151" };

/* ===== Utils ===== */
function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
function Portal({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
}
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = locked ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
const fmt = (v: number | null | undefined, d = 1) =>
  v == null || Number.isNaN(v) ? "—" : v.toFixed(d);

/* ===== Composant ===== */
export type StatusBarProps = {
  headerHeight?: number;
  title?: string;
};

export default function StatusBar({
  headerHeight = 64,
  title = "Textblock",
}: StatusBarProps) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  useBodyScrollLock(open);

  // valeurs live affichées
  const [vals, setVals] = useState<Record<PlcKey, number | null>>({
    F: null, TT: null, RS: null, ZP: null,
  });
  const [online, setOnline] = useState<boolean>(false);
  const [pliStatus, setPliStatus] = useState<number | null>(null);

  // ===== REFRESH: read-many puis fallback read-one =====
  const doRefresh = useCallback(async () => {
    // 1) read-many
    try {
      const body = {
        items: [
          { name: "GVL_Public.g_force",          type: "REAL"  },
          { name: "GVL_Public.g_tool_temp",      type: "REAL"  },
          { name: "GVL_Public.g_rotation_speed", type: "UDINT" },
          { name: "GVL_Public.g_ZPos",           type: "REAL"  },
          { name: "MAIN.PLI.Status",             type: "INT"   },
        ],
      };
      const r = await fetch(`${API}/api/read-many`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error(`read-many HTTP ${r.status}`);
      const data = await r.json();

      const get = (name: string) =>
        Number(data?.results?.find((x: any) => x?.name === name)?.value);

      const f  = get("GVL_Public.g_force");
      const tt = get("GVL_Public.g_tool_temp");
      const rs = get("GVL_Public.g_rotation_speed");
      const zp = get("GVL_Public.g_ZPos");
      const st = get("MAIN.PLI.Status");

      setVals({
        F:  Number.isFinite(f)  ? f / 1000 : null, // N -> kN
        TT: Number.isFinite(tt) ? tt       : null,
        RS: Number.isFinite(rs) ? rs       : null,
        ZP: Number.isFinite(zp) ? zp       : null,
      });
      setPliStatus(Number.isFinite(st) ? st : null);
      setOnline(true);
      return;
    } catch {
      // passe au fallback
    }

    // 2) fallback: lectures individuelles
    try {
      const readOne = async (name: string, type: string) => {
        const u = `${API}/api/read?name=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}`;
        const r = await fetch(u, { cache: "no-store" });
        if (!r.ok) throw new Error(`read ${name} HTTP ${r.status}`);
        const d = await r.json();
        return Number(d?.value);
      };

      const [f, tt, rs, zp, st] = await Promise.all([
        readOne("GVL_Public.g_force",          "REAL"),
        readOne("GVL_Public.g_tool_temp",      "REAL"),
        readOne("GVL_Public.g_rotation_speed", "UDINT"),
        readOne("GVL_Public.g_ZPos",           "REAL"),
        readOne("MAIN.PLI.Status",             "INT"),
      ]);

      setVals({
        F:  Number.isFinite(f)  ? f / 1000 : null,
        TT: Number.isFinite(tt) ? tt       : null,
        RS: Number.isFinite(rs) ? rs       : null,
        ZP: Number.isFinite(zp) ? zp       : null,
      });
      setPliStatus(Number.isFinite(st) ? st : null);
      setOnline(true);
    } catch {
      setOnline(false);
    }
  }, []);

  // ===== Polling: 200ms (visible) / 1000ms (onglet caché) =====
  useEffect(() => {
    let stop = false;
    let t: ReturnType<typeof setTimeout> | null = null;
    const tick = async () => {
      try { await doRefresh(); } catch { setOnline(false); }
      if (!stop) t = setTimeout(tick, document.hidden ? 1000 : 200);
    };
    tick();
    return () => { stop = true; if (t) clearTimeout(t); };
  }, [doRefresh]);

  // ===== ESC pour fermer le menu =====
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = useCallback(() => setOpen(v => !v), []);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstLinkRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  // rendu des 4 champs dans l'ordre F/TT/RS/ZP
  const fields = useMemo(() => {
    const map: Record<PlcKey, { value: number | null; unit: string; decimals: number }> = {
      F:  { value: vals.F,  unit: "kN",  decimals: 2 },
      TT: { value: vals.TT, unit: "°C", decimals: 1 },
      RS: { value: vals.RS, unit: "RPM", decimals: 0 },
      ZP: { value: vals.ZP, unit: "mm", decimals: 2 },
    };
    return [
      ["F",  map.F.unit,  fmt(map.F.value,  map.F.decimals)],
      ["TT", map.TT.unit, fmt(map.TT.value, map.TT.decimals)],
      ["RS", map.RS.unit, fmt(map.RS.value, map.RS.decimals)],
      ["ZP", map.ZP.unit, fmt(map.ZP.value, map.ZP.decimals)],
    ] as const;
  }, [vals]);

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      {/* ===== Barre de statut ===== */}
      <div
        style={{
          height: STATUS_HEIGHT,
          background: COLORS.grey,
          color: COLORS.textDark,
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderTop: `1px solid ${COLORS.greyDark}`,
          overflow: "hidden",
        }}
      >
        {/* Trapèze bleu */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: MENU_WIDTH + 60,
            height: STATUS_HEIGHT,
            background: COLORS.deepBlue,
            clipPath: `polygon(0 0, 100% 0, calc(100% - ${SLANT_OFFSET}px) 100%, 0 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* Burger */}
        <button
          onClick={toggle}
          aria-label="Open menu"
          style={{
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
            padding: 0,
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                width: 125,
                height: 8,
                background: COLORS.orange,
                borderRadius: 2,
                display: "block",
              }}
            />
          ))}
        </button>

        {/* Online/Offline + Titre + Pavé statut PLI */}
        <div
          style={{
            paddingLeft: MENU_WIDTH + 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ padding: "0 24px", fontSize: 18, fontWeight: 700, color: online ? "#10b981" : "#ef4444" }}>
            {online ? "Online" : "Offline"}
          </div>

            <div style={{ padding: "0 24px", fontSize: 36, fontWeight: 800 }}>
            {(pliStatus != null ? (PLI_STATUS[pliStatus]?.label ?? "UNKNOWN") : "UNKNOWN")}
            </div>


        
        </div>

        {/* Champs valeurs (F / TT / RS / ZP) */}
        {fields.map(([label, unit, text], idx) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 24px",
              borderLeft: `1px solid ${COLORS.greyDark}`,
              marginLeft: idx === 0 ? 16 : 0,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700 }}>{label}</span>
            <div
              style={{
                width: 140,
                height: 40,
                background: COLORS.fieldBg,
                border: `1px solid ${COLORS.greyDark}`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 12px",
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.textDark,
              }}
              title={`${label} ${unit}`}
            >
              {text}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{unit}</span>
          </div>
        ))}

        {/* Refresh manuel */}
        <div style={{ marginLeft: "auto", paddingRight: 24 }}>
          <button
            aria-label="Refresh"
            onClick={() => void doRefresh().catch(()=>{})}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: COLORS.deepBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
            title="Rafraîchir maintenant"
          >
            <RotateCcw style={{ color: "white" }} />
          </button>
        </div>
      </div>

      {/* ===== Menu latéral ===== */}
      {mounted && open && (
        <Portal>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            aria-hidden
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.001)",
              zIndex: Z_TOP - 1,
            }}
          />

          {/* Aside aligné à la barre */}
          <aside
            role="dialog"
            aria-label="Navigation"
            style={{
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
              borderRight: "4px solid rgba(0,0,0,0.15)",
            }}
          >
            <nav
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                padding: "4px 0 8px 0",
              }}
            >
              {[
                { href: "/control", icon: Handshake, label: "CONTROL" },
                { href: "/dashboard", icon: Gauge, label: "DASHBOARD" },
                { href: "/events", icon: Bell, label: "EVENTS" },
                { href: "/data", icon: LineChart, label: "DATA" },
                { href: "/recipe", icon: List, label: "RECIPE" },
                { href: "/settings", icon: Settings2, label: "SETTINGS" },
              ].map((item, idx) => {
                const Icon = item.icon;
                const isFirst = idx === 0;
                return (
                  <Link
                    ref={isFirst ? firstLinkRef : undefined}
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    onClick={() => setOpen(false)}
                    style={{
                      position: "relative",
                      textDecoration: "none",
                      color: "#fff",
                      height: ITEM_HEIGHT,
                      display: "grid",
                      placeItems: "center",
                      outline: "none",
                    }}
                  >
                    {idx > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 16,
                          right: 16,
                          height: 1,
                          background: "rgba(255,255,255,0.25)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={60} color="#FFFFFF" />
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div
              style={{
                padding: "8px 12px 12px 12px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 8 }}
              >
                <X color="#fff" />
              </button>
            </div>
          </aside>
        </Portal>
      )}
    </div>
  );
}
