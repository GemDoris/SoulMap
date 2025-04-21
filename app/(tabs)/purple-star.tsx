import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import BirthInfoForm from '../../components/purpleStar/BirthInfoForm';
import Chart from '../../components/purpleStar/Chart';
import Interpretation from '../../components/purpleStar/Interpretation';
import { PurpleStarBirthInfo, PurpleStarChart } from '../../types/purpleStar';
import { calculatePurpleStarChart } from '../../utils/purpleStarCalculations';

export default function PurpleStarScreen() {
  const [chartData, setChartData] = useState<PurpleStarChart | null>(null);

  const handleBirthInfoSubmit = async (info: PurpleStarBirthInfo) => {
    try {
      const data = await calculatePurpleStarChart(info);
      setChartData(data);
    } catch (error) {
      console.error('Error calculating purple star chart:', error);
      // TODO: 添加错误处理UI
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>紫微斗数分析</Text>
        
        <BirthInfoForm onSubmit={handleBirthInfoSubmit} />

        {chartData && (
          <>
            <Chart data={chartData} />
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