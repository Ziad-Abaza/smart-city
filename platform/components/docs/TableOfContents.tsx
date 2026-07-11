"use client"

import Link from "next/link"

export function TableOfContents({ source }: { source: string }) {
  // Simple regex to extract headings (H2 and H3 only)
  const headings = Array.from(source.matchAll(/^(##|###) (.*)$/gm)).map(match => ({
    level: match[1].length,
    text: match[2],
    id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }))

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24">
      <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">On this page</h4>
      <nav className="flex flex-col gap-2 border-l border-white/10">
        {headings.map((h, i) => (
          <Link 
            key={i} 
            href={`#${h.id}`}
            className={`text-sm hover:text-cyan-400 transition-colors ${
              h.level === 3 ? "pl-6 text-white/50" : "pl-4 text-white/70"
            }`}
          >
            {h.text}
          </Link>
        ))}
      </nav>
    </div>
  )
}
