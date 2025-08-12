"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User2 } from "lucide-react";

export function Topbar() {
  const deepBlue = "#0b1235";

  // horloge live (anti-SSR mismatch avec suppressHydrationWarning)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Format FR + fuseau Paris
  const timeStr =
    now?.toLocaleTimeString("fr-FR", { hour12: false, timeZone: "Europe/Paris" }) ?? "";
  const dateStr =
    now?.toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" }) ?? "";

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        background: deepBlue,
        height: 75,
        padding: "0 16px",
        color: "#ffffff",
        position: "relative",
      }}
    >
      {/* Logo + version */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          {/* Place le fichier dans /public/logo-blanc.png */}
          <div
            style={{
              width: 150,
              height: 75,
              position: "relative",
            }}
            title="Stirweld"
          >
            <Image
              src="/logo-blanc.png"   
              alt="Stirweld"
              fill
              priority
              sizes="150px"
              style={{ objectFit: "contain" }}
              onError={(e) => {
                // fallback simple: masque l'image si introuvable
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </Link>
        <span style={{ fontWeight: 850, letterSpacing: 0.5 }}>V4 v3.0</span>
      </div>

      {/* Droite : heure/date + avatar + username */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ textAlign: "right", lineHeight: 1.1 }}>
          <div suppressHydrationWarning style={{ fontSize: 28, fontWeight: 900 }}>
            {timeStr}
          </div>
          <div suppressHydrationWarning style={{ fontSize: 22, fontWeight: 900 }}>
            {dateStr}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: deepBlue,
              fontWeight: 800,
            }}
            aria-label="User"
            title="Utilisateur"
          >
            <User2 />
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2 }}>_SystemUser</div>
        </div>
      </div>
    </header>
  );
}
