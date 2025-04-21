import { PurpleStarBirthInfo, PurpleStarChart, Palace, Star } from '../types/purpleStar';

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const PALACE_NAMES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '奴仆', '官禄', '田宅', '福德', '父母'];

const MAJOR_STARS = [
  '紫微', '天机', '太阳', '武曲', '天同',
  '廉贞', '天府', '太阴', '贪狼', '巨门',
  '天相', '天梁', '七杀', '破军'
];

const MINOR_STARS = [
  '文昌', '文曲', '左辅', '右弼',
  '天魁', '天钺', '禄存', '天马'
];

export async function calculatePurpleStarChart(birthInfo: PurpleStarBirthInfo): Promise<PurpleStarChart> {
  // 计算命宫
  const mingGong = calculateMingGong(birthInfo);
  
  // 计算身宫
  const shenGong = calculateShenGong(birthInfo);
  
  // 计算天干地支
  const { heavenlyStem, earthBranch } = calculateStemAndBranch(birthInfo);
  
  // 计算日主
  const dayMaster = calculateDayMaster(birthInfo);

  // 创建12宫
  const palaces: Palace[] = Array(12).fill(null).map((_, index) => ({
    name: PALACE_NAMES[index],
    position: index + 1,
    stars: [],
  }));

  // 安星
  distributeMajorStars(palaces, birthInfo);
  distributeMinorStars(palaces, birthInfo);
  calculateStarBrightness(palaces, birthInfo);

  return {
    palaces,
    mingGong,
    shenGong,
    dayMaster,
    heavenlyStem,
    earthBranch,
  };
}

function calculateMingGong(birthInfo: PurpleStarBirthInfo): number {
  // 简化的命宫计算
  const month = birthInfo.month;
  const hour = birthInfo.hour;
  return ((month - 1) * 2 + Math.floor(hour / 2) + 1) % 12 || 12;
}

function calculateShenGong(birthInfo: PurpleStarBirthInfo): number {
  // 简化的身宫计算
  return (calculateMingGong(birthInfo) + 6) % 12 || 12;
}

function calculateStemAndBranch(birthInfo: PurpleStarBirthInfo): { heavenlyStem: string, earthBranch: string } {
  const yearStem = (birthInfo.year - 4) % 10;
  const yearBranch = (birthInfo.year - 4) % 12;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[yearStem],
    earthBranch: EARTHLY_BRANCHES[yearBranch],
  };
}

function calculateDayMaster(birthInfo: PurpleStarBirthInfo): string {
  // 简化的日主计算
  const dayIndex = Math.floor(
    (birthInfo.year * 365.25 + birthInfo.month * 30.44 + birthInfo.day) % 10
  );
  return HEAVENLY_STEMS[dayIndex];
}

function distributeMajorStars(palaces: Palace[], birthInfo: PurpleStarBirthInfo): void {
  // 简化的主星安星
  const basePosition = calculateMingGong(birthInfo);
  
  MAJOR_STARS.forEach((star, index) => {
    const position = (basePosition + index) % 12 || 12;
    const palace = palaces[position - 1];
    palace.stars.push({
      name: star,
      type: 'major',
    });
    if (!palace.mainStar) {
      palace.mainStar = star;
    }
  });
}

function distributeMinorStars(palaces: Palace[], birthInfo: PurpleStarBirthInfo): void {
  // 简化的辅星安星
  const basePosition = calculateMingGong(birthInfo);
  
  MINOR_STARS.forEach((star, index) => {
    const position = (basePosition + index * 2) % 12 || 12;
    palaces[position - 1].stars.push({
      name: star,
      type: 'minor',
    });
  });
}

function calculateStarBrightness(palaces: Palace[], birthInfo: PurpleStarBirthInfo): void {
  // 简化的星耀庙旺计算
  palaces.forEach(palace => {
    palace.stars.forEach(star => {
      if (star.type === 'major') {
        // 随机分配庙旺状态（实际应该根据宫位和其他因素计算）
        const states: Star['brightness'][] = ['庙', '旺', '得', '平', '陷'];
        star.brightness = states[Math.floor(Math.random() * states.length)];
      }
    });
  });
} 