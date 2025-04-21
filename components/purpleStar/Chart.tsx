import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Rect, Line, Text as SvgText, G } from 'react-native-svg';
import { PurpleStarChart, Palace } from '../../types/purpleStar';

interface ChartProps {
  data: PurpleStarChart;
}

const { width } = Dimensions.get('window');
const CHART_SIZE = width - 32;
const PALACE_SIZE = CHART_SIZE / 3;

export default function Chart({ data }: ChartProps) {
  const renderPalace = (palace: Palace, index: number) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const x = col * PALACE_SIZE;
    const y = row * PALACE_SIZE;

    return (
      <G key={`palace-${index}`}>
        <Rect
          x={x}
          y={y}
          width={PALACE_SIZE}
          height={PALACE_SIZE}
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        
        {/* 宫位名称 */}
        <SvgText
          x={x + PALACE_SIZE / 2}
          y={y + 20}
          fontSize="16"
          textAnchor="middle"
          fill={palace.position === data.mingGong ? 'red' : 'black'}
        >
          {palace.name}
        </SvgText>

        {/* 主星 */}
        {palace.mainStar && (
          <SvgText
            x={x + PALACE_SIZE / 2}
            y={y + 45}
            fontSize="14"
            textAnchor="middle"
            fill="purple"
          >
            {palace.mainStar}
          </SvgText>
        )}

        {/* 其他星曜 */}
        {palace.stars.map((star, starIndex) => (
          <SvgText
            key={`star-${starIndex}`}
            x={x + PALACE_SIZE / 2}
            y={y + 65 + starIndex * 20}
            fontSize="12"
            textAnchor="middle"
            fill={star.type === 'major' ? 'blue' : 
                  star.type === 'minor' ? 'green' : 'gray'}
          >
            {star.name}
            {star.brightness && `(${star.brightness})`}
          </SvgText>
        ))}
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        日主：{data.dayMaster} {data.heavenlyStem}{data.earthBranch}
      </Text>
      
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        {data.palaces.map((palace, index) => renderPalace(palace, index))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
}); 