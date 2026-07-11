import { Module } from "@/data/modules"
import { TechBadgeList } from "./TechBadgeList"
import { FadeInView } from "@/components/shared/FadeInView"

export function ModuleHero({ module }: { module: Module }) {
  return (
    <div className="relative border-b border-[rgba(255,255,255,0.06)] bg-[#0A0B0E]/50 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="container relative z-10 mx-auto px-4 max-w-5xl text-center flex flex-col items-center">
        <FadeInView>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{module.title}</h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
            {module.summary}
          </p>
          <TechBadgeList stack={module.stack} />
        </FadeInView>
      </div>
    </div>
  )
}
