import { FadeInView } from "@/components/shared/FadeInView"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { Button } from "@/components/ui/Button"
import { getModules } from "@/lib/api/modules"
import Link from "next/link"
import { ArrowRight, Box } from "lucide-react"

export async function FeaturedModules() {
  const allModules = await getModules()
  // Filter out the non-technical subsystems for the featured section if needed
  const featured = allModules.filter(m => m.id !== 'physical-maquette' && m.id !== 'web-platform').slice(0, 4)

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeInView>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Core Systems</h2>
              <p className="text-white/60 max-w-xl">
                Explore the independent, scalable technical modules that compose the autonomous city framework.
              </p>
            </div>
            <Button asChild variant="link" className="text-cyan-400 mt-4 md:mt-0 p-0 hover:no-underline hover:text-cyan-300">
              <Link href="/modules" className="flex items-center gap-2">
                View All Modules <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((mod, i) => (
            <FadeInView key={mod.id} delay={i * 0.1}>
              <Link href={`/modules/${mod.id}`}>
                <GlassPanel className="h-full p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-cyan-500/30 group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold group-hover:text-cyan-400 transition-colors">{mod.title}</h3>
                    {mod.has3DModel && (
                      <span className="flex items-center text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/20">
                        <Box className="w-3 h-3 mr-1" /> 3D
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {mod.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mod.stack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </Link>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
