import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { BookOpen, Database, Code, AlertCircle } from 'lucide-react';
import { useDatabase } from './hooks/useDatabase';

function App() {
  console.log('App component mounting...');
  const { db, isLoading, error } = useDatabase();
  console.log('Database state:', { db: !!db, isLoading, error });

  // Sample query to test database
  const getSampleData = () => {
    if (!db) return null;
    try {
      const result = db.exec('SELECT title, director, year FROM movies LIMIT 5');
      if (result.length > 0) {
        const { columns, values } = result[0];
        return values.map(row => 
          Object.fromEntries(columns.map((col, i) => [col, row[i]]))
        );
      }
    } catch (err) {
      console.error('Error executing sample query:', err);
    }
    return null;
  };

  const sampleMovies = getSampleData();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Database className="h-8 w-8 text-blue-600" />
                  <Code className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    SQL & Convex Learning Platform
                  </h1>
                  <p className="text-sm text-gray-600">
                    Interactive lessons for database querying
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <BookOpen className="h-4 w-4" />
                <span>Phase 2: Database Integration ✅</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Setup Status Cards */}
            <div className="lesson-card">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Project Setup
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  React + TypeScript initialized
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Tailwind CSS configured
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Folder structure created
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Error boundaries implemented
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Containerized development
                </li>
              </ul>
            </div>

            <div className="lesson-card">
              <div className="flex items-center mb-4">
                <div className={`h-3 w-3 rounded-full mr-3 ${
                  error ? 'bg-red-500' : db ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Database Status
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  SQL.js dependencies installed
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Local WASM files configured
                </li>
                <li className="flex items-center">
                  {isLoading ? (
                    <span className="text-yellow-500 mr-2">⏳</span>
                  ) : db ? (
                    <span className="text-green-500 mr-2">✓</span>
                  ) : (
                    <span className="text-red-500 mr-2">✗</span>
                  )}
                  Database initialization
                </li>
                <li className="flex items-center">
                  {sampleMovies ? (
                    <span className="text-green-500 mr-2">✓</span>
                  ) : (
                    <span className="text-yellow-500 mr-2">○</span>
                  )}
                  Sample data loaded ({sampleMovies ? sampleMovies.length : 0} movies)
                </li>
                <li className="flex items-center">
                  {db ? (
                    <span className="text-green-500 mr-2">✓</span>
                  ) : (
                    <span className="text-yellow-500 mr-2">○</span>
                  )}
                  Query execution ready
                </li>
              </ul>
              {error && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  {error}
                </div>
              )}
            </div>

            <div className="lesson-card">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Container Environment
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    docker-compose up
                  </code>
                  <p className="text-gray-600 mt-1">Start dev container</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    npm run dev
                  </code>
                  <p className="text-gray-600 mt-1">Start development server</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    localhost:5173
                  </code>
                  <p className="text-gray-600 mt-1">Access app locally</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 Database Integration Status */}
          <div className={`mt-8 border rounded-lg p-6 ${
            error ? 'bg-red-50 border-red-200' : 
            db ? 'bg-green-50 border-green-200' : 
            'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {isLoading ? (
                  <LoadingSpinner size="sm" />
                ) : error ? (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <Database className="h-6 w-6 text-green-600" />
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-lg font-medium ${
                  error ? 'text-red-900' : 
                  db ? 'text-green-900' : 
                  'text-yellow-900'
                }`}>
                  {isLoading ? 'Initializing Database...' :
                   error ? 'Database Error' :
                   'Phase 2 Complete: SQL.js Database Ready! 🎉'}
                </h3>
                <div className={`mt-2 text-sm ${
                  error ? 'text-red-700' : 
                  db ? 'text-green-700' : 
                  'text-yellow-700'
                }`}>
                  {isLoading ? (
                    <p>Loading SQL.js via script tag and initializing sample database...</p>
                  ) : error ? (
                    <p>Failed to initialize database: {error}</p>
                  ) : (
                    <>
                      <p className="mb-2">
                        SQL.js database successfully initialized with containerized setup! Features:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>In-browser SQLite database running</li>
                        <li>Sample movie dataset with {sampleMovies?.length || 0} entries loaded</li>
                        <li>Local WASM files served from public directory</li>
                        <li>Docker container environment with port forwarding</li>
                        <li>Script tag loading approach (bypasses ES6 import issues)</li>
                        <li>Multiple tables with relationships ready for queries</li>
                      </ul>
                      <p className="mt-3 font-medium">
                        🚀 Ready to proceed to Phase 3: Interactive Lesson Components
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Database Data Display */}
          {sampleMovies && (
            <div className="mt-8 lesson-card">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Sample Database Query Results
                </h3>
              </div>
              <div className="mb-3">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  SELECT title, director, year FROM movies LIMIT 5
                </code>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Director
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sampleMovies.map((movie, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{movie.title}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{movie.director}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{movie.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Demo Components */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="lesson-card">
              <h4 className="font-semibold text-gray-900 mb-3">Loading Component Demo</h4>
              <LoadingSpinner message="Database initializing..." />
            </div>
            
            <div className="lesson-card">
              <h4 className="font-semibold text-gray-900 mb-3">Styled Button Examples</h4>
              <div className="space-y-3">
                <button className="primary-button">Execute Query</button>
                <div className="flex space-x-2">
                  <button className="nav-button">Lesson 1</button>
                  <button className="nav-button active">Lesson 2</button>
                  <button className="nav-button">Lesson 3</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;