import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, MessageCircle, BookOpen, Shield, Check, ArrowRight, Clock, Award } from 'lucide-react-native';
import { CommunicationExerciseCard } from '@/components/CommunicationExerciseCard';

export default function CommunicationScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('exercises');
  const [searchQuery, setSearchQuery] = useState('');
  
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
          <Text style={styles.screenTitle}>Communication</Text>
          <Text style={styles.screenSubtitle}>Enhance your communication skills & relationship quality</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises, topics..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#A0AEC0"
          />
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'exercises' && styles.activeTab]}
            onPress={() => setActiveTab('exercises')}
          >
            <Text style={[styles.tabText, activeTab === 'exercises' && styles.activeTabText]}>
              Exercises
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'courses' && styles.activeTab]}
            onPress={() => setActiveTab('courses')}
          >
            <Text style={[styles.tabText, activeTab === 'courses' && styles.activeTabText]}>
              Courses
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'exercises' && (
          <View style={styles.exercisesContainer}>
            <View style={styles.featuredSection}>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
              <TouchableOpacity style={styles.featuredExercise}>
                <LinearGradient
                  colors={['#6C5CE7', '#8E59E2']}
                  style={styles.featuredGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.featuredContent}>
                    <View style={styles.featuredIconContainer}>
                      <MessageCircle size={24} color="white" />
                    </View>
                    <Text style={styles.featuredTitle}>
                      Active Listening Practice
                    </Text>
                    <Text style={styles.featuredDescription}>
                      Perfect for INFJ personalities to improve understanding and empathy
                    </Text>
                    <View style={styles.featuredMeta}>
                      <View style={styles.featuredMetaItem}>
                        <Clock size={14} color="white" />
                        <Text style={styles.featuredMetaText}>15 min</Text>
                      </View>
                      <View style={styles.featuredMetaItem}>
                        <Award size={14} color="white" />
                        <Text style={styles.featuredMetaText}>Beginner</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.startButton}>
                      <Text style={styles.startButtonText}>Start Exercise</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <View style={styles.categorySection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoriesGrid}>
                <CategoryCard 
                  title="Conflict Resolution" 
                  icon={<Shield size={24} color="#6C5CE7" />}
                  count={8}
                />
                <CategoryCard 
                  title="Active Listening" 
                  icon={<MessageCircle size={24} color="#F6B93B" />}
                  count={12}
                />
                <CategoryCard 
                  title="Expressing Needs" 
                  icon={<BookOpen size={24} color="#E84393" />}
                  count={6}
                />
                <CategoryCard 
                  title="Empathy Building" 
                  icon={<HeartIcon size={24} color="#00B894" />}
                  count={9}
                />
              </View>
            </View>
            
            <View style={styles.exercisesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Exercises</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
              
              <CommunicationExerciseCard 
                title="Non-Violent Communication"
                description="Express your needs without triggering defensiveness"
                duration="20 min"
                level="Intermediate"
                iconName="MessageCircle"
                color="#6C5CE7"
                saved={true}
              />
              
              <CommunicationExerciseCard 
                title="Emotional Validation"
                description="Practice affirming your partner's feelings"
                duration="15 min"
                level="Beginner"
                iconName="Heart"
                color="#E84393"
                saved={false}
              />
              
              <CommunicationExerciseCard 
                title="Reflective Listening"
                description="Improve understanding by restating what you heard"
                duration="25 min"
                level="Advanced"
                iconName="BookOpen"
                color="#F6B93B"
                saved={false}
              />
            </View>
            
            <View style={styles.progressSection}>
              <Text style={styles.sectionTitle}>Your Progress</Text>
              <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Communication Skills</Text>
                  <Text style={styles.progressPercentage}>58%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: '58%' }]} />
                </View>
                <View style={styles.progressStats}>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatValue}>7</Text>
                    <Text style={styles.progressStatLabel}>Completed</Text>
                  </View>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatValue}>5</Text>
                    <Text style={styles.progressStatLabel}>In Progress</Text>
                  </View>
                  <View style={styles.progressStat}>
                    <Text style={styles.progressStatValue}>12</Text>
                    <Text style={styles.progressStatLabel}>Total Hours</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'courses' && (
          <View style={styles.coursesContainer}>
            <View style={styles.featuredCourseSection}>
              <Text style={styles.sectionTitle}>Featured Course</Text>
              <TouchableOpacity style={styles.featuredCourse}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg' }} 
                  style={styles.courseImage} 
                />
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle}>Master Communication for INFJ Personality</Text>
                  <Text style={styles.courseDescription}>
                    A comprehensive course tailored specifically for INFJ personalities to enhance relationship communication
                  </Text>
                  <View style={styles.courseMeta}>
                    <View style={styles.courseMetaItem}>
                      <BookOpen size={14} color="#718096" />
                      <Text style={styles.courseMetaText}>8 Modules</Text>
                    </View>
                    <View style={styles.courseMetaItem}>
                      <Clock size={14} color="#718096" />
                      <Text style={styles.courseMetaText}>6.5 Hours</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.courseEnrollButton}>
                    <Text style={styles.courseEnrollText}>Enroll Now</Text>
                    <ArrowRight size={16} color="#6C5CE7" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
            
            <View style={styles.popularCoursesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Courses</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
              
              <CourseCard 
                title="The Art of Empathetic Communication"
                lessons={10}
                hours={4.5}
                image="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg"
              />
              
              <CourseCard 
                title="Conflict Resolution Masterclass"
                lessons={12}
                hours={5.2}
                image="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg"
              />
              
              <CourseCard 
                title="Building Deeper Connections"
                lessons={8}
                hours={3.8}
                image="https://images.pexels.com/photos/4058316/pexels-photo-4058316.jpeg"
              />
            </View>
          </View>
        )}
        
        {activeTab === 'saved' && (
          <View style={styles.savedContainer}>
            <Text style={styles.savedSubtitle}>Your saved exercises and courses</Text>
            
            <View style={styles.savedItemsSection}>
              <CommunicationExerciseCard 
                title="Non-Violent Communication"
                description="Express your needs without triggering defensiveness"
                duration="20 min"
                level="Intermediate"
                iconName="MessageCircle"
                color="#6C5CE7"
                saved={true}
              />
              
              <CourseCard 
                title="The Art of Empathetic Communication"
                lessons={10}
                hours={4.5}
                image="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg"
                saved={true}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CategoryCard({ title, icon, count }) {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>
        {icon}
      </View>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{count} exercises</Text>
    </TouchableOpacity>
  );
}

// Renamed from Heart to HeartIcon and modified to prevent responder props
function HeartIcon({ size, color }) {
  return (
    <View style={{ width: size, height: size }}>
      <LinearGradient
        colors={[color, color]}
        style={{ flex: 1, borderRadius: size / 2 }}
      >
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>
          <View style={{ 
            width: size * 0.6, 
            height: size * 0.6, 
            backgroundColor: color,
            transform: [{ rotate: '45deg' }],
            position: 'absolute',
            bottom: size * 0.25,
            borderRadius: size * 0.1,
          }} />
          <View style={{ 
            width: size * 0.4, 
            height: size * 0.4, 
            backgroundColor: color,
            borderRadius: size * 0.2,
            position: 'absolute',
            left: size * 0.2,
            top: size * 0.22,
          }} />
          <View style={{ 
            width: size * 0.4, 
            height: size * 0.4, 
            backgroundColor: color,
            borderRadius: size * 0.2,
            position: 'absolute',
            right: size * 0.2,
            top: size * 0.22,
          }} />
        </View>
      </LinearGradient>
    </View>
  );
}

function CourseCard({ title, lessons, hours, image, saved = false }) {
  return (
    <TouchableOpacity style={styles.courseCard}>
      <Image source={{ uri: image }} style={styles.courseCardImage} />
      <View style={styles.courseCardContent}>
        <View style={styles.courseCardHeader}>
          <Text style={styles.courseCardTitle}>{title}</Text>
          {saved ? (
            <Bookmark size={20} color="#6C5CE7" fill="#6C5CE7" />
          ) : (
            <Bookmark size={20} color="#A0AEC0" />
          )}
        </View>
        <View style={styles.courseCardMeta}>
          <View style={styles.courseCardMetaItem}>
            <BookOpen size={14} color="#718096" />
            <Text style={styles.courseCardMetaText}>{lessons} Lessons</Text>
          </View>
          <View style={styles.courseCardMetaItem}>
            <Clock size={14} color="#718096" />
            <Text style={styles.courseCardMetaText}>{hours} Hours</Text>
          </View>
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
    marginBottom: 20,
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
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2D3748',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  exercisesContainer: {
    paddingHorizontal: 20,
  },
  featuredSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 16,
  },
  featuredExercise: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  featuredGradient: {
    borderRadius: 16,
  },
  featuredContent: {
    padding: 24,
  },
  featuredIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: 'white',
    marginBottom: 8,
  },
  featuredDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featuredMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredMetaText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'white',
    marginLeft: 6,
  },
  startButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#6C5CE7',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F7F8FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
  exercisesSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  progressSection: {
    marginBottom: 32,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#2D3748',
  },
  progressPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#6C5CE7',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#6C5CE7',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 4,
  },
  progressStatLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
  },
  coursesContainer: {
    paddingHorizontal: 20,
  },
  featuredCourseSection: {
    marginBottom: 32,
  },
  featuredCourse: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: 20,
  },
  courseTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 8,
  },
  courseDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    lineHeight: 22,
    marginBottom: 16,
  },
  courseMeta: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  courseMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  courseMetaText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#718096',
    marginLeft: 6,
  },
  courseEnrollButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EEFE',
    borderRadius: 8,
    paddingVertical: 12,
  },
  courseEnrollText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#6C5CE7',
    marginRight: 8,
  },
  popularCoursesSection: {
    marginBottom: 32,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  courseCardImage: {
    width: '100%',
    height: 140,
  },
  courseCardContent: {
    padding: 16,
  },
  courseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2D3748',
    flex: 1,
    marginRight: 8,
  },
  courseCardMeta: {
    flexDirection: 'row',
  },
  courseCardMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  courseCardMetaText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#718096',
    marginLeft: 6,
  },
  savedContainer: {
    paddingHorizontal: 20,
  },
  savedSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    marginBottom: 24,
  },
  savedItemsSection: {
    gap: 16,
  },
});