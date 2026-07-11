import * as React from "react"
import { cn } from "@/lib/utils/cn"

export function GlassPanel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,11,14,0.6)] backdrop-blur-md shadow-lg", className)} 
      {...props}
    >
      {children}
    </div>
  )
}
