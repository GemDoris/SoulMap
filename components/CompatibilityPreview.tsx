import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function CompatibilityPreview() {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={['#F8F9FD', '#F0F3FA']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profilesContainer}>
          <View style={styles.profile}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sarah</Text>
              <Text style={styles.profileType}>INFJ • Libra</Text>
            </View>
          </View>
          
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>vs</Text>
          </View>
          
          <View style={styles.profile}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>David</Text>
              <Text style={styles.profileType}>ENFP • Gemini</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.compatibilityContainer}>
          <View style={styles.compatibilityScore}>
            <Text style={styles.scoreValue}>92%</Text>
            <Text style={styles.scoreLabel}>Compatible</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <Stat label="Communication" value={95} color="#6C5CE7" />
            <Stat label="Emotional" value={90} color="#E84393" />
            <Stat label="Interests" value={85} color="#F6B93B" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function Stat({ label, value, color }) {
  return (
    <View style={styles.statItem}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color }]}>{value}%</Text>
      </View>
      <View style={styles.statBar}>
        <View style={[styles.statFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  gradientBackground: {
    padding: 20,
  },
  profilesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2D3748',
  },
  profileType: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
  },
  vsContainer: {
    paddingHorizontal: 12,
  },
  vsText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 16,
    color: '#A0AEC0',
  },
  compatibilityContainer: {
    flexDirection: 'row',
  },
  compatibilityScore: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  scoreValue: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#6C5CE7',
  },
  scoreLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statItem: {
    marginBottom: 8,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
  },
  statValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  statBar: {
    height: 4,
    backgroundColor: '#EDF2F7',
    borderRadius: 2,
  },
  statFill: {
    height: 4,
    borderRadius: 2,
  },
});