import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Svg, { Line, Polyline, Circle } from "react-native-svg"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius } from "@/constants/theme"
import { historicalData, currentSensorData } from "@/constants/dummy-data"

export default function TrendsScreen() {
  const metrics = [
    {
      name: "Breath Health",
      value: currentSensorData.fenoLevel,
      unit: "",
      trend: historicalData.fenoTrend,
      icon: "pulse-outline" as const,
      goodRange: "Under 25 is healthy",
      explanation:
        currentSensorData.fenoLevel < 25
          ? "Your breathing looks good"
          : currentSensorData.fenoLevel < 50
            ? "Slightly elevated - worth monitoring"
            : "Higher than usual - consider your inhaler",
    },
    {
      name: "Air Quality",
      value: currentSensorData.vocIndex,
      unit: "",
      trend: historicalData.vocTrend,
      icon: "cloudy-outline" as const,
      goodRange: "Under 50 is good",
      explanation:
        currentSensorData.vocIndex < 50
          ? "The air around you is clean"
          : currentSensorData.vocIndex < 70
            ? "Air quality is okay"
            : "Air quality is poor - consider moving",
    },
    {
      name: "Inflammation",
      value: currentSensorData.inflammatoryScore,
      unit: "%",
      trend: [10, 12, 14, 13, 15, 14, currentSensorData.inflammatoryScore],
      icon: "thermometer-outline" as const,
      goodRange: "Under 20% is normal",
      explanation:
        currentSensorData.inflammatoryScore < 20
          ? "Your lungs feel calm"
          : currentSensorData.inflammatoryScore < 50
            ? "Some activity detected"
            : "Higher activity - stay alert",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Trends</Text>
          <Text style={styles.subtitle}>Last 6 hours</Text>
        </View>

        {metrics.map((metric) => {
          const maxVal = Math.max(...metric.trend)
          const isElevated = metric.trend[metric.trend.length - 1] > metric.trend[0] * 1.5

          const points = metric.trend
            .map((val, i) => {
              const x = (i / (metric.trend.length - 1)) * 300
              const y = 60 - (val / maxVal) * 48
              return `${x},${y}`
            })
            .join(" ")

          const lastX = 300
          const lastY = 60 - (metric.trend[metric.trend.length - 1] / maxVal) * 48

          return (
            <View key={metric.name} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.metricLeft}>
                  <View style={[styles.iconBg, isElevated && styles.iconBgDanger]}>
                    <Ionicons name={metric.icon} size={16} color={isElevated ? colors.danger : colors.textMuted} />
                  </View>
                  <View>
                    <Text style={styles.metricName}>{metric.name}</Text>
                    <Text style={styles.metricRange}>{metric.goodRange}</Text>
                  </View>
                </View>
                <View style={styles.metricRight}>
                  <Ionicons
                    name={isElevated ? "trending-up" : "trending-down"}
                    size={16}
                    color={isElevated ? colors.danger : colors.safe}
                  />
                  <Text style={[styles.metricValue, isElevated && styles.metricValueDanger]}>
                    {metric.value}
                    {metric.unit && <Text style={styles.metricUnit}>{metric.unit}</Text>}
                  </Text>
                </View>
              </View>

              <View style={[styles.explanation, isElevated && styles.explanationDanger]}>
                <Text style={[styles.explanationText, isElevated && styles.explanationTextDanger]}>
                  {metric.explanation}
                </Text>
              </View>

              <View style={styles.chartContainer}>
                <Svg width="100%" height={64} viewBox="0 0 300 64">
                  {[0, 32, 64].map((y) => (
                    <Line key={y} x1="0" y1={y} x2="300" y2={y} stroke={colors.cardBorder} strokeWidth="1" />
                  ))}
                  <Polyline
                    fill="none"
                    stroke={isElevated ? colors.danger : colors.blue}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                  <Circle cx={lastX} cy={lastY} r="4" fill={isElevated ? colors.danger : colors.blue} />
                </Svg>
              </View>

              <View style={styles.timestamps}>
                {historicalData.timestamps.map((time, i) => (
                  <Text key={i} style={styles.timestamp}>
                    {time}
                  </Text>
                ))}
              </View>
            </View>
          )
        })}
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
  metricCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconBg: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.cardBorder,
  },
  iconBgDanger: {
    backgroundColor: colors.dangerBg,
  },
  metricName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  metricRange: {
    fontSize: 12,
    color: colors.textMuted,
  },
  metricRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  metricValueDanger: {
    color: colors.danger,
  },
  metricUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textMuted,
  },
  explanation: {
    backgroundColor: colors.cardBorder,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  explanationDanger: {
    backgroundColor: colors.dangerBg,
  },
  explanationText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  explanationTextDanger: {
    color: "#fca5a5",
  },
  chartContainer: {
    marginBottom: spacing.sm,
  },
  timestamps: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timestamp: {
    fontSize: 10,
    color: colors.textDim,
  },
})
