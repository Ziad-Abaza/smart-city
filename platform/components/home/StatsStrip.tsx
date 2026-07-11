import { AnimatedCounter } from "@/components/shared/AnimatedCounter"

export function StatsStrip() {
  return (
    <section className="py-20 border-y border-[rgba(255,255,255,0.06)] bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter value={6} label="Technical Modules" />
          <AnimatedCounter value={2} label="Interactive 3D Models" />
          <AnimatedCounter value={8} label="Research Chapters" />
          <AnimatedCounter value={100} suffix="%" label="Autonomous" />
        </div>
      </div>
    </section>
  )
}
