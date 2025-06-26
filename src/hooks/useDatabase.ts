import { useEffect, useState } from 'react';
import initSqlJs, { Database } from 'sql.js';
import { populateDatabase } from '../data/sampleData';

export const useDatabase = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize SQL.js with WASM file from CDN
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`
        });
        
        // Create new database instance
        const database = new SQL.Database();
        
        // Populate with sample data
        populateDatabase(database);
        
        setDb(database);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Database initialization failed';
        console.error('Database initialization error:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    initDatabase();

    // Cleanup function to close database when component unmounts
    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  return { db, isLoading, error };
};

