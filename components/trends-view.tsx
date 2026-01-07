"use client"

import { historicalData, currentSensorData } from "@/lib/dummy-data"
import { TrendingUp, TrendingDown, Minus, Wind, Thermometer, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export function TrendsView() {
  const getTrendIcon = (trend: number[]) => {
    const last = trend[trend.length - 1]
    const prev = trend[trend.length - 2]
    if (last > prev * 1.1) return <TrendingUp className="w-4 h-4 text-red-400" />
    if (last < prev * 0.9) return <TrendingDown className="w-4 h-4 text-emerald-400" />
    return <Minus className="w-4 h-4 text-zinc-500" />
  }

  const metrics = [
    {
      name: "Breath Health",
      value: currentSensorData.fenoLevel,
      unit: "",
      trend: historicalData.fenoTrend,
      icon: Activity,
      goodRange: "Under 25 is healthy",
      explanation:
        currentSensorData.fenoLevel < 25
          ? "Your breathing looks good"
          : currentSensorData.fenoLevel < 50
            ? "Slightly elevated - worth monitoring"
            : "Higher than usual - consider your inhaler",
    },
    {
      name: "Air Quality",
      value: currentSensorData.vocIndex,
      unit: "",
      trend: historicalData.vocTrend,
      icon: Wind,
      goodRange: "Under 50 is good",
      explanation:
        currentSensorData.vocIndex < 50
          ? "The air around you is clean"
          : currentSensorData.vocIndex < 70
            ? "Air quality is okay"
            : "Air quality is poor - consider moving",
    },
    {
      name: "Inflammation",
      value: currentSensorData.inflammatoryScore,
      unit: "%",
      trend: [10, 12, 14, 13, 15, 14, currentSensorData.inflammatoryScore],
      icon: Thermometer,
      goodRange: "Under 20% is normal",
      explanation:
        currentSensorData.inflammatoryScore < 20
          ? "Your lungs feel calm"
          : currentSensorData.inflammatoryScore < 50
            ? "Some activity detected"
            : "Higher activity - stay alert",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-zinc-100 mb-1">Your Trends</h2>
        <p className="text-sm text-zinc-500">Last 6 hours</p>
      </div>

      {metrics.map((metric) => {
        const maxVal = Math.max(...metric.trend)
        const isElevated = metric.trend[metric.trend.length - 1] > metric.trend[0] * 1.5

        return (
          <div key={metric.name} className="rounded-xl p-4 bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", isElevated ? "bg-red-500/10" : "bg-zinc-800")}>
                  <metric.icon className={cn("w-4 h-4", isElevated ? "text-red-400" : "text-zinc-400")} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-200">{metric.name}</h3>
                  <p className="text-xs text-zinc-500">{metric.goodRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(metric.trend)}
                <span className={cn("text-xl font-semibold", isElevated ? "text-red-400" : "text-zinc-100")}>
                  {metric.value}
                  {metric.unit && <span className="text-sm font-normal text-zinc-500 ml-0.5">{metric.unit}</span>}
                </span>
              </div>
            </div>

            <p
              className={cn(
                "text-sm mb-4 px-3 py-2 rounded-lg",
                isElevated ? "bg-red-500/10 text-red-300" : "bg-zinc-800 text-zinc-400",
              )}
            >
              {metric.explanation}
            </p>

            {/* Trend chart */}
            <div className="relative h-16">
              <svg className="w-full h-full" preserveAspectRatio="none">
                {[0, 50, 100].map((y) => (
                  <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#27272a" strokeWidth="1" />
                ))}

                <polyline
                  fill="none"
                  stroke={isElevated ? "#ef4444" : "#3b82f6"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={metric.trend
                    .map((val, i) => {
                      const x = (i / (metric.trend.length - 1)) * 100
                      const y = 100 - (val / maxVal) * 80
                      return `${x}%,${y}%`
                    })
                    .join(" ")}
                />

                <circle
                  cx="100%"
                  cy={`${100 - (metric.trend[metric.trend.length - 1] / maxVal) * 80}%`}
                  r="4"
                  fill={isElevated ? "#ef4444" : "#3b82f6"}
                />
              </svg>
            </div>

            <div className="flex justify-between mt-2 text-xs text-zinc-600">
              {historicalData.timestamps.map((time, i) => (
                <span key={i}>{time}</span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
