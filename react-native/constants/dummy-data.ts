export type RiskLevel = "safe" | "monitoring" | "high-risk"

export interface SensorData {
  fenoLevel: number
  vocIndex: number
  inflammatoryScore: number
  heartRate: number
  oxygenSaturation: number
  respiratoryRate: number
}

export interface DeviceInfo {
  id: string
  name: string
  type: "pendant" | "patch" | "band"
  batteryLevel: number
  isConnected: boolean
  lastSync: string
  breathSensorStatus: "ready" | "needs-setup" | "error"
  airSensorStatus: "active" | "sleeping" | "error"
  description: string
}

export interface UserData {
  name: string
  lastAttack: string
  daysSinceAttack: number
}

// Toggle this for demo
export const IS_HIGH_RISK = false

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

export const riskStatus: RiskLevel = IS_HIGH_RISK ? "high-risk" : "safe"

export const predictionWindow = IS_HIGH_RISK
  ? "Heads up - symptoms may appear in ~45 mins"
  : "Looking good for the next 24 hours"

export const devices: DeviceInfo[] = [
  {
    id: "pendant-01",
    name: "Smart Pendant",
    type: "pendant",
    batteryLevel: 94,
    isConnected: true,
    lastSync: "2 mins ago",
    breathSensorStatus: "ready",
    airSensorStatus: "active",
    description: "Wear it as a necklace for everyday monitoring.",
  },
  {
    id: "patch-01",
    name: "Night Patch",
    type: "patch",
    batteryLevel: 78,
    isConnected: false,
    lastSync: "3 hours ago",
    breathSensorStatus: "ready",
    airSensorStatus: "sleeping",
    description: "Stick it on your chest for overnight monitoring.",
  },
  {
    id: "band-01",
    name: "Active Band",
    type: "band",
    batteryLevel: 61,
    isConnected: false,
    lastSync: "1 day ago",
    breathSensorStatus: "needs-setup",
    airSensorStatus: "active",
    description: "Perfect for workouts and outdoor activities.",
  },
]

export const userData: UserData = {
  name: "Alex",
  lastAttack: IS_HIGH_RISK ? "2 days ago" : "45 days ago",
  daysSinceAttack: IS_HIGH_RISK ? 2 : 45,
}

export const historicalData = {
  fenoTrend: IS_HIGH_RISK ? [22, 28, 35, 45, 58, 72, 85] : [25, 22, 20, 19, 18, 17, 18],
  vocTrend: IS_HIGH_RISK ? [30, 35, 42, 55, 62, 70, 78] : [28, 25, 24, 22, 23, 22, 23],
  timestamps: ["6h ago", "5h ago", "4h ago", "3h ago", "2h ago", "1h ago", "Now"],
}
