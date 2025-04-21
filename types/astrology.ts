export interface BirthInfo {
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  location: string;
}

export interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: string;
  orb: number;
}

export interface ChartData {
  planets: Planet[];
  aspects: Aspect[];
  houses: number[];
  ascendant: number;
  midheaven: number;
} 