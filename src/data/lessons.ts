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
  },
  {
    id: 2,
    title: "SELECT Queries 101",
    description: "Learn to select specific columns from tables to get exactly the data you need",
    objective: "Master selecting specific columns and understand the difference between SELECT * and SELECT column_name",
    sqlSection: {
      concept: "Instead of selecting all columns with *, you can choose specific columns by listing their names after SELECT. This gives you more control over your data and improves performance.",
      example: "SELECT title, director FROM movies;",
      task: "Write a SQL query to select only the title and year columns from the movies table. This will show just the movie names and when they were released.",
      correctQuery: "SELECT title, year FROM movies;",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasFrom = query.includes('from');
        const hasMovies = query.includes('movies');
        const hasTitle = query.includes('title');
        const hasYear = query.includes('year');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length > 0;
        const hasCorrectColumns = result && result.length > 0 && Object.keys(result[0]).length === 2 && 
                                 Object.keys(result[0]).includes('title') && Object.keys(result[0]).includes('year');
        
        return hasSelect && hasFrom && hasMovies && hasTitle && hasYear && hasSemicolon && hasResults && hasCorrectColumns;
      },
    },
    convexSection: {
      concept: "In Convex, you can select specific fields by chaining .map() to transform the results, or by defining query functions that return only needed fields.",
      example: "ctx.db.query('movies').collect().then(movies => movies.map(m => ({title: m.title, year: m.year})))",
      task: "In Convex, you would create a query function to return only title and year fields from movies.",
      correctCode: "getMovieTitlesAndYears()",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length > 0 && result[0].title && result[0].year;
      },
    },
    hints: [
      "List column names separated by commas: SELECT column1, column2 FROM table;",
      "Column names are case-sensitive, use: title, year",
      "The order you list columns determines the order they appear in results",
      "Don't forget the semicolon at the end!"
    ],
    nextLesson: 3,
  },
  {
    id: 3,
    title: "Queries with Constraints I",
    description: "Learn to filter data with WHERE clauses to find exactly what you're looking for",
    objective: "Use WHERE clauses to filter movies by specific criteria like director, year, or rating",
    sqlSection: {
      concept: "The WHERE clause lets you filter rows based on conditions. You can compare values using operators like =, >, <, >=, <=, and !=.",
      example: "SELECT * FROM movies WHERE director = 'John Lasseter';",
      task: "Write a SQL query to find all movies directed by 'Pete Docter'. Select all columns and use the WHERE clause to filter by director.",
      correctQuery: "SELECT * FROM movies WHERE director = 'Pete Docter';",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasFrom = query.includes('from');
        const hasWhere = query.includes('where');
        const hasMovies = query.includes('movies');
        const hasDirector = query.includes('director');
        const hasPeteDocter = query.includes('pete docter');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length > 0;
        const correctResults = result && result.every(movie => movie.director === 'Pete Docter');
        
        return hasSelect && hasFrom && hasWhere && hasMovies && hasDirector && hasPeteDocter && hasSemicolon && hasResults && correctResults;
      },
    },
    convexSection: {
      concept: "Convex uses .filter() method with comparison functions to filter documents based on field values.",
      example: "ctx.db.query('movies').filter(q => q.eq(q.field('director'), 'John Lasseter')).collect()",
      task: "In Convex, you would use a filter to find movies by a specific director.",
      correctCode: "getMoviesByDirector('Pete Docter')",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length > 0 && result.every((movie: any) => movie.director === 'Pete Docter');
      },
    },
    hints: [
      "WHERE clause comes after FROM: SELECT * FROM table WHERE condition;",
      "Use single quotes around text values: director = 'Pete Docter'",
      "Text comparisons are case-sensitive, use exact spelling",
      "The = operator tests for equality"
    ],
    nextLesson: 4,
  },
  {
    id: 4,
    title: "Queries with Constraints II",
    description: "Master advanced filtering with numerical comparisons and multiple conditions",
    objective: "Use comparison operators and logical operators to create complex filtering conditions",
    sqlSection: {
      concept: "You can filter using numerical comparisons (>, <, >=, <=) and combine conditions with AND, OR. This allows for complex filtering logic.",
      example: "SELECT * FROM movies WHERE year >= 2000 AND year <= 2010;",
      task: "Write a SQL query to find all movies released after the year 2005. Use the WHERE clause with the > operator to filter by year.",
      correctQuery: "SELECT * FROM movies WHERE year > 2005;",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasFrom = query.includes('from');
        const hasWhere = query.includes('where');
        const hasMovies = query.includes('movies');
        const hasYear = query.includes('year');
        const hasGreaterThan = query.includes('> 2005') || query.includes('>2005');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length > 0;
        const correctResults = result && result.every((movie: any) => movie.year > 2005);
        
        return hasSelect && hasFrom && hasWhere && hasMovies && hasYear && hasGreaterThan && hasSemicolon && hasResults && correctResults;
      },
    },
    convexSection: {
      concept: "Convex provides comparison methods like .gt(), .lt(), .gte(), .lte() for numerical filtering, and you can chain multiple filters.",
      example: "ctx.db.query('movies').filter(q => q.gt(q.field('year'), 2005)).collect()",
      task: "In Convex, you would use comparison filters to find movies by year ranges.",
      correctCode: "getMoviesAfterYear(2005)",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length > 0 && result.every((movie: any) => movie.year > 2005);
      },
    },
    hints: [
      "Use > for 'greater than': year > 2005",
      "No quotes needed around numbers: year > 2005 (not 'year > 2005')",
      "Other operators: >= (greater or equal), < (less than), <= (less or equal)",
      "You can combine with AND/OR: WHERE year > 2005 AND length_minutes < 120"
    ],
    nextLesson: 5,
  },
  {
    id: 5,
    title: "Filtering and Sorting Query Results",
    description: "Learn to sort your results with ORDER BY and limit results with LIMIT",
    objective: "Master sorting data in ascending/descending order and controlling result size",
    sqlSection: {
      concept: "ORDER BY sorts results by one or more columns. Use ASC for ascending (default) or DESC for descending. LIMIT restricts the number of rows returned.",
      example: "SELECT * FROM movies ORDER BY year DESC LIMIT 5;",
      task: "Write a SQL query to get the 3 longest movies. Select all columns, order by length_minutes in descending order, and limit to 3 results.",
      correctQuery: "SELECT * FROM movies ORDER BY length_minutes DESC LIMIT 3;",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasFrom = query.includes('from');
        const hasMovies = query.includes('movies');
        const hasOrderBy = query.includes('order by');
        const hasLengthMinutes = query.includes('length_minutes');
        const hasDesc = query.includes('desc');
        const hasLimit = query.includes('limit');
        const hasThree = query.includes('3');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length === 3;
        const correctOrder = result && result.length > 1 && 
                            result[0].length_minutes >= result[1].length_minutes && 
                            result[1].length_minutes >= result[2].length_minutes;
        
        return hasSelect && hasFrom && hasMovies && hasOrderBy && hasLengthMinutes && hasDesc && hasLimit && hasThree && hasSemicolon && hasResults && correctOrder;
      },
    },
    convexSection: {
      concept: "Convex uses .order() method to sort results, and you can chain .take() to limit the number of results returned.",
      example: "ctx.db.query('movies').order('desc').take(5)",
      task: "In Convex, you would use ordering and limiting methods to get sorted results.",
      correctCode: "getLongestMovies(3)",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length === 3 && result[0].length_minutes >= result[1].length_minutes;
      },
    },
    hints: [
      "ORDER BY comes after FROM (and WHERE if present): SELECT * FROM table ORDER BY column",
      "Use DESC for descending (highest first): ORDER BY length_minutes DESC",
      "LIMIT goes at the very end: ORDER BY column DESC LIMIT 3",
      "Without LIMIT, you get all rows in sorted order"
    ],
    nextLesson: 6,
  },
  {
    id: 6,
    title: "SELECT Queries Review",
    description: "Put it all together - combine filtering, sorting, and column selection in one query",
    objective: "Create a complex query using WHERE, ORDER BY, LIMIT, and specific column selection",
    sqlSection: {
      concept: "Real-world queries often combine multiple techniques: selecting specific columns, filtering with WHERE, sorting with ORDER BY, and limiting results with LIMIT.",
      example: "SELECT title, year FROM movies WHERE year >= 2000 ORDER BY year ASC LIMIT 5;",
      task: "Write a SQL query to find the title and worldwide_gross_millions of movies that made more than 600 million dollars, ordered by gross from highest to lowest, showing only the top 4 results.",
      correctQuery: "SELECT title, worldwide_gross_millions FROM movies WHERE worldwide_gross_millions > 600 ORDER BY worldwide_gross_millions DESC LIMIT 4;",
      validation: (userQuery: string, result: any[]) => {
        const query = userQuery.trim().toLowerCase();
        const hasSelect = query.includes('select');
        const hasTitle = query.includes('title');
        const hasGross = query.includes('worldwide_gross_millions');
        const hasFrom = query.includes('from');
        const hasMovies = query.includes('movies');
        const hasWhere = query.includes('where');
        const hasCondition = query.includes('> 600') || query.includes('>600');
        const hasOrderBy = query.includes('order by');
        const hasDesc = query.includes('desc');
        const hasLimit = query.includes('limit');
        const hasFour = query.includes('4');
        const hasSemicolon = query.includes(';');
        const hasResults = result && result.length === 4;
        const correctColumns = result && result.length > 0 && Object.keys(result[0]).length === 2 &&
                              Object.keys(result[0]).includes('title') && Object.keys(result[0]).includes('worldwide_gross_millions');
        const correctFilter = result && result.every((movie: any) => movie.worldwide_gross_millions > 600);
        const correctOrder = result && result.length > 1 && 
                            result[0].worldwide_gross_millions >= result[1].worldwide_gross_millions;
        
        return hasSelect && hasTitle && hasGross && hasFrom && hasMovies && hasWhere && hasCondition && hasOrderBy && hasDesc && hasLimit && hasFour && hasSemicolon && hasResults && correctColumns && correctFilter && correctOrder;
      },
    },
    convexSection: {
      concept: "Convex allows chaining multiple operations: filter by conditions, select fields with map, order results, and limit the count.",
      example: "ctx.db.query('movies').filter(q => q.gt(q.field('gross'), 600)).order('desc').take(4).map(m => ({title: m.title, gross: m.gross}))",
      task: "In Convex, you would chain filter, order, take, and map operations for complex queries.",
      correctCode: "getTopGrossingMovies(600, 4)",
      validation: (_userCode: string, result: any) => {
        return Array.isArray(result) && result.length === 4 && result.every((movie: any) => movie.worldwide_gross_millions > 600);
      },
    },
    hints: [
      "Combine techniques: SELECT columns FROM table WHERE condition ORDER BY column DESC LIMIT number;",
      "Column order: SELECT title, worldwide_gross_millions",
      "Filter condition: WHERE worldwide_gross_millions > 600",
      "Sort by gross descending: ORDER BY worldwide_gross_millions DESC LIMIT 4"
    ],
    nextLesson: 7,
  }
];