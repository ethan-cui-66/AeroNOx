"use client"

import { Bell, Wifi } from "lucide-react"
import type { RiskLevel, UserData } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

interface StatusHeaderProps {
  status: RiskLevel
  predictionWindow: string
  userData: UserData
}

export function StatusHeader({ status, predictionWindow, userData }: StatusHeaderProps) {
  const statusConfig = {
    safe: {
      label: "All Clear",
      color: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    monitoring: {
      label: "Monitoring",
      color: "text-amber-400",
      dot: "bg-amber-400",
    },
    "high-risk": {
      label: "Attention Needed",
      color: "text-red-400",
      dot: "bg-red-400",
    },
  }

  const config = statusConfig[status]

  return (
    <header className="space-y-4 mb-8">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">Welcome back</p>
          <h1 className="text-xl font-medium text-zinc-100">{userData.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors">
            <Wifi className="w-4 h-4 text-emerald-400" />
          </button>
          <button className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors relative">
            <Bell className="w-4 h-4 text-zinc-400" />
            {status === "high-risk" && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
        </div>
      </div>

      {/* Status row */}
      <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
        <div className="flex items-center gap-3">
          <span className={cn("w-2 h-2 rounded-full", config.dot)} />
          <div>
            <p className={cn("text-sm font-medium", config.color)}>{config.label}</p>
            <p className="text-xs text-zinc-500">{predictionWindow}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-300">{userData.daysSinceAttack} days</p>
          <p className="text-xs text-zinc-500">since last attack</p>
        </div>
      </div>
    </header>
  )
}
