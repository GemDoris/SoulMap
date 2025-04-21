import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Star, Calendar, ArrowRight, Users, BookOpen, BrainCircuit, Heart } from 'lucide-react-native';
import { HomeHeader } from '@/components/HomeHeader';
import { DailyInsightCard } from '@/components/DailyInsightCard';
import { CompatibilityPreview } from '@/components/CompatibilityPreview';
import { TraitCard } from '@/components/TraitCard';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: 100
        }}
      >
        <HomeHeader />
        
        <View style={styles.heroSection}>
          <Text style={styles.greeting}>Discover your true self</Text>
          <Text style={styles.subtitle}>
            Unlock insights from MBTI, Western astrology, and Purple Star Astrology
          </Text>
          
          <DailyInsightCard />
          
          <View style={styles.quickAccessSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickAccessGrid}>
              <QuickAccessCard 
                title="MBTI Analysis" 
                icon={<BrainCircuit color="#6C5CE7" size={24} />}
                gradient={['#6C5CE7', '#8E59E2']}
              />
              <QuickAccessCard 
                title="Astrology" 
                icon={<Star color="#F6B93B" size={24} />}
                gradient={['#F6B93B', '#FA983A']}
              />
              <QuickAccessCard 
                title="Purple Star" 
                icon={<BookOpen color="#4834D4" size={24} />}
                gradient={['#4834D4', '#686DE0']}
              />
              <QuickAccessCard 
                title="Relationships" 
                icon={<Heart color="#E84393" size={24} />}
                gradient={['#E84393', '#FD79A8']}
              />
            </View>
          </View>
          
          <View style={styles.personalitySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Personality</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.traitsScrollView}>
              <TraitCard 
                traitType="MBTI" 
                trait="INFJ" 
                description="The Advocate" 
                color="#6C5CE7"
              />
              <TraitCard 
                traitType="Zodiac" 
                trait="Libra" 
                description="The Harmonizer" 
                color="#F6B93B"
              />
              <TraitCard 
                traitType="Chinese" 
                trait="Dragon" 
                description="The Ambitious" 
                color="#E84393"
              />
            </ScrollView>
          </View>
          
          <View style={styles.compatibilitySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Compatibility</Text>
              <TouchableOpacity>
                <View style={styles.viewMoreButton}>
                  <Text style={styles.viewMoreText}>View more</Text>
                  <ArrowRight size={16} color="#6C5CE7" />
                </View>
              </TouchableOpacity>
            </View>
            
            <CompatibilityPreview />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function QuickAccessCard({ title, icon, gradient }) {
  return (
    <TouchableOpacity style={styles.quickAccessCard}>
      <LinearGradient
        colors={gradient}
        style={styles.quickAccessIconBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon}
      </LinearGradient>
      <Text style={styles.quickAccessText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  heroSection: {
    padding: 20,
  },
  greeting: {
    fontFamily: 'Playfair-Bold',
    fontSize: 26,
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
    marginBottom: 24,
  },
  quickAccessSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickAccessCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#718096',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
    alignItems: 'center',
  },
  quickAccessIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  sectionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 20,
    color: '#2D3748',
    marginBottom: 4,
  },
  personalitySection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
  },
  traitsScrollView: {
    marginLeft: -8,
  },
  compatibilitySection: {
    marginBottom: 20,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6C5CE7',
    marginRight: 4,
  },
});