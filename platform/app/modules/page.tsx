import { getModules } from "@/lib/api/modules"
import { FadeInView } from "@/components/shared/FadeInView"
import { ModuleCard } from "@/components/modules/ModuleCard"

export default async function ModulesIndexPage() {
  const modules = await getModules()

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <FadeInView>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">System Modules</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Explore the scalable architecture of the Smart City ecosystem.
          </p>
        </div>
      </FadeInView>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <FadeInView key={mod.id} delay={i * 0.1}>
            <ModuleCard module={mod} />
          </FadeInView>
        ))}
      </div>
    </div>
  )
}
