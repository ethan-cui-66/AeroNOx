"use client"

import { useState } from "react"
import { AlertTriangle, Phone, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmergencyButtonProps {
  visible: boolean
}

export function EmergencyButton({ visible }: EmergencyButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!visible) return null

  return (
    <div className="space-y-3">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full h-14 rounded-lg font-medium text-base transition-all duration-200",
          "bg-red-500 hover:bg-red-600 text-white",
        )}
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        View Emergency Plan
      </Button>

      {isExpanded && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-left">
            <div className="p-2 rounded-md bg-red-500/10">
              <Phone className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-sm font-medium text-zinc-200">Call Emergency Contact</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-left">
            <div className="p-2 rounded-md bg-amber-500/10">
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-zinc-200">Find Nearest Hospital</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-left">
            <div className="p-2 rounded-md bg-blue-500/10">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-zinc-200">View Action Steps</span>
          </button>
        </div>
      )}
    </div>
  )
}
