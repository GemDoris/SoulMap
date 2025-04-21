import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text, G } from 'react-native-svg';
import { ChartData } from '../../types/astrology';

interface BirthChartProps {
  data: ChartData;
}

const { width } = Dimensions.get('window');
const CHART_SIZE = width - 32;
const CENTER = CHART_SIZE / 2;
const RADIUS = CHART_SIZE / 2 - 20;

export default function BirthChart({ data }: BirthChartProps) {
  const getPointOnCircle = (angle: number, radius: number) => {
    const x = CENTER + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y = CENTER + radius * Math.sin((angle - 90) * Math.PI / 180);
    return { x, y };
  };

  return (
    <View style={styles.container}>
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        {/* 绘制基础圆形 */}
        <Circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke="black"
          strokeWidth="1"
          fill="none"
        />

        {/* 绘制宫位线 */}
        {data.houses.map((angle, index) => {
          const point = getPointOnCircle(angle, RADIUS);
          return (
            <Line
              key={`house-${index}`}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke="black"
              strokeWidth="1"
            />
          );
        })}

        {/* 绘制行星符号 */}
        {data.planets.map((planet, index) => {
          const angle = (planet.degree + (30 * planet.house)) % 360;
          const point = getPointOnCircle(angle, RADIUS * 0.8);
          return (
            <G key={`planet-${index}`}>
              <Text
                x={point.x}
                y={point.y}
                fontSize="12"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {planet.name}
              </Text>
            </G>
          );
        })}

        {/* 绘制相位线 */}
        {data.aspects.map((aspect, index) => {
          const planet1 = data.planets.find(p => p.name === aspect.planet1);
          const planet2 = data.planets.find(p => p.name === aspect.planet2);
          
          if (planet1 && planet2) {
            const angle1 = (planet1.degree + (30 * planet1.house)) % 360;
            const angle2 = (planet2.degree + (30 * planet2.house)) % 360;
            const point1 = getPointOnCircle(angle1, RADIUS * 0.8);
            const point2 = getPointOnCircle(angle2, RADIUS * 0.8);

            return (
              <Line
                key={`aspect-${index}`}
                x1={point1.x}
                y1={point1.y}
                x2={point2.x}
                y2={point2.y}
                stroke={aspect.type === 'conjunction' ? 'blue' : 
                        aspect.type === 'opposition' ? 'red' : 
                        aspect.type === 'trine' ? 'green' : 'gray'}
                strokeWidth="1"
                strokeDasharray={aspect.type === 'square' ? "4,4" : "none"}
              />
            );
          }
          return null;
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
}); 