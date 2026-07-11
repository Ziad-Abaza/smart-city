import { ModelViewer } from "@/components/3d/ModelViewer"
import { FadeInView } from "@/components/shared/FadeInView"
import { getModuleById } from "@/lib/api/modules"

export default async function Viewer3DPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const modelId = typeof searchParams.model === 'string' ? searchParams.model : undefined
  const moduleInfo = modelId ? await getModuleById(modelId) : null

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <FadeInView>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Digital Twin Viewer</h1>
          <p className="text-white/60">
            {moduleInfo 
              ? `Interactive 3D visualization for: ${moduleInfo.title}`
              : "Select a module to view its 3D digital twin representation."}
          </p>
        </div>
      </FadeInView>
      
      <FadeInView delay={0.1} className="w-full h-[70vh]">
        <ModelViewer modelId={modelId} />
      </FadeInView>
    </div>
  )
}
