type Database = any; // SQL.js database type

export const createSampleTables = (db: Database): void => {
  // Movies table (primary dataset)
  db.exec(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      director TEXT,
      year INTEGER,
      length_minutes INTEGER,
      language TEXT DEFAULT 'English',
      worldwide_gross_millions REAL
    );
  `);

  // Sample movies data
  const movies = [
    [1, 'Toy Story', 'John Lasseter', 1995, 81, 'English', 373.6],
    [2, 'A Bug\'s Life', 'John Lasseter', 1998, 95, 'English', 363.4],
    [3, 'Toy Story 2', 'John Lasseter', 1999, 93, 'English', 497.4],
    [4, 'Monsters, Inc.', 'Pete Docter', 2001, 92, 'English', 577.4],
    [5, 'Finding Nemo', 'Andrew Stanton', 2003, 107, 'English', 940.3],
    [6, 'The Incredibles', 'Brad Bird', 2004, 116, 'English', 631.4],
    [7, 'Cars', 'John Lasseter', 2006, 117, 'English', 462.2],
    [8, 'Ratatouille', 'Brad Bird', 2007, 115, 'English', 623.7],
    [9, 'WALL-E', 'Andrew Stanton', 2008, 104, 'English', 521.3],
    [10, 'Up', 'Pete Docter', 2009, 101, 'English', 735.1],
    [11, 'Toy Story 3', 'Lee Unkrich', 2010, 103, 'English', 1067.0],
    [12, 'Cars 2', 'John Lasseter', 2011, 106, 'English', 559.9],
    [13, 'Brave', 'Brenda Chapman', 2012, 102, 'English', 540.4],
    [14, 'Monsters University', 'Dan Scanlon', 2013, 104, 'English', 743.6]
  ];

  // Insert sample movies data
  const stmt = db.prepare('INSERT INTO movies VALUES (?, ?, ?, ?, ?, ?, ?)');
  movies.forEach(movie => stmt.run(movie));
  stmt.free();

  // Boxoffice table for advanced lessons
  db.exec(`
    CREATE TABLE boxoffice (
      movie_id INTEGER,
      rating REAL,
      domestic_sales_millions REAL,
      international_sales_millions REAL,
      FOREIGN KEY (movie_id) REFERENCES movies(id)
    );
  `);

  // Sample boxoffice data
  const boxofficeData = [
    [1, 8.3, 191.8, 181.8],
    [2, 7.2, 162.8, 200.6],
    [3, 7.9, 245.9, 251.5],
    [4, 8.1, 289.9, 287.5],
    [5, 8.2, 380.8, 559.5],
    [6, 8.0, 261.4, 370.0],
    [7, 7.2, 244.1, 218.1],
    [8, 8.0, 206.4, 417.3],
    [9, 8.4, 223.8, 297.5],
    [10, 8.3, 293.0, 442.1],
    [11, 8.3, 415.0, 652.0],
    [12, 6.2, 191.5, 368.4],
    [13, 7.1, 237.3, 303.1],
    [14, 7.3, 268.5, 475.1]
  ];

  const boxofficeStmt = db.prepare('INSERT INTO boxoffice VALUES (?, ?, ?, ?)');
  boxofficeData.forEach(row => boxofficeStmt.run(row));
  boxofficeStmt.free();

  // Additional table for more advanced lessons
  db.exec(`
    CREATE TABLE theaters (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT,
      capacity INTEGER
    );
  `);

  const theaters = [
    [1, 'AMC Downtown', 'New York', 200],
    [2, 'Regal Cinema', 'Los Angeles', 300],
    [3, 'Cinemark Theater', 'Chicago', 250],
    [4, 'AMC Westfield', 'San Francisco', 180],
    [5, 'Showcase Cinema', 'Boston', 220]
  ];

  const theaterStmt = db.prepare('INSERT INTO theaters VALUES (?, ?, ?, ?)');
  theaters.forEach(theater => theaterStmt.run(theater));
  theaterStmt.free();
};

// Function to populate database with sample data
export const populateDatabase = (db: Database): void => {
  try {
    createSampleTables(db);
    console.log('Sample database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
    throw new Error('Failed to populate sample database');
  }
};

// Utility function to test database connection
export const testDatabaseConnection = (db: Database): boolean => {
  try {
    const result = db.exec('SELECT COUNT(*) as count FROM movies');
    if (result.length > 0 && result[0].values.length > 0) {
      const count = result[0].values[0][0];
      return typeof count === 'number' && count > 0;
    }
    return false;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};