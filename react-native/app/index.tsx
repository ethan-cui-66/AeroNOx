import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, spacing, borderRadius } from "@/constants/theme"
import { StatusHeader } from "@/components/StatusHeader"
import { BreathHalo } from "@/components/BreathHalo"
import { MetricCard } from "@/components/MetricCard"
import { EmergencyButton } from "@/components/EmergencyButton"
import { currentSensorData, riskStatus, predictionWindow, userData, historicalData } from "@/constants/dummy-data"

export default function HomeScreen() {
  const getMetricStatus = (value: number, thresholds: { warning: number; danger: number }) => {
    if (value >= thresholds.danger) return "danger" as const
    if (value >= thresholds.warning) return "warning" as const
    return "normal" as const
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <StatusHeader status={riskStatus} predictionWindow={predictionWindow} userData={userData} />

        <View style={styles.haloContainer}>
          <BreathHalo status={riskStatus} fenoLevel={currentSensorData.fenoLevel} />
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            title="Air Quality"
            value={currentSensorData.vocIndex}
            icon="cloudy-outline"
            status={getMetricStatus(currentSensorData.vocIndex, { warning: 50, danger: 70 })}
            trend={historicalData.vocTrend}
            description="Around you"
          />
          <MetricCard
            title="Inflammation"
            value={currentSensorData.inflammatoryScore}
            unit="%"
            icon="thermometer-outline"
            status={getMetricStatus(currentSensorData.inflammatoryScore, { warning: 40, danger: 70 })}
            trend={[10, 12, 14, 13, 15, 14, currentSensorData.inflammatoryScore]}
            description="Lung activity"
          />
        </View>

        <View style={styles.vitalsRow}>
          <View style={styles.vitalCard}>
            <Text style={styles.vitalLabel}>Heart</Text>
            <Text style={styles.vitalValue}>
              {currentSensorData.heartRate}
              <Text style={styles.vitalUnit}> bpm</Text>
            </Text>
          </View>
          <View style={styles.vitalCard}>
            <Text style={styles.vitalLabel}>Oxygen</Text>
            <Text style={styles.vitalValue}>
              {currentSensorData.oxygenSaturation}
              <Text style={styles.vitalUnit}>%</Text>
            </Text>
          </View>
          <View style={styles.vitalCard}>
            <Text style={styles.vitalLabel}>Breathing</Text>
            <Text style={styles.vitalValue}>
              {currentSensorData.respiratoryRate}
              <Text style={styles.vitalUnit}>/min</Text>
            </Text>
          </View>
        </View>

        <EmergencyButton visible={riskStatus === "high-risk"} />
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
  haloContainer: {
    marginVertical: spacing.xxl,
  },
  metricsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  vitalsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  vitalCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    alignItems: "center",
  },
  vitalLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  vitalUnit: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textMuted,
  },
})
