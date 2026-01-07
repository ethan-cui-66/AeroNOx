import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, borderRadius, spacing } from "@/constants/theme"

interface MetricCardProps {
  title: string
  value: number | string
  unit?: string
  icon: keyof typeof Ionicons.glyphMap
  status?: "normal" | "warning" | "danger"
  description?: string
  trend?: number[]
}

export function MetricCard({ title, value, unit, icon, status = "normal", description, trend }: MetricCardProps) {
  const statusColors = {
    normal: colors.safe,
    warning: colors.warning,
    danger: colors.danger,
  }

  const accentColor = statusColors[status]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconBg, { backgroundColor: `${accentColor}15` }]}>
          <Ionicons name={icon} size={16} color={accentColor} />
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      {description && <Text style={styles.description}>{description}</Text>}

      {trend && (
        <View style={styles.trendContainer}>
          {trend.map((val, i) => {
            const maxVal = Math.max(...trend)
            const height = (val / maxVal) * 100
            const isLast = i === trend.length - 1
            return (
              <View
                key={i}
                style={[
                  styles.trendBar,
                  {
                    height: `${Math.max(height, 8)}%`,
                    backgroundColor: isLast ? accentColor : colors.cardBorder,
                    opacity: isLast ? 1 : 0.4,
                  },
                ]}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  iconBg: {
    padding: 6,
    borderRadius: borderRadius.sm,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "600",
  },
  unit: {
    fontSize: 14,
    color: colors.textMuted,
  },
  description: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 24,
  },
  trendBar: {
    flex: 1,
    borderRadius: 2,
  },
})
