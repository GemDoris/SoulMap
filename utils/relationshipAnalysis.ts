import { PersonalityInfo, RelationshipAnalysis, MBTIType } from '../types/relationships';
import { calculateChart } from './astrologyCalculations';
import { calculatePurpleStarChart } from './purpleStarCalculations';

export async function analyzeRelationship(
  person1: PersonalityInfo,
  person2: PersonalityInfo
): Promise<RelationshipAnalysis> {
  // 计算各个维度的匹配度
  const mbtiCompatibility = calculateMBTICompatibility(person1.mbti, person2.mbti);
  const astroCompatibility = await calculateAstroCompatibility(person1, person2);
  const purpleStarCompatibility = await calculatePurpleStarCompatibility(person1, person2);

  // 计算总体匹配度（加权平均）
  const weights = {
    mbti: 0.3,
    astro: 0.4,
    purpleStar: 0.3,
  };

  const compatibilityScore = Math.round(
    (mbtiCompatibility?.score * weights.mbti +
    astroCompatibility?.score * weights.astro +
    purpleStarCompatibility?.score * weights.purpleStar) * 100
  );

  // 生成综合建议
  const overallAdvice = generateOverallAdvice(
    mbtiCompatibility,
    astroCompatibility,
    purpleStarCompatibility
  );

  return {
    compatibilityScore,
    mbtiCompatibility,
    astroCompatibility,
    purpleStarCompatibility,
    overallAdvice,
  };
}

function calculateMBTICompatibility(
  mbti1?: MBTIType,
  mbti2?: MBTIType
) {
  if (!mbti1 || !mbti2) return undefined;

  // MBTI 匹配规则（简化版）
  const score = calculateMBTIScore(mbti1, mbti2);
  const { strengths, challenges } = analyzeMBTIRelationship(mbti1, mbti2);
  const advice = generateMBTIAdvice(mbti1, mbti2);

  return {
    score,
    strengths,
    challenges,
    advice,
  };
}

function calculateMBTIScore(mbti1: MBTIType, mbti2: MBTIType): number {
  let score = 0;
  
  // 相同性格类型得分较高
  if (mbti1 === mbti2) {
    score += 0.8;
  } else {
    // 检查每个维度的匹配度
    for (let i = 0; i < 4; i++) {
      if (mbti1[i] === mbti2[i]) {
        score += 0.2;
      }
    }
  }

  return score;
}

function analyzeMBTIRelationship(mbti1: MBTIType, mbti2: MBTIType) {
  const strengths = [];
  const challenges = [];

  // 分析外向/内向
  if (mbti1[0] === mbti2[0]) {
    strengths.push('你们有相似的社交能量水平，容易理解彼此的需求');
  } else {
    challenges.push('你们在社交需求上可能存在差异，需要互相体谅');
  }

  // 分析感知/直觉
  if (mbti1[1] === mbti2[1]) {
    strengths.push('你们有相似的信息处理方式，沟通更容易');
  } else {
    challenges.push('你们在获取和处理信息的方式上可能有所不同');
  }

  // 分析思考/感受
  if (mbti1[2] === mbti2[2]) {
    strengths.push('你们有相似的决策方式，更容易达成共识');
  } else {
    challenges.push('你们在做决定时可能采用不同的标准');
  }

  // 分析判断/知觉
  if (mbti1[3] === mbti2[3]) {
    strengths.push('你们有相似的生活方式，更容易协调日常生活');
  } else {
    challenges.push('你们在生活规划和组织方面可能有不同的偏好');
  }

  return { strengths, challenges };
}

function generateMBTIAdvice(mbti1: MBTIType, mbti2: MBTIType): string[] {
  const advice = [];

  // 基于性格差异生成建议
  if (mbti1[0] !== mbti2[0]) {
    advice.push('尊重彼此的社交需求，在社交活动和独处时间上找到平衡');
  }

  if (mbti1[1] !== mbti2[1]) {
    advice.push('在沟通时注意表达方式，尝试理解对方的思维模式');
  }

  if (mbti1[2] !== mbti2[2]) {
    advice.push('在做决定时，兼顾逻辑分析和情感因素');
  }

  if (mbti1[3] !== mbti2[3]) {
    advice.push('在生活安排上寻找折中方案，既保持灵活性又有基本计划');
  }

  return advice;
}

async function calculateAstroCompatibility(
  person1: PersonalityInfo,
  person2: PersonalityInfo
) {
  if (!person1.birthInfo || !person2.birthInfo) return undefined;

  // 计算两个人的星盘
  const chart1 = await calculateChart(person1.birthInfo);
  const chart2 = await calculateChart(person2.birthInfo);

  // 分析相位关系
  const aspects = analyzeAspects(chart1, chart2);
  
  // 计算匹配分数
  const score = calculateAstroScore(aspects);

  return {
    score,
    aspects,
  };
}

