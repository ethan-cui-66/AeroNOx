"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius } from "@/constants/theme"

export default function SettingsScreen() {
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
          icon: "notifications-outline" as const,
          label: "Push Notifications",
          description: "Receive alerts on your phone",
        },
        {
          key: "sounds" as const,
          icon: "volume-high-outline" as const,
          label: "Sounds",
          description: "Play sounds for warnings",
        },
        {
          key: "vibration" as const,
          icon: "phone-portrait-outline" as const,
          label: "Vibration",
          description: "Haptic feedback",
        },
      ],
    },
    {
      title: "Device",
      items: [
        {
          key: "autoSync" as const,
          icon: "sync-outline" as const,
          label: "Auto Sync",
          description: "Sync every 5 minutes",
        },
        {
          key: "nightMode" as const,
          icon: "moon-outline" as const,
          label: "Night Monitoring",
          description: "Enhanced sleep monitoring",
        },
      ],
    },
    {
      title: "Safety",
      items: [
        {
          key: "emergencyAlerts" as const,
          icon: "shield-checkmark-outline" as const,
          label: "Emergency Alerts",
          description: "Notify contacts when needed",
        },
      ],
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>

        {settingGroups.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, index) => (
                <View
                  key={item.key}
                  style={[styles.settingRow, index < group.items.length - 1 && styles.settingRowBorder]}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconBg}>
                      <Ionicons name={item.icon} size={18} color={colors.textMuted} />
                    </View>
                    <View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                  </View>
                  <Switch
                    value={settings[item.key]}
                    onValueChange={() => toggleSetting(item.key)}
                    trackColor={{ false: colors.cardBorder, true: colors.blue }}
                    thumbColor="#fff"
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.group}>
          <Text style={styles.groupTitle}>Quick Actions</Text>
          <View style={styles.groupCard}>
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.settingLeft}>
                <View style={styles.iconBg}>
                  <Ionicons name="time-outline" size={18} color={colors.textMuted} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>View History</Text>
                  <Text style={styles.settingDescription}>Past 30 days</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.actionRow}>
              <View style={styles.settingLeft}>
                <View style={styles.iconBg}>
                  <Ionicons name="people-outline" size={18} color={colors.textMuted} />
                </View>
                <View>
                  <Text style={styles.settingLabel}>Emergency Contacts</Text>
                  <Text style={styles.settingDescription}>Manage who gets notified</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: spacing.xl,
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
  group: {
    marginBottom: spacing.xl,
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  iconBg: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardBorder,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textMuted,
  },
  actionRow: {
    padding: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
})
