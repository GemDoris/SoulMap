import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bookmark, Clock, Award, MessageCircle, Heart, BookOpen } from 'lucide-react-native';

interface CommunicationExerciseCardProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  iconName: 'MessageCircle' | 'Heart' | 'BookOpen';
  color: string;
  saved: boolean;
}

export function CommunicationExerciseCard({
  title,
  description,
  duration,
  level,
  iconName,
  color,
  saved
}: CommunicationExerciseCardProps) {
  // Helper to render the correct icon based on iconName
  const renderIcon = () => {
    switch (iconName) {
      case 'MessageCircle':
        return <MessageCircle size={24} color={color} />;
      case 'Heart':
        return <Heart size={24} color={color} />;
      case 'BookOpen':
        return <BookOpen size={24} color={color} />;
      default:
        return <MessageCircle size={24} color={color} />;
    }
  };
  
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconBackground, { backgroundColor: `${color}10` }]}>
          {renderIcon()}
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.bookmarkButton}>
            <Bookmark 
              size={20} 
              color={saved ? color : '#A0AEC0'} 
              fill={saved ? color : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color="#718096" />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          
          <View style={styles.metaItem}>
            <Award size={14} color="#718096" />
            <Text style={styles.metaText}>{level}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2D3748',
    flex: 1,
    marginRight: 8,
  },
  bookmarkButton: {
    padding: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
    marginLeft: 6,
  },
});