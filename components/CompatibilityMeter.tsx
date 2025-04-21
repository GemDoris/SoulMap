import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CompatibilityMeterProps {
  percentage: number;
}

export function CompatibilityMeter({ percentage }: CompatibilityMeterProps) {
  // Determine color based on compatibility percentage
  const getColor = (value: number): string => {
    if (value >= 90) return '#6C5CE7'; // Purple - Excellent
    if (value >= 80) return '#00B894'; // Green - Very Good
    if (value >= 70) return '#F6B93B'; // Yellow - Good
    if (value >= 50) return '#FF7675'; // Red-Orange - Average
    return '#E84393'; // Pink - Poor
  };
  
  // Get meter label based on percentage
  const getLabel = (value: number): string => {
    if (value >= 90) return 'Excellent';
    if (value >= 80) return 'Very Good';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Average';
    return 'Poor';
  };
  
  const color = getColor(percentage);
  const label = getLabel(percentage);
  
  return (
    <View style={styles.container}>
      <View style={styles.meterContainer}>
        <View style={[styles.meterFill, { width: `${percentage}%`, backgroundColor: color }]} />
        <Text style={[styles.meterPercentage, { color }]}>{percentage}%</Text>
      </View>
      <Text style={[styles.meterLabel, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  meterContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#EDF2F7',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 4,
  },
  meterFill: {
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  meterPercentage: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  meterLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});