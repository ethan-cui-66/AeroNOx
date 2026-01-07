import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, borderRadius, spacing } from "@/constants/theme"
import type { RiskLevel, UserData } from "@/constants/dummy-data"

interface StatusHeaderProps {
  status: RiskLevel
  predictionWindow: string
  userData: UserData
}

export function StatusHeader({ status, predictionWindow, userData }: StatusHeaderProps) {
  const statusConfig = {
    safe: { label: "All Clear", color: colors.safe },
    monitoring: { label: "Monitoring", color: colors.warning },
    "high-risk": { label: "Attention Needed", color: colors.danger },
  }

  const config = statusConfig[status]

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.name}>{userData.name}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="wifi" size={18} color={colors.safe} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={18} color={colors.textMuted} />
            {status === "high-risk" && <View style={styles.badge} />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.statusLeft}>
          <View style={[styles.statusDot, { backgroundColor: config.color }]} />
          <View>
            <Text style={[styles.statusLabel, { color: config.color }]}>{config.label}</Text>
            <Text style={styles.prediction}>{predictionWindow}</Text>
          </View>
        </View>
        <View style={styles.daysContainer}>
          <Text style={styles.daysValue}>{userData.daysSinceAttack} days</Text>
          <Text style={styles.daysLabel}>since last attack</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: colors.textMuted,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconButton: {
    padding: 10,
    borderRadius: borderRadius.sm,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(63, 63, 70, 0.5)",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: "rgba(39, 39, 42, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(63, 63, 70, 0.3)",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  prediction: {
    fontSize: 12,
    color: colors.textMuted,
  },
  daysContainer: {
    alignItems: "flex-end",
  },
  daysValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  daysLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
})
