"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DocsSearch } from "./DocsSearch"

export function DocsSidebar() {
  const pathname = usePathname()
  
  const groups = [
    {
      title: "Core Modules",
      links: [
        { title: "Smart Car", href: "/docs/smart-car" },
        { title: "Smart Home", href: "/docs/smart-home" },
        { title: "Indoor Localization", href: "/docs/indoor-localization" },
        { title: "Smart Parking", href: "/docs/parking" },
        { title: "Charging Area", href: "/docs/charging-area" },
        { title: "AI Assistant", href: "/docs/chatbot" },
      ]
    },
    {
      title: "Subsystems",
      links: [
        { title: "Web Platform", href: "/docs/web-platform" },
        { title: "Physical Maquette", href: "/docs/design" },
      ]
    }
  ]

  return (
    <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto hide-scrollbar pr-4">
      <DocsSearch />
      
      <div className="space-y-8">
        {groups.map((group, i) => (
          <div key={i}>
            <h4 className="text-sm font-semibold text-white/50 mb-3 uppercase tracking-wider">{group.title}</h4>
            <div className="flex flex-col space-y-1">
              {group.links.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
