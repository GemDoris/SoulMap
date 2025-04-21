import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BrainCircuit, Star, BookOpen, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnalysisScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const analysisTypes = [
    {
      id: 'mbti',
      title: 'MBTI Analysis',
      description: 'Understand your personality type and cognitive functions',
      icon: BrainCircuit,
      gradient: ['#6C5CE7', '#8E59E2'],
      route: '/analysis/mbti',
    },
    {
      id: 'astrology',
      title: 'Astrology',
      description: 'Explore your zodiac sign and planetary influences',
      icon: Star,
      gradient: ['#F6B93B', '#FA983A'],
      route: '/analysis/astrology',
    },
    {
      id: 'purple-star',
      title: 'Purple Star',
      description: 'Discover your destiny through Purple Star Astrology',
      icon: BookOpen,
      gradient: ['#4834D4', '#686DE0'],
      route: '/analysis/purple-star',
    },
    {
      id: 'relationships',
      title: 'Relationships',
      description: 'Analyze compatibility and improve connections',
      icon: Heart,
      gradient: ['#E84393', '#FD79A8'],
      route: '/analysis/relationships',
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Personality Analysis</Text>
        <Text style={styles.subtitle}>
          Gain deep insights into your personality through multiple perspectives
        </Text>
      </View>

      <View style={styles.grid}>
        {analysisTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={styles.card}
            onPress={() => router.push(type.route)}
          >
            <LinearGradient
              colors={type.gradient}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconContainer}>
                <type.icon size={32} color="white" />
              </View>
              <Text style={styles.cardTitle}>{type.title}</Text>
              <Text style={styles.cardDescription}>{type.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Why Multiple Perspectives?</Text>
        <Text style={styles.infoText}>
          Each analysis system offers unique insights into your personality and life path. 
          By combining MBTI, Western Astrology, and Purple Star Astrology, you'll gain a 
          more comprehensive understanding of yourself and your relationships.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    padding: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardGradient: {
    padding: 20,
    minHeight: 200,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  infoTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#4A5568',
    lineHeight: 24,
  },
});