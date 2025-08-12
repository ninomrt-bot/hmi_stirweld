"use client";
import dynamic from "next/dynamic";
const ReactSpeedometer = dynamic(() => import("react-d3-speedometer"), { ssr: false });

export function Gauge({ value, max = 50, label }: { value: number; max?: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <ReactSpeedometer
        value={value}
        maxValue={max}
        height={160}
        width={200}
        ringWidth={30}
        needleColor="#ff6600"
        startColor="#071039"
        endColor="#ff6600"
        textColor="#071039"
        forceRender
      />
      <span className="font-semibold">{label}: {value}</span>
    </div>
  );
}
