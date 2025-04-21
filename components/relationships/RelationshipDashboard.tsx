import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, List, Chip, Divider } from 'react-native-paper';
import { RelationshipAnalysis } from '../../types/relationships';

interface RelationshipDashboardProps {
  analysis: RelationshipAnalysis;
}

export default function RelationshipDashboard({ analysis }: RelationshipDashboardProps) {
  return (
    <ScrollView style={styles.container}>
      {/* 总体匹配度 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>总体匹配度</Title>
          <ProgressBar
            progress={analysis.compatibilityScore / 100}
            color={getScoreColor(analysis.compatibilityScore)}
            style={styles.progressBar}
          />
          <Paragraph style={styles.score}>
            {analysis.compatibilityScore}%
          </Paragraph>
        </Card.Content>
      </Card>

      {/* MBTI 分析 */}
      {analysis.mbtiCompatibility && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>MBTI 性格分析</Title>
            <ProgressBar
              progress={analysis.mbtiCompatibility.score}
              color={getScoreColor(analysis.mbtiCompatibility.score * 100)}
              style={styles.progressBar}
            />
            
            <List.Section>
              <List.Subheader>优势</List.Subheader>
              {analysis.mbtiCompatibility.strengths.map((strength, index) => (
                <List.Item
                  key={index}
                  title={strength}
                  left={props => <List.Icon {...props} icon="check" />}
                />
              ))}

              <List.Subheader>挑战</List.Subheader>
              {analysis.mbtiCompatibility.challenges.map((challenge, index) => (
                <List.Item
                  key={index}
                  title={challenge}
                  left={props => <List.Icon {...props} icon="alert" />}
                />
              ))}

              <List.Subheader>建议</List.Subheader>
              {analysis.mbtiCompatibility.advice.map((advice, index) => (
                <List.Item
                  key={index}
                  title={advice}
                  left={props => <List.Icon {...props} icon="lightbulb" />}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      )}

      {/* 占星分析 */}
      {analysis.astroCompatibility && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>占星合盘分析</Title>
            <ProgressBar
              progress={analysis.astroCompatibility.score}
              color={getScoreColor(analysis.astroCompatibility.score * 100)}
              style={styles.progressBar}
            />

            <View style={styles.aspectsContainer}>
              {analysis.astroCompatibility.aspects.map((aspect, index) => (
                <Chip
                  key={index}
                  style={[
                    styles.aspectChip,
                    {
                      backgroundColor:
                        aspect.influence === 'positive' ? '#E8F5E9' :
                        aspect.influence === 'negative' ? '#FFEBEE' : '#F5F5F5'
                    }
                  ]}
                >
                  {aspect.type}
                </Chip>
              ))}
            </View>

            {analysis.astroCompatibility.aspects.map((aspect, index) => (
              <Paragraph key={index} style={styles.aspectDescription}>
                {aspect.description}
              </Paragraph>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* 紫微斗数分析 */}
      {analysis.purpleStarCompatibility && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>紫微斗数合盘分析</Title>
            <ProgressBar
              progress={analysis.purpleStarCompatibility.score}
              color={getScoreColor(analysis.purpleStarCompatibility.score * 100)}
              style={styles.progressBar}
            />
            
            <Paragraph style={styles.analysisText}>
              {analysis.purpleStarCompatibility.analysis}
            </Paragraph>

            <Title style={styles.subtitle}>建议</Title>
            <Paragraph style={styles.adviceText}>
              {analysis.purpleStarCompatibility.advice}
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      {/* 综合建议 */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>综合建议</Title>
          
          <List.Section>
            <List.Subheader>沟通技巧</List.Subheader>
            {analysis.overallAdvice.communication.map((tip, index) => (
              <List.Item
                key={index}
                title={tip}
                left={props => <List.Icon {...props} icon="message" />}
              />
            ))}

            <List.Subheader>需要注意的挑战</List.Subheader>
            {analysis.overallAdvice.challenges.map((challenge, index) => (
              <List.Item
                key={index}
                title={challenge}
                left={props => <List.Icon {...props} icon="alert" />}
              />
            ))}

            <List.Subheader>发展机会</List.Subheader>
            {analysis.overallAdvice.opportunities.map((opportunity, index) => (
              <List.Item
                key={index}
                title={opportunity}
                left={props => <List.Icon {...props} icon="star" />}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#4CAF50';  // 绿色
  if (score >= 60) return '#FFC107';  // 黄色
  return '#F44336';  // 红色
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    marginVertical: 8,
  },
  score: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  aspectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  aspectChip: {
    margin: 4,
  },
  aspectDescription: {
    marginVertical: 4,
  },
  analysisText: {
    marginVertical: 8,
    lineHeight: 20,
  },
  adviceText: {
    marginVertical: 8,
    lineHeight: 20,
  },
}); 