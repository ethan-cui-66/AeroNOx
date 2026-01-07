"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Bluetooth,
  Battery,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DeviceInfo } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

interface DeviceCarouselProps {
  devices: DeviceInfo[]
  onCalibrate: (deviceId: string) => void
}

function Device3DViewer({ device }: { device: DeviceInfo }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 15, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    if (!autoRotate || isDragging) return
    const interval = setInterval(() => {
      setRotation((prev) => ({ ...prev, y: prev.y + 0.3 }))
    }, 30)
    return () => clearInterval(interval)
  }, [autoRotate, isDragging])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setStartPos({ x: e.clientX, y: e.clientY })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startPos.x
    const deltaY = e.clientY - startPos.y
    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }))
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setRotation({ x: 15, y: 0 })
    setAutoRotate(true)
  }

  const getDeviceShape = () => {
    const accentColor = device.isConnected ? "#3b82f6" : "#52525b"

    switch (device.type) {
      case "pendant":
        return (
          <div className="relative flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
            <svg width="160" height="60" className="absolute -top-8" style={{ transform: "translateZ(0px)" }}>
              <defs>
                <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#71717a" />
                  <stop offset="50%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#71717a" />
                </linearGradient>
              </defs>
              <path
                d="M 20 5 Q 80 50 140 5"
                fill="none"
                stroke="url(#chainGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[25, 45, 65, 85, 105, 125].map((x, i) => (
                <ellipse
                  key={i}
                  cx={x}
                  cy={5 + Math.sin((x - 20) * 0.026) * 40}
                  rx="4"
                  ry="2"
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="1.5"
                  style={{
                    transform: `rotate(${(x - 80) * 0.5}deg)`,
                    transformOrigin: `${x}px ${5 + Math.sin((x - 20) * 0.026) * 40}px`,
                  }}
                />
              ))}
            </svg>

            <div
              className="relative mt-12"
              style={{
                width: "72px",
                height: "90px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4"
                style={{
                  borderColor: "#a1a1aa",
                  background: "transparent",
                  transform: "translateZ(4px)",
                }}
              />

              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(165deg, #3f3f46 0%, #27272a 40%, #18181b 100%)`,
                  boxShadow: `
                    inset 2px 2px 4px rgba(255,255,255,0.1),
                    inset -2px -2px 4px rgba(0,0,0,0.3),
                    0 10px 40px rgba(0,0,0,0.5)
                  `,
                  border: `1px solid #52525b`,
                  transform: "translateZ(8px)",
                }}
              >
                <div
                  className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                  style={{
                    background: device.isConnected
                      ? `radial-gradient(circle at 30% 30%, #60a5fa, ${accentColor}, #1d4ed8)`
                      : `radial-gradient(circle at 30% 30%, #71717a, #52525b, #3f3f46)`,
                    boxShadow: device.isConnected ? `0 0 20px ${accentColor}, 0 0 40px ${accentColor}40` : "none",
                  }}
                />

                <div
                  className="absolute top-12 left-1/2 -translate-x-1/2 w-12 h-8 rounded-lg overflow-hidden"
                  style={{ background: "#18181b", border: "1px solid #3f3f46" }}
                >
                  <div className="grid grid-cols-6 grid-rows-4 gap-px p-1 h-full">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="rounded-full bg-zinc-700" />
                    ))}
                  </div>
                </div>

                <div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
                  style={{ background: device.isConnected ? accentColor : "#3f3f46" }}
                />
              </div>

              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(to right, #27272a, #18181b)`,
                  transform: "translateZ(0px)",
                }}
              />
            </div>
          </div>
        )

      case "patch":
        return (
          <div className="relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute"
              style={{
                width: "130px",
                height: "80px",
                borderRadius: "40px",
                background: "rgba(0,0,0,0.3)",
                filter: "blur(10px)",
                transform: "translateZ(-5px) translateY(10px)",
              }}
            />

            <div
              style={{
                width: "120px",
                height: "70px",
                borderRadius: "35px",
                transformStyle: "preserve-3d",
                position: "relative",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: "35px",
                  background: `linear-gradient(145deg, #d4d4d8, #a1a1aa)`,
                  transform: "translateZ(0px)",
                }}
              />

              <div
                className="absolute"
                style={{
                  top: "8px",
                  left: "8px",
                  right: "8px",
                  bottom: "8px",
                  borderRadius: "28px",
                  background: `linear-gradient(165deg, #3f3f46 0%, #27272a 50%, #18181b 100%)`,
                  boxShadow: `
                    inset 1px 1px 3px rgba(255,255,255,0.1),
                    inset -1px -1px 3px rgba(0,0,0,0.2)
                  `,
                  transform: "translateZ(3px)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: device.isConnected
                        ? `radial-gradient(circle at 30% 30%, #34d399, #10b981, #059669)`
                        : `radial-gradient(circle at 30% 30%, #71717a, #52525b)`,
                      boxShadow: device.isConnected ? `0 0 12px #10b98180` : "none",
                    }}
                  />

                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: device.isConnected
                        ? `radial-gradient(circle at 30% 30%, #60a5fa, ${accentColor}, #1d4ed8)`
                        : `radial-gradient(circle at 30% 30%, #71717a, #52525b, #3f3f46)`,
                      boxShadow: device.isConnected ? `0 0 20px ${accentColor}80, 0 0 40px ${accentColor}30` : "none",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white/30" />
                  </div>

                  <div
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: device.isConnected
                        ? `radial-gradient(circle at 30% 30%, #34d399, #10b981, #059669)`
                        : `radial-gradient(circle at 30% 30%, #71717a, #52525b)`,
                      boxShadow: device.isConnected ? `0 0 12px #10b98180` : "none",
                    }}
                  />
                </div>

                <svg className="absolute inset-0 w-full h-full opacity-20" style={{ transform: "translateZ(1px)" }}>
                  <line x1="20%" y1="50%" x2="35%" y2="50%" stroke="#60a5fa" strokeWidth="1" />
                  <line x1="65%" y1="50%" x2="80%" y2="50%" stroke="#60a5fa" strokeWidth="1" />
                </svg>
              </div>

              <div
                className="absolute"
                style={{
                  top: "8px",
                  left: "8px",
                  right: "8px",
                  bottom: "8px",
                  borderRadius: "28px",
                  background: `linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                  transform: "translateZ(4px)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        )

      case "band":
        return (
          <div className="relative flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="absolute"
              style={{
                width: "180px",
                height: "50px",
                borderRadius: "25px",
                background: "rgba(0,0,0,0.3)",
                filter: "blur(15px)",
                transform: "translateZ(-10px) translateY(15px)",
              }}
            />

            <div
              className="absolute"
              style={{
                left: "-40px",
                top: "50%",
                transform: "translateY(-50%) translateZ(0px)",
                width: "50px",
                height: "36px",
                borderRadius: "8px 0 0 8px",
                background: `linear-gradient(to bottom, #3f3f46, #27272a)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute h-px bg-zinc-600"
                  style={{ left: "8px", right: "4px", top: `${12 + i * 8}px` }}
                />
              ))}
            </div>

            <div
              className="absolute"
              style={{
                right: "-40px",
                top: "50%",
                transform: "translateY(-50%) translateZ(0px)",
                width: "50px",
                height: "36px",
                borderRadius: "0 8px 8px 0",
                background: `linear-gradient(to bottom, #3f3f46, #27272a)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1)`,
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute w-2 h-1 rounded-full bg-zinc-700"
                  style={{ right: "8px", top: `${10 + i * 7}px` }}
                />
              ))}
            </div>

            <div
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "12px",
                transformStyle: "preserve-3d",
                position: "relative",
              }}
            >
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(165deg, #3f3f46 0%, #27272a 40%, #18181b 100%)`,
                  boxShadow: `
                    inset 2px 2px 4px rgba(255,255,255,0.1),
                    inset -2px -2px 4px rgba(0,0,0,0.3),
                    0 8px 30px rgba(0,0,0,0.4)
                  `,
                  border: `1px solid #52525b`,
                  transform: "translateZ(6px)",
                }}
              >
                <div
                  className="absolute inset-2 rounded-lg flex items-center justify-center"
                  style={{
                    background: device.isConnected ? `linear-gradient(145deg, #0f172a, #1e293b)` : "#18181b",
                    border: `1px solid ${device.isConnected ? "#334155" : "#3f3f46"}`,
                  }}
                >
                  {device.isConnected ? (
                    <div className="text-center">
                      <div className="text-lg font-mono font-bold text-blue-400">98</div>
                      <div className="text-[8px] text-zinc-500 uppercase tracking-wider">SpO2</div>
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-600">--</div>
                  )}
                </div>
              </div>

              <div
                className="absolute inset-2 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                  transform: "translateZ(8px)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative" style={{ transformStyle: "preserve-3d", perspective: "800px" }}>
      <div
        ref={containerRef}
        className="h-64 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="transition-transform duration-75"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {getDeviceShape()}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <span className="text-xs text-zinc-500">{isDragging ? "Release to stop" : "Drag to rotate"}</span>
        <button onClick={resetView} className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
          <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
        </button>
      </div>
    </div>
  )
}

