// src/app/page.tsx – page d'accueil avec les 6 tuiles
//----------------------------------------------------
import { Tile } from "@/components/Tile";

import {
  Handshake,
  Gauge,
  Bell,
  List,
  LineChart,
  Settings2,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-12">
      {/* Grille de navigation principale */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <Tile href="/control"   icon={<Handshake size={64} />} label="Control" />
        <Tile href="/dashboard" icon={<Gauge     size={64} />} label="Dashboard" />
        <Tile href="/events"    icon={<Bell      size={64} />} label="Events" />
        <Tile href="/recipe"    icon={<List      size={64} />} label="Recipe" />
        <Tile href="/data"      icon={<LineChart size={64} />} label="Data" />
        <Tile href="/settings"  icon={<Settings2 size={64} />} label="Settings" />
      </div>
    </div>
  );
}
