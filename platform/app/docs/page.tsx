import { FadeInView } from "@/components/shared/FadeInView"

export default function DocsLandingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <FadeInView>
        <h1 className="text-4xl font-bold mb-6">Documentation Portal</h1>
        <p className="text-xl text-white/60 mb-8 leading-relaxed">
          Welcome to the Smart City 2026 unified documentation portal. Here you will find the comprehensive thesis chapters and implementation details for every subsystem.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12 not-prose">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Core Modules</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Explore the technical implementation, Edge AI models, and hardware specifications for the primary physical nodes.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">Subsystems</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Dive into the architecture of the centralized control dashboard and the physical maquette foundation.
            </p>
          </div>
        </div>
      </FadeInView>
    </div>
  )
}
