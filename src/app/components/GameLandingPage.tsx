"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Play, ShieldAlert, Award } from "lucide-react";
import { generateQuestion, MathQuestion } from "../utils/mathEngine";
import { gameAudio } from "../utils/audio";
import confetti from "canvas-confetti";

interface GameLandingPageProps {
  title: string;
  h1: string;
  description: string;
  gameMode: any;
  difficulty: any;
  seoCopy: string;
  faqs: { q: string; a: string }[];
}

export const GameLandingPage: React.FC<GameLandingPageProps> = ({
  title,
  h1,
  description,
  gameMode,
  difficulty,
  seoCopy,
  faqs,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questionData, setQuestionData] = useState<MathQuestion | null>(null);
  const [activeScore, setActiveScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [explanationText, setExplanationText] = useState<string | null>(null);

  const initGame = () => {
    const q = generateQuestion(gameMode, difficulty);
    setQuestionData(q);
    setExplanationText(null);
  };

  const handleStart = () => {
    gameAudio.playClick();
    setActiveScore(0);
    setLives(3);
    setIsPlaying(true);
    initGame();
  };

  const handleAnswer = (val: number) => {
    if (!questionData) return;
    const isCorrect = val === questionData.correctAnswer;
    if (isCorrect) {
      gameAudio.playPop();
      gameAudio.playCorrect();
      confetti({ particleCount: 50, spread: 60 });
      setActiveScore((s) => s + 10);
      setExplanationText(null);
      
      // Load next question
      const q = generateQuestion(gameMode, difficulty);
      setQuestionData(q);
    } else {
      gameAudio.playWrong();
      setLives((l) => Math.max(0, l - 1));
      setExplanationText(questionData.explanation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white font-sans antialiased p-4 md:p-8 flex flex-col items-center">
      
      {/* Top Breadcrumbs and Navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        <span className="text-xs text-slate-300 uppercase tracking-widest font-bold">
          Home &gt; Games &gt; {title}
        </span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl backdrop-blur-xl z-10 flex flex-col gap-8">
        
        {/* H1 / Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 bg-clip-text text-transparent leading-tight mb-3">
            {h1}
          </h1>
          <p className="text-sm md:text-base text-slate-350 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Dynamic Interactive Demo Game View */}
        <div className="w-full bg-slate-950/60 rounded-3xl border border-white/10 overflow-hidden relative p-6 flex flex-col items-center justify-center min-h-[350px]">
          {!isPlaying ? (
            <div className="text-center flex flex-col items-center gap-5">
              <span className="text-6xl animate-bounce">🎈</span>
              <h2 className="text-2xl font-bold text-white">Start Interactive Math Demo</h2>
              <button 
                onClick={handleStart}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-slate-950" /> Play Game Demo
              </button>
            </div>
          ) : lives <= 0 ? (
            <div className="text-center flex flex-col items-center gap-4">
              <span className="text-5xl">😭</span>
              <h3 className="text-2xl font-extrabold text-red-400">Game Over</h3>
              <p className="text-sm text-slate-400">Final score: {activeScore} points</p>
              <button 
                onClick={handleStart}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-6">
              {/* Score HUD */}
              <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                <span className="text-xs text-slate-400">Demo Mode Score: <strong className="text-white text-sm">{activeScore}</strong></span>
                <span className="text-xs text-slate-400">Lives: <strong className="text-red-400 text-sm">{"❤️".repeat(lives)}</strong></span>
              </div>

              {/* Question */}
              <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Current Problem</div>
                <div className="text-4xl font-black tracking-tight">{questionData?.question}</div>
              </div>

              {/* Distractor option buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {questionData?.options.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(val)}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xl hover:scale-103 transition-all active:scale-95"
                  >
                    {val}
                  </button>
                ))}
              </div>

              {explanationText && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 justify-center">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{explanationText}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section (800+ words SEO copy) */}
        <article className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base border-t border-white/10 pt-8 flex flex-col gap-6">
          <div dangerouslySetInnerHTML={{ __html: seoCopy }} />
        </article>

        {/* FAQs */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-2xl font-black mb-6 text-white">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-350">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-extrabold text-white mb-1.5 flex items-center gap-2">
                  <span>❓</span> {faq.q}
                </h4>
                <p className="leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back navigation */}
        <div className="text-center border-t border-white/10 pt-6">
          <Link href="/" className="text-amber-300 hover:underline font-bold text-sm">
            ← Return to main educational learning center
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GameLandingPage;