async function calculatePurpleStarCompatibility(
  person1: PersonalityInfo,
  person2: PersonalityInfo
) {
  if (!person1.birthInfo || !person2.birthInfo) return undefined;

  // 转换出生信息格式
  const info1 = convertToPurpleStarBirthInfo(person1);
  const info2 = convertToPurpleStarBirthInfo(person2);

  // 计算两个人的命盘
  const chart1 = await calculatePurpleStarChart(info1);
  const chart2 = await calculatePurpleStarChart(info2);

  // 分析命盘关系
  const analysis = analyzePurpleStarCharts(chart1, chart2);
  
  return {
    score: analysis.score,
    analysis: analysis.description,
    advice: analysis.advice,
  };
}

function generateOverallAdvice(
  mbtiCompatibility?: any,
  astroCompatibility?: any,
  purpleStarCompatibility?: any
) {
  return {
    communication: [
      '保持开放和诚实的沟通态度',
      '学会倾听对方的需求和感受',
      '在发生分歧时，先理解后表达',
    ],
    challenges: [
      '性格差异可能导致沟通方式的不同',
      '生活习惯和价值观的差异需要调适',
      '对未来规划可能有不同的期待',
    ],
    opportunities: [
      '互补的性格特点可以带来成长',
      '共同经历可以加深理解和信任',
      '通过沟通和理解建立更深层的连接',
    ],
  };
}

// 辅助函数
function convertToPurpleStarBirthInfo(person: PersonalityInfo) {
  const date = new Date(person.birthInfo!.date);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    gender: 'male', // 需要添加性别信息
  };
}

// 定义行星相位类型
type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';
type Planet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

interface Aspect {
  type: AspectType;
  planet1: Planet;
  planet2: Planet;
  orb: number;  // 相位容许度
  influence: 'positive' | 'negative' | 'neutral';
}

interface PlanetPosition {
  planet: Planet;
  sign: string;
  house: number;
  degree: number;
}

// 相位容许度配置
const ASPECT_ORBS = {
  conjunction: 8,
  opposition: 8,
  trine: 8,
  square: 8,
  sextile: 6
};

// 相位影响权重
const ASPECT_WEIGHTS = {
  conjunction: 1.0,
  opposition: 0.8,
  trine: 0.9,
  square: 0.7,
  sextile: 0.6
};

// 行星影响权重
const PLANET_WEIGHTS = {
  sun: 1.0,
  moon: 1.0,
  venus: 0.9,
  mars: 0.8,
  mercury: 0.7,
  jupiter: 0.6,
  saturn: 0.6,
  uranus: 0.5,
  neptune: 0.5,
  pluto: 0.5
};

function analyzeAspects(chart1: any, chart2: any): Aspect[] {
  const aspects: Aspect[] = [];
  const planets: Planet[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  // 分析每对行星之间的相位
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      const pos1 = chart1.planets[planet1];
      const pos2 = chart2.planets[planet2];

      if (!pos1 || !pos2) continue;

      const angle = Math.abs(pos1.degree - pos2.degree);
      const normalizedAngle = angle > 180 ? 360 - angle : angle;

      // 检查各种相位
      if (normalizedAngle <= ASPECT_ORBS.conjunction) {
        aspects.push({
          type: 'conjunction',
          planet1,
          planet2,
          orb: normalizedAngle,
          influence: getAspectInfluence('conjunction', planet1, planet2)
        });
      } else if (Math.abs(normalizedAngle - 180) <= ASPECT_ORBS.opposition) {
        aspects.push({
          type: 'opposition',
          planet1,
          planet2,
          orb: Math.abs(normalizedAngle - 180),
          influence: getAspectInfluence('opposition', planet1, planet2)
        });
      } else if (Math.abs(normalizedAngle - 120) <= ASPECT_ORBS.trine) {
        aspects.push({
          type: 'trine',
          planet1,
          planet2,
          orb: Math.abs(normalizedAngle - 120),
          influence: getAspectInfluence('trine', planet1, planet2)
        });
      } else if (Math.abs(normalizedAngle - 90) <= ASPECT_ORBS.square) {
        aspects.push({
          type: 'square',
          planet1,
          planet2,
          orb: Math.abs(normalizedAngle - 90),
          influence: getAspectInfluence('square', planet1, planet2)
        });
      } else if (Math.abs(normalizedAngle - 60) <= ASPECT_ORBS.sextile) {
        aspects.push({
          type: 'sextile',
          planet1,
          planet2,
          orb: Math.abs(normalizedAngle - 60),
          influence: getAspectInfluence('sextile', planet1, planet2)
        });
      }
    }
  }

  return aspects;
}

