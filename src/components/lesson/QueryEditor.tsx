import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { LessonData } from '../../types/lesson';

interface QueryEditorProps {
  lesson: LessonData;
  onQueryExecute: (query: string) => Promise<any[]>;
  onSuccess: () => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({ 
  lesson, 
  onQueryExecute, 
  onSuccess 
}) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const executeQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    setError(null);
    
    try {
      const results = await onQueryExecute(query);
      setResult(results);
      
      // Validate the query
      const valid = lesson.sqlSection.validation(query, results);
      setIsValid(valid);
      
      if (valid) {
        setTimeout(() => onSuccess(), 1000); // Delay for user to see success
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query execution failed');
      setResult(null);
      setIsValid(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      executeQuery();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Prevent pasting to encourage typing practice
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Prevent right-click context menu to disable paste option
  };

  return (
    <div className="space-y-6">
      {/* Lesson Objective */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">🎯 Your Task</h3>
        <p className="text-blue-800">{lesson.sqlSection.task}</p>
      </div>

      {/* SQL Concept */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">💡 SQL Concept</h3>
        <p className="text-gray-700 mb-3">{lesson.sqlSection.concept}</p>
        <div className="bg-white border rounded p-3">
          <p className="text-sm text-gray-600 mb-1">Example:</p>
          <code className="text-sm font-mono text-blue-600">{lesson.sqlSection.example}</code>
        </div>
      </div>

      {/* Query Editor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Write Your SQL Query:
          </label>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700"
          >
            <Lightbulb size={16} />
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </button>
        </div>
        
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            onPaste={handlePaste}
            onContextMenu={handleContextMenu}
            className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your SQL query here... (Ctrl+Enter to execute) - Copy/paste disabled for learning"
          />
        </div>
        
        <button
          onClick={executeQuery}
          disabled={isExecuting || !query.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />
          {isExecuting ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      {/* Hints */}
      {showHints && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Hints</h3>
          <ul className="space-y-1">
            {lesson.hints.map((hint, index) => (
              <li key={index} className="text-yellow-800 text-sm">
                • {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-300 rounded-md text-red-700">
          <XCircle size={16} />
          {error}
        </div>
      )}

      {/* Success/Result Display */}
      {result && (
        <div className="space-y-3">
          <div className={`flex items-center gap-2 p-3 rounded-md ${
            isValid 
              ? 'bg-green-100 border border-green-300 text-green-700' 
              : 'bg-yellow-100 border border-yellow-300 text-yellow-700'
          }`}>
            {isValid ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {isValid ? '✅ Correct! Well done!' : '⚠️ Try again - check the expected output'}
          </div>
          
          {/* Results Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h4 className="font-medium text-gray-900">Query Results ({result.length} rows)</h4>
            </div>
            <div className="overflow-x-auto max-h-64">
              {result.length > 0 ? (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(result[0]).map((column) => (
                        <th key={column} className="px-4 py-2 text-left font-medium text-gray-700 border-b">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.slice(0, 10).map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex} className="px-4 py-2 text-gray-900">
                            {value !== null ? String(value) : 'NULL'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-gray-500 text-center">No results returned</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};