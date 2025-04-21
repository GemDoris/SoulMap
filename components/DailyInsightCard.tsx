import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, ArrowRight } from 'lucide-react-native';

export function DailyInsightCard() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <LinearGradient
        colors={['#6C5CE7', '#8E59E2']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.dateContainer}>
          <Calendar size={16} color="white" />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        <Text style={styles.insightTitle}>Today's Insight</Text>
        <Text style={styles.insightText}>
          Your INFJ traits combined with Libra's harmonizing energy make today ideal for deep, meaningful conversations. Focus on active listening to strengthen connections.
        </Text>
        
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read Full Insight</Text>
          <ArrowRight size={16} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  gradientBackground: {
    padding: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
  },
  insightTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 12,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white',
    lineHeight: 22,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'white',
    marginRight: 8,
  },
});