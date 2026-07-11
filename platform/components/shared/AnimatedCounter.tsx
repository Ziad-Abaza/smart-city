"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

export function AnimatedCounter({ 
  value, 
  label, 
  duration = 2,
  suffix = ""
}: { 
  value: number, 
  label: string,
  duration?: number,
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / (duration * 1000)

        if (progress < 1) {
          setCount(Math.floor(value * progress))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/60 uppercase tracking-widest">{label}</div>
    </div>
  )
}
