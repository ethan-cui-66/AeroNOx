"use client"

import { Home, Cpu, TrendingUp, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: "dashboard" | "devices" | "trends" | "settings" | "profile"
  onTabChange: (tab: "dashboard" | "devices" | "trends" | "settings" | "profile") => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "dashboard" as const, icon: Home, label: "Home" },
    { id: "trends" as const, icon: TrendingUp, label: "Trends" },
    { id: "devices" as const, icon: Cpu, label: "Devices" },
    { id: "settings" as const, icon: Settings, label: "Settings" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent">
      <div className="max-w-md mx-auto bg-zinc-900 rounded-xl border border-zinc-800 p-1.5">
        <div className="flex justify-around items-center">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200",
                activeTab === id ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
