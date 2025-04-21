import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface TraitCardProps {
  traitType: string;
  trait: string;
  description: string;
  color: string;
}

export function TraitCard({ traitType, trait, description, color }: TraitCardProps) {
  const generateLighterColor = (hexColor: string): string => {
    // Simple way to generate a lighter shade for the gradient
    return hexColor + '80'; // Adding 50% opacity to create lighter shade
  };
  
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={[color, generateLighterColor(color)]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.traitType}>{traitType}</Text>
        <Text style={styles.trait}>{trait}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  traitType: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  trait: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});