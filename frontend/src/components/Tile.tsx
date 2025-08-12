"use client";
import Link from "next/link";
import { ReactNode, cloneElement, isValidElement } from "react";
import clsx from "clsx";

interface TileProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function Tile({ href, icon, label }: TileProps) {
  // icône blanche 64 px
  const Icon = isValidElement(icon)
    ? cloneElement(icon, { className: "w-16 h-16 text-white", strokeWidth: 1.5 })
    : icon;

  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-col items-center justify-center gap-4",
        "w-60 h-60 rounded-md text-white text-xl font-semibold",
        // ⬇️ fond bleu nuit explicite
        "bg-[#071039] hover:ring-4 hover:ring-[#ff6600] hover:scale-[1.03] transition"
      )}
    >
      {Icon}
      {label.toUpperCase()}
    </Link>
  );
}
