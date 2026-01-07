"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: number | string
  unit?: string
  icon: ReactNode
  status?: "normal" | "warning" | "danger"
  trend?: number[]
  description?: string
}

export function MetricCard({ title, value, unit, icon, status = "normal", trend, description }: MetricCardProps) {
  const statusColors = {
    normal: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      bar: "bg-emerald-500",
    },
    warning: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      bar: "bg-amber-500",
    },
    danger: {
      text: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      bar: "bg-red-500",
    },
  }

  const colors = statusColors[status]

  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all duration-200 hover:bg-zinc-800/50",
        "bg-zinc-900/50 border-zinc-800",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{title}</span>
        <span className={cn("p-1.5 rounded-md", colors.bg, colors.text)}>{icon}</span>
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className={cn("text-2xl font-semibold", colors.text)}>{value}</span>
        {unit && <span className="text-sm text-zinc-500">{unit}</span>}
      </div>

      {description && <p className="text-xs text-zinc-500 mb-3">{description}</p>}

      {/* Mini trend line */}
      {trend && (
        <div className="flex items-end gap-0.5 h-6">
          {trend.map((val, i) => {
            const maxVal = Math.max(...trend)
            const height = (val / maxVal) * 100
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-sm transition-all duration-300",
                  i === trend.length - 1 ? colors.bar : "bg-zinc-700",
                )}
                style={{
                  height: `${Math.max(height, 8)}%`,
                  opacity: i === trend.length - 1 ? 1 : 0.4,
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
