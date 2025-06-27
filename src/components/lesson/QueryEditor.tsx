import React, { useState, useEffect } from 'react';
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

  // Clear state when lesson changes
  useEffect(() => {
    setQuery('');
    setResult(null);
    setError(null);
    setIsValid(false);
    setIsExecuting(false);
    setShowHints(false);
  }, [lesson.id]);

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
      <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6">
        <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
          🎯 Your Task
        </h3>
        <p className="text-slate-300 leading-relaxed">{lesson.sqlSection.task}</p>
      </div>

      {/* SQL Concept */}
      <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          💡 SQL Concept
        </h3>
        <p className="text-slate-300 mb-4 leading-relaxed">{lesson.sqlSection.concept}</p>
        <div className="bg-slate-900/50 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-slate-400 mb-2">Example:</p>
          <code className="text-sm font-mono text-blue-400">{lesson.sqlSection.example}</code>
        </div>
      </div>

      {/* Query Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-lg font-medium text-white">
            Write Your SQL Query:
          </label>
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 bg-amber-500/20 px-3 py-2 rounded-lg border border-amber-400/30 transition-all duration-200"
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
            className="w-full h-36 p-4 bg-slate-900/50 border border-white/20 rounded-xl font-mono text-base text-white placeholder-slate-400 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
            placeholder="Type your SQL query here... (Ctrl+Enter to execute) - Copy/paste disabled for learning"
          />
        </div>
        
        <button
          onClick={executeQuery}
          disabled={isExecuting || !query.trim()}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <Play size={18} />
          {isExecuting ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      {/* Hints */}
      {showHints && (
        <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6">
          <h3 className="font-semibold text-amber-300 mb-4 flex items-center gap-2">
            💡 Hints
          </h3>
          <ul className="space-y-2">
            {lesson.hints.map((hint, index) => (
              <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300">
          <XCircle size={20} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Success/Result Display */}
      {result && (
        <div className="space-y-4">
          <div className={`flex items-center gap-3 p-4 rounded-xl font-medium ${
            isValid 
              ? 'bg-emerald-500/20 border border-emerald-400/30 text-emerald-300' 
              : 'bg-amber-500/20 border border-amber-400/30 text-amber-300'
          }`}>
            {isValid ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isValid ? '✅ Correct! Well done!' : '⚠️ Try again - check the expected output'}
          </div>
          
          {/* Results Table */}
          <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-slate-900/50 px-6 py-4 border-b border-white/10">
              <h4 className="font-medium text-white">Query Results ({result.length} rows)</h4>
            </div>
            <div className="overflow-x-auto max-h-72">
              {result.length > 0 ? (
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900/30">
                    <tr>
                      {Object.keys(result[0]).map((column) => (
                        <th key={column} className="px-6 py-3 text-left font-medium text-slate-300 border-b border-white/10">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.slice(0, 10).map((row, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        {Object.values(row).map((value, colIndex) => (
                          <td key={colIndex} className="px-6 py-3 text-slate-300">
                            {value !== null ? String(value) : <span className="text-slate-500 italic">NULL</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-slate-400 text-center">No results returned</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};