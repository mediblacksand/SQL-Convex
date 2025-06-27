import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { BookOpen, Database, Code, AlertCircle } from 'lucide-react';
import { useDatabase } from './hooks/useDatabase';
import { useEffect, useState } from 'react';
import { initializeAnalytics, analytics } from './utils/analytics';
import { LessonView } from './components/lesson/LessonView';
import { lessons } from './data/lessons';

function App() {
  console.log('App component mounting...');
  const { db, isLoading, error, executeQuery } = useDatabase();
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [showLesson, setShowLesson] = useState(false);
  console.log('Database state:', { db: !!db, isLoading, error });

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics();
    analytics.featureUsed('app_loaded', 'main_application');
  }, []);

  // Track database initialization
  useEffect(() => {
    if (db) {
      analytics.featureUsed('database_ready', 'sql_js_initialization');
    }
    if (error) {
      analytics.databaseError(error);
    }
  }, [db, error]);

  // Sample data and debug functions removed for clean landing page

  // Lesson handlers
  const handleQueryExecute = async (query: string): Promise<any[]> => {
    if (!executeQuery) {
      throw new Error('Database not ready');
    }
    
    return executeQuery(query);
  };

  const handleLessonComplete = (lessonId: number) => {
    analytics.lessonCompleted(lessonId, 0, 1); // timeSpent: 0, attempts: 1 for now
    console.log(`Lesson ${lessonId} completed!`);
  };

  const handleLessonNavigate = (direction: 'prev' | 'next') => {
    const newId = direction === 'next' ? currentLessonId + 1 : currentLessonId - 1;
    if (newId >= 1 && newId <= lessons.length) {
      setCurrentLessonId(newId);
    }
  };

  const handleLessonSelect = (lessonId: number) => {
    if (lessonId >= 1 && lessonId <= lessons.length) {
      setCurrentLessonId(lessonId);
    }
  };

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId);

  // Show lesson view if lesson is started and database is ready
  if (showLesson && currentLesson && db) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setShowLesson(false)}
                    className="mr-4 px-3 py-1 text-sm border rounded hover:bg-gray-50"
                  >
                    ← Back to Overview
                  </button>
                  <div className="flex items-center space-x-2">
                    <Database className="h-6 w-6 text-blue-600" />
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-bold text-gray-900">
                      SQL & Convex Learning Platform
                    </h1>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Phase 3: Interactive Lessons
                </div>
              </div>
            </div>
          </header>
          
          <LessonView
            lesson={currentLesson}
            allLessons={lessons}
            onQueryExecute={handleQueryExecute}
            onLessonComplete={handleLessonComplete}
            onNavigate={handleLessonNavigate}
            onLessonSelect={handleLessonSelect}
            canNavigatePrev={currentLessonId > 1}
            canNavigateNext={currentLessonId < lessons.length}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation Header */}
        <nav className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Database className="h-8 w-8 text-blue-400" />
                  <Code className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    SQL & Convex Learn
                  </h1>
                </div>
              </div>
              {db && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Database Ready</span>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            
            {/* Hero Content */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SQL</span> &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Convex</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                  Learn database querying the fast way. Interactive lessons that get you coding immediately.
                </p>
              </div>

              {/* Technology Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Database className="h-8 w-8 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">SQL</h3>
                  </div>
                  <p className="text-slate-300 text-left">
                    <strong className="text-white">Structured Query Language</strong> - The standard language for relational databases. 
                    Used by MySQL, PostgreSQL, SQLite, and virtually every major database system.
                  </p>
                  <div className="mt-4 text-sm text-blue-400">
                    ✦ Industry standard ✦ Universal syntax ✦ Powerful queries
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <Code className="h-8 w-8 text-purple-400" />
                    <h3 className="text-2xl font-bold text-white">Convex</h3>
                  </div>
                  <p className="text-slate-300 text-left">
                    <strong className="text-white">Modern Backend Platform</strong> - Real-time database with automatic APIs, 
                    built-in authentication, and seamless TypeScript integration.
                  </p>
                  <div className="mt-4 text-sm text-purple-400">
                    ✦ Real-time sync ✦ Type-safe ✦ Serverless scaling
                  </div>
                </div>
              </div>

              {/* Learning Approach */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 mt-16 border border-emerald-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Inspired by SQLBolt</h3>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  This webapp adapts the proven SQLBolt methodology - learn by doing, not by reading. 
                  Each lesson is a hands-on challenge that builds real understanding through practice.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
                  <span className="bg-white/10 px-4 py-2 rounded-full text-emerald-400">6 Foundation Lessons</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-blue-400">Interactive Coding</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-purple-400">Instant Feedback</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full text-pink-400">Side-by-side Comparison</span>
                </div>
              </div>

              {/* CTA Section */}
              {isLoading ? (
                <div className="mt-12">
                  <div className="flex items-center justify-center space-x-3 text-blue-400">
                    <LoadingSpinner size="sm" />
                    <span className="text-lg">Initializing your learning environment...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="mt-12 bg-red-500/20 border border-red-500/50 rounded-xl p-6">
                  <div className="flex items-center justify-center space-x-3 text-red-400">
                    <AlertCircle className="h-6 w-6" />
                    <span>Database initialization failed: {error}</span>
                  </div>
                </div>
              ) : db ? (
                <div className="mt-12">
                  <button
                    onClick={() => setShowLesson(true)}
                    className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="flex items-center space-x-3">
                      <span>Start Learning Now</span>
                      <BookOpen className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <p className="text-slate-400 mt-4">
                    Jump straight into Lesson 1 • No signup required • Learn immediately
                  </p>
                </div>
              ) : null}
              
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;