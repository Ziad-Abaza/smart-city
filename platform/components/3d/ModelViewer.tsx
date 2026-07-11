"use client"

import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"
import { Box } from "lucide-react"

export function ModelViewer({ modelId }: { modelId?: string }) {
  return (
    <div className="w-full h-full min-h-[600px] bg-[#0A0B0E] rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5" />
      
      <div className="z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
          <Box className="w-10 h-10 text-indigo-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">3D Digital Twin</h3>
        <p className="text-white/50 text-sm mb-6 text-center max-w-sm">
          WebGL visualization is currently in placeholder mode. The actual glTF rendering engine will be integrated in subsequent phases.
        </p>
        
        <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-xs text-white/40 font-mono">
          Model Source: {modelId ? `/3D Models/${modelId}.glb` : 'N/A'}
        </div>
      </div>

      <div className="absolute bottom-6 right-6">
        <PlaceholderNotice />
      </div>
    </div>
  )
}
