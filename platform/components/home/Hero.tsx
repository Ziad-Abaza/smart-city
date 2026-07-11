"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_50%)]" />
      <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            System Live Overview
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Smart City <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">2026</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          An autonomous, integrated urban ecosystem. Explore the underlying architecture, live telemetry dashboard, and technical deep-dives of our six core modules.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
            <Link href="/control-center">Enter Control Center</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-white/10 hover:bg-white/5">
            <Link href="/modules">Explore Modules</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
