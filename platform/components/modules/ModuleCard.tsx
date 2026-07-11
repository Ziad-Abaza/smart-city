import { Module } from "@/data/modules"
import { GlassPanel } from "@/components/ui/GlassPanel"
import Link from "next/link"
import { Box } from "lucide-react"

export function ModuleCard({ module }: { module: Module }) {
  return (
    <Link href={`/modules/${module.id}`}>
      <GlassPanel className="h-full p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">{module.title}</h3>
          {module.has3DModel && (
            <span className="flex items-center text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wider">
              <Box className="w-3 h-3 mr-1" /> 3D
            </span>
          )}
        </div>
        <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
          {module.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {module.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[11px] bg-white/5 border border-white/10 px-2 py-1 rounded text-white/70">
              {tech}
            </span>
          ))}
        </div>
      </GlassPanel>
    </Link>
  )
}
