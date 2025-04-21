import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BrainCircuit, ArrowLeft, MessageCircle, Heart, BookOpen, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function MBTIAnalysisScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(null);

  const mbtiTypes = [
    { id: 'INFJ', title: 'INFJ - The Advocate', description: 'Quiet, mystical, and insightful' },
    { id: 'INTJ', title: 'INTJ - The Architect', description: 'Innovative, strategic, and logical' },
    { id: 'INFP', title: 'INFP - The Mediator', description: 'Idealistic, creative, and empathetic' },
    { id: 'INTP', title: 'INTP - The Logician', description: 'Analytical, theoretical, and abstract' },
    // Add more MBTI types...
  ];

  const traits = [
    {
      title: 'Introversion vs. Extroversion',
      description: 'How you gain energy and process information',
      icon: Users,
      color: '#6C5CE7',
    },
    {
      title: 'Intuition vs. Sensing',
      description: 'How you perceive and gather information',
      icon: BrainCircuit,
      color: '#F6B93B',
    },
    {
      title: 'Feeling vs. Thinking',
      description: 'How you make decisions and judgments',
      icon: Heart,
      color: '#E84393',
    },
    {
      title: 'Judging vs. Perceiving',
      description: 'How you approach structure and planning',
      icon: BookOpen,
      color: '#00B894',
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#2D3748" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <BrainCircuit size={32} color="#6C5CE7" />
          </View>
          <Text style={styles.title}>MBTI Analysis</Text>
          <Text style={styles.subtitle}>
            Discover your personality type and understand your cognitive functions
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Traits</Text>
        <View style={styles.traitsGrid}>
          {traits.map((trait, index) => (
            <View key={index} style={styles.traitCard}>
              <View style={[styles.traitIcon, { backgroundColor: `${trait.color}10` }]}>
                <trait.icon size={24} color={trait.color} />
              </View>
              <Text style={styles.traitTitle}>{trait.title}</Text>
              <Text style={styles.traitDescription}>{trait.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Type</Text>
        <View style={styles.typesList}>
          {mbtiTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.selectedTypeCard,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Text style={[
                styles.typeTitle,
                selectedType === type.id && styles.selectedTypeTitle,
              ]}>
                {type.title}
              </Text>
              <Text style={[
                styles.typeDescription,
                selectedType === type.id && styles.selectedTypeDescription,
              ]}>
                {type.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.analyzeButton}>
        <LinearGradient
          colors={['#6C5CE7', '#8E59E2']}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Start Analysis</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#F0EEFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 28,
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 16,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  traitCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  traitIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  traitTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 4,
  },
  traitDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
    lineHeight: 18,
  },
  typesList: {
    gap: 12,
  },
  typeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTypeCard: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F0EEFE',
  },
  typeTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 4,
  },
  selectedTypeTitle: {
    color: '#6C5CE7',
  },
  typeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
  },
  selectedTypeDescription: {
    color: '#4A5568',
  },
  analyzeButton: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
});