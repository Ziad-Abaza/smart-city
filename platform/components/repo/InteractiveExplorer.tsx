"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { GlassPanel } from "@/components/ui/GlassPanel"
import { GitBranch, Folder, FileCode, FileText, ExternalLink, Search, Star, GitFork, Eye } from "lucide-react"

interface Repo {
  name: string;
  slug: string;
  url: string;
  desc: string;
  fullReadme: string;
}

const MOCK_FILES = [
  { name: "src", type: "folder" },
  { name: "public", type: "folder" },
  { name: ".gitignore", type: "file" },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
]

export function InteractiveExplorer({ repositories }: { repositories: Repo[] }) {
  const [activeRepoIndex, setActiveRepoIndex] = useState(0)
  const activeRepo = repositories[activeRepoIndex]

  // Render the README directly
  const renderReadme = activeRepo.fullReadme

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[800px]">
      {/* Sidebar - Repo List */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <GlassPanel className="p-4 flex items-center gap-3">
          <Search className="w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search repositories..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30"
          />
        </GlassPanel>

        <GlassPanel className="flex-1 overflow-y-auto p-2 hide-scrollbar">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-2 mt-2">
            Repositories
          </div>
          {repositories.map((repo, i) => (
            <button
              key={repo.slug}
              onClick={() => setActiveRepoIndex(i)}
              className={`w-full text-left px-3 py-3 rounded-lg flex items-start gap-3 transition-colors ${activeRepoIndex === i ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5 border border-transparent'}`}
            >
              <GitBranch className={`w-5 h-5 mt-0.5 ${activeRepoIndex === i ? 'text-cyan-400' : 'text-white/50'}`} />
              <div>
                <div className={`font-medium ${activeRepoIndex === i ? 'text-cyan-400' : 'text-white/80'}`}>{repo.name}</div>
                <div className="text-xs text-white/40 truncate w-48 mt-1">{repo.desc}</div>
              </div>
            </button>
          ))}
        </GlassPanel>
      </div>

      {/* Main Content - Explorer View */}
      <GlassPanel className="lg:w-2/3 flex flex-col overflow-hidden">
        {/* Repo Header */}
        <div className="p-6 border-b border-white/10 bg-white/5">
          {/* Content Header & Actions */}
          <div className="p-6 sm:p-8 bg-cyan-950/20 border-b border-cyan-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {activeRepo.name}
              </h2>
              <a 
                href={activeRepo.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan-400/80 hover:text-cyan-300 transition-colors flex items-center gap-2 text-sm"
              >
                <GitBranch className="w-4 h-4" />
                {activeRepo.url.replace('https://github.com/', '')}
              </a>
            </div>
            
            {/* Action Buttons mimicking fetchRebos */}
            <div className="flex flex-wrap gap-3">
              <a 
                href={activeRepo.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <GitFork className="w-4 h-4" /> View on GitHub
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(activeRepo.url);
                  const btn = document.getElementById(`copy-btn`);
                  if (btn) {
                    btn.innerHTML = '<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg> Copied!</span>';
                    setTimeout(() => {
                      btn.innerHTML = '<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy URL</span>';
                    }, 2000);
                  }
                }}
                id="copy-btn"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Copy URL</span>
              </button>
              <a 
                href={`${activeRepo.url}/archive/refs/heads/main.zip`}
                className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Folder className="w-4 h-4" /> Download ZIP
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#06080A]">
          {/* File Tree Mock */}
          <div className="border border-white/10 rounded-lg overflow-hidden mb-8">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 text-xs font-mono flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <GitBranch className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="font-semibold text-white/80">main</span>
              <span className="text-white/40 ml-2">Latest commit af391b 2 days ago</span>
            </div>
            
            <div className="bg-black/20">
              {MOCK_FILES.map((file, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer text-sm">
                  {file.type === 'folder' ? <Folder className="w-4 h-4 text-cyan-500" /> : <FileCode className="w-4 h-4 text-white/50" />}
                  <span className={file.type === 'folder' ? 'text-cyan-100 font-medium' : 'text-white/70'}>{file.name}</span>
                  <span className="ml-auto text-xs text-white/30 font-mono">Update {file.name}</span>
                  <span className="text-xs text-white/30 font-mono w-20 text-right">2 days ago</span>
                </div>
              ))}
            </div>
          </div>

          {/* README Mock */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-[#0A0B0E]">
            <div className="bg-white/5 px-4 py-3 border-b border-white/10 text-xs font-semibold flex items-center gap-2 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-emerald-400" />
              README.md
            </div>
            <div className="p-8 prose prose-invert max-w-none prose-a:text-cyan-400 prose-img:rounded-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {renderReadme}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
