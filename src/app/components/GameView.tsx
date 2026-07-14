"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGameStore, GameMode, DifficultyLevel } from "../store/store";
import { generateQuestion, MathQuestion } from "../utils/mathEngine";
import { gameAudio } from "../utils/audio";
import { Heart, Volume2, Sparkles, Star, Zap, Clock, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

interface GameViewProps {
  mode: GameMode;
  difficulty: DifficultyLevel;
  onGameOver: () => void;
}

interface Balloon {
  id: number;
  value: number;
  x: number;
  y: number;
  speed: number;
  color: string;
  size: number;
  type: string; 
  oscillation: number;
  oscillationSpeed: number;
  shakeTime: number; 
  isPopping: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
  type: "fragment" | "sparkle" | "star" | "smoke";
}

interface PopFeedback {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export const GameView: React.FC<GameViewProps> = ({ mode, difficulty, onGameOver }) => {
  const {
    score,
    lives,
    maxLives,
    comboStreak,
    timeRemaining,
    answerQuestion,
    tickTimer,
    avatar,
  } = useGameStore();

  const [questionData, setQuestionData] = useState<MathQuestion | null>(null);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [isCorrectCelebration, setIsCorrectCelebration] = useState(false);
  const [explanationText, setExplanationText] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  // Advanced VFX Systems
  const [particles, setParticles] = useState<Particle[]>([]);
  const [feedbacks, setFeedbacks] = useState<PopFeedback[]>([]);
  const [screenShake, setScreenShake] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadNewQuestion = () => {
    const q = generateQuestion(mode, difficulty);
    setQuestionData(q);
    setQuestionStartTime(Date.now());
    setExplanationText(null);

    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth || 600;
      const initialBalloons: Balloon[] = q.options.map((val, idx) => {
        const xStep = containerWidth / 5;
        const startX = xStep * (idx + 1) + (Math.random() * 30 - 15);

        const balloonColors = [
          "radial-gradient(circle at 30% 30%, #ef4444, #991b1b)", // Red
          "radial-gradient(circle at 30% 30%, #3b82f6, #1e3a8a)", // Blue
          "radial-gradient(circle at 30% 30%, #eab308, #854d0e)", // Yellow
          "radial-gradient(circle at 30% 30%, #22c55e, #166534)", // Green
          "radial-gradient(circle at 30% 30%, #a855f7, #6b21a8)", // Purple
          "radial-gradient(circle at 30% 30%, #ec4899, #9d174d)", // Pink
        ];

        const types = ["classic", "heart", "rocket", "rainbow", "star"];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        return {
          id: Math.random(),
          value: val,
          x: Math.max(40, Math.min(startX, containerWidth - 80)),
          y: 450 + Math.random() * 80,
          speed: 1.0 + Math.random() * 1.3,
          color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
          size: 75 + Math.random() * 15,
          type: chosenType,
          oscillation: Math.random() * Math.PI,
          oscillationSpeed: 0.02 + Math.random() * 0.03,
          shakeTime: 0,
          isPopping: false,
        };
      });

      setBalloons(initialBalloons);
    }
  };

  useEffect(() => {
    loadNewQuestion();
    const interval = setInterval(() => {
      if (mode !== "endless") {
        tickTimer();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lives <= 0 || (timeRemaining <= 0 && mode !== "endless")) {
      onGameOver();
    }
  }, [lives, timeRemaining, mode, onGameOver]);

  // Combined VFX Particles, physics and pop labels animation ticker (60 FPS requestAnimationFrame)
  useEffect(() => {
    let animationFrameId: number;

    const updateGameFrame = () => {
      // 1. Balloon Floating Physics
      setBalloons((prevBalloons) => {
        return prevBalloons
          .map((b) => {
            if (b.isPopping) return b;
            const newOsc = b.oscillation + b.oscillationSpeed;
            const drift = Math.sin(newOsc) * 1.3;
            let nextY = b.y - b.speed;

            if (nextY < -150) {
              nextY = 600 + Math.random() * 80;
            }

            return {
              ...b,
              y: nextY,
              x: b.x + drift,
              oscillation: newOsc,
              shakeTime: Math.max(0, b.shakeTime - 16),
            };
          })
          .filter((b) => !b.isPopping || b.shakeTime > 0);
      });

      // 2. Physics Particles Updates
      setParticles((prevParticles) => {
        return prevParticles
          .map((p) => {
            // Apply velocity and drag
            const nextX = p.x + p.vx;
            const nextY = p.y + p.vy;
            const nextAlpha = p.alpha - p.decay;

            return {
              ...p,
              x: nextX,
              y: nextY,
              alpha: nextAlpha,
            };
          })
          .filter((p) => p.alpha > 0);
      });

      animationFrameId = requestAnimationFrame(updateGameFrame);
    };

    animationFrameId = requestAnimationFrame(updateGameFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Trigger Burst particles at clicked location
  const createBurstEffect = (x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];

    // Create fragments flying outward
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: 8 + Math.random() * 8,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02,
        type: "fragment",
      });
    }

    // Sparkles & Smoke
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      newParticles.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // slight float up for smoke/sparks
        color: "#fef08a", // Golden spark
        size: 4 + Math.random() * 4,
        alpha: 1,
        decay: 0.03 + Math.random() * 0.04,
        type: "sparkle",
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };

  const handlePop = (balloon: Balloon) => {
    if (!questionData || balloon.isPopping) return;

    const reactionTime = Date.now() - questionStartTime;
    const isCorrect = balloon.value === questionData.correctAnswer;
    const clickX = balloon.x + balloon.size / 2;
    const clickY = balloon.y + balloon.size / 2;

    // Mobile tactile feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(isCorrect ? 60 : 150);
    }

    if (isCorrect) {
      gameAudio.playPop(clickX);
      gameAudio.playCorrect(clickX);
      
      createBurstEffect(clickX, clickY, "#3b82f6");

      // Custom Floating praise slogans
      const praiseWords = ["+10 Points", "Correct!", "Awesome!", "Great Job!", "Perfect!"];
      const chosenWord = praiseWords[Math.floor(Math.random() * praiseWords.length)];
      
      const newFeedback: PopFeedback = {
        id: Math.random(),
        x: clickX,
        y: clickY,
        text: chosenWord,
        color: "text-emerald-500",
      };
      setFeedbacks((prev) => [...prev, newFeedback]);

      // Spark screen shake
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 200);

      // Trigger standard confetti
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { x: clickX / (containerRef.current?.clientWidth || 800), y: clickY / 500 },
      });

      setIsCorrectCelebration(true);
      answerQuestion(true, reactionTime);

      // Instantly pop off and refresh question
      setBalloons((prev) => prev.map((b) => b.id === balloon.id ? { ...b, isPopping: true } : b));

      setTimeout(() => {
        setIsCorrectCelebration(false);
        loadNewQuestion();
      }, 500);
    } else {
      gameAudio.playWrong(clickX);
      
      // Wrong balloon shakes
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, shakeTime: 400 } : b))
      );

      const wrongWords = ["Oops!", "Try Again!", "-1 Life"];
      const newFeedback: PopFeedback = {
        id: Math.random(),
        x: clickX,
        y: clickY - 20,
        text: wrongWords[Math.floor(Math.random() * wrongWords.length)],
        color: "text-red-500",
      };
      setFeedbacks((prev) => [...prev, newFeedback]);

      setExplanationText(questionData.explanation);
      answerQuestion(false, reactionTime);
    }
  };

  const getAvatarChar = () => {
    switch (avatar) {
      case "owl": return "🦉";
      case "panda": return "🐼";
      case "rabbit": return "🐰";
      case "fox": return "🦊";
      case "penguin": return "🐧";
      case "dog": return "🐶";
      case "robot": return "🤖";
      case "wizard": return "🧙";
      case "astronaut": return "👨‍🚀";
      default: return "🦉";
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: screenShake ? "translate3d(4px, -4px, 0)" : "none",
        transition: screenShake ? "none" : "transform 0.1s ease-out",
      }}
      className="relative flex flex-col flex-1 w-full max-w-4xl mx-auto h-[600px] bg-gradient-to-b from-sky-400/95 via-cyan-350/90 to-emerald-200/90 dark:from-slate-900/95 dark:via-blue-950/90 dark:to-indigo-950/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden p-6 select-none"
    >
      {/* Game HUD Bar */}
      <div className="flex justify-between items-center bg-white/35 dark:bg-black/35 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/10 z-30">
        <div className="flex items-center gap-1">
          {Array.from({ length: maxLives }).map((_, idx) => (
            <Heart
              key={idx}
              className={`w-6 h-6 transition-all ${
                idx < lives
                  ? "text-red-500 fill-red-500 scale-110 drop-shadow-[0_2px_4px_rgba(239,68,68,0.4)] animate-pulse"
                  : "text-gray-400 opacity-20"
              }`}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-300">
            Score
          </div>
          <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-2 justify-center">
            {score}
            {comboStreak > 1 && (
              <span className="text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black animate-bounce flex items-center gap-0.5">
                <Zap className="w-3 h-3 fill-slate-950" /> {comboStreak}x
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black/10 dark:bg-white/10 px-3 py-1.5 rounded-full">
          <Clock className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200">
            {mode === "endless" ? "∞" : `${timeRemaining}s`}
          </span>
        </div>
      </div>

      {/* Floating Balloon Screen Space */}
      <div className="flex-1 w-full relative overflow-hidden bg-transparent rounded-2xl">
        {/* Draw Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: p.alpha,
              transform: "translate3d(-50%, -50%, 0)",
            }}
            className="absolute rounded-full pointer-events-none filter blur-[1px]"
          />
        ))}

        {/* Draw floating pop slogans text */}
        {feedbacks.map((f) => (
          <div
            key={f.id}
            style={{
              left: `${f.x}px`,
              top: `${f.y}px`,
            }}
            className={`absolute font-black text-xl pointer-events-none animate-bounce -translate-x-1/2 -translate-y-1/2 z-40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${f.color}`}
          >
            {f.text}
          </div>
        ))}

        {balloons.map((b) => {
          const isShaking = b.shakeTime > 0;
          if (b.isPopping) return null;

          return (
            <button
              key={b.id}
              onClick={() => handlePop(b)}
              style={{
                left: `${b.x}px`,
                top: `${b.y}px`,
                width: `${b.size}px`,
                height: `${b.size * 1.3}px`,
                transform: isShaking
                  ? `translate3d(${Math.sin(b.shakeTime * 0.1) * 7}px, 0, 0) rotate(${Math.sin(b.shakeTime * 0.05) * 10}deg)`
                  : "none",
                background: b.color,
              }}
              className="absolute cursor-pointer border border-white/20 shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.3),0_12px_24px_rgba(0,0,0,0.2)] rounded-[50%_50%_50%_50%/_40%_40%_60%_60%] transition-transform active:scale-95 duration-100 flex flex-col items-center justify-center focus:outline-none z-20 overflow-visible"
            >
              {/* Highlight Glare */}
              <div className="absolute top-[8%] left-[15%] w-[25%] h-[15%] bg-white/60 rounded-[50%] rotate-[-30deg] pointer-events-none" />

              {/* Balloon Knot/Tie */}
              <div 
                style={{ borderBottomColor: b.color.includes("#") ? b.color : "rgba(255,255,255,0.4)" }}
                className="absolute bottom-[-6px] left-[calc(50%-7px)] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] z-10" 
              />

              {/* Balloon String */}
              <div className="absolute w-[1.5px] bg-slate-700/30 bottom-[-45px] left-1/2 h-[45px] origin-top rotate-3" />

              <span className="text-white font-black text-3xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)] z-10 select-none">
                {b.value}
              </span>
            </button>
          );
        })}

        {/* Avatar celebration presentation */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
          <span className={`text-4xl transition-transform ${isCorrectCelebration ? "animate-bounce scale-125" : ""}`}>
            {getAvatarChar()}
          </span>
          <div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Companion</div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-100">
              {isCorrectCelebration ? "Amazing! 🎉" : "Ready to Pop!"}
            </div>
          </div>
        </div>
      </div>

      {/* Pop Question Display Area */}
      <div className="mt-4 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-lg border border-white/15 p-5 rounded-2xl text-center relative z-30">
        {questionData ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
              Select the Correct Answer Balloon
            </div>
            <div className="text-4xl font-black text-slate-800 dark:text-slate-50 tracking-tight">
              {questionData.question}
            </div>
          </div>
        ) : (
          <div className="text-xl font-bold animate-pulse text-slate-500">Loading problem...</div>
        )}

        {explanationText && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 justify-center">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{explanationText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameView;
