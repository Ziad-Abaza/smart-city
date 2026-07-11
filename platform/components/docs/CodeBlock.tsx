"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false)
  
  // Extract text content safely assuming `children.props.children` has the code string
  const isValidElement = typeof children === "object" && children !== null && "props" in children
  const codeString = isValidElement ? (children as React.ReactElement).props?.children : String(children || "")

  const onCopy = () => {
    navigator.clipboard.writeText(String(codeString))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-[#0A0B0E] my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="text-xs text-white/50 font-mono lowercase">
          {(isValidElement ? (children as React.ReactElement).props?.className?.replace('language-', '') : '') || 'text'}
        </div>
        <button 
          onClick={onCopy}
          className="text-white/50 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm text-white/80 font-mono">
        <pre {...props}>
          {children}
        </pre>
      </div>
    </div>
  )
}
