import { useEffect, useState } from 'react';
import { populateDatabase } from '../data/sampleData';

type Database = any;

// Load SQL.js from CDN script tag approach
const loadSQLJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any).initSqlJs) {
      resolve((window as any).initSqlJs);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sql.js.org/dist/sql-wasm.js';
    script.onload = () => {
      if ((window as any).initSqlJs) {
        resolve((window as any).initSqlJs);
      } else {
        reject(new Error('SQL.js failed to load'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load SQL.js script'));
    document.head.appendChild(script);
  });
};

export const useDatabase = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Loading SQL.js from CDN...');
        
        // Load SQL.js via script tag
        const initSqlJs = await loadSQLJS();
        
        console.log('SQL.js loaded, initializing database...');
        
        // Initialize SQL.js with local WASM files
        const SQL = await initSqlJs({
          locateFile: (file: string) => {
            console.log(`Loading local WASM file: ${file}`);
            return `/sql.js/${file}`;
          }
        });
        
        console.log('SQL.js initialized successfully');
        
        // Create new database instance
        const database = new SQL.Database();
        
        // Populate with sample data
        populateDatabase(database);
        
        setDb(database);
        console.log('Database ready with sample data');
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

  const executeQuery = (query: string) => {
    if (!db) {
      throw new Error('Database not initialized');
    }
    
    try {
      const stmt = db.prepare(query);
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    } catch (error) {
      console.error('Query execution error:', error);
      throw error;
    }
  };

  return { db, isLoading, error, executeQuery };
};

