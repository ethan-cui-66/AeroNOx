"use client"

import { useEffect, useState } from "react"
import type { RiskLevel } from "@/lib/dummy-data"

interface BreathHaloProps {
  status: RiskLevel
  fenoLevel: number
  inflammatoryScore: number
}

export function BreathHalo({ status, fenoLevel }: BreathHaloProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "safe":
        return {
          color: "#10b981",
          label: "Good",
          bgOpacity: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
        }
      case "monitoring":
        return {
          color: "#f59e0b",
          label: "Elevated",
          bgOpacity: "bg-amber-500/10",
          borderColor: "border-amber-500/30",
        }
      case "high-risk":
        return {
          color: "#ef4444",
          label: "High",
          bgOpacity: "bg-red-500/10",
          borderColor: "border-red-500/30",
        }
    }
  }

  const config = getStatusConfig()

  // Calculate percentage for the arc (max 100 ppb for visualization)
  const percentage = Math.min((fenoLevel / 100) * 100, 100)
  const circumference = 2 * Math.PI * 88
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Background circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Track */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
        {/* Progress arc */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={config.color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? strokeDashoffset : circumference}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>

      {/* Center content */}
      <div className="relative z-10 text-center">
        <div
          className="text-5xl font-semibold tracking-tight mb-1 transition-colors duration-500"
          style={{ color: config.color }}
        >
          {fenoLevel}
        </div>
        <div className="text-sm text-zinc-500 mb-3">Breath Health</div>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bgOpacity} ${config.borderColor} border`}
          style={{ color: config.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-subtle" style={{ backgroundColor: config.color }} />
          {config.label}
        </div>
      </div>
    </div>
  )
}
