import { BirthInfo, ChartData } from '../types/astrology';

// 这里我们使用 swiss ephemeris 库进行实际的天体位置计算
// 你需要安装 swisseph 包：npm install swisseph
import * as swisseph from 'swisseph';

export async function calculateChart(birthInfo: BirthInfo): Promise<ChartData> {
  // 简化的计算方法
  const date = new Date(`${birthInfo.date}T${birthInfo.time}`);
  
  // 基于出生时间计算上升星座
  const hourOfDay = date.getHours() + date.getMinutes() / 60;
  const dayOfYear = getDayOfYear(date);
  const ascendant = calculateAscendant(hourOfDay, dayOfYear);
  
  // 简化的行星位置计算
  const planets = calculateSimplePlanetPositions(date);
  
  // 计算宫位
  const houses = calculateSimpleHouses(ascendant);
  
  // 计算相位
  const aspects = calculateAspects(planets);

  return {
    planets,
    aspects,
    houses,
    ascendant,
    midheaven: (ascendant + 90) % 360,
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function calculateAscendant(hourOfDay: number, dayOfYear: number): number {
  // 简化的上升星座计算
  const baseAngle = (hourOfDay * 15) % 360;
  const yearProgress = (dayOfYear / 365) * 360;
  return (baseAngle + yearProgress) % 360;
}

function calculateSimplePlanetPositions(date: Date) {
  const planets = [
    { name: '太阳', period: 365.25 },
    { name: '月亮', period: 27.32 },
    { name: '水星', period: 87.97 },
    { name: '金星', period: 224.7 },
    { name: '火星', period: 686.98 },
    { name: '木星', period: 4332.59 },
    { name: '土星', period: 10759.22 },
  ];

  const startDate = new Date(2000, 0, 1);
  const daysSince2000 = (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return planets.map(planet => {
    const angle = (daysSince2000 / planet.period) * 360 % 360;
    return {
      name: planet.name,
      sign: getZodiacSign(angle),
      degree: angle % 30,
      house: Math.floor(angle / 30) + 1,
    };
  });
}

function calculateSimpleHouses(ascendant: number): number[] {
  const houses = [];
  for (let i = 0; i < 12; i++) {
    houses.push((ascendant + i * 30) % 360);
  }
  return houses;
}

function calculateAspects(planets: any[]) {
  const aspects = [];
  const aspectTypes = {
    conjunction: { angle: 0, orb: 10 },
    opposition: { angle: 180, orb: 10 },
    trine: { angle: 120, orb: 8 },
    square: { angle: 90, orb: 8 },
    sextile: { angle: 60, orb: 6 },
  };

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const angle = Math.abs(planets[i].degree - planets[j].degree);
      
      for (const [type, config] of Object.entries(aspectTypes)) {
        if (Math.abs(angle - config.angle) <= config.orb) {
          aspects.push({
            planet1: planets[i].name,
            planet2: planets[j].name,
            type,
            angle: config.angle,
            orb: Math.abs(angle - config.angle),
          });
        }
      }
    }
  }

  return aspects;
}

function getZodiacSign(longitude: number): string {
  const signs = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
  ];
  const signIndex = Math.floor(longitude / 30);
  return signs[signIndex];
} 