import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"
import { GlassPanel } from "@/components/ui/GlassPanel"

interface TelemetryWidgetProps {
  title: string
  value: string | number
  unit: string
  trend?: string
  status?: "normal" | "warning" | "critical"
}

export function TelemetryWidget({ title, value, unit, trend, status = "normal" }: TelemetryWidgetProps) {
  const statusColors = {
    normal: "text-green-400",
    warning: "text-amber-400",
    critical: "text-red-400"
  }

  return (
    <GlassPanel className="p-5 relative group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-white/60">{title}</h4>
        <div className={`w-2 h-2 rounded-full ${statusColors[status] === "text-green-400" ? "bg-green-400" : statusColors[status] === "text-amber-400" ? "bg-amber-400" : "bg-red-400"}`} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        <span className="text-sm text-white/40">{unit}</span>
      </div>
      {trend && (
        <div className={`text-xs mt-2 ${statusColors[status]}`}>
          {trend}
        </div>
      )}
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <PlaceholderNotice />
      </div>
    </GlassPanel>
  )
}