function getAspectInfluence(type: AspectType, planet1: Planet, planet2: Planet): 'positive' | 'negative' | 'neutral' {
  // 根据相位类型和行星组合判断影响
  switch (type) {
    case 'conjunction':
      return 'neutral';  // 合相的影响取决于行星组合
    case 'opposition':
      return 'negative';
    case 'trine':
      return 'positive';
    case 'square':
      return 'negative';
    case 'sextile':
      return 'positive';
    default:
      return 'neutral';
  }
}

function calculateAstroScore(aspects: Aspect[]): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const aspect of aspects) {
    const aspectWeight = ASPECT_WEIGHTS[aspect.type];
    const planet1Weight = PLANET_WEIGHTS[aspect.planet1];
    const planet2Weight = PLANET_WEIGHTS[aspect.planet2];
    
    // 计算相位强度（考虑容许度）
    const orbFactor = 1 - (aspect.orb / ASPECT_ORBS[aspect.type]);
    
    // 计算影响分数
    const influenceScore = aspect.influence === 'positive' ? 1 : 
                          aspect.influence === 'negative' ? -1 : 0;
    
    // 加权计算
    const weight = aspectWeight * planet1Weight * planet2Weight;
    totalScore += influenceScore * weight * orbFactor;
    totalWeight += weight;
  }

  // 归一化分数到0-1范围
  const normalizedScore = (totalScore / totalWeight + 1) / 2;
  return Math.max(0, Math.min(1, normalizedScore));
}

// 紫微斗数星体类型
type PurpleStar = 
  | '紫微' | '天机' | '太阳' | '武曲' | '天同' | '廉贞'
  | '天府' | '太阴' | '贪狼' | '巨门' | '天相' | '天梁'
  | '七杀' | '破军';

// 紫微斗数宫位类型
type Palace = 
  | '命宫' | '兄弟宫' | '夫妻宫' | '子女宫' | '财帛宫' | '疾厄宫'
  | '迁移宫' | '仆役宫' | '官禄宫' | '田宅宫' | '福德宫' | '父母宫';

interface PurpleStarChart {
  palaces: Record<Palace, {
    mainStar?: PurpleStar;
    subStars: PurpleStar[];
    influence: 'positive' | 'negative' | 'neutral';
  }>;
  gender: 'male' | 'female';
}

// 星体影响权重
const STAR_WEIGHTS: Record<PurpleStar, number> = {
  '紫微': 1.0,
  '天机': 0.9,
  '太阳': 0.9,
  '武曲': 0.8,
  '天同': 0.8,
  '廉贞': 0.8,
  '天府': 0.7,
  '太阴': 0.7,
  '贪狼': 0.7,
  '巨门': 0.6,
  '天相': 0.6,
  '天梁': 0.6,
  '七杀': 0.5,
  '破军': 0.5
};

// 宫位重要性权重
const PALACE_WEIGHTS: Record<Palace, number> = {
  '命宫': 1.0,
  '夫妻宫': 0.9,
  '福德宫': 0.8,
  '迁移宫': 0.7,
  '官禄宫': 0.7,
  '财帛宫': 0.6,
  '子女宫': 0.6,
  '田宅宫': 0.5,
  '兄弟宫': 0.5,
  '仆役宫': 0.4,
  '疾厄宫': 0.4,
  '父母宫': 0.3
};

function analyzePurpleStarCharts(chart1: PurpleStarChart, chart2: PurpleStarChart) {
  let totalScore = 0;
  let totalWeight = 0;
  const analysis: string[] = [];
  const advice: string[] = [];

  // 分析每个宫位
  for (const palace of Object.keys(PALACE_WEIGHTS) as Palace[]) {
    const palace1 = chart1.palaces[palace];
    const palace2 = chart2.palaces[palace];
    
    if (!palace1 || !palace2) continue;

    const palaceScore = analyzePalaceCompatibility(palace, palace1, palace2, chart1.gender, chart2.gender);
    const weight = PALACE_WEIGHTS[palace];
    
    totalScore += palaceScore * weight;
    totalWeight += weight;

    // 生成宫位分析
    if (palaceScore > 0.7) {
      analysis.push(`${palace}显示良好的缘分，${getPalaceStrengthDescription(palace, palace1, palace2)}`);
    } else if (palaceScore < 0.3) {
      analysis.push(`${palace}显示需要注意的方面，${getPalaceChallengeDescription(palace, palace1, palace2)}`);
    }
  }

  // 生成总体建议
  if (totalScore / totalWeight > 0.7) {
    advice.push('你们的命盘显示有很好的缘分基础，建议多培养共同兴趣');
  } else if (totalScore / totalWeight < 0.3) {
    advice.push('你们的命盘显示需要更多的理解和包容，建议加强沟通');
  } else {
    advice.push('你们的命盘显示缘分中等，建议在相处中互相体谅和成长');
  }

  return {
    score: totalScore / totalWeight,
    description: analysis.join('\n'),
    advice: advice.join('\n')
  };
}

