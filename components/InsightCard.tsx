import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Users, BrainCircuit } from 'lucide-react-native';

interface InsightCardProps {
  title: string;
  description: string;
  iconName: 'MessageCircle' | 'Users' | 'BrainCircuit';
  gradient: string[];
}

export function InsightCard({ title, description, iconName, gradient }: InsightCardProps) {
  // Helper to render the correct icon
  const renderIcon = () => {
    switch (iconName) {
      case 'MessageCircle':
        return <MessageCircle size={24} color="white" />;
      case 'Users':
        return <Users size={24} color="white" />;
      case 'BrainCircuit':
        return <BrainCircuit size={24} color="white" />;
      default:
        return <MessageCircle size={24} color="white" />;
    }
  };
  
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  gradient: {
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
});