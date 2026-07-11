import { FadeInView } from "@/components/shared/FadeInView"
import { GitBranch } from "lucide-react"
import { InteractiveExplorer } from "@/components/repo/InteractiveExplorer"
import fs from "fs"
import path from "path"

async function getRepoData() {
  const dataDir = path.join(process.cwd(), "..", "Data")
  
  const repos = [
    { 
      name: "smart-home", slug: "smart-home", 
      url: "https://github.com/smart-city-batu/smart-home", 
      desc: "Core IoT integration and home automation interfaces.",
      fileName: "smart-home.md"
    },
    { 
      name: "batu-bot", slug: "batu-bot", 
      url: "https://github.com/smart-city-batu/batu-bot", 
      desc: "Conversational AI agent for smart city interaction.",
      fileName: "chatbot.md"
    },
    { 
      name: "indoor-localization", slug: "indoor-localization", 
      url: "https://github.com/smart-city-batu/indoor-localization", 
      desc: "RSSI-based edge computing positioning system.",
      fileName: "Indoor-Localization.md"
    },
    { 
      name: "charging-area", slug: "charging-area-using-yolo", 
      url: "https://github.com/smart-city-batu/charging-area-using-yolo", 
      desc: "YOLO-driven EV charging spot detection and allocation.",
      fileName: "charging-area.md"
    },
    { 
      name: "smart-parking", slug: "smart-parking-comp-vision", 
      url: "https://github.com/smart-city-batu/smart-parking-comp-vision", 
      desc: "Computer vision pipeline for automated parking management.",
      fileName: "parking.md"
    },
    { 
      name: "smart-car", slug: "smart-car", 
      url: "https://github.com/smart-city-batu/smart-car", 
      desc: "Autonomous vehicle navigation and sensory node.",
      fileName: "smart-car.md"
    },
  ]

  const fetchRepoDocs = repos.map(async (repo) => {
    let content = ""
    try {
      // 1. Try to fetch from GitHub API
      const res = await fetch(`https://api.github.com/repos/smart-city-batu/${repo.slug}/readme`, {
        next: { revalidate: 3600 } // Cache for 1 hour
      })
      
      if (res.ok) {
        const data = await res.json()
        // GitHub API returns base64 encoded content
        content = Buffer.from(data.content, 'base64').toString('utf-8')
      } else {
        throw new Error("GitHub API failed or repo is private")
      }
    } catch (apiError) {
      // 2. Fallback to local Data files if GitHub fetch fails
      try {
        content = fs.readFileSync(path.join(dataDir, repo.fileName), "utf-8")
      } catch (fsError) {
        content = "README content could not be loaded."
      }
    }
    return { ...repo, fullReadme: content }
  })

  return Promise.all(fetchRepoDocs)
}

export default async function RepoPage() {
  const repositories = await getRepoData()

  return (
    <div className="container mx-auto px-4 py-16 max-w-[1600px]">
      <FadeInView>
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4">
            <GitBranch className="w-10 h-10 text-cyan-400" /> Repository Explorer
          </h1>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            Explore the open-source GitHub repositories that power the Smart City 2026 infrastructure. Each module is developed as a standalone micro-system under the BATU organization.
          </p>
        </div>
      </FadeInView>

      <FadeInView delay={0.1}>
        <InteractiveExplorer repositories={repositories} />
      </FadeInView>
    </div>
  )
}
