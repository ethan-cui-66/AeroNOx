"use client"

import { useState } from "react"
import { Bell, Moon, Shield, Smartphone, Volume2, Vibrate, Clock, User } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function SettingsView() {
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    vibration: true,
    nightMode: true,
    autoSync: true,
    emergencyAlerts: true,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const settingGroups = [
    {
      title: "Alerts",
      items: [
        {
          key: "notifications" as const,
          icon: Bell,
          label: "Push Notifications",
          description: "Receive alerts on your phone",
        },
        { key: "sounds" as const, icon: Volume2, label: "Sounds", description: "Play sounds for warnings" },
        { key: "vibration" as const, icon: Vibrate, label: "Vibration", description: "Haptic feedback" },
      ],
    },
    {
      title: "Device",
      items: [
        { key: "autoSync" as const, icon: Smartphone, label: "Auto Sync", description: "Sync every 5 minutes" },
        { key: "nightMode" as const, icon: Moon, label: "Night Monitoring", description: "Enhanced sleep monitoring" },
      ],
    },
    {
      title: "Safety",
      items: [
        {
          key: "emergencyAlerts" as const,
          icon: Shield,
          label: "Emergency Alerts",
          description: "Notify contacts when needed",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-zinc-100 mb-1">Settings</h2>
        <p className="text-sm text-zinc-500">Customize your experience</p>
      </div>

      {settingGroups.map((group) => (
        <div key={group.title} className="space-y-2">
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wide px-1">{group.title}</h3>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800">
            {group.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800">
                    <item.icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{item.label}</p>
                    <p className="text-xs text-zinc-500">{item.description}</p>
                  </div>
                </div>
                <Switch checked={settings[item.key]} onCheckedChange={() => toggleSetting(item.key)} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wide px-1">Quick Actions</h3>
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800">
          <button className="w-full flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors">
            <div className="p-2 rounded-lg bg-zinc-800">
              <Clock className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-zinc-200">View History</p>
              <p className="text-xs text-zinc-500">Past 30 days</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 p-4 hover:bg-zinc-800/50 transition-colors">
            <div className="p-2 rounded-lg bg-zinc-800">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-zinc-200">Emergency Contacts</p>
              <p className="text-xs text-zinc-500">Manage who gets notified</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
