import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit2, Calendar, Star, User, Heart, MessageCircle, Moon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileChart } from '@/components/ProfileChart';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('personality');
  
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: 100
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#2D3748" />
          </TouchableOpacity>
          
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
                style={styles.profileImage} 
              />
              <TouchableOpacity style={styles.editButton}>
                <Edit2 size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>Sarah Chen</Text>
            <Text style={styles.userBio}>INFJ • Libra • Dragon</Text>
            
            <View style={styles.personalityBadges}>
              <PersonalityBadge icon={<Star size={14} color="#F6B93B" />} text="Libra" color="#F6B93B" />
              <PersonalityBadge icon={<User size={14} color="#6C5CE7" />} text="INFJ" color="#6C5CE7" />
              <PersonalityBadge icon={<Moon size={14} color="#E84393" />} text="Purple" color="#E84393" />
            </View>
          </View>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'personality' && styles.activeTab]} 
            onPress={() => setActiveTab('personality')}
          >
            <Text style={[styles.tabText, activeTab === 'personality' && styles.activeTabText]}>Personality</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'relationship' && styles.activeTab]} 
            onPress={() => setActiveTab('relationship')}
          >
            <Text style={[styles.tabText, activeTab === 'relationship' && styles.activeTabText]}>Relationship</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'insights' && styles.activeTab]} 
            onPress={() => setActiveTab('insights')}
          >
            <Text style={[styles.tabText, activeTab === 'insights' && styles.activeTabText]}>Insights</Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'personality' && (
          <View style={styles.tabContent}>
            <View style={styles.chartSection}>
              <Text style={styles.sectionTitle}>Personality Breakdown</Text>
              <ProfileChart />
            </View>
            
            <View style={styles.traitsSection}>
              <Text style={styles.sectionTitle}>Key Traits</Text>
              
              <View style={styles.traitsList}>
                <TraitItem 
                  title="Intuitive" 
                  description="You focus on the big picture rather than details and facts"
                  value={85}
                />
                <TraitItem 
                  title="Empathetic" 
                  description="You're highly attuned to people's emotions and needs"
                  value={92}
                />
                <TraitItem 
                  title="Idealistic" 
                  description="You have strong personal values and seek meaning"
                  value={78}
                />
                <TraitItem 
                  title="Creative" 
                  description="You have a rich inner world and imagination"
                  value={88}
                />
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'relationship' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Relationship Patterns</Text>
            <Text style={styles.relationshipText}>
              As an INFJ Libra, you seek deep, meaningful connections with harmony and balance. You're drawn to intellectual partners who share your values and vision for the future.
            </Text>
            
            <View style={styles.compatibilitySection}>
              <Text style={styles.subSectionTitle}>Most Compatible With</Text>
              <View style={styles.compatibilityCards}>
                <CompatibilityCard type="MBTI" match="ENFP" percentage={92} />
                <CompatibilityCard type="Zodiac" match="Gemini" percentage={87} />
                <CompatibilityCard type="Chinese" match="Monkey" percentage={85} />
              </View>
            </View>
            
            <View style={styles.relationshipTipsSection}>
              <Text style={styles.subSectionTitle}>Relationship Tips</Text>
              <View style={styles.tipsList}>
                <RelationshipTip 
                  title="Express Needs Clearly" 
                  icon={<MessageCircle size={20} color="#6C5CE7" />}
                  description="Your intuition doesn't mean others know what you need"
                />
                <RelationshipTip 
                  title="Balance Giving & Receiving" 
                  icon={<Heart size={20} color="#E84393" />}
                  description="Allow yourself to receive as much as you give to others"
                />
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'insights' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Personal Insights</Text>
            <Text style={styles.insightsText}>
              Based on your personality profile, here are some personalized insights to help you grow and thrive.
            </Text>
            
            <View style={styles.insightCards}>
              <InsightCard 
                title="Career Path" 
                description="Your idealism and creativity make you well-suited for roles in counseling, writing, or social impact"
                gradient={['#6C5CE7', '#8E59E2']}
              />
              <InsightCard 
                title="Personal Growth" 
                description="Practice setting boundaries to prevent burnout and emotional exhaustion"
                gradient={['#E84393', '#FD79A8']}
              />
              <InsightCard 
                title="Social Style" 
                description="You thrive in small, intimate gatherings rather than large social events"
                gradient={['#F6B93B', '#FA983A']}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PersonalityBadge({ icon, text, color }) {
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      {icon}
      <Text style={[styles.badgeText, { color }]}>{text}</Text>
    </View>
  );
}

function TraitItem({ title, description, value }) {
  return (
    <View style={styles.traitItem}>
      <View style={styles.traitHeader}>
        <Text style={styles.traitTitle}>{title}</Text>
        <Text style={styles.traitValue}>{value}%</Text>
      </View>
      <View style={styles.traitBarContainer}>
        <View style={[styles.traitBar, { width: `${value}%` }]} />
      </View>
      <Text style={styles.traitDescription}>{description}</Text>
    </View>
  );
}

function CompatibilityCard({ type, match, percentage }) {
  return (
    <View style={styles.compatibilityCard}>
      <Text style={styles.compatibilityType}>{type}</Text>
      <Text style={styles.compatibilityMatch}>{match}</Text>
      <Text style={styles.compatibilityPercentage}>{percentage}%</Text>
      <View style={styles.compatibilityBarContainer}>
        <View style={[styles.compatibilityBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

function RelationshipTip({ title, icon, description }) {
  return (
    <View style={styles.tipItem}>
      <View style={styles.tipIconContainer}>
        {icon}
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{title}</Text>
        <Text style={styles.tipDescription}>{description}</Text>
      </View>
    </View>
  );
}

function InsightCard({ title, description, gradient }) {
  return (
    <LinearGradient
      colors={gradient}
      style={styles.insightCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.insightTitle}>{title}</Text>
      <Text style={styles.insightDescription}>{description}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    padding: 20,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6C5CE7',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#2D3748',
    marginBottom: 4,
  },
  userBio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    marginBottom: 16,
  },
  personalityBadges: {
    flexDirection: 'row',
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    backgroundColor: 'white',
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C5CE7',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#718096',
  },
  activeTabText: {
    color: '#6C5CE7',
  },
  tabContent: {
    padding: 20,
  },
  chartSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 16,
  },
  traitsSection: {
    marginBottom: 32,
  },
  traitsList: {
    gap: 16,
  },
  traitItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  traitTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
  },
  traitValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#6C5CE7',
  },
  traitBarContainer: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 12,
  },
  traitBar: {
    height: 6,
    backgroundColor: '#6C5CE7',
    borderRadius: 3,
  },
  traitDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
  },
  relationshipText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  compatibilitySection: {
    marginBottom: 24,
  },
  subSectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 16,
  },
  compatibilityCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compatibilityCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  compatibilityType: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
  },
  compatibilityMatch: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginTop: 4,
  },
  compatibilityPercentage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
    marginTop: 8,
  },
  compatibilityBarContainer: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 8,
  },
  compatibilityBar: {
    height: 4,
    backgroundColor: '#6C5CE7',
    borderRadius: 2,
  },
  relationshipTipsSection: {
    marginTop: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 4,
  },
  tipDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
  },
  insightsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  insightCards: {
    gap: 16,
  },
  insightCard: {
    borderRadius: 12,
    padding: 20,
  },
  insightTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  insightDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
  },
});