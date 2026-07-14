"use client";

import React, { useEffect, useRef } from "react";
import { useGameStore } from "../store/store";
import { Trophy, RefreshCw, BarChart2 } from "lucide-react";

interface StatsViewProps {
  onBack: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ onBack }) => {
  const { stats, achievements, resetProgress } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const totalQuestions = stats.questionsAnswered;
  const accuracy = totalQuestions > 0 ? Math.round((stats.correctAnswers / totalQuestions) * 100) : 0;
  const longestCombo = stats.longestCombo;
  const gamesPlayed = stats.gamesPlayed;
  const fastestTime = stats.fastestAnswerTime === 999999 ? "N/A" : `${(stats.fastestAnswerTime / 1000).toFixed(2)}s`;

  // Draw a premium local statistics chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset and size canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 200 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = rect.width;
    const h = 200;

    ctx.clearRect(0, 0, w, h);

    // Draw grid lines
    ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (h / 5) * i;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    // Populate daily score progress
    const dates = Object.keys(stats.weeklyProgress).sort().slice(-7);
    const data = dates.map(d => stats.weeklyProgress[d]);

    if (data.length === 0) {
      // Draw placeholder text if no data exists
      ctx.fillStyle = "#888888";
      ctx.font = "14px Outfit, Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Play a few games to generate learning charts!", w / 2, h / 2);
      return;
    }

    const maxVal = Math.max(...data, 100);
    const xStep = (w - 70) / Math.max(1, data.length - 1);

    // Create vibrant gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");

    // Draw path
    ctx.beginPath();
    dates.forEach((d, index) => {
      const val = data[index];
      const x = 40 + index * xStep;
      const y = h - 30 - ((val / maxVal) * (h - 60));
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Fill under path
    ctx.lineTo(40 + (data.length - 1) * xStep, h - 30);
    ctx.lineTo(40, h - 30);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw dots and text
    dates.forEach((d, index) => {
      const val = data[index];
      const x = 40 + index * xStep;
      const y = h - 30 - ((val / maxVal) * (h - 60));

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label values
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(val), x, y - 10);

      // Date labels
      const dateParts = d.split("-");
      const label = `${dateParts[1]}/${dateParts[2]}`;
      ctx.fillStyle = "#64748b";
      ctx.font = "10px sans-serif";
      ctx.fillText(label, x, h - 10);
    });

  }, [stats.weeklyProgress]);

  const handleReset = () => {
    if (confirm("Are you sure you want to clear your game history, scores, and unlock items?")) {
      resetProgress();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4 md:p-6 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200/50 dark:border-zinc-800/50">
        <h2 className="text-3xl font-extrabold flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          <BarChart2 className="w-8 h-8 text-blue-600" />
          Dashboard & Analytics
        </h2>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full font-bold text-sm transition-all"
        >
          Back to Menu
        </button>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Games Played", value: gamesPlayed, color: "text-blue-500" },
          { label: "Math Problems Solved", value: stats.correctAnswers, color: "text-green-500" },
          { label: "Global Accuracy", value: `${accuracy}%`, color: "text-amber-500" },
          { label: "Longest Streak", value: `${longestCombo}x`, color: "text-pink-500" },
          { label: "Fastest Answer", value: fastestTime, color: "text-indigo-500" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-gray-100/50 dark:border-zinc-800/50 text-center flex flex-col justify-center"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
            <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Weekly graph */}
      <div className="p-4 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-gray-100/50 dark:border-zinc-800/50">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Score Progress Chart</h3>
        <div className="w-full relative h-[200px]">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>

      {/* Achievements layout */}
      <div className="mt-2">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-slate-100">
          <Trophy className="w-6 h-6 text-amber-500" />
          Achievements & Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                ach.unlocked
                  ? "bg-gradient-to-r from-amber-500/10 to-amber-600/5 border-amber-500/30"
                  : "bg-gray-50/50 dark:bg-zinc-900/30 border-gray-100 dark:border-zinc-800/50 opacity-60"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                  ach.unlocked ? "bg-amber-400 text-slate-900 animate-pulse" : "bg-gray-200 dark:bg-zinc-800 text-gray-400"
                }`}
              >
                🎈
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  {ach.title}
                  {ach.unlocked && <span className="text-xs bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded-full">Unlocked</span>}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ach.description}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Reward</div>
                <div className="font-extrabold text-sm text-amber-500 flex items-center gap-1 justify-end">
                  {ach.rewardType === "coins" ? "🪙" : ach.rewardType === "diamonds" ? "💎" : "⭐"}
                  {ach.rewardAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button
          onClick={handleReset}
          className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 hover:underline transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset All Progress
        </button>
        <span className="text-xs text-slate-400">All data saved locally in your browser.</span>
      </div>
    </div>
  );
};
export default StatsView;
