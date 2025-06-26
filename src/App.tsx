import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { BookOpen, Database, Code } from 'lucide-react';

function App() {
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
                <span>Phase 1 Setup Complete</span>
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
              </ul>
            </div>

            <div className="lesson-card">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 bg-yellow-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Next Steps
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">○</span>
                  Install dependencies (npm install)
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">○</span>
                  Initialize SQL.js database
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">○</span>
                  Configure Convex backend
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-500 mr-2">○</span>
                  Implement lesson components
                </li>
              </ul>
            </div>

            <div className="lesson-card">
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Development Commands
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    npm install
                  </code>
                  <p className="text-gray-600 mt-1">Install all dependencies</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    npm run dev
                  </code>
                  <p className="text-gray-600 mt-1">Start development server</p>
                </div>
                <div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    npm run build
                  </code>
                  <p className="text-gray-600 mt-1">Build for production</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 1 Complete Banner */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-900">
                  Phase 1: Core Architecture Complete! 🎉
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p className="mb-2">
                    Your SQL & Convex learning platform foundation is ready. The project includes:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Modern React + TypeScript setup with Vite</li>
                    <li>Tailwind CSS for styling with custom theme</li>
                    <li>Comprehensive TypeScript interfaces</li>
                    <li>Error boundary and loading components</li>
                    <li>Production-ready build configuration</li>
                    <li>GitHub Pages deployment setup</li>
                  </ul>
                  <p className="mt-3 font-medium">
                    Ready to proceed to Phase 2: Database Integration
                  </p>
                </div>
              </div>
            </div>
          </div>

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