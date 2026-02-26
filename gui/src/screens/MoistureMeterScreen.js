import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useMoisture } from '../hooks/useMoisture';
import { LineChart } from 'react-native-gifted-charts';

export default function MoistureMeterScreen() {
  const { theme } = useTheme();
  const { current, history, loading, error } = useMoisture();

  const chartData = history.map((p) => ({
    value: Math.round(p.value * 10) / 10,
    dataPointText: `${Math.round(p.value)}%`,
  }));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    label: {
      fontSize: theme.fontSizeSmall,
      color: theme.textMuted,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    valueBox: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    value: {
      fontSize: 48,
      fontWeight: '700',
      color: theme.accent,
    },
    unit: {
      fontSize: theme.fontSize,
      color: theme.textMuted,
      marginTop: 4,
    },
    chartBox: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      minHeight: 220,
    },
    error: {
      fontSize: theme.fontSizeSmall,
      color: '#e57373',
      textAlign: 'center',
      marginTop: 12,
    },
    emptyChart: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 180,
    },
    emptyText: {
      fontSize: theme.fontSizeSmall,
      color: theme.textMuted,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.section}>
        <Text style={styles.label}>Current moisture (VWC %)</Text>
        <View style={styles.valueBox}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.accent} />
          ) : current != null ? (
            <>
              <Text style={styles.value}>{typeof current === 'number' ? current.toFixed(1) : current}</Text>
              <Text style={styles.unit}>Volumetric water content</Text>
            </>
          ) : (
            <Text style={styles.unit}>No data yet</Text>
          )}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Last 5 minutes</Text>
        <View style={styles.chartBox}>
          {chartData.length > 0 ? (
            <LineChart
              data={chartData}
              width={280}
              height={180}
              color={theme.accent}
              thickness={2}
              hideDataPoints={chartData.length > 20}
              dataPointsColor={theme.accent}
              startFillColor={theme.accent}
              endFillColor={theme.primary}
              startOpacity={0.4}
              endOpacity={0.05}
              noOfSections={4}
              yAxisColor={theme.border}
              xAxisColor={theme.border}
              yAxisTextStyle={{ color: theme.textMuted, fontSize: 10 }}
              xAxisLabelTextStyle={{ color: theme.textMuted, fontSize: 10 }}
              curved
            />
          ) : (
            <View style={styles.emptyChart}>
              <Text style={styles.emptyText}>
                {loading ? 'Connecting…' : 'Waiting for readings from the robot.'}
              </Text>
              <Text style={[styles.emptyText, { marginTop: 8 }]}>
                Data updates every few seconds.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
