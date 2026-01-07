"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import Svg, { Circle } from "react-native-svg"
import { colors } from "@/constants/theme"
import type { RiskLevel } from "@/constants/dummy-data"

interface BreathHaloProps {
  status: RiskLevel
  fenoLevel: number
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export function BreathHalo({ status, fenoLevel }: BreathHaloProps) {
  const animatedValue = useRef(new Animated.Value(0)).current

  const getStatusConfig = () => {
    switch (status) {
      case "safe":
        return { color: colors.safe, label: "Good" }
      case "monitoring":
        return { color: colors.warning, label: "Elevated" }
      case "high-risk":
        return { color: colors.danger, label: "High" }
    }
  }

  const config = getStatusConfig()
  const percentage = Math.min((fenoLevel / 100) * 100, 100)
  const radius = 88
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <View style={styles.container}>
      <Svg width={200} height={200} style={styles.svg}>
        {/* Track */}
        <Circle cx={100} cy={100} r={radius} fill="none" stroke={colors.cardBorder} strokeWidth={8} />
        {/* Progress */}
        <Circle
          cx={100}
          cy={100}
          r={radius}
          fill="none"
          stroke={config.color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation={-90}
          origin="100, 100"
        />
      </Svg>

      <View style={styles.center}>
        <Text style={[styles.value, { color: config.color }]}>{fenoLevel}</Text>
        <Text style={styles.label}>Breath Health</Text>
        <View style={[styles.badge, { backgroundColor: `${config.color}15` }]}>
          <View style={[styles.dot, { backgroundColor: config.color }]} />
          <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    position: "absolute",
  },
  center: {
    alignItems: "center",
  },
  value: {
    fontSize: 48,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
})
