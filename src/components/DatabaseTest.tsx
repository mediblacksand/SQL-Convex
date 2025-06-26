import React from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { LoadingSpinner } from './ui';

export const DatabaseTest: React.FC = () => {
  const { db, isLoading, error, executeQuery } = useDatabase();

  const testQuery = () => {
    if (!db) return;
    
    try {
      const results = executeQuery('SELECT name FROM sqlite_master WHERE type="table"');
      console.log('Available tables:', results);
      
      // Test a simple query if tables exist
      if (results.length > 0) {
        const firstTable = results[0].name;
        const tableData = executeQuery(`SELECT * FROM ${firstTable} LIMIT 5`);
        console.log(`Sample data from ${firstTable}:`, tableData);
      }
    } catch (err) {
      console.error('Test query failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading SQL.js database...</p>
        <p className="text-sm text-gray-400">Check browser console for detailed logs</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Database Loading Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-red-600 hover:text-red-800">
              Debugging Steps
            </summary>
            <div className="mt-2 text-sm text-red-600 space-y-2">
              <p>1. Check browser console for detailed error messages</p>
              <p>2. Verify network connectivity (try opening <a href="https://sql.js.org/dist/sql-wasm.js" target="_blank" rel="noopener" className="underline">SQL.js CDN</a>)</p>
              <p>3. Check if running in a containerized environment with network restrictions</p>
              <p>4. Try the local WASM file approach</p>
            </div>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h2 className="text-green-800 font-semibold text-lg mb-2">✅ SQL.js Database Loaded Successfully!</h2>
        <p className="text-green-700">Database is ready for queries.</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={testQuery}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Run Test Query
        </button>
        
        <div className="bg-gray-50 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Database Status:</h3>
          <ul className="space-y-1 text-sm">
            <li>✓ SQL.js library loaded</li>
            <li>✓ Database instance created</li>
            <li>✓ Sample data populated</li>
            <li>✓ Ready for interactive queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};