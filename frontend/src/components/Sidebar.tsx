// src/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { Gauge, Bell, Database, Settings2, Home, Book } from "lucide-react";

const menu = [
  { href: "/control",   label: "Control",   icon: <Home /> },
  { href: "/dashboard", label: "Dashboard", icon: <Gauge /> },
  { href: "/events",    label: "Events",    icon: <Bell  /> },
  { href: "/recipe",    label: "Recipe",    icon: <Book  /> },
  { href: "/data",      label: "Data",      icon: <Database /> },
  { href: "/settings",  label: "Settings",  icon: <Settings2 /> },
];

export function Sidebar() {
  return (
    <aside className="w-20 lg:w-56 bg-brand flex flex-col items-center py-4 text-white">
      {/* --- LOGO CLIQUABLE --- */}
      <Link href="/" className="mb-8 flex items-center justify-center">
        <img
          src="/logo_stirweld.png"
          alt="Stirweld logo"
          className="h-10 lg:h-12 hover:scale-105 transition"
        />
      </Link>

      {/* --- MENU --- */}
      <nav className="flex flex-col gap-6">
        {menu.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center lg:flex-row lg:gap-3"
          >
            {icon}
            <span className="hidden lg:block group-hover:text-brand-accent transition">
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
