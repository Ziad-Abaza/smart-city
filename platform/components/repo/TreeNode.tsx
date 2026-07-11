"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Folder, File, FileCode, FileImage, FileText, Box } from "lucide-react"

export interface RepoNode {
  name: string
  path?: string
  type: string
  children?: RepoNode[]
}

export function TreeNode({ node, level = 0 }: { node: RepoNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(level < 1) // Auto-open root level
  
  const isDir = node.type === "directory"
  
  const getIcon = () => {
    if (isDir) return isOpen ? <Folder className="w-4 h-4 text-cyan-400" fill="currentColor" fillOpacity={0.2} /> : <Folder className="w-4 h-4 text-cyan-500" />
    if (node.name.endsWith(".tsx") || node.name.endsWith(".ts")) return <FileCode className="w-4 h-4 text-indigo-400" />
    if (node.name.endsWith(".md")) return <FileText className="w-4 h-4 text-emerald-400" />
    if (node.name.endsWith(".jpg") || node.name.endsWith(".png")) return <FileImage className="w-4 h-4 text-amber-400" />
    if (node.name.endsWith(".glb") || node.name.endsWith(".gltf")) return <Box className="w-4 h-4 text-pink-400" />
    return <File className="w-4 h-4 text-white/50" />
  }

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-1.5 px-2 hover:bg-white/5 cursor-pointer rounded-md transition-colors ${level === 0 ? "font-medium" : "text-sm text-white/80"}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => isDir && setIsOpen(!isOpen)}
      >
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          {isDir && (
            <button className="text-white/40 hover:text-white transition-colors">
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
        
        <div className="mr-2.5">
          {getIcon()}
        </div>
        
        <span className="truncate">{node.name}</span>
      </div>
      
      {isDir && isOpen && node.children && (
        <div>
          {node.children.map((child: RepoNode, i: number) => (
            <TreeNode key={`${child.path}-${i}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
