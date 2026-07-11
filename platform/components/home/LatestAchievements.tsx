import { FadeInView } from "@/components/shared/FadeInView"
import { getGalleryImages } from "@/lib/api/gallery"

export async function LatestAchievements() {
  const images = await getGalleryImages()
  // Just show 3 images to represent achievements/highlights
  const highlights = images.filter(img => !img.isPlaceholder).slice(0, 3)

  return (
    <section className="py-24 bg-[#0A0B0E]">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeInView>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Latest Project Highlights</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Visualizing the tangible milestones achieved across different subsystems of the smart city ecosystem.
            </p>
          </div>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <FadeInView key={item.id} delay={i * 0.15}>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-medium text-white">{item.alt}</p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
