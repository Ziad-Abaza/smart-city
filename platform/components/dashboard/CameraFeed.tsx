import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { Video } from "lucide-react"

export function CameraFeed({ title, id }: { title: string, id: string }) {
  return (
    <GlassPanel className="overflow-hidden flex flex-col group h-full">
      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-white/50" />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-white/40">LIVE</span>
        </div>
      </div>
      
      <div className="flex-1 relative bg-black flex items-center justify-center min-h-[200px]">
        {/* Placeholder for actual video feed */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="z-10 text-center">
          <div className="text-white/20 font-mono text-sm tracking-widest">FEED-{id}</div>
          <div className="text-white/30 text-xs mt-1">Awaiting RTSP Stream</div>
        </div>

        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <PlaceholderNotice />
        </div>
      </div>
    </GlassPanel>
  )
}
