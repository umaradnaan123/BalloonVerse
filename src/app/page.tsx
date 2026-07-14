"use client";

import React, { useState, useEffect } from "react";
import { useGameStore, GameMode, DifficultyLevel } from "./store/store";
import GameView from "./components/GameView";
import StatsView from "./components/StatsView";
import { gameAudio } from "./utils/audio";
import { Play, Award, Settings as SettingsIcon, BarChart2, Check, RefreshCw, X, Sparkles, HelpCircle } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    name,
    avatar,
    coins,
    diamonds,
    stars,
    highScore,
    level,
    setName,
    setAvatar,
  } = useGameStore();

  const [gameState, setGameState] = useState<"menu" | "playing" | "stats" | "settings">("menu");
  const [selectedMode, setSelectedMode] = useState<GameMode>("addition");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>("easy");

  const [activeAvatar, setActiveAvatar] = useState("owl");
  const [activeName, setActiveName] = useState("Player 1");

  // Parallax backdrop elements state
  const [hillsOffset, setHillsOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
    setActiveName(name);
    setActiveAvatar(avatar);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setActiveName(name);
      setActiveAvatar(avatar);
    }
  }, [name, avatar, isMounted]);

  // Handle subtle mouse hover interactive parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.03;
    const y = (clientY - window.innerHeight / 2) * 0.03;
    setHillsOffset({ x, y });
  };

  const handleStartGame = () => {
    gameAudio.playClick();
    useGameStore.getState().startGame(selectedMode, selectedDifficulty);
    setGameState("playing");
  };

  const handleSaveProfile = () => {
    setName(activeName);
    setAvatar(activeAvatar);
    gameAudio.playClick();
    alert("Profile saved successfully!");
  };

  const getAvatarEmoji = (av: string) => {
    switch (av) {
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

  if (!isMounted) return null;

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-tr from-sky-400 via-pink-300 to-indigo-400 dark:from-slate-950 dark:via-blue-900 dark:to-indigo-950 transition-colors duration-500 overflow-hidden cursor-crosshair"
    >
      
      {/* Background Animated Parallax Landscape Elements */}
      <div 
        style={{
          transform: `translate3d(${hillsOffset.x * 0.4}px, ${hillsOffset.y * 0.4}px, 0)`,
          transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      >
        {/* Soft mountains landscape */}
        <div 
          style={{ transform: `translate3d(${hillsOffset.x * 0.2}px, 0, 0)` }}
          className="absolute bottom-0 left-[-10%] right-[-10%] h-64 bg-emerald-500/30 rounded-t-[300px] blur-[1px]" 
        />
        <div 
          style={{ transform: `translate3d(${hillsOffset.x * 0.5}px, 8px, 0)` }}
          className="absolute bottom-0 left-[-20%] right-[-20%] h-48 bg-emerald-400/40 rounded-t-[200px]" 
        />
      </div>

      {/* Floating clouds & hot air balloons */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-32 h-12 bg-white/70 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-44 h-16 bg-white/60 rounded-full blur-[3px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[40%] left-[80%] text-6xl opacity-30 animate-bounce" style={{ animationDuration: "15s" }}>🎈</div>
        <div className="absolute bottom-[20%] left-[12%] text-7xl opacity-20 animate-bounce" style={{ animationDuration: "20s" }}>🪁</div>
      </div>

      {/* Interactive custom layout controller container wrapper */}
      <div className="w-full max-w-4xl z-10 animate-fade-in">
        {gameState === "menu" && (
          <div className="flex flex-col items-center gap-6 text-center">
            
            {/* Header logo bouncing with 3D shadows */}
            <div className="relative animate-bounce flex flex-col items-center justify-center gap-1" style={{ animationDuration: "6s" }}>
              <div className="flex gap-2 text-5xl mb-1 animate-pulse">
                <span>🎈</span>
                <span>⭐</span>
                <span>🎈</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                Balloon Pop
                <span className="block text-4xl md:text-5xl bg-gradient-to-r from-amber-300 via-yellow-200 to-rose-300 bg-clip-text text-transparent font-black mt-2">
                  Math Adventure
                </span>
              </h1>
            </div>

            {/* Profile & level badge */}
            <div className="flex items-center gap-3 bg-white/30 dark:bg-black/35 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 shadow-2xl animate-pulse">
              <span className="text-2xl">{getAvatarEmoji(avatar)}</span>
              <span className="font-black text-sm text-white">{name}</span>
              <span className="bg-amber-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full shadow-md">Lvl {level}</span>
              <div className="text-xs text-white font-extrabold flex items-center gap-1">
                🪙 {coins}
              </div>
            </div>

            {/* Main Interactive Game Mode Selectors Dashboard */}
            <div className="w-full glass-panel p-6 md:p-8 rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col gap-6 transform hover:scale-[1.01] transition-transform duration-300">
              
              {/* Game Modes selector */}
              <div>
                <h3 className="text-left font-black text-white mb-3 text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  1. Select Game Mode
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                  {[
                    { id: "addition", label: "Addition", icon: "➕" },
                    { id: "subtraction", label: "Subtraction", icon: "➖" },
                    { id: "multiplication", label: "Multiplication", icon: "✖️" },
                    { id: "division", label: "Division", icon: "➗" },
                    { id: "mixed", label: "Mixed Match", icon: "🧮" },
                    { id: "time-attack", label: "Time Attack", icon: "⏱️" },
                    { id: "endless", label: "Endless Float", icon: "♾️" },
                    { id: "kids", label: "Kids Mode", icon: "🧸" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        gameAudio.playClick();
                        setSelectedMode(mode.id as GameMode);
                      }}
                      className={`p-4 rounded-2xl font-extrabold text-sm text-left flex flex-col justify-between h-24 transition-all duration-300 ${
                        selectedMode === mode.id
                          ? "bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 shadow-[0_8px_20px_rgba(245,158,11,0.4)] scale-105 border-transparent"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                      }`}
                    >
                      <span className="text-2xl">{mode.icon}</span>
                      <span>{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty level selector */}
              <div>
                <h3 className="text-left font-black text-white mb-3 text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-300" />
                  2. Choose Difficulty Level
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { id: "very-easy", label: "Very Easy", color: "hover:border-emerald-350" },
                    { id: "easy", label: "Easy", color: "hover:border-emerald-400" },
                    { id: "medium", label: "Medium", color: "hover:border-amber-400" },
                    { id: "hard", label: "Hard", color: "hover:border-orange-400" },
                    { id: "expert", label: "Expert", color: "hover:border-red-400" },
                    { id: "genius", label: "Genius", color: "hover:border-purple-400" },
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => {
                        gameAudio.playClick();
                        setSelectedDifficulty(diff.id as DifficultyLevel);
                      }}
                      className={`py-3 px-2 rounded-xl font-bold text-xs transition-all duration-300 ${
                        selectedDifficulty === diff.id
                          ? "bg-emerald-400 text-slate-900 shadow-[0_6px_15px_rgba(52,211,153,0.4)] scale-105"
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Start button */}
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <button
                  onClick={handleStartGame}
                  className="flex-1 py-4 bg-gradient-to-r from-amber-400 via-yellow-350 to-emerald-400 text-slate-950 font-black text-xl rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2.5 button-pop cursor-pointer hover:rotate-1"
                >
                  <Play className="w-6 h-6 fill-slate-950 text-slate-950" />
                  Start Pop Adventure
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      gameAudio.playClick();
                      setGameState("stats");
                    }}
                    className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/15 transition-all border border-white/15 shadow-md cursor-pointer"
                    title="View Dashboard Analytics"
                  >
                    <BarChart2 className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      gameAudio.playClick();
                      setGameState("settings");
                    }}
                    className="p-4 bg-white/10 text-white rounded-2xl hover:bg-white/15 transition-all border border-white/15 shadow-md cursor-pointer"
                    title="Edit Settings & Profile"
                  >
                    <SettingsIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* High score board teaser */}
            <div className="text-xs font-bold text-white/80 flex items-center gap-1.5 mt-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
              <Award className="w-4 h-4 text-amber-300" />
              Local High Score: <span className="text-amber-300 font-extrabold">{highScore} points</span>
            </div>
          </div>
        )}

        {gameState === "playing" && (
          <GameView
            mode={selectedMode}
            difficulty={selectedDifficulty}
            onGameOver={() => {
              gameAudio.playLevelUp(); 
              alert("Game finished! Check your stats in the dashboard.");
              setGameState("menu");
            }}
          />
        )}

        {gameState === "stats" && (
          <StatsView onBack={() => { gameAudio.playClick(); setGameState("menu"); }} />
        )}

        {gameState === "settings" && (
          <div className="w-full max-w-2xl mx-auto glass-panel p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col gap-6 text-white">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <SettingsIcon className="w-6 h-6 text-amber-300" />
                Settings & Companion Profile
              </h2>
              <button
                onClick={() => { gameAudio.playClick(); setGameState("menu"); }}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Companion Character Customizer */}
            <div>
              <h3 className="font-bold mb-3 text-sm text-white/70 uppercase tracking-wide">
                Choose Companion Character
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {["owl", "panda", "rabbit", "fox", "penguin", "dog", "robot", "wizard", "astronaut"].map((av) => (
                  <button
                    key={av}
                    onClick={() => {
                      gameAudio.playClick();
                      setActiveAvatar(av);
                    }}
                    className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                      activeAvatar === av
                        ? "bg-amber-400/20 border-2 border-amber-400 scale-105"
                        : "bg-white/5 border border-white/10 hover:scale-102"
                    }`}
                  >
                    <span className="text-3xl">{getAvatarEmoji(av)}</span>
                    <span className="text-[10px] capitalize font-bold">{av}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-white/70 uppercase tracking-wide">
                Player Name
              </label>
              <input
                type="text"
                value={activeName}
                onChange={(e) => setActiveName(e.target.value)}
                className="p-3 rounded-xl border border-white/10 bg-white/5 font-bold focus:outline-amber-400 text-white"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="py-3 bg-amber-400 text-slate-900 font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-amber-350"
            >
              <Check className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
