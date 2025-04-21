import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import BirthInfoForm from '../../components/astrology/BirthInfoForm';
import BirthChart from '../../components/astrology/BirthChart';
import Interpretation from '../../components/astrology/Interpretation';
import { BirthInfo, ChartData } from '../../types/astrology';
import { calculateChart } from '../../utils/astrologyCalculations';

export default function AstrologyScreen() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const handleBirthInfoSubmit = async (info: BirthInfo) => {
    try {
      const data = await calculateChart(info);
      setChartData(data);
    } catch (error) {
      console.error('Error calculating chart:', error);
      // TODO: 添加错误处理UI
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>占星术分析</Text>
        
        <BirthInfoForm onSubmit={handleBirthInfoSubmit} />

        {chartData && (
          <>
            <BirthChart data={chartData} />
            <Interpretation data={chartData} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 