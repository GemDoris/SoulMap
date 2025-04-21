export type MBTIType = 
  'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' |
  'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' |
  'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' |
  'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface PersonalityInfo {
  mbti?: MBTIType;
  zodiacSign?: string;  // 星座
  birthInfo?: {
    date: string;
    time: string;
    location: string;
    latitude: number;
    longitude: number;
  };
}

export interface RelationshipAnalysis {
  compatibilityScore: number;  // 0-100
  mbtiCompatibility?: {
    score: number;
    strengths: string[];
    challenges: string[];
    advice: string[];
  };
  astroCompatibility?: {
    score: number;
    aspects: {
      type: string;
      description: string;
      influence: 'positive' | 'negative' | 'neutral';
    }[];
  };
  purpleStarCompatibility?: {
    score: number;
    analysis: string;
    advice: string;
  };
  overallAdvice: {
    communication: string[];
    challenges: string[];
    opportunities: string[];
  };
}

export interface RelationshipData {
  person1: PersonalityInfo;
  person2: PersonalityInfo;
  analysis?: RelationshipAnalysis;
} 