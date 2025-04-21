import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export function PersonalityChart() {
  const screenWidth = Dimensions.get('window').width - 40; // Full width minus padding
  
  const data = [
    {
      name: 'MBTI',
      value: 35,
      color: '#6C5CE7',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      legendFontFamily: 'Poppins-Regular',
    },
    {
      name: 'Astrology',
      value: 30,
      color: '#F6B93B',
      legendFontColor: '#7F7F7F', 
      legendFontSize: 12,
      legendFontFamily: 'Poppins-Regular',
    },
    {
      name: 'Purple Star',
      value: 25,
      color: '#E84393',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      legendFontFamily: 'Poppins-Regular',
    },
    {
      name: 'Psychology',
      value: 10,
      color: '#00B894',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      legendFontFamily: 'Poppins-Regular',
    },
  ];
  
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"value"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[10, 0]}
        absolute
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
});