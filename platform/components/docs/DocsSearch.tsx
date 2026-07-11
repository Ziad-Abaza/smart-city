import { Search } from "lucide-react"

export function DocsSearch() {
  return (
    <div className="relative w-full mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      <input 
        type="text" 
        placeholder="Search documentation... (stub)"
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
      />
    </div>
  )
}
