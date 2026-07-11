import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer"
import { TableOfContents } from "@/components/docs/TableOfContents"

// Map slugs to their actual file paths in the repo
const docRoutes: Record<string, string> = {
  "smart-car": "../Data/smart-car.md",
  "smart-home": "../Data/smart-home.md",
  "indoor-localization": "../Data/Indoor-Localization.md",
  "parking": "../Data/parking.md",
  "charging-area": "../Data/charging-area.md",
  "chatbot": "../Data/chatbot.md",
  "design": "../Data/design.md",
  "web-platform": "../Data/web-platform.md"
}

export async function generateStaticParams() {
  return Object.keys(docRoutes).map((slug) => ({
    slug: [slug],
  }))
}

export default async function DocPage({ params }: { params: { slug: string[] } }) {
  const route = params.slug.join("/")
  const filePath = docRoutes[route]

  if (!filePath) {
    notFound()
  }

  const absolutePath = path.join(process.cwd(), filePath)
  
  let content = ""
  try {
    content = fs.readFileSync(absolutePath, "utf-8")
    // Escape curly braces that are not in codeblocks, or simply globally escape them
    // to prevent MDX from crashing when it encounters latex or JSON in plain markdown.
    content = content.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')
  } catch {
    content = `# ${route}\n\nDocumentation content not found on disk at \`${filePath}\`.`
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 relative">
      <div className="flex-1 min-w-0">
        <MarkdownRenderer source={content} />
      </div>
      
      <div className="hidden lg:block w-64 flex-shrink-0">
        <TableOfContents source={content} />
      </div>
    </div>
  )
}
