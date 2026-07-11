import { FadeInView } from "@/components/shared/FadeInView"
import { GlassPanel } from "@/components/ui/GlassPanel"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ResearchPage() {
  const chapters = [
    { title: "Hybrid Autonomous Navigation", chapter: "Ch.4", module: "Smart Car", link: "/docs/smart-car" },
    { title: "Smart Home Subsystem Architecture", chapter: "Ch.4", module: "Smart Home", link: "/docs/smart-home" },
    { title: "Wi-Fi RSSI-Based Localization", chapter: "Ch.5", module: "Indoor Localization", link: "/docs/indoor-localization" },
    { title: "BATU AI Assistant (RAG System)", chapter: "Ch.6", module: "AI Assistant", link: "/docs/chatbot" },
    { title: "AI-Driven Charging Station", chapter: "Ch.7", module: "Charging Area", link: "/docs/charging-area" },
    { title: "Computer Vision Smart Parking", chapter: "Ch.9", module: "Parking", link: "/docs/parking" },
    { title: "Physical Maquette Engineering", chapter: "Ch.9", module: "Physical Model", link: "/docs/design" },
    { title: "Centralized Web Platform", chapter: "Ch.11", module: "Control Center", link: "/docs/web-platform" },
  ]

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <FadeInView>
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Research & Methodology</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The theoretical foundation and academic research chapters driving the Smart City 2026 implementations.
          </p>
        </div>
      </FadeInView>

      <div className="space-y-6">
        {chapters.map((ch, i) => (
          <FadeInView key={i} delay={i * 0.1}>
            <Link href={ch.link}>
              <GlassPanel className="p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-cyan-500/50 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-cyan-300">{ch.chapter}</span>
                    <span className="text-sm text-white/50">{ch.module}</span>
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">{ch.title}</h2>
                </div>
                <div className="mt-4 md:mt-0 flex items-center text-sm text-cyan-500 font-medium">
                  Read Chapter <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassPanel>
            </Link>
          </FadeInView>
        ))}
      </div>
    </div>
  )
}
