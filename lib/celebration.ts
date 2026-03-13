const CLEANING_EMOJIS = ['🧹', '🧺', '✨', '🫧', '🧼'];
const PARTICLE_COUNT = 28;

export type CelebrationParticle = {
  id: number;
  emoji: string;
  delay: number;
  x: number;
  y: number;
};

export function createCelebrationParticles(): CelebrationParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angleDeg = (360 / PARTICLE_COUNT) * i + Math.random() * 20;
    const angleRad = (angleDeg * Math.PI) / 180;
    const distance = 120 + Math.random() * 180;
    return {
      id: i,
      emoji: CLEANING_EMOJIS[i % CLEANING_EMOJIS.length],
      delay: Math.random() * 120,
      x: Math.cos(angleRad) * distance,
      y: Math.sin(angleRad) * distance,
    };
  });
}
