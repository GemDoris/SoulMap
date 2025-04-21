import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Book, BrainCircuit, Star, Users, Download, Share2 } from 'lucide-react-native';
import { PersonalityChart } from '@/components/PersonalityChart';
import { InsightCard } from '@/components/InsightCard';

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: 100
        }}
      >
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Your Insights</Text>
          <Text style={styles.screenSubtitle}>
            Personalized insights based on your MBTI, astrology, and Purple Star profiles
          </Text>
        </View>
        
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                Overview
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'mbti' && styles.activeTab]}
              onPress={() => setActiveTab('mbti')}
            >
              <Text style={[styles.tabText, activeTab === 'mbti' && styles.activeTabText]}>
                MBTI
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'astrology' && styles.activeTab]}
              onPress={() => setActiveTab('astrology')}
            >
              <Text style={[styles.tabText, activeTab === 'astrology' && styles.activeTabText]}>
                Astrology
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'purplestar' && styles.activeTab]}
              onPress={() => setActiveTab('purplestar')}
            >
              <Text style={[styles.tabText, activeTab === 'purplestar' && styles.activeTabText]}>
                Purple Star
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'relationships' && styles.activeTab]}
              onPress={() => setActiveTab('relationships')}
            >
              <Text style={[styles.tabText, activeTab === 'relationships' && styles.activeTabText]}>
                Relationships
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {activeTab === 'overview' && (
          <View style={styles.overviewContainer}>
            <View style={styles.chartSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personality Blend</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Download size={18} color="#718096" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Share2 size={18} color="#718096" />
                  </TouchableOpacity>
                </View>
              </View>
              <PersonalityChart />
            </View>
            
            <View style={styles.insightsSection}>
              <Text style={styles.sectionTitle}>Today's Insights</Text>
              <Text style={styles.todayDate}>July 24, 2025</Text>
              
              <InsightCard 
                title="Communication Style"
                description="As an INFJ Libra, today is ideal for deep conversations. Your natural diplomacy is enhanced, making it a great day to resolve any misunderstandings."
                iconName="MessageCircle"
                gradient={['#6C5CE7', '#8E59E2']}
              />
              
              <InsightCard 
                title="Relationship Dynamics"
                description="Your Purple Star chart indicates a strong focus on partnerships today. Be mindful of balancing others' needs with your own."
                iconName="Users"
                gradient={['#F6B93B', '#FA983A']}
              />
              
              <InsightCard 
                title="Personal Growth"
                description="Your intuitive side is particularly strong today. Take time for reflection and journaling to capture insights about your path forward."
                iconName="BrainCircuit"
                gradient={['#E84393', '#FD79A8']}
              />
            </View>
            
            <View style={styles.journalSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Journal Prompts</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.promptsScrollView}
              >
                <JournalPromptCard 
                  prompt="How has your INFJ personality influenced your approach to conflicts in relationships?"
                  gradient={['#6C5CE7', '#8E59E2']}
                />
                
                <JournalPromptCard 
                  prompt="Reflect on how your Libra traits balance or conflict with your Purple Star characteristics."
                  gradient={['#F6B93B', '#FA983A']}
                />
                
                <JournalPromptCard 
                  prompt="What communication patterns have you noticed in your most successful relationships?"
                  gradient={['#E84393', '#FD79A8']}
                />
              </ScrollView>
            </View>
            
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Recommended Resources</Text>
              
              <TouchableOpacity style={styles.resourceCard}>
                <View style={[styles.resourceIcon, { backgroundColor: '#F0EEFE' }]}>
                  <Book size={20} color="#6C5CE7" />
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>The INFJ Relationship Guide</Text>
                  <Text style={styles.resourceDescription}>Essential reading for understanding your unique relationship needs</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <View style={[styles.resourceIcon, { backgroundColor: '#FEEBF3' }]}>
                  <Calendar size={20} color="#E84393" />
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>Astrology Calendar</Text>
                  <Text style={styles.resourceDescription}>Track important dates and cosmic events that affect your relationships</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.resourceCard}>
                <View style={[styles.resourceIcon, { backgroundColor: '#FEF5E5' }]}>
                  <Star size={20} color="#F6B93B" />
                </View>
                <View style={styles.resourceContent}>
                  <Text style={styles.resourceTitle}>Purple Star Analysis</Text>
                  <Text style={styles.resourceDescription}>Detailed breakdown of your Purple Star chart and its relational implications</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {activeTab === 'mbti' && (
          <View style={styles.mbtiContainer}>
            <View style={styles.mbtiHeaderSection}>
              <View style={styles.mbtiTypeCard}>
                <LinearGradient
                  colors={['#6C5CE7', '#8E59E2']}
                  style={styles.mbtiGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.mbtiTypeText}>INFJ</Text>
                  <Text style={styles.mbtiTypeDescription}>The Advocate</Text>
                </LinearGradient>
              </View>
              <Text style={styles.mbtiDescription}>
                INFJs are creative, gentle, and caring. They seek meaning and connection, working towards the greater good with insight and conviction.
              </Text>
            </View>
            
            <View style={styles.mbtiTraitsSection}>
              <Text style={styles.sectionTitle}>Core Traits</Text>
              
              <View style={styles.traitsPairs}>
                <TraitPair 
                  trait1="Introverted" 
                  trait2="Extroverted" 
                  value={75} 
                  leftColor="#6C5CE7"
                />
                
                <TraitPair 
                  trait1="Intuitive" 
                  trait2="Sensing" 
                  value={82} 
                  leftColor="#6C5CE7"
                />
                
                <TraitPair 
                  trait1="Feeling" 
                  trait2="Thinking" 
                  value={68} 
                  leftColor="#6C5CE7"
                />
                
                <TraitPair 
                  trait1="Judging" 
                  trait2="Perceiving" 
                  value={65} 
                  leftColor="#6C5CE7"
                />
              </View>
            </View>
            
            <View style={styles.mbtiCommunicationSection}>
              <Text style={styles.sectionTitle}>Communication Style</Text>
              <View style={styles.communicationCard}>
                <Text style={styles.communicationDescription}>
                  As an INFJ, you tend to communicate with depth and empathy. You prefer meaningful conversations over small talk and are attentive to both spoken and unspoken cues.
                </Text>
                
                <View style={styles.communicationPoints}>
                  <View style={styles.communicationPoint}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>You listen intently and read between the lines</Text>
                  </View>
                  
                  <View style={styles.communicationPoint}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>You're thoughtful before speaking, preferring to organize your thoughts</Text>
                  </View>
                  
                  <View style={styles.communicationPoint}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>You focus on harmony and avoiding conflict</Text>
                  </View>
                  
                  <View style={styles.communicationPoint}>
                    <View style={styles.pointDot} />
                    <Text style={styles.pointText}>You may struggle expressing needs directly</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.mbtiRelationshipsSection}>
              <Text style={styles.sectionTitle}>Relationship Patterns</Text>
              
              <View style={styles.relationshipStrengths}>
                <Text style={styles.relationshipSubtitle}>Strengths</Text>
                <View style={styles.strengthsList}>
                  <StrengthItem text="Deep emotional connection" />
                  <StrengthItem text="Empathetic understanding" />
                  <StrengthItem text="Loyalty and commitment" />
                  <StrengthItem text="Intuitive insights about partner" />
                </View>
              </View>
              
              <View style={styles.relationshipChallenges}>
                <Text style={styles.relationshipSubtitle}>Challenges</Text>
                <View style={styles.challengesList}>
                  <ChallengeItem text="Difficulty expressing needs" />
                  <ChallengeItem text="Tendency to absorb partner's emotions" />
                  <ChallengeItem text="Perfectionist expectations" />
                  <ChallengeItem text="Need for alone time may be misinterpreted" />
                </View>
              </View>
            </View>
            
            <View style={styles.mbtiCompatibilitySection}>
              <Text style={styles.sectionTitle}>MBTI Compatibility</Text>
              
              <View style={styles.compatibilityGroup}>
                <Text style={styles.compatibilityGroupTitle}>Most Compatible</Text>
                <View style={styles.compatibilityTypes}>
                  <CompatibilityTypeCard type="ENFP" percentage={95} />
                  <CompatibilityTypeCard type="ENTP" percentage={92} />
                  <CompatibilityTypeCard type="INTJ" percentage={90} />
                  <CompatibilityTypeCard type="ENFJ" percentage={88} />
                </View>
              </View>
              
              <View style={styles.compatibilityGroup}>
                <Text style={styles.compatibilityGroupTitle}>Challenging Matches</Text>
                <View style={styles.compatibilityTypes}>
                  <CompatibilityTypeCard type="ESTP" percentage={65} />
                  <CompatibilityTypeCard type="ESFP" percentage={68} />
                  <CompatibilityTypeCard type="ISTP" percentage={70} />
                  <CompatibilityTypeCard type="ESTJ" percentage={72} />
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* For simplicity, we're only implementing the first two tabs fully */}
        {(activeTab === 'astrology' || activeTab === 'purplestar' || activeTab === 'relationships') && (
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderContent}>
              <BrainCircuit size={48} color="#A0AEC0" />
              <Text style={styles.placeholderTitle}>
                {activeTab === 'astrology' ? 'Astrology Insights' : 
                 activeTab === 'purplestar' ? 'Purple Star Analysis' : 
                 'Relationship Insights'}
              </Text>
              <Text style={styles.placeholderDescription}>
                This section is currently under development. Check back soon for detailed {activeTab} insights.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function JournalPromptCard({ prompt, gradient }) {
  return (
    <TouchableOpacity style={styles.promptCard}>
      <LinearGradient
        colors={gradient}
        style={styles.promptGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.promptText}>{prompt}</Text>
        <TouchableOpacity style={styles.promptButton}>
          <Text style={styles.promptButtonText}>Respond</Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function TraitPair({ trait1, trait2, value, leftColor }) {
  return (
    <View style={styles.traitPairContainer}>
      <View style={styles.traitLabels}>
        <Text style={[styles.traitLabel, { color: leftColor }]}>{trait1}</Text>
        <Text style={styles.traitLabel}>{trait2}</Text>
      </View>
      <View style={styles.traitBarContainer}>
        <View style={[styles.traitBar, { width: `${value}%`, backgroundColor: leftColor }]} />
      </View>
      <Text style={styles.traitValue}>{value}%</Text>
    </View>
  );
}

function StrengthItem({ text }) {
  return (
    <View style={styles.strengthItem}>
      <View style={styles.strengthMarker} />
      <Text style={styles.strengthText}>{text}</Text>
    </View>
  );
}

function ChallengeItem({ text }) {
  return (
    <View style={styles.challengeItem}>
      <View style={styles.challengeMarker} />
      <Text style={styles.challengeText}>{text}</Text>
    </View>
  );
}

function CompatibilityTypeCard({ type, percentage }) {
  return (
    <View style={styles.compatibilityTypeCard}>
      <Text style={styles.compatibilityType}>{type}</Text>
      <Text style={styles.compatibilityPercentage}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  screenTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 28,
    color: '#2D3748',
    marginBottom: 8,
  },
  screenSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  tabsContainer: {
    marginBottom: 24,
    paddingLeft: 20,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6C5CE7',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#A0AEC0',
  },
  activeTabText: {
    color: '#6C5CE7',
  },
  
  // Overview tab styles
  overviewContainer: {
    paddingHorizontal: 20,
  },
  chartSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
  },
  insightsSection: {
    marginBottom: 32,
  },
  todayDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  journalSection: {
    marginBottom: 32,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  promptsScrollView: {
    marginLeft: -8,
  },
  promptCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  promptGradient: {
    padding: 20,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  promptText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginBottom: 20,
  },
  promptButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  promptButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
  },
  recommendationsSection: {
    marginBottom: 32,
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 4,
  },
  resourceDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  
  // MBTI tab styles
  mbtiContainer: {
    paddingHorizontal: 20,
  },
  mbtiHeaderSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mbtiTypeCard: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  mbtiGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mbtiTypeText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 28,
    color: 'white',
    marginBottom: 4,
  },
  mbtiTypeDescription: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  mbtiDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  mbtiTraitsSection: {
    marginBottom: 32,
  },
  traitsPairs: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  traitPairContainer: {
    marginBottom: 20,
  },
  traitLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  traitLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#A0AEC0',
  },
  traitBarContainer: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    marginBottom: 4,
  },
  traitBar: {
    height: 8,
    borderRadius: 4,
  },
  traitValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#718096',
    alignSelf: 'flex-end',
  },
  mbtiCommunicationSection: {
    marginBottom: 32,
  },
  communicationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  communicationDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 16,
  },
  communicationPoints: {
    gap: 12,
  },
  communicationPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pointDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C5CE7',
    marginTop: 6,
    marginRight: 12,
  },
  pointText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  mbtiRelationshipsSection: {
    marginBottom: 32,
  },
  relationshipSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 12,
  },
  relationshipStrengths: {
    marginBottom: 20,
  },
  strengthsList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  strengthMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C5CE7',
    marginRight: 12,
  },
  strengthText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A5568',
  },
  relationshipChallenges: {
    marginBottom: 20,
  },
  challengesList: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  challengeMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E84393',
    marginRight: 12,
  },
  challengeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A5568',
  },
  mbtiCompatibilitySection: {
    marginBottom: 32,
  },
  compatibilityGroup: {
    marginBottom: 24,
  },
  compatibilityGroupTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 12,
  },
  compatibilityTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  compatibilityTypeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  compatibilityType: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 4,
  },
  compatibilityPercentage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  
  // Placeholder styles for unimplemented tabs
  placeholderContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    width: '100%',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  placeholderTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});