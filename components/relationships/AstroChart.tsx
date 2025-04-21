import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Text, G } from 'react-native-svg';
import { Planet, Aspect } from '../../utils/relationshipAnalysis';

interface AstroChartProps {
  aspects: Aspect[];
  planetPositions: Record<Planet, { degree: number; sign: string }>;
  size?: number;
}

const PLANET_COLORS: Record<Planet, string> = {
  sun: '#FFD700',
  moon: '#C0C0C0',
  mercury: '#A9A9A9',
  venus: '#FFA07A',
  mars: '#FF4500',
  jupiter: '#DAA520',
  saturn: '#B8860B',
  uranus: '#40E0D0',
  neptune: '#4169E1',
  pluto: '#8B008B'
};

const ASPECT_COLORS = {
  positive: '#4CAF50',
  negative: '#F44336',
  neutral: '#9E9E9E'
};

const ZODIAC_SIGNS = [
  '白羊', '金牛', '双子', '巨蟹', '狮子', '处女',
  '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'
];

export default function AstroChart({ aspects, planetPositions, size = 300 }: AstroChartProps) {
  const center = size / 2;
  const radius = size * 0.4;
  const planetRadius = size * 0.35;

  // 计算行星位置
  const getPlanetPosition = (degree: number) => {
    const radian = (degree - 90) * (Math.PI / 180);
    return {
      x: center + planetRadius * Math.cos(radian),
      y: center + planetRadius * Math.sin(radian)
    };
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* 绘制外圈 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#000"
          strokeWidth="1"
          fill="none"
        />

        {/* 绘制星座分割线 */}
        {ZODIAC_SIGNS.map((sign, index) => {
          const angle = (index * 30) - 90;
          const radian = angle * (Math.PI / 180);
          const x1 = center + (radius - 20) * Math.cos(radian);
          const y1 = center + (radius - 20) * Math.sin(radian);
          const x2 = center + radius * Math.cos(radian);
          const y2 = center + radius * Math.sin(radian);

          return (
            <G key={sign}>
              <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#000"
                strokeWidth="1"
              />
              <Text
                x={center + (radius + 15) * Math.cos(radian)}
                y={center + (radius + 15) * Math.sin(radian)}
                textAnchor="middle"
                fontSize="12"
              >
                {sign}
              </Text>
            </G>
          );
        })}

        {/* 绘制相位线 */}
        {aspects.map((aspect, index) => {
          const pos1 = getPlanetPosition(planetPositions[aspect.planet1].degree);
          const pos2 = getPlanetPosition(planetPositions[aspect.planet2].degree);

          return (
            <Line
              key={index}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={ASPECT_COLORS[aspect.influence]}
              strokeWidth="2"
              strokeDasharray={aspect.type === 'opposition' ? '5,5' : undefined}
            />
          );
        })}

        {/* 绘制行星 */}
        {Object.entries(planetPositions).map(([planet, { degree }]) => {
          const pos = getPlanetPosition(degree);
          return (
            <G key={planet}>
              <Circle
                cx={pos.x}
                cy={pos.y}
                r="8"
                fill={PLANET_COLORS[planet as Planet]}
              />
              <Text
                x={pos.x}
                y={pos.y - 12}
                textAnchor="middle"
                fontSize="10"
                fill="#000"
              >
                {planet}
              </Text>
            </G>
          );
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