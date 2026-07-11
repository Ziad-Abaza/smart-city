"use client"

import { useState } from "react"
import { Module } from "@/data/modules"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Box, FileText, FolderGit2, AlertCircle } from "lucide-react"

export function ModuleTabs({ module }: { module: Module }) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "media", label: "Media" },
    { id: "resources", label: "Resources" }
  ]

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <GlassPanel className="p-8 min-h-[400px]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-white/70 leading-relaxed">{module.summary}</p>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Detailed architecture and feature documentation is not yet available in this tab. Please view the full documentation resources.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Media Gallery</h2>
              {module.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {module.images.map((img, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`${module.title} image`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 italic">No media available for this module.</p>
              )}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Integration Resources</h2>
              
              <div className="grid gap-4">
                {module.has3DModel && (
                  <GlassPanel className="p-4 flex items-center justify-between border-indigo-500/30 bg-indigo-500/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        <Box className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-300">3D Digital Twin</h4>
                        <p className="text-sm text-white/50">Interactive glTF model viewer</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-300">
                      <Link href={`/viewer-3d?model=${module.id}`}>View Model</Link>
                    </Button>
                  </GlassPanel>
                )}

                {module.docsPaths.length > 0 && (
                  <GlassPanel className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-white/70">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Documentation</h4>
                        <p className="text-sm text-white/50">Technical specifications and thesis chapters</p>
                      </div>
                    </div>
                    <Button asChild variant="secondary">
                      <Link href={module.docsPaths[0]}>Read Docs</Link>
                    </Button>
                  </GlassPanel>
                )}

                {module.sourcePaths.length > 0 && (
                  <GlassPanel className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-white/70">
                        <FolderGit2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Source Code</h4>
                        <p className="text-sm text-white/50">Repository structure and implementation</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
                      <Link href={module.sourcePaths[0]}>Explore Code</Link>
                    </Button>
                  </GlassPanel>
                )}
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  )
}
