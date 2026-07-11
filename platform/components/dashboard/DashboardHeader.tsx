"use client"

import { useState, useEffect } from "react"
import { Bell, Activity, Wifi } from "lucide-react"

export function DashboardHeader() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Control Center</h1>
        <div className="flex items-center gap-4 text-sm text-white/50 mt-1">
          <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-green-400" /> All Node Connections Stable</span>
          <span className="hidden sm:inline-block border-l border-white/20 pl-4">{time}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-white/70" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors font-medium text-sm">
          <Activity className="w-4 h-4" /> System Health: 98%
        </button>
      </div>
    </header>
  )
}
