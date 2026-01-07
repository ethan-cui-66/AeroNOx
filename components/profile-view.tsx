"use client"

import { userData, devices, riskStatus } from "@/lib/dummy-data"
import { User, Calendar, Activity, ChevronRight, LogOut, HelpCircle, FileText, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProfileView() {
  const connectedDevices = devices.filter((d) => d.isConnected).length

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="text-center py-4">
        <div className="relative inline-block mb-3">
          <div className="w-20 h-20 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <User className="w-10 h-10 text-zinc-400" />
          </div>
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-2 border-zinc-900 flex items-center justify-center",
              riskStatus === "safe" ? "bg-emerald-500" : "bg-red-500",
            )}
          >
            <span className="text-[10px] text-white">✓</span>
          </div>
        </div>
        <h2 className="text-xl font-medium text-zinc-100">{userData.name}</h2>
        <p className="text-sm text-zinc-500">Member</p>
      </div>

      {/* Days without attack */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10">
            <Heart className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-base font-medium text-zinc-100">{userData.daysSinceAttack} days without an attack</p>
            <p className="text-sm text-zinc-500">
              {userData.daysSinceAttack > 30
                ? "Great progress - keep it up"
                : userData.daysSinceAttack > 7
                  ? "Good progress"
                  : "Stay consistent with monitoring"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-center">
          <Calendar className="w-4 h-4 mx-auto mb-2 text-zinc-500" />
          <p className="text-xl font-semibold text-zinc-100">127</p>
          <p className="text-xs text-zinc-500 mt-0.5">Days Monitored</p>
        </div>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-center">
          <Activity className="w-4 h-4 mx-auto mb-2 text-zinc-500" />
          <p className="text-xl font-semibold text-zinc-100">{connectedDevices}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Devices</p>
        </div>
      </div>

      {/* Menu */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800">
        {[
          { icon: FileText, label: "Health History", description: "Past readings" },
          { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-800">
                <item.icon className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-zinc-200">{item.label}</p>
                <p className="text-xs text-zinc-500">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full h-11 rounded-lg border-zinc-800 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 bg-transparent"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>

      <p className="text-center text-xs text-zinc-600">NitroSense v2.1.0</p>
    </div>
  )
}
