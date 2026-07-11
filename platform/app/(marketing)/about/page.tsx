import { FadeInView } from "@/components/shared/FadeInView"
import { GlassPanel } from "@/components/ui/GlassPanel"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <FadeInView>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Smart City 2026</h1>
          <p className="text-xl text-white/60">
            A centralized approach to modern urban automation, integrating diverse technologies into a unified ecosystem.
          </p>
        </div>
      </FadeInView>

      <div className="space-y-12">
        <FadeInView delay={0.1}>
          <GlassPanel className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Vision & Architecture</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Smart City 2026 represents a paradigm shift in autonomous urban environments. 
                Instead of isolated smart systems, this project proposes a completely centralized command and control architecture where vehicles, homes, parking infrastructure, and charging stations communicate cohesively.
              </p>
              <p>
                The foundation of this architecture relies on robust physical nodes—represented by our comprehensive physical maquette—bridged to a digital twin interface. This Web Platform acts as the singular pane of glass for monitoring telemetry across all six core modules.
              </p>
            </div>
          </GlassPanel>
        </FadeInView>

        <FadeInView delay={0.2}>
          <GlassPanel className="p-8">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Core Objectives</h2>
            <ul className="space-y-4 text-white/70 list-disc pl-5 marker:text-indigo-400">
              <li>
                <strong className="text-white">Seamless Telemetry Integration:</strong> Establish a continuous data pipeline from physical sensors (ESP32, Raspberry Pi) to the centralized dashboard.
              </li>
              <li>
                <strong className="text-white">Autonomous Decision Making:</strong> Implement Edge AI using YOLO and Deep Learning models for localized decision making in parking and navigation.
              </li>
              <li>
                <strong className="text-white">Intuitive Interaction:</strong> Leverage RAG-based AI Assistants and Voice Recognition for frictionless human-city interaction.
              </li>
              <li>
                <strong className="text-white">Scalable Infrastructure:</strong> Design a modular architecture allowing the addition of new smart nodes without re-engineering the central platform.
              </li>
            </ul>
          </GlassPanel>
        </FadeInView>
      </div>
    </div>
  )
}
