import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function ProfileChart() {
  const screenWidth = Dimensions.get('window').width - 40; // Full width minus padding
  
  const data = {
    labels: ['Intuition', 'Empathy', 'Logic', 'Creativity', 'Harmony'],
    datasets: [
      {
        data: [85, 92, 65, 88, 90],
        color: () => '#6C5CE7', // line color
        strokeWidth: 2,
      },
    ],
  };
  
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: () => '#6C5CE7',
    labelColor: () => '#718096',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#6C5CE7',
      fill: '#ffffff',
    },
    propsForLabels: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
  };

  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});