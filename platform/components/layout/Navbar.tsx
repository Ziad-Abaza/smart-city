import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(255,255,255,0.06)] bg-[#0A0B0E]/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold flex items-center space-x-2">
          <span>Smart City 2026</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
        <Link href="/modules" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Modules</Link>
        <Link href="/docs" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Documentation</Link>
        <Link href="/repo" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Repo Explorer</Link>
        <div className="h-4 w-px bg-white/20 mx-2" />
        <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
        <Link href="/research" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Research</Link>
        <Link href="/team" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Team</Link>
        <Link href="/gallery" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Gallery</Link>
      </div>
      </div>
    </header>
  )
}
