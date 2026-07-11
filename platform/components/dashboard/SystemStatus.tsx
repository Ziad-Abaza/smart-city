import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"
import { GlassPanel } from "@/components/ui/GlassPanel"

export function SystemStatus() {
  const subsystems = [
    { name: "Smart Car Edge AI", status: "online", load: "42%" },
    { name: "Home Automation Node", status: "online", load: "12%" },
    { name: "Parking CV System", status: "online", load: "78%" },
    { name: "Charging Grid MQTT", status: "offline", load: "--" },
    { name: "AI Assistant API", status: "online", load: "21%" }
  ]

  return (
    <GlassPanel className="p-5 h-full relative group">
      <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-3">Subsystem Status</h3>
      
      <div className="space-y-4">
        {subsystems.map((sys, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${sys.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm text-white/80">{sys.name}</span>
            </div>
            <div className="text-xs font-mono text-white/40">
              {sys.load}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <PlaceholderNotice />
      </div>
    </GlassPanel>
  )
}
