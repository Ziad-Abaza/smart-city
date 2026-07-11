import { FadeInView } from "@/components/shared/FadeInView"
import { getGalleryImages } from "@/lib/api/gallery"
import { PlaceholderNotice } from "@/components/shared/PlaceholderNotice"

export default async function GalleryPage() {
  const images = await getGalleryImages()

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <FadeInView>
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Project Gallery</h1>
          <p className="text-xl text-white/60 max-w-2xl">
            A comprehensive visual record of the physical maquette, system interfaces, and operational components.
          </p>
        </div>
      </FadeInView>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <FadeInView key={img.id} delay={i * 0.1}>
            <div className="group relative aspect-square md:aspect-[4/3] overflow-hidden rounded-xl bg-white/5 border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white mb-2">{img.alt}</p>
                {img.isPlaceholder && <PlaceholderNotice />}
              </div>
            </div>
          </FadeInView>
        ))}
      </div>
    </div>
  )
}
