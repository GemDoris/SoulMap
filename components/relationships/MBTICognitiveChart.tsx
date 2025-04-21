import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text, G } from 'react-native-svg';
import { MBTIType, CognitiveFunction } from '../../utils/relationshipAnalysis';
import { Card, Title, Paragraph, Portal, Button } from 'react-native-paper';

interface MBTICognitiveChartProps {
  mbtiType: MBTIType;
  size?: number;
}

const COGNITIVE_FUNCTIONS: Record<CognitiveFunction, { 
  color: string; 
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
}> = {
  Ni: { 
    color: '#4A90E2', 
    description: '内向直觉',
    detailedDescription: '内向直觉(Ni)是一种未来导向的认知功能，擅长发现模式和可能性，能够预见长期趋势和结果。',
    strengths: ['战略思维', '洞察力', '预见性'],
    weaknesses: ['过度抽象', '难以解释', '脱离现实']
  },
  Ne: { 
    color: '#50E3C2', 
    description: '外向直觉',
    detailedDescription: '外向直觉(Ne)是一种发散性思维，善于发现各种可能性和联系，富有创造力和想象力。',
    strengths: ['创造力', '开放性', '多角度思考'],
    weaknesses: ['注意力分散', '缺乏专注', '难以完成']
  },
  Si: { 
    color: '#F5A623', 
    description: '内向感觉',
    detailedDescription: '内向感觉(Si)是一种基于经验的认知功能，善于记忆和比较细节，重视传统和稳定性。',
    strengths: ['细节记忆', '可靠性', '组织能力'],
    weaknesses: ['抗拒改变', '过度谨慎', '缺乏创新']
  },
  Se: { 
    color: '#D0021B', 
    description: '外向感觉',
    detailedDescription: '外向感觉(Se)是一种即时感知的认知功能，善于观察和体验当下，行动力强。',
    strengths: ['行动力', '适应力', '感官敏锐'],
    weaknesses: ['冲动', '缺乏规划', '难以延迟满足']
  },
  Ti: { 
    color: '#7ED321', 
    description: '内向思考',
    detailedDescription: '内向思考(Ti)是一种分析性思维，善于建立逻辑框架，追求精确和一致性。',
    strengths: ['逻辑分析', '精确性', '独立思考'],
    weaknesses: ['过度分析', '情感疏离', '优柔寡断']
  },
  Te: { 
    color: '#9013FE', 
    description: '外向思考',
    detailedDescription: '外向思考(Te)是一种组织性思维，善于制定计划和目标，注重效率和结果。',
    strengths: ['组织能力', '执行力', '目标导向'],
    weaknesses: ['过于功利', '缺乏灵活性', '忽视情感']
  },
  Fi: { 
    color: '#F8E71C', 
    description: '内向情感',
    detailedDescription: '内向情感(Fi)是一种内在价值观，重视个人信念和情感，追求真实和意义。',
    strengths: ['同理心', '价值观', '自我认知'],
    weaknesses: ['过于主观', '情绪化', '难以妥协']
  },
  Fe: { 
    color: '#417505', 
    description: '外向情感',
    detailedDescription: '外向情感(Fe)是一种社会性情感，善于理解和协调他人情感，重视和谐。',
    strengths: ['社交能力', '共情力', '团队协作'],
    weaknesses: ['过度迎合', '忽视自我', '情感依赖']
  }
};

const MBTI_COGNITIVE_STACKS: Record<MBTIType, CognitiveFunction[]> = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'],
  INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni']
};

export default function MBTICognitiveChart({ mbtiType, size = 300 }: MBTICognitiveChartProps) {
  const [selectedFunction, setSelectedFunction] = useState<CognitiveFunction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const center = size / 2;
  const radius = size * 0.4;
  const functions = MBTI_COGNITIVE_STACKS[mbtiType];

  // 计算功能位置
  const getFunctionPosition = (index: number) => {
    const angle = (index * 90) - 45;
    const radian = angle * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian)
    };
  };

  const handleFunctionPress = (func: CognitiveFunction) => {
    setSelectedFunction(func);
    setModalVisible(true);
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

        {/* 绘制功能连接线 */}
        {functions.map((func, index) => {
          const nextIndex = (index + 1) % functions.length;
          const pos1 = getFunctionPosition(index);
          const pos2 = getFunctionPosition(nextIndex);

          return (
            <Line
              key={`line-${index}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke="#000"
              strokeWidth="1"
            />
          );
        })}

        {/* 绘制功能点 */}
        {functions.map((func, index) => {
          const pos = getFunctionPosition(index);
          const { color, description } = COGNITIVE_FUNCTIONS[func];

          return (
            <G key={func}>
              <Circle
                cx={pos.x}
                cy={pos.y}
                r="12"
                fill={color}
                stroke="#000"
                strokeWidth="1"
                onPress={() => handleFunctionPress(func)}
              />
              <Text
                x={pos.x}
                y={pos.y - 20}
                textAnchor="middle"
                fontSize="10"
                fill="#000"
              >
                {func}
              </Text>
              <Text
                x={pos.x}
                y={pos.y + 30}
                textAnchor="middle"
                fontSize="8"
                fill="#666"
              >
                {description}
              </Text>
            </G>
          );
        })}

        {/* 绘制功能层级标签 */}
        {functions.map((_, index) => {
          const pos = getFunctionPosition(index);
          const label = ['主导', '辅助', '第三', '劣势'][index];
          
          return (
            <Text
              key={`label-${index}`}
              x={pos.x}
              y={pos.y + 45}
              textAnchor="middle"
              fontSize="8"
              fill="#999"
            >
              {label}
            </Text>
          );
        })}
      </Svg>

      <Portal>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Card style={styles.modalCard}>
              {selectedFunction && (
                <>
                  <Card.Content>
                    <Title style={styles.modalTitle}>
                      {COGNITIVE_FUNCTIONS[selectedFunction].description}
                    </Title>
                    <Paragraph style={styles.modalDescription}>
                      {COGNITIVE_FUNCTIONS[selectedFunction].detailedDescription}
                    </Paragraph>
                    <View style={styles.strengthsContainer}>
                      <Title style={styles.sectionTitle}>优势</Title>
                      {COGNITIVE_FUNCTIONS[selectedFunction].strengths.map((strength, index) => (
                        <View key={index} style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{strength}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.weaknessesContainer}>
                      <Title style={styles.sectionTitle}>劣势</Title>
                      {COGNITIVE_FUNCTIONS[selectedFunction].weaknesses.map((weakness, index) => (
                        <View key={index} style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{weakness}</Text>
                        </View>
                      ))}
                    </View>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => setModalVisible(false)}>关闭</Button>
                  </Card.Actions>
                </>
              )}
            </Card>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  strengthsContainer: {
    marginBottom: 15,
  },
  weaknessesContainer: {
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bullet: {
    marginRight: 8,
    fontSize: 16,
  },
  bulletText: {
    fontSize: 16,
    flex: 1,
  },
}); 