export function DeviceCarousel({ devices, onCalibrate }: DeviceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCalibrating, setIsCalibrating] = useState(false)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? devices.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === devices.length - 1 ? 0 : prev + 1))
  }

  const handleCalibrate = async () => {
    setIsCalibrating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onCalibrate(devices[activeIndex].id)
    setIsCalibrating(false)
  }

  const activeDevice = devices[activeIndex]

  const getBatteryColor = (level: number) => {
    if (level > 60) return "text-emerald-400"
    if (level > 30) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-400" />
        </button>

        <div className="flex gap-1.5">
          {devices.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === activeIndex ? "bg-blue-500 w-6" : "bg-zinc-700 w-1.5 hover:bg-zinc-600",
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden relative">
        <Device3DViewer device={activeDevice} />

        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
          <Battery className={cn("w-3.5 h-3.5", getBatteryColor(activeDevice.batteryLevel))} />
          <span className={cn("text-xs font-mono", getBatteryColor(activeDevice.batteryLevel))}>
            {activeDevice.batteryLevel}%
          </span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800">
          <Bluetooth className={cn("w-3.5 h-3.5", activeDevice.isConnected ? "text-blue-400" : "text-zinc-500")} />
          <span className={cn("text-xs", activeDevice.isConnected ? "text-blue-400" : "text-zinc-500")}>
            {activeDevice.isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <h3 className="text-base font-medium text-zinc-100 mb-1">{activeDevice.name}</h3>
          <p className="text-sm text-zinc-500 mb-4">{activeDevice.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              {activeDevice.breathSensorStatus === "ready" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-zinc-400">
                Breath Sensor: {activeDevice.breathSensorStatus === "ready" ? "Ready" : "Setup Needed"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {activeDevice.airSensorStatus === "active" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-zinc-400">
                Air Sensor: {activeDevice.airSensorStatus === "active" ? "Active" : "Sleeping"}
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-600 mb-4">Last synced: {activeDevice.lastSync}</p>
        </div>
      </div>

      <Button
        onClick={handleCalibrate}
        disabled={isCalibrating}
        className="w-full h-12 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isCalibrating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Setting up...
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4 mr-2" />
            Set Up Device
          </>
        )}
      </Button>
    </div>
  )
}
