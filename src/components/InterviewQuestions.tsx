import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { AnalysisResult } from '../types';

interface InterviewQuestionsProps {
  result: AnalysisResult;
}

const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({ result }) => {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = Array.from(new Set(result.interview_questions.map(q => q.category)));
  const filteredQuestions = selectedCategory === 'all' 
    ? result.interview_questions 
    : result.interview_questions.filter(q => q.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mock Interview Questions</h2>
        <p className="text-gray-600">
          Based on the job description, here are {result.interview_questions.length} potential interview questions to help you prepare
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Questions ({result.interview_questions.length})
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category} ({result.interview_questions.filter(q => q.category === category).length})
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {question.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {question.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {expandedQuestions.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </button>

            {expandedQuestions.includes(index) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-6 border-t border-gray-200"
              >
                <div className="mt-4 space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Why this question matters:</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          {question.rationale}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💡 Preparation Tips:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {question.difficulty === 'Easy' && (
                        <>
                          <li>• Keep your answer concise and structured</li>
                          <li>• Use specific examples from your experience</li>
                          <li>• Practice your delivery to sound confident</li>
                        </>
                      )}
                      {question.difficulty === 'Medium' && (
                        <>
                          <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                          <li>• Prepare 2-3 relevant examples beforehand</li>
                          <li>• Connect your answer to the job requirements</li>
                        </>
                      )}
                      {question.difficulty === 'Hard' && (
                        <>
                          <li>• Think through complex scenarios step-by-step</li>
                          <li>• Show your problem-solving process clearly</li>
                          <li>• Demonstrate leadership and strategic thinking</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Preparation Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200"
      >
        <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
          <Star className="h-6 w-6 mr-2" />
          General Interview Preparation Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Before the Interview:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Research the company and role thoroughly</li>
              <li>• Prepare examples using the STAR method</li>
              <li>• Practice answers to common questions</li>
              <li>• Prepare thoughtful questions for the interviewer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">During the Interview:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Listen carefully to each question</li>
              <li>• Take a moment to structure your thoughts</li>
              <li>• Use specific examples and quantify results</li>
              <li>• Ask for clarification if needed</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewQuestions;