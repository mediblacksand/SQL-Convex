import React from 'react';
import { ErrorBoundary } from './components/ui';
import { DatabaseTest } from './components/DatabaseTest';

function AppWithDatabase() {
  console.log('AppWithDatabase component mounting...');
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                SQL.js Loading Test
              </h1>
              <div className="text-sm text-gray-500">
                Interactive SQL Learning Platform
              </div>
            </div>
          </div>
        </header>
        
        <main>
          <DatabaseTest />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default AppWithDatabase;