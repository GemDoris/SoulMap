import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ChartData } from '../../types/astrology';

interface InterpretationProps {
  data: ChartData;
}

export default function Interpretation({ data }: InterpretationProps) {
  return (
    <ScrollView style={styles.container}>
      {/* 行星解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>行星位置解读</Title>
          {data.planets.map((planet, index) => (
            <Paragraph key={index}>
              {planet.name}位于{planet.sign}座{planet.degree}度，
              在第{planet.house}宫。这表示...
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      {/* 相位解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>相位分析</Title>
          {data.aspects.map((aspect, index) => (
            <Paragraph key={index}>
              {aspect.planet1}与{aspect.planet2}形成{aspect.type}相位
              （{aspect.angle}度），这意味着...
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      {/* 宫位解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>宫位分析</Title>
          <Paragraph>
            上升点位于{data.ascendant}度，表示...
          </Paragraph>
          <Paragraph>
            中天点位于{data.midheaven}度，表示...
          </Paragraph>
        </Card.Content>
      </Card>

      {/* 综合解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>综合分析</Title>
          <Paragraph>
            根据您的星盘，您的性格特点主要表现为...
          </Paragraph>
          <Paragraph>
            在事业发展方面，建议您...
          </Paragraph>
          <Paragraph>
            在感情方面，您倾向于...
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
}); 