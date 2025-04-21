import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, Heart, Users, Check } from 'lucide-react-native';
import { CompatibilityMeter } from '@/components/CompatibilityMeter';

export default function CompatibilityScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedMode, setSelectedMode] = useState('single');
  
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
          <Text style={styles.screenTitle}>Compatibility</Text>
          <Text style={styles.screenSubtitle}>Find your perfect match using AI-powered analysis</Text>
        </View>
        
        <View style={styles.modeSelector}>
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'single' && styles.activeModeButton]}
            onPress={() => setSelectedMode('single')}
          >
            <Heart 
              size={18} 
              color={selectedMode === 'single' ? '#FFF' : '#4A5568'} 
              style={styles.modeIcon}
            />
            <Text style={[styles.modeText, selectedMode === 'single' && styles.activeModeText]}>
              Find Partner
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'analyze' && styles.activeModeButton]}
            onPress={() => setSelectedMode('analyze')}
          >
            <Users 
              size={18} 
              color={selectedMode === 'analyze' ? '#FFF' : '#4A5568'} 
              style={styles.modeIcon}
            />
            <Text style={[styles.modeText, selectedMode === 'analyze' && styles.activeModeText]}>
              Analyze Match
            </Text>
          </TouchableOpacity>
        </View>
        
        {selectedMode === 'single' && (
          <View style={styles.singleMode}>
            <View style={styles.currentUserSection}>
              <Text style={styles.sectionTitle}>Your Profile</Text>
              <View style={styles.userProfileCard}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
                  style={styles.userImage} 
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>Sarah Chen</Text>
                  <Text style={styles.userTraits}>INFJ • Libra • Dragon</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.matchPreferencesSection}>
              <Text style={styles.sectionTitle}>Match Preferences</Text>
              <View style={styles.preferencesCard}>
                <PreferenceItem 
                  title="MBTI Types" 
                  selected={['ENFP', 'ENTP', 'INTJ']} 
                  onPress={() => {}}
                />
                <PreferenceItem 
                  title="Zodiac Signs" 
                  selected={['Gemini', 'Aquarius', 'Leo']} 
                  onPress={() => {}}
                />
                <PreferenceItem 
                  title="Age Range" 
                  selected={['25-35']} 
                  onPress={() => {}}
                />
                <PreferenceItem 
                  title="Distance" 
                  selected={['Within 30 miles']} 
                  onPress={() => {}}
                />
              </View>
            </View>
            
            <TouchableOpacity style={styles.findMatchesButton}>
              <LinearGradient
                colors={['#6C5CE7', '#8E59E2']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Find Matches</Text>
                <ArrowRight size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.topMatchesSection}>
              <Text style={styles.sectionTitle}>Top Matches</Text>
              
              <MatchCard 
                name="David Kim"
                image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                traits="ENFP • Gemini • Monkey"
                compatibility={92}
              />
              
              <MatchCard 
                name="Emma Watson"
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                traits="ENTP • Aquarius • Tiger"
                compatibility={88}
              />
              
              <MatchCard 
                name="Michael Chen"
                image="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
                traits="INTJ • Leo • Rabbit"
                compatibility={85}
              />
            </View>
          </View>
        )}
        
        {selectedMode === 'analyze' && (
          <View style={styles.analyzeMode}>
            <Text style={styles.analyzeInstructions}>
              Select two personality profiles to analyze their compatibility
            </Text>
            
            <View style={styles.profileSelectionContainer}>
              <View style={styles.profileSelectionSection}>
                <Text style={styles.profileSelectionTitle}>Profile 1</Text>
                <View style={styles.selectedProfile}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
                    style={styles.selectedProfileImage} 
                  />
                  <View style={styles.selectedProfileInfo}>
                    <Text style={styles.selectedProfileName}>Sarah Chen</Text>
                    <Text style={styles.selectedProfileTraits}>INFJ • Libra • Dragon</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.profileSelectionSection}>
                <Text style={styles.profileSelectionTitle}>Profile 2</Text>
                <TouchableOpacity style={styles.profileSelectionButton}>
                  <Text style={styles.profileSelectionButtonText}>Select a profile</Text>
                  <ArrowRight size={16} color="#6C5CE7" />
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity style={[styles.findMatchesButton, styles.analyzeButton]}>
              <LinearGradient
                colors={['#6C5CE7', '#8E59E2']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Analyze Compatibility</Text>
                <ArrowRight size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            
            <View style={styles.recentAnalysisSection}>
              <Text style={styles.sectionTitle}>Recent Analysis</Text>
              
              <TouchableOpacity style={styles.analysisResultCard}>
                <View style={styles.analysisProfiles}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
                    style={styles.analysisProfileImage} 
                  />
                  <Text style={styles.analysisVsText}>vs</Text>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
                    style={styles.analysisProfileImage} 
                  />
                </View>
                <Text style={styles.analysisNames}>Sarah & David</Text>
                <CompatibilityMeter percentage={92} />
                <Text style={styles.analysisSummary}>Excellent match with strong emotional connection</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.analysisResultCard}>
                <View style={styles.analysisProfiles}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
                    style={styles.analysisProfileImage} 
                  />
                  <Text style={styles.analysisVsText}>vs</Text>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' }} 
                    style={styles.analysisProfileImage} 
                  />
                </View>
                <Text style={styles.analysisNames}>Sarah & Michael</Text>
                <CompatibilityMeter percentage={85} />
                <Text style={styles.analysisSummary}>Good match with complementary strengths</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function PreferenceItem({ title, selected, onPress }) {
  return (
    <TouchableOpacity style={styles.preferenceItem} onPress={onPress}>
      <Text style={styles.preferenceTitle}>{title}</Text>
      <View style={styles.preferenceSelectedContainer}>
        {selected.map((item, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{item}</Text>
            <Check size={12} color="#6C5CE7" />
          </View>
        ))}
      </View>
      <ArrowRight size={16} color="#A0AEC0" />
    </TouchableOpacity>
  );
}

function MatchCard({ name, image, traits, compatibility }) {
  return (
    <TouchableOpacity style={styles.matchCard}>
      <Image source={{ uri: image }} style={styles.matchImage} />
      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>{name}</Text>
        <Text style={styles.matchTraits}>{traits}</Text>
        <View style={styles.compatibilityContainer}>
          <View style={styles.compatibilityBar}>
            <View 
              style={[
                styles.compatibilityFill, 
                { width: `${compatibility}%` }
              ]} 
            />
          </View>
          <Text style={styles.compatibilityText}>{compatibility}%</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  modeSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeModeButton: {
    backgroundColor: '#6C5CE7',
  },
  modeIcon: {
    marginRight: 8,
  },
  modeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  activeModeText: {
    color: '#FFF',
  },
  singleMode: {
    paddingHorizontal: 20,
  },
  currentUserSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 16,
  },
  userProfileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 4,
  },
  userTraits: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
  },
  matchPreferencesSection: {
    marginBottom: 24,
  },
  preferencesCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  preferenceTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    width: 120,
  },
  preferenceSelectedContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 16,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EEFE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  selectedItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6C5CE7',
    marginRight: 4,
  },
  findMatchesButton: {
    marginBottom: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    marginRight: 8,
  },
  topMatchesSection: {
    marginBottom: 24,
  },
  matchCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  matchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  matchInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 4,
  },
  matchTraits: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  compatibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginRight: 12,
  },
  compatibilityFill: {
    height: 6,
    backgroundColor: '#6C5CE7',
    borderRadius: 3,
  },
  compatibilityText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#6C5CE7',
  },
  analyzeMode: {
    paddingHorizontal: 20,
  },
  analyzeInstructions: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 24,
    lineHeight: 20,
  },
  profileSelectionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  profileSelectionSection: {
    marginBottom: 20,
  },
  profileSelectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 12,
  },
  selectedProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  selectedProfileInfo: {
    flex: 1,
  },
  selectedProfileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 4,
  },
  selectedProfileTraits: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#718096',
  },
  profileSelectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
  },
  profileSelectionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  analyzeButton: {
    marginBottom: 24,
  },
  recentAnalysisSection: {
    marginBottom: 24,
  },
  analysisResultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  analysisProfiles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  analysisVsText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 16,
    color: '#718096',
    marginHorizontal: 16,
  },
  analysisNames: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 16,
  },
  analysisSummary: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    marginTop: 12,
  },
});