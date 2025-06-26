export interface LessonData {
  id: number;
  title: string;
  description: string;
  objective: string;
  sqlSection: {
    concept: string;
    example: string;
    task: string;
    correctQuery: string;
    validation: (userQuery: string, result: any[]) => boolean;
  };
  convexSection: {
    concept: string;
    example: string;
    task: string;
    correctCode: string;
    validation: (userCode: string, result: any) => boolean;
  };
  hints: string[];
  nextLesson?: number;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
}

export interface DatabaseState {
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface UserProgress {
  lessonId: number;
  sqlCompleted: boolean;
  convexCompleted: boolean;
  attempts: {
    sql: number;
    convex: number;
  };
  completedAt?: Date;
}