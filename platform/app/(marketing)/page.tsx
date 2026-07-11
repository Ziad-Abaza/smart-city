import { Hero } from "@/components/home/Hero"
import { StatsStrip } from "@/components/home/StatsStrip"
import { FeaturedModules } from "@/components/home/FeaturedModules"
import { LatestAchievements } from "@/components/home/LatestAchievements"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsStrip />
      <FeaturedModules />
      <LatestAchievements />
    </div>
  )
}
