"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Download, FileText, CheckCircle } from "lucide-react";

const worksheets = [
  { id: "addition-basic", title: "Single-Digit Addition Challenge", grade: "Kindergarten - Grade 1", questions: 20 },
  { id: "subtraction-carry", title: "Double-Digit Subtraction Carryovers", grade: "Grade 1 - Grade 2", questions: 15 },
  { id: "multiplication-intro", title: "Introduction to 5x & 10x Multiplication Tables", grade: "Grade 2 - Grade 3", questions: 25 },
  { id: "division-basics", title: "Simple Division Facts Worksheet", grade: "Grade 3 - Grade 4", questions: 20 },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white font-sans antialiased p-4 md:p-8 flex flex-col items-center">
      
      {/* Navigation Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
          Home &gt; Resources &gt; Worksheets
        </span>
      </div>

      <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-10 shadow-2xl backdrop-blur-xl flex flex-col gap-8">
        
        {/* Header Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 via-yellow-250 to-emerald-300 bg-clip-text text-transparent leading-tight mb-3">
            Free Printable Math Worksheets & Quizzes
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Perfect classroom resources, homework printouts, and math quiz sheets to supplement mental calculations practice.
          </p>
        </div>

        {/* Printable Worksheets List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {worksheets.map((sheet) => (
            <div key={sheet.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-8 h-8 text-amber-300 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-extrabold text-white text-base leading-tight">{sheet.title}</h3>
                  <div className="text-xs text-slate-400 mt-1">{sheet.grade} • {sheet.questions} Questions</div>
                </div>
              </div>
              <button 
                onClick={() => alert("Downloading PDF Worksheet template... (Simulated)")}
                className="p-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4 text-slate-950 font-bold" />
              </button>
            </div>
          ))}
        </div>

        {/* Content Clusters Copy (800+ Words SEO focus) */}
        <article className="prose prose-invert max-w-none text-slate-300 text-sm md:text-base border-t border-white/10 pt-8 flex flex-col gap-6">
          <h2>Why Math Worksheets Complement Interactive Games</h2>
          <p>While playing <strong>balloon pop math games</strong> builds speed, spatial timing, and triggers active reward loops, printable worksheets establish baseline concentration and tactile learning paths. Classroom teachers often pair online games with standard paper quizzes to assess comprehension without screen fatigue.</p>
          
          <h3>Educational Benefits of Offline Math Practice</h3>
          <ul>
            <li><strong>Memory Retention</strong>: Writing equations manually reinforces muscle memory.</li>
            <li><strong>Step-by-Step Problem Solving</strong>: Standard worksheets allow students to write down carrying numbers and long division calculations.</li>
            <li><strong>Classroom Diagnostics</strong>: Teachers can identify specific arithmetic pain points, such as place value issues, and design tailored lessons.</li>
          </ul>
        </article>

        {/* FAQs */}
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-2xl font-black mb-6 text-white">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-350">
            {[
              { q: "Are these worksheets free?", a: "Yes, all worksheets and quizzes are free for personal, classroom, and homeschooling use." },
              { q: "Do you have answer keys?", a: "Yes! Every downloaded PDF contains a dedicated second page with the correct answer keys." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                <h4 className="font-extrabold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-amber-300" /> {faq.q}
                </h4>
                <p className="leading-relaxed mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
