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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Lesson {lesson.id}: {lesson.title}
          </h1>
          <p className="text-gray-600 mt-1">{lesson.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Lesson Dropdown */}
          <div className="relative lesson-dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-50 bg-white min-w-[180px] justify-between"
            >
              <span>Lesson {lesson.id}: {lesson.title.length > 15 ? lesson.title.substring(0, 15) + '...' : lesson.title}</span>
              <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-96 overflow-y-auto">
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                    Select Lesson
                  </div>
                  {allLessons.map((lessonOption) => (
                    <button
                      key={lessonOption.id}
                      onClick={() => {
                        onLessonSelect(lessonOption.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                        lessonOption.id === lesson.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">
                          Lesson {lessonOption.id}: {lessonOption.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {lessonOption.description}
                        </div>
                      </div>
                      {lessonOption.id === lesson.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('prev')}
              disabled={!canNavigatePrev}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Prev
            </button>
            <button
              onClick={() => onNavigate('next')}
              disabled={!canNavigateNext}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${sqlCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-sm font-medium">SQL Query</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${showConvex ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <span className="text-sm font-medium">Convex Equivalent</span>
        </div>
      </div>

      {/* SQL Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="text-blue-600" size={20} />
          <h2 className="text-xl font-semibold">SQL Query Practice</h2>
        </div>
        
        <QueryEditor
          lesson={lesson}
          onQueryExecute={onQueryExecute}
          onSuccess={handleSqlSuccess}
        />
      </div>

      {/* Convex Section */}
      {showConvex && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold">Convex Equivalent</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">🔄 How Convex Does It</h3>
              <p className="text-purple-800 mb-3">{lesson.convexSection.concept}</p>
              <div className="bg-white border rounded p-3">
                <p className="text-sm text-gray-600 mb-1">Convex Example:</p>
                <code className="text-sm font-mono text-purple-600">{lesson.convexSection.example}</code>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">✅ Lesson Complete!</h3>
              <p className="text-green-800">
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