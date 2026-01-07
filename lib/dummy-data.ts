// ============================================
// DUMMY DATA - Toggle these values for demos
// ============================================

export type RiskLevel = "safe" | "monitoring" | "high-risk"

export interface SensorData {
  fenoLevel: number // Breath inflammation marker
  vocIndex: number // Air quality score
  inflammatoryScore: number // 0-100%
  heartRate: number
  oxygenSaturation: number // Blood oxygen
  respiratoryRate: number // Breaths per minute
}

export interface DeviceInfo {
  id: string
  name: string
  type: "pendant" | "patch" | "band"
  icon: string
  batteryLevel: number
  isConnected: boolean
  lastSync: string
  breathSensorStatus: "ready" | "needs-setup" | "error"
  airSensorStatus: "active" | "sleeping" | "error"
  description: string
  modelColor: string
}

export interface UserData {
  name: string
  lastAttack: string
  daysSinceAttack: number
}

// ============================================
// TOGGLE THIS TO CHANGE RISK STATE FOR DEMO
// ============================================
export const IS_HIGH_RISK = false // Set to true for danger mode demo

// Current sensor readings
export const currentSensorData: SensorData = IS_HIGH_RISK
  ? {
      fenoLevel: 85,
      vocIndex: 78,
      inflammatoryScore: 82,
      heartRate: 98,
      oxygenSaturation: 94,
      respiratoryRate: 22,
    }
  : {
      fenoLevel: 18,
      vocIndex: 23,
      inflammatoryScore: 15,
      heartRate: 72,
      oxygenSaturation: 98,
      respiratoryRate: 14,
    }

// Risk status derived from data
export const riskStatus: RiskLevel = IS_HIGH_RISK ? "high-risk" : "safe"

export const predictionWindow = IS_HIGH_RISK
  ? "Heads up - symptoms may appear in ~45 mins"
  : "Looking good for the next 24 hours"

// Available devices
export const devices: DeviceInfo[] = [
  {
    id: "pendant-01",
    name: "Smart Pendant",
    type: "pendant",
    icon: "💎",
    batteryLevel: 94,
    isConnected: true,
    lastSync: "2 mins ago",
    breathSensorStatus: "ready",
    airSensorStatus: "active",
    description: "Wear it as a necklace for everyday monitoring. Stylish and discreet.",
    modelColor: "#00d4ff",
  },
  {
    id: "patch-01",
    name: "Night Patch",
    type: "patch",
    icon: "🩹",
    batteryLevel: 78,
    isConnected: false,
    lastSync: "3 hours ago",
    breathSensorStatus: "ready",
    airSensorStatus: "sleeping",
    description: "Stick it on your chest for overnight monitoring. Thin and comfy.",
    modelColor: "#a855f7",
  },
  {
    id: "band-01",
    name: "Active Band",
    type: "band",
    icon: "⌚",
    batteryLevel: 61,
    isConnected: false,
    lastSync: "1 day ago",
    breathSensorStatus: "needs-setup",
    airSensorStatus: "active",
    description: "Perfect for workouts and outdoor activities. Water-resistant.",
    modelColor: "#22c55e",
  },
]

// User info
export const userData: UserData = {
  name: "Alex",
  lastAttack: IS_HIGH_RISK ? "2 days ago" : "45 days ago",
  daysSinceAttack: IS_HIGH_RISK ? 2 : 45,
}

// Historical data for trend charts
export const historicalData = {
  fenoTrend: IS_HIGH_RISK ? [22, 28, 35, 45, 58, 72, 85] : [25, 22, 20, 19, 18, 17, 18],
  vocTrend: IS_HIGH_RISK ? [30, 35, 42, 55, 62, 70, 78] : [28, 25, 24, 22, 23, 22, 23],
  timestamps: ["6h ago", "5h ago", "4h ago", "3h ago", "2h ago", "1h ago", "Now"],
}
