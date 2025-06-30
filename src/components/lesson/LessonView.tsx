import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Database, ChevronDown } from 'lucide-react';
import { LessonData } from '../../types/lesson';
import { QueryEditor } from './QueryEditor';

interface LessonViewProps {
  lesson: LessonData;
  allLessons: LessonData[];
  onQueryExecute: (query: string) => Promise<any[]>;
  onLessonComplete: (lessonId: number) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onLessonSelect: (lessonId: number) => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  allLessons,
  onQueryExecute,
  onLessonComplete,
  onNavigate,
  onLessonSelect,
  canNavigatePrev,
  canNavigateNext
}) => {
  const [sqlCompleted, setSqlCompleted] = useState(false);
  const [showConvex, setShowConvex] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Reset lesson state when lesson changes
  useEffect(() => {
    setSqlCompleted(false);
    setShowConvex(false);
  }, [lesson.id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('.lesson-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleSqlSuccess = () => {
    setSqlCompleted(true);
    setShowConvex(true);
    onLessonComplete(lesson.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Lesson {lesson.id}: {lesson.title}
          </h1>
          <p className="text-slate-300 mt-2 text-lg">{lesson.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Lesson Dropdown */}
          <div className="relative lesson-dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 text-white min-w-[180px] justify-between transition-all duration-200"
            >
              <span>Lesson {lesson.id}: {lesson.title.length > 15 ? lesson.title.substring(0, 15) + '...' : lesson.title}</span>
              <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-10 max-h-96 overflow-y-auto">
                <div className="py-2">
                  <div className="px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide border-b border-white/10">
                    Select Lesson
                  </div>
                  {allLessons.map((lessonOption) => (
                    <button
                      key={lessonOption.id}
                      onClick={() => {
                        onLessonSelect(lessonOption.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 flex items-center justify-between transition-all ${
                        lessonOption.id === lesson.id ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">
                          Lesson {lessonOption.id}: {lessonOption.title}
                        </div>
                        <div className="text-xs text-slate-400 truncate mt-1">
                          {lessonOption.description}
                        </div>
                      </div>
                      {lessonOption.id === lesson.id && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('prev')}
              disabled={!canNavigatePrev}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Prev
            </button>
            <button
              onClick={() => onNavigate('next')}
              disabled={!canNavigateNext}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-6 p-6 bg-black/20 backdrop-blur-lg rounded-2xl border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${sqlCompleted ? 'bg-cyan-400' : 'bg-slate-600'} transition-all duration-300`} />
          <span className="text-slate-300 font-medium">SQL Query</span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${showConvex ? 'bg-teal-400' : 'bg-slate-600'} transition-all duration-300`} />
          <span className="text-slate-300 font-medium">Convex Equivalent</span>
        </div>
      </div>

      {/* SQL Section */}
      <div className="bg-black/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-cyan-400" size={24} />
          <h2 className="text-2xl font-semibold text-white">SQL Query Practice</h2>
        </div>
        
        <QueryEditor
          lesson={lesson}
          onQueryExecute={onQueryExecute}
          onSuccess={handleSqlSuccess}
        />
      </div>

      {/* Convex Section */}
      {showConvex && (
        <div className="bg-black/20 backdrop-blur-lg border border-teal-500/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-teal-400" size={24} />
            <h2 className="text-2xl font-semibold text-white">Convex Equivalent</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-teal-500/20 border border-teal-400/30 rounded-xl p-6">
              <h3 className="font-semibold text-teal-300 mb-3 flex items-center gap-2">
                🔄 How Convex Does It
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">{lesson.convexSection.concept}</p>
              <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4">
                <p className="text-sm text-slate-400 mb-2">Convex Example:</p>
                <code className="text-sm font-mono text-teal-400">{lesson.convexSection.example}</code>
              </div>
            </div>
            
            <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl p-6">
              <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                ✅ Lesson Complete!
              </h3>
              <p className="text-slate-300 leading-relaxed">
                You've learned how to query data with both SQL and Convex. 
                SQL uses SELECT statements while Convex uses query functions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};