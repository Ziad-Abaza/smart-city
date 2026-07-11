import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { Map } from "lucide-react"

export function MapOverlay() {
  return (
    <GlassPanel className="h-full min-h-[300px] relative group overflow-hidden">
      <div className="absolute inset-0 bg-[#06080A]">
        {/* Placeholder styling for a map */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
        
        {/* Mock vehicles/nodes on map */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full" />
        
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-indigo-400 rounded-full" />
      </div>
      
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-md flex items-center gap-2">
        <Map className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-medium tracking-wide">LIVE MAQUETTE MAP</span>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <PlaceholderNotice />
      </div>
    </GlassPanel>
  )
}
