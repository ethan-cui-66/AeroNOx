import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius } from "@/constants/theme"
import { userData, devices, riskStatus } from "@/constants/dummy-data"

export default function ProfileScreen() {
  const connectedDevices = devices.filter((d) => d.isConnected).length

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.textMuted} />
            </View>
            <View
              style={[styles.statusBadge, { backgroundColor: riskStatus === "safe" ? colors.safe : colors.danger }]}
            >
              <Text style={styles.statusCheck}>✓</Text>
            </View>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.memberLabel}>Member</Text>
        </View>

        <View style={styles.daysCard}>
          <View style={styles.daysIcon}>
            <Ionicons name="heart" size={20} color={colors.safe} />
          </View>
          <View>
            <Text style={styles.daysValue}>{userData.daysSinceAttack} days without an attack</Text>
            <Text style={styles.daysDescription}>
              {userData.daysSinceAttack > 30
                ? "Great progress - keep it up"
                : userData.daysSinceAttack > 7
                  ? "Good progress"
                  : "Stay consistent with monitoring"}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} style={styles.statIcon} />
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Days Monitored</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="pulse-outline" size={16} color={colors.textMuted} style={styles.statIcon} />
            <Text style={styles.statValue}>{connectedDevices}</Text>
            <Text style={styles.statLabel}>Devices</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <Ionicons name="document-text-outline" size={18} color={colors.textMuted} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Health History</Text>
                <Text style={styles.menuDescription}>Past readings</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textDim} />
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <Ionicons name="help-circle-outline" size={18} color={colors.textMuted} />
              </View>
              <View>
                <Text style={styles.menuLabel}>Help & Support</Text>
                <Text style={styles.menuDescription}>Get assistance</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textDim} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>NitroSense v2.1.0</Text>
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
  profileHeader: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardBorder,
    borderWidth: 1,
    borderColor: colors.textDim,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCheck: {
    fontSize: 10,
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  memberLabel: {
    fontSize: 14,
    color: colors.textMuted,
  },
  daysCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  daysIcon: {
    padding: 10,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.safeBg,
  },
  daysValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  daysDescription: {
    fontSize: 14,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    alignItems: "center",
  },
  statIcon: {
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.lg,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuIcon: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardBorder,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  menuDescription: {
    fontSize: 12,
    color: colors.textMuted,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.danger,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textDim,
  },
})
