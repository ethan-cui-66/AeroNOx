"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, borderRadius, spacing } from "@/constants/theme"

interface EmergencyButtonProps {
  visible: boolean
}

export function EmergencyButton({ visible }: EmergencyButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!visible) return null

  const actions = [
    { icon: "call-outline" as const, label: "Call Emergency Contact", color: colors.danger },
    { icon: "location-outline" as const, label: "Find Nearest Hospital", color: colors.warning },
    { icon: "document-text-outline" as const, label: "View Action Steps", color: colors.blue },
  ]

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.8}>
        <Ionicons name="warning" size={20} color="#fff" />
        <Text style={styles.buttonText}>View Emergency Plan</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.actions}>
          {actions.map((action) => (
            <TouchableOpacity key={action.label} style={styles.action} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                <Ionicons name={action.icon} size={18} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.danger,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  actions: {
    gap: spacing.sm,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  actionIcon: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
})
