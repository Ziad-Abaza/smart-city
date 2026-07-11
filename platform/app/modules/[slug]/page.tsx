import { getModuleById, getModules } from "@/lib/api/modules"
import { notFound } from "next/navigation"
import { ModuleHero } from "@/components/modules/ModuleHero"
import { ModuleTabs } from "@/components/modules/ModuleTabs"

export async function generateStaticParams() {
  const modules = await getModules()
  return modules.map((mod) => ({
    slug: mod.id,
  }))
}

export default async function ModuleDetailPage({ params }: { params: { slug: string } }) {
  const moduleData = await getModuleById(params.slug)
  
  if (!moduleData) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <ModuleHero module={moduleData} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <ModuleTabs module={moduleData} />
      </div>
    </div>
  )
}
