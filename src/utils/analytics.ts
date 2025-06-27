// Analytics utility for GitHub Pages deployment
// Tracks user interactions without backend

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

// Google Analytics event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Learning_Platform',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters
    });
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters);
  }
};

// Lesson-specific tracking
export const analytics = {
  // Lesson progression
  lessonStarted: (lessonId: number, lessonTitle: string) => {
    trackEvent('lesson_started', {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
      label: `Lesson ${lessonId}: ${lessonTitle}`
    });
  },

  lessonCompleted: (lessonId: number, timeSpent: number, attempts: number) => {
    trackEvent('lesson_completed', {
      lesson_id: lessonId,
      time_spent_seconds: timeSpent,
      attempts_count: attempts,
      value: lessonId // Use lesson number as value for progression tracking
    });
  },

  // Query execution
  queryExecuted: (queryType: 'sql' | 'convex', success: boolean, lessonId?: number) => {
    trackEvent('query_executed', {
      query_type: queryType,
      success: success,
      lesson_id: lessonId || 0,
      label: `${queryType.toUpperCase()} ${success ? 'Success' : 'Error'}`
    });
  },

  // User engagement
  hintUsed: (lessonId: number, hintNumber: number) => {
    trackEvent('hint_used', {
      lesson_id: lessonId,
      hint_number: hintNumber,
      label: `Lesson ${lessonId} - Hint ${hintNumber}`
    });
  },

  // Error tracking
  databaseError: (errorMessage: string) => {
    trackEvent('database_error', {
      error_message: errorMessage,
      label: 'Database Error'
    });
  },

  // Feature usage
  featureUsed: (featureName: string, context?: string) => {
    trackEvent('feature_used', {
      feature_name: featureName,
      context: context || '',
      label: featureName
    });
  },

  // Performance tracking
  pageLoadTime: (loadTimeMs: number) => {
    trackEvent('page_load_time', {
      load_time_ms: loadTimeMs,
      value: Math.round(loadTimeMs / 1000), // Convert to seconds for GA
      label: 'Page Load Performance'
    });
  },

  // User journey tracking
  userJourney: (action: string, fromPage?: string, toPage?: string) => {
    trackEvent('user_journey', {
      action: action,
      from_page: fromPage || '',
      to_page: toPage || '',
      label: `${action}: ${fromPage} → ${toPage}`
    });
  }
};

// Session tracking with localStorage
export const sessionTracking = {
  startSession: () => {
    const sessionStart = Date.now();
    localStorage.setItem('session_start', sessionStart.toString());
    
    trackEvent('session_start', {
      timestamp: sessionStart,
      label: 'User Session Started'
    });
  },

  endSession: () => {
    const sessionStart = localStorage.getItem('session_start');
    if (sessionStart) {
      const sessionDuration = Date.now() - parseInt(sessionStart);
      localStorage.removeItem('session_start');
      
      trackEvent('session_end', {
        session_duration_ms: sessionDuration,
        value: Math.round(sessionDuration / 1000), // Seconds
        label: 'User Session Ended'
      });
    }
  },

  // Track user progress across sessions
  updateProgress: (lessonId: number, completed: boolean) => {
    const progress = JSON.parse(localStorage.getItem('user_progress') || '{}');
    progress[lessonId] = {
      completed,
      timestamp: Date.now(),
      attempts: (progress[lessonId]?.attempts || 0) + 1
    };
    localStorage.setItem('user_progress', JSON.stringify(progress));

    // Track progress milestone
    const completedLessons = Object.values(progress).filter((p: any) => p.completed).length;
    trackEvent('progress_milestone', {
      completed_lessons: completedLessons,
      current_lesson: lessonId,
      value: completedLessons,
      label: `${completedLessons} Lessons Completed`
    });
  }
};

// Usage insights without personal data
export const usageInsights = {
  // Track which lessons are most difficult (high attempt count)
  trackDifficulty: (lessonId: number, attempts: number) => {
    if (attempts > 3) { // Flag lessons requiring many attempts
      trackEvent('lesson_difficulty', {
        lesson_id: lessonId,
        attempts: attempts,
        difficulty_level: attempts > 10 ? 'very_hard' : attempts > 5 ? 'hard' : 'moderate',
        label: `Lesson ${lessonId} - ${attempts} attempts`
      });
    }
  },

  // Track popular lesson paths
  trackLessonPath: (fromLesson: number, toLesson: number) => {
    trackEvent('lesson_navigation', {
      from_lesson: fromLesson,
      to_lesson: toLesson,
      direction: toLesson > fromLesson ? 'forward' : 'backward',
      label: `Lesson ${fromLesson} → ${toLesson}`
    });
  },

  // Track feature adoption
  trackFeatureAdoption: (featureName: string, adopted: boolean) => {
    trackEvent('feature_adoption', {
      feature: featureName,
      adopted: adopted,
      label: `${featureName}: ${adopted ? 'Adopted' : 'Ignored'}`
    });
  }
};

// Initialize analytics when app loads
export const initializeAnalytics = () => {
  // Start session tracking
  sessionTracking.startSession();

  // Track page load performance
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    analytics.pageLoadTime(loadTime);
  });

  // Track when user leaves
  window.addEventListener('beforeunload', () => {
    sessionTracking.endSession();
  });

  // Track visibility changes (user switching tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackEvent('tab_hidden', { label: 'User switched away from tab' });
    } else {
      trackEvent('tab_visible', { label: 'User returned to tab' });
    }
  });
};