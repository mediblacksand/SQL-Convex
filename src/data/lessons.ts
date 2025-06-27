import { LessonData } from '../types/lesson';

export const lessons: LessonData[] = [
  {
    id: 1,
    title: "Introduction to Databases",
    description: "Learn the basics of databases and how to query data with SQL SELECT statements",
    objective: "Understand database concepts and write your first SQL query to retrieve all movies",
    sqlSection: {
      concept: "SQL uses SELECT statements to query data from tables. The most basic query selects all columns (*) from a table.",
      example: "SELECT * FROM movies;",
      task: "Write a SQL query to select all movies from the movies table. Use SELECT * to get all columns. Don't forget the semicolon!",
      correctQuery: "SELECT * FROM movies;",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasFrom = query.includes('from');
        const hasMovies = query.includes('movies');
        const hasStar = query.includes('*');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length > 0;
        
        return hasSelect && hasFrom && hasMovies && hasStar && hasSemicolon && hasResults;
      },
    },
    convexSection: {
      concept: "Convex uses query functions to retrieve data. The db.query() method returns documents from a table.",
      example: "ctx.db.query('movies').collect()",
      task: "In Convex, you would use a query function to get all movies from the movies collection.",
      correctCode: "getAllMovies()",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length > 0;
      },
    },
    hints: [
      "SQL queries MUST end with a semicolon (;)",
      "SELECT * means 'select all columns' - this will show id, title, director, year, length_minutes, language, worldwide_gross_millions",
      "The correct syntax is: SELECT * FROM tablename;",
      "Make sure to include: SELECT, *, FROM, movies, and ;"
    ],
    nextLesson: 2,
  }
];