function analyzePalaceCompatibility(
  palace: Palace,
  palace1: PurpleStarChart['palaces'][Palace],
  palace2: PurpleStarChart['palaces'][Palace],
  gender1: 'male' | 'female',
  gender2: 'male' | 'female'
): number {
  let score = 0;
  let weight = 0;

  // 分析主星
  if (palace1.mainStar && palace2.mainStar) {
    const starScore = analyzeStarCompatibility(palace1.mainStar, palace2.mainStar, palace, gender1, gender2);
    score += starScore * STAR_WEIGHTS[palace1.mainStar];
    weight += STAR_WEIGHTS[palace1.mainStar];
  }

  // 分析辅星
  for (const star1 of palace1.subStars) {
    for (const star2 of palace2.subStars) {
      const starScore = analyzeStarCompatibility(star1, star2, palace, gender1, gender2);
      score += starScore * STAR_WEIGHTS[star1] * 0.5;
      weight += STAR_WEIGHTS[star1] * 0.5;
    }
  }

  return weight > 0 ? score / weight : 0.5; // 默认中等分数
}

function analyzeStarCompatibility(
  star1: PurpleStar,
  star2: PurpleStar,
  palace: Palace,
  gender1: 'male' | 'female',
  gender2: 'male' | 'female'
): number {
  // 星体组合分析（简化版）
  const positiveCombinations: [PurpleStar, PurpleStar][] = [
    ['紫微', '天府'],
    ['太阳', '太阴'],
    ['武曲', '天相'],
    ['天同', '天梁']
  ];

  const negativeCombinations: [PurpleStar, PurpleStar][] = [
    ['七杀', '破军'],
    ['廉贞', '贪狼']
  ];

  // 检查是否在正面组合中
  for (const [s1, s2] of positiveCombinations) {
    if ((star1 === s1 && star2 === s2) || (star1 === s2 && star2 === s1)) {
      return 1.0;
    }
  }

  // 检查是否在负面组合中
  for (const [s1, s2] of negativeCombinations) {
    if ((star1 === s1 && star2 === s2) || (star1 === s2 && star2 === s1)) {
      return 0.2;
    }
  }

  return 0.6; // 默认中等分数
}

function getPalaceStrengthDescription(
  palace: Palace,
  palace1: PurpleStarChart['palaces'][Palace],
  palace2: PurpleStarChart['palaces'][Palace]
): string {
  const descriptions: Record<Palace, string> = {
    '命宫': '你们在性格和价值观方面有很好的契合度',
    '夫妻宫': '你们在感情和婚姻方面有良好的缘分',
    '福德宫': '你们在精神层面和生活态度上很合拍',
    '迁移宫': '你们在外出和社交方面能够互相支持',
    '官禄宫': '你们在事业和成就方面能够互相促进',
    '财帛宫': '你们在财务观念和理财方式上很协调',
    '子女宫': '你们在家庭和子女方面有很好的缘分',
    '田宅宫': '你们在居住环境和家庭生活上很和谐',
    '兄弟宫': '你们在社交圈和人际关系上能够互相帮助',
    '仆役宫': '你们在人际交往和社交活动上很合拍',
    '疾厄宫': '你们在健康观念和生活方式上很协调',
    '父母宫': '你们在家庭关系和长辈相处上很和谐'
  };

  return descriptions[palace] || '这个宫位显示良好的缘分';
}

function getPalaceChallengeDescription(
  palace: Palace,
  palace1: PurpleStarChart['palaces'][Palace],
  palace2: PurpleStarChart['palaces'][Palace]
): string {
  const descriptions: Record<Palace, string> = {
    '命宫': '你们在性格和价值观方面可能需要更多的理解和包容',
    '夫妻宫': '你们在感情和婚姻方面需要更多的沟通和协调',
    '福德宫': '你们在精神层面和生活态度上需要更多的磨合',
    '迁移宫': '你们在外出和社交方面可能需要更多的协调',
    '官禄宫': '你们在事业和成就方面需要更多的互相支持',
    '财帛宫': '你们在财务观念和理财方式上需要更多的沟通',
    '子女宫': '你们在家庭和子女方面需要更多的理解和协调',
    '田宅宫': '你们在居住环境和家庭生活上需要更多的磨合',
    '兄弟宫': '你们在社交圈和人际关系上需要更多的互相理解',
    '仆役宫': '你们在人际交往和社交活动上需要更多的协调',
    '疾厄宫': '你们在健康观念和生活方式上需要更多的沟通',
    '父母宫': '你们在家庭关系和长辈相处上需要更多的理解和包容'
  };

  return descriptions[palace] || '这个宫位显示需要注意的方面';
} 