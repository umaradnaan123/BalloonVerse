import { create } from "zustand";
import { persist } from "zustand/middleware";

export type GameMode =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "mixed"
  | "time-attack"
  | "endless"
  | "practice"
  | "challenge"
  | "kids"
  | "speed"
  | "memory"
  | "boss";

export type DifficultyLevel = "very-easy" | "easy" | "medium" | "hard" | "expert" | "genius";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  rewardType: "coins" | "diamonds" | "stars";
  rewardAmount: number;
}

export interface PlayerStats {
  gamesPlayed: number;
  questionsAnswered: number;
  correctAnswers: number;
  wrongAnswers: number;
  longestCombo: number;
  highestScore: number;
  totalTimePlayed: number; // in seconds
  fastestAnswerTime: number; // in ms
  weeklyProgress: Record<string, number>; // date string -> score
  categoryStats: Record<string, { correct: number; total: number }>; // category -> ratios
}

export interface GameState {
  // Player Profile
  name: string;
  avatar: string; // "owl", "panda", "rabbit", "fox", "penguin", etc.
  coins: number;
  diamonds: number;
  stars: number;
  xp: number;
  level: number;
  unlockedSkins: string[];
  unlockedBackgrounds: string[];
  currentSkin: string;
  currentBackground: string;

  // Settings
  musicVolume: number;
  soundVolume: number;
  language: string;
  theme: "light" | "dark" | "halloween" | "christmas" | "space" | "jungle" | "ocean" | "candy";
  animationQuality: "low" | "medium" | "high";
  colorBlindMode: boolean;
  highContrastMode: boolean;
  screenReaderVoice: boolean;
  reducedMotion: boolean;

  // Active Game State
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  comboStreak: number;
  maxComboThisGame: number;
  timeRemaining: number; // in seconds
  activeMode: GameMode;
  activeDifficulty: DifficultyLevel;
  adaptiveAI: boolean;
  correctCountThisGame: number;
  wrongCountThisGame: number;
  coinsEarnedThisGame: number;

  // Statistics
  stats: PlayerStats;

  // Achievements List
  achievements: Achievement[];

  // Actions
  setName: (name: string) => void;
  setAvatar: (avatar: string) => void;
  updateVolume: (type: "music" | "sound", value: number) => void;
  setLanguage: (lang: string) => void;
  setTheme: (theme: GameState["theme"]) => void;
  setAnimationQuality: (q: "low" | "medium" | "high") => void;
  toggleColorBlind: () => void;
  toggleHighContrast: () => void;
  toggleScreenReaderVoice: () => void;
  toggleReducedMotion: () => void;
  setSkin: (skin: string) => void;
  setBackground: (bg: string) => void;

  // Game flow control
  startGame: (mode: GameMode, difficulty: DifficultyLevel) => void;
  answerQuestion: (correct: boolean, reactionTimeMs: number) => void;
  deductLife: () => void;
  tickTimer: () => void;
  addCoins: (amount: number) => void;
  buySkin: (skinName: string, cost: number) => boolean;
  resetProgress: () => void;
  unlockAchievement: (id: string) => void;
}

const initialAchievements: Achievement[] = [
  { id: "first_pop", title: "First Pop!", description: "Pop your first balloon correctly", unlocked: false, rewardType: "coins", rewardAmount: 50 },
  { id: "combo_5", title: "Rising Star", description: "Reach a 5x combo streak", unlocked: false, rewardType: "stars", rewardAmount: 5 },
  { id: "combo_10", title: "Pop Master", description: "Reach a 10x combo streak", unlocked: false, rewardType: "diamonds", rewardAmount: 3 },
  { id: "perfect_game", title: "Perfect Scholar", description: "Answer 15 questions in a row without making a mistake", unlocked: false, rewardType: "diamonds", rewardAmount: 10 },
  { id: "genius_unlock", title: "Brainiac", description: "Solve a problem in Genius mode", unlocked: false, rewardType: "stars", rewardAmount: 10 },
  { id: "coin_rich", title: "Treasure Hunter", description: "Accumulate 1,000 coins", unlocked: false, rewardType: "coins", rewardAmount: 200 },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Profile Defaults
      name: "Player 1",
      avatar: "owl",
      coins: 100,
      diamonds: 5,
      stars: 10,
      xp: 0,
      level: 1,
      unlockedSkins: ["classic"],
      unlockedBackgrounds: ["mountain"],
      currentSkin: "classic",
      currentBackground: "mountain",

      // Settings Defaults
      musicVolume: 0.5,
      soundVolume: 0.7,
      language: "en",
      theme: "light",
      animationQuality: "high",
      colorBlindMode: false,
      highContrastMode: false,
      screenReaderVoice: false,
      reducedMotion: false,

      // Game state default
      score: 0,
      highScore: 0,
      lives: 3,
      maxLives: 3,
      comboStreak: 0,
      maxComboThisGame: 0,
      timeRemaining: 60,
      activeMode: "addition",
      activeDifficulty: "easy",
      adaptiveAI: true,
      correctCountThisGame: 0,
      wrongCountThisGame: 0,
      coinsEarnedThisGame: 0,

      stats: {
        gamesPlayed: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestCombo: 0,
        highestScore: 0,
        totalTimePlayed: 0,
        fastestAnswerTime: 999999,
        weeklyProgress: {},
        categoryStats: {},
      },

      achievements: initialAchievements,

      setName: (name) => set({ name }),
      setAvatar: (avatar) => set({ avatar }),
      updateVolume: (type, value) => set({ [type === "music" ? "musicVolume" : "soundVolume"]: value }),
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setAnimationQuality: (animationQuality) => set({ animationQuality }),
      toggleColorBlind: () => set((state) => ({ colorBlindMode: !state.colorBlindMode })),
      toggleHighContrast: () => set((state) => ({ highContrastMode: !state.highContrastMode })),
      toggleScreenReaderVoice: () => set((state) => ({ screenReaderVoice: !state.screenReaderVoice })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      setSkin: (currentSkin) => set({ currentSkin }),
      setBackground: (currentBackground) => set({ currentBackground }),

      startGame: (mode, difficulty) =>
        set((state) => {
          let initialLives = 3;
          let initialTime = 60;
          if (mode === "kids") {
            initialLives = 5;
            initialTime = 120;
          } else if (mode === "endless") {
            initialLives = 3;
            initialTime = 99999;
          } else if (mode === "speed") {
            initialLives = 1;
            initialTime = 30;
          } else if (mode === "boss") {
            initialLives = 4;
            initialTime = 90;
          }

          return {
            score: 0,
            lives: initialLives,
            maxLives: initialLives,
            comboStreak: 0,
            maxComboThisGame: 0,
            timeRemaining: initialTime,
            activeMode: mode,
            activeDifficulty: difficulty,
            correctCountThisGame: 0,
            wrongCountThisGame: 0,
            coinsEarnedThisGame: 0,
            stats: {
              ...state.stats,
              gamesPlayed: state.stats.gamesPlayed + 1,
            },
          };
        }),

      answerQuestion: (correct, reactionTimeMs) =>
        set((state) => {
          const stats = { ...state.stats };
          stats.questionsAnswered += 1;

          let newScore = state.score;
          let newStreak = state.comboStreak;
          let newLives = state.lives;
          let newCoins = state.coins;
          let newXp = state.xp;
          let correctAdd = state.correctCountThisGame;
          let wrongAdd = state.wrongCountThisGame;
          let earnedCoins = state.coinsEarnedThisGame;

          // Category identifier key
          const catKey = state.activeMode;
          const currentCat = stats.categoryStats[catKey] || { correct: 0, total: 0 };
          currentCat.total += 1;

          if (correct) {
            correctAdd += 1;
            stats.correctAnswers += 1;
            currentCat.correct += 1;

            newStreak += 1;
            if (newStreak > state.maxComboThisGame) {
              state.maxComboThisGame = newStreak;
            }
            if (newStreak > stats.longestCombo) {
              stats.longestCombo = newStreak;
            }

            // Streak Multiplier bonus
            const multiplier = Math.min(5, 1 + Math.floor(newStreak / 5));
            const pointIncrement = 10 * multiplier;
            newScore += pointIncrement;

            // Earn xp/coins
            const earnedC = Math.max(1, Math.floor(pointIncrement / 5));
            newCoins += earnedC;
            earnedCoins += earnedC;
            newXp += 15;

            if (reactionTimeMs < stats.fastestAnswerTime) {
              stats.fastestAnswerTime = reactionTimeMs;
            }
          } else {
            wrongAdd += 1;
            stats.wrongAnswers += 1;
            newStreak = 0;
            newLives = Math.max(0, newLives - 1);
          }

          stats.categoryStats[catKey] = currentCat;

          // Adaptive AI Difficulty adjustment
          let currentDiff = state.activeDifficulty;
          if (state.adaptiveAI) {
            const ratio = correctAdd / Math.max(1, correctAdd + wrongAdd);
            if (correctAdd >= 8 && ratio > 0.85 && currentDiff !== "genius") {
              const hierarchy: DifficultyLevel[] = ["very-easy", "easy", "medium", "hard", "expert", "genius"];
              const idx = hierarchy.indexOf(currentDiff);
              if (idx < hierarchy.length - 1) {
                currentDiff = hierarchy[idx + 1];
              }
            } else if (wrongAdd >= 3 && ratio < 0.6 && currentDiff !== "very-easy") {
              const hierarchy: DifficultyLevel[] = ["very-easy", "easy", "medium", "hard", "expert", "genius"];
              const idx = hierarchy.indexOf(currentDiff);
              if (idx > 0) {
                currentDiff = hierarchy[idx - 1];
              }
            }
          }

          // Level calculation (e.g. 100 XP per level)
          const newLevel = 1 + Math.floor(newXp / 150);

          // Update date graph trackers
          const today = new Date().toISOString().split("T")[0];
          stats.weeklyProgress[today] = Math.max(stats.weeklyProgress[today] || 0, newScore);

          if (newScore > state.highScore) {
            state.highScore = newScore;
          }
          if (newScore > stats.highestScore) {
            stats.highestScore = newScore;
          }

          // Auto unlock achievements
          const updatedAchievements = state.achievements.map((ach) => {
            if (ach.unlocked) return ach;
            let shouldUnlock = false;
            if (ach.id === "first_pop" && correct) shouldUnlock = true;
            if (ach.id === "combo_5" && newStreak >= 5) shouldUnlock = true;
            if (ach.id === "combo_10" && newStreak >= 10) shouldUnlock = true;
            if (ach.id === "perfect_game" && correctAdd >= 15 && wrongAdd === 0) shouldUnlock = true;
            if (ach.id === "genius_unlock" && correct && state.activeDifficulty === "genius") shouldUnlock = true;
            if (ach.id === "coin_rich" && newCoins >= 1000) shouldUnlock = true;

            if (shouldUnlock) {
              let bonusCoins = 0;
              let bonusDiamonds = 0;
              let bonusStars = 0;
              if (ach.rewardType === "coins") bonusCoins = ach.rewardAmount;
              if (ach.rewardType === "diamonds") bonusDiamonds = ach.rewardAmount;
              if (ach.rewardType === "stars") bonusStars = ach.rewardAmount;

              newCoins += bonusCoins;
              return { ...ach, unlocked: true };
            }
            return ach;
          });

          return {
            score: newScore,
            comboStreak: newStreak,
            lives: newLives,
            coins: newCoins,
            xp: newXp,
            level: newLevel,
            correctCountThisGame: correctAdd,
            wrongCountThisGame: wrongAdd,
            coinsEarnedThisGame: earnedCoins,
            stats,
            activeDifficulty: currentDiff,
            achievements: updatedAchievements,
          };
        }),

      deductLife: () =>
        set((state) => ({
          lives: Math.max(0, state.lives - 1),
          comboStreak: 0,
        })),

      tickTimer: () =>
        set((state) => ({
          timeRemaining: Math.max(0, state.timeRemaining - 1),
        })),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      buySkin: (skinName, cost) => {
        const state = get();
        if (state.coins >= cost && !state.unlockedSkins.includes(skinName)) {
          set({
            coins: state.coins - cost,
            unlockedSkins: [...state.unlockedSkins, skinName],
            currentSkin: skinName,
          });
          return true;
        }
        return false;
      },

      resetProgress: () =>
        set({
          coins: 100,
          diamonds: 5,
          stars: 10,
          xp: 0,
          level: 1,
          unlockedSkins: ["classic"],
          unlockedBackgrounds: ["mountain"],
          currentSkin: "classic",
          currentBackground: "mountain",
          score: 0,
          highScore: 0,
          stats: {
            gamesPlayed: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            longestCombo: 0,
            highestScore: 0,
            totalTimePlayed: 0,
            fastestAnswerTime: 999999,
            weeklyProgress: {},
            categoryStats: {},
          },
          achievements: initialAchievements.map((a) => ({ ...a, unlocked: false })),
        }),

      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === id ? { ...ach, unlocked: true } : ach
          ),
        })),
    }),
    {
      name: "balloon-pop-math-adventure-save",
    }
  )
);
