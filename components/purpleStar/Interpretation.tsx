import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PurpleStarChart } from '../../types/purpleStar';

interface InterpretationProps {
  data: PurpleStarChart;
}

export default function Interpretation({ data }: InterpretationProps) {
  return (
    <ScrollView style={styles.container}>
      {/* 命主解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>命主解读</Title>
          <Paragraph>
            您的命主为{data.dayMaster}，{data.heavenlyStem}{data.earthBranch}日生。
            这表示您...
          </Paragraph>
        </Card.Content>
      </Card>

      {/* 命宫解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>命宫解读</Title>
          <Paragraph>
            命宫位于{data.palaces[data.mingGong - 1].name}，
            主星为{data.palaces[data.mingGong - 1].mainStar}。
            这表示您的个性...
          </Paragraph>
        </Card.Content>
      </Card>

      {/* 身宫解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>身宫解读</Title>
          <Paragraph>
            身宫位于{data.palaces[data.shenGong - 1].name}，
            这表示您的外在表现...
          </Paragraph>
        </Card.Content>
      </Card>

      {/* 重要宫位解读 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>重要宫位解读</Title>
          {data.palaces
            .filter(palace => ['财帛', '官禄', '夫妻', '子女'].includes(palace.name))
            .map((palace, index) => (
              <Paragraph key={index}>
                {palace.name}宫：位于第{palace.position}宫，
                主星{palace.mainStar}，
                同宫星曜有{palace.stars.map(s => s.name).join('、')}。
                这表示您在{palace.name}方面...
              </Paragraph>
            ))}
        </Card.Content>
      </Card>

      {/* 流年运势 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>流年运势</Title>
          <Paragraph>
            根据您的命盘特点，今年的运势主要表现在...
          </Paragraph>
        </Card.Content>
      </Card>

      {/* 吉凶建议 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>吉凶建议</Title>
          <Paragraph>
            建议您在事业上...
          </Paragraph>
          <Paragraph>
            在感情方面...
          </Paragraph>
          <Paragraph>
            在财运方面...
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