import * as React from "react"
import { AlertCircle } from "lucide-react"

export function PlaceholderNotice({ text = "Demo Data" }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-400 border border-amber-500/20 border-dashed">
      <AlertCircle className="h-3 w-3" />
      <span>{text}</span>
    </div>
  )
}
