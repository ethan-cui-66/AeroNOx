"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius } from "@/constants/theme"
import { Device3DViewer } from "@/components/Device3DViewer"
import { devices } from "@/constants/dummy-data"

export default function DevicesScreen() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeDevice = devices[activeIndex]

  const getBatteryColor = (level: number) => {
    if (level > 60) return colors.safe
    if (level > 30) return colors.warning
    return colors.danger
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Devices</Text>
          <Text style={styles.subtitle}>Manage your wearables</Text>
        </View>

        <View style={styles.carouselNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveIndex((prev) => (prev === 0 ? devices.length - 1 : prev - 1))}
          >
            <Ionicons name="chevron-back" size={18} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.dots}>
            {devices.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
                <View style={[styles.dot, i === activeIndex && styles.activeDot]} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setActiveIndex((prev) => (prev === devices.length - 1 ? 0 : prev + 1))}
          >
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.viewerCard}>
          <View style={styles.viewerBadges}>
            <View style={styles.badge}>
              <Ionicons name="battery-half" size={14} color={getBatteryColor(activeDevice.batteryLevel)} />
              <Text style={[styles.badgeText, { color: getBatteryColor(activeDevice.batteryLevel) }]}>
                {activeDevice.batteryLevel}%
              </Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="bluetooth" size={14} color={activeDevice.isConnected ? colors.blue : colors.textMuted} />
              <Text style={[styles.badgeText, { color: activeDevice.isConnected ? colors.blue : colors.textMuted }]}>
                {activeDevice.isConnected ? "Connected" : "Disconnected"}
              </Text>
            </View>
          </View>

          <Device3DViewer device={activeDevice} />

          <View style={styles.deviceInfo}>
            <Text style={styles.deviceName}>{activeDevice.name}</Text>
            <Text style={styles.deviceDescription}>{activeDevice.description}</Text>

            <View style={styles.statusRows}>
              <View style={styles.statusRow}>
                <Ionicons
                  name={activeDevice.breathSensorStatus === "ready" ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={activeDevice.breathSensorStatus === "ready" ? colors.safe : colors.warning}
                />
                <Text style={styles.statusText}>
                  Breath Sensor: {activeDevice.breathSensorStatus === "ready" ? "Ready" : "Setup Needed"}
                </Text>
              </View>
              <View style={styles.statusRow}>
                <Ionicons
                  name={activeDevice.airSensorStatus === "active" ? "checkmark-circle" : "alert-circle"}
                  size={16}
                  color={activeDevice.airSensorStatus === "active" ? colors.safe : colors.warning}
                />
                <Text style={styles.statusText}>
                  Air Sensor: {activeDevice.airSensorStatus === "active" ? "Active" : "Sleeping"}
                </Text>
              </View>
            </View>

            <Text style={styles.lastSync}>Last synced: {activeDevice.lastSync}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.setupButton} activeOpacity={0.8}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.setupButtonText}>Setup Device</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },
  carouselNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  navButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(63, 63, 70, 0.5)",
  },
  dots: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cardBorder,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.blue,
  },
  viewerCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: "hidden",
  },
  viewerBadges: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: "rgba(24, 24, 27, 0.9)",
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
  deviceInfo: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  deviceDescription: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  statusRows: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  lastSync: {
    fontSize: 12,
    color: colors.textDim,
  },
  setupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.blue,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  setupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
})
