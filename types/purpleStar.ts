export interface PurpleStarBirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: 'male' | 'female';
}

export interface Star {
  name: string;
  type: 'major' | 'minor' | 'helper';
  brightness?: '庙' | '旺' | '得' | '平' | '陷';
}

export interface Palace {
  name: string;
  position: number;  // 1-12宫位
  stars: Star[];
  mainStar?: string;
}

export interface PurpleStarChart {
  palaces: Palace[];
  mingGong: number;  // 命宫位置
  shenGong: number;  // 身宫位置
  dayMaster: string; // 日主
  earthBranch: string; // 地支
  heavenlyStem: string; // 天干
} 