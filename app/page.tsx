"use client"

import { useState } from "react"
import { Wind, Thermometer } from "lucide-react"
import { BreathHalo } from "@/components/breath-halo"
import { MetricCard } from "@/components/metric-card"
import { DeviceCarousel } from "@/components/device-carousel"
import { EmergencyButton } from "@/components/emergency-button"
import { BottomNav } from "@/components/bottom-nav"
import { StatusHeader } from "@/components/status-header"
import { TrendsView } from "@/components/trends-view"
import { SettingsView } from "@/components/settings-view"
import { ProfileView } from "@/components/profile-view"
import { currentSensorData, riskStatus, predictionWindow, devices, userData, historicalData } from "@/lib/dummy-data"

export default function NitroSenseApp() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "devices" | "trends" | "settings" | "profile">("dashboard")

  const handleCalibrate = (deviceId: string) => {
    console.log("Setting up device:", deviceId)
  }

  const getMetricStatus = (value: number, thresholds: { warning: number; danger: number }) => {
    if (value >= thresholds.danger) return "danger"
    if (value >= thresholds.warning) return "warning"
    return "normal"
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28">
      <div className="max-w-md mx-auto px-4 py-6">
        {activeTab === "dashboard" && (
          <>
            <StatusHeader status={riskStatus} predictionWindow={predictionWindow} userData={userData} />

            {/* Breath Halo */}
            <div className="my-8">
              <BreathHalo
                status={riskStatus}
                fenoLevel={currentSensorData.fenoLevel}
                inflammatoryScore={currentSensorData.inflammatoryScore}
              />
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <MetricCard
                title="Air Quality"
                value={currentSensorData.vocIndex}
                unit=""
                icon={<Wind className="w-4 h-4" />}
                status={getMetricStatus(currentSensorData.vocIndex, { warning: 50, danger: 70 })}
                trend={historicalData.vocTrend}
                description="Around you"
              />
              <MetricCard
                title="Inflammation"
                value={currentSensorData.inflammatoryScore}
                unit="%"
                icon={<Thermometer className="w-4 h-4" />}
                status={getMetricStatus(currentSensorData.inflammatoryScore, { warning: 40, danger: 70 })}
                trend={[10, 12, 14, 13, 15, 14, currentSensorData.inflammatoryScore]}
                description="Lung activity"
              />
            </div>

            {/* Additional vitals */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Heart</p>
                <p className="text-lg font-semibold text-zinc-100">
                  {currentSensorData.heartRate}
                  <span className="text-xs font-normal text-zinc-500 ml-0.5">bpm</span>
                </p>
              </div>
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Oxygen</p>
                <p className="text-lg font-semibold text-zinc-100">
                  {currentSensorData.oxygenSaturation}
                  <span className="text-xs font-normal text-zinc-500 ml-0.5">%</span>
                </p>
              </div>
              <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-center">
                <p className="text-xs text-zinc-500 mb-1">Breathing</p>
                <p className="text-lg font-semibold text-zinc-100">
                  {currentSensorData.respiratoryRate}
                  <span className="text-xs font-normal text-zinc-500 ml-0.5">/min</span>
                </p>
              </div>
            </div>

            <EmergencyButton visible={riskStatus === "high-risk"} />
          </>
        )}

        {activeTab === "devices" && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-zinc-100 mb-1">Your Devices</h2>
              <p className="text-sm text-zinc-500">Manage your wearables</p>
            </div>
            <DeviceCarousel devices={devices} onCalibrate={handleCalibrate} />
          </>
        )}

        {activeTab === "trends" && <TrendsView />}
        {activeTab === "settings" && <SettingsView />}
        {activeTab === "profile" && <ProfileView />}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
