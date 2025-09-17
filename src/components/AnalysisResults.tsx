import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Trophy,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Target,
  Brain,
  Lightbulb,
  Download,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AnalysisResult } from '../types';
import MatchScoreCard from './MatchScoreCard';
import SkillsAnalysis from './SkillsAnalysis';
import InterviewQuestions from './InterviewQuestions';
import ImprovementSuggestions from './ImprovementSuggestions';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onStartOver: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onStartOver }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'suggestions' | 'interview'>('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['match-score']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'skills', label: 'Skills Gap', icon: Target },
    { id: 'suggestions', label: 'Improvements', icon: Lightbulb },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  ];

  const getMatchLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getMatchLevelColor(result.match_analysis.match_level)}`}>
            {result.match_analysis.match_level.toUpperCase()} MATCH
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Resume Analysis Complete
        </h1>
        <p className="text-lg text-gray-600">
          Here's your detailed analysis and recommendations for improvement
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        <motion.button
          onClick={onStartOver}
          className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Analyze Another Resume
        </motion.button>
        
        <motion.button
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="mr-2 h-5 w-5" />
          Download Report
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <MatchScoreCard result={result} />
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Overall Similarity</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.round(result.match_analysis.similarity_metrics.overall_similarity * 100)}%
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Semantic</span>
                    <span>{Math.round(result.match_analysis.similarity_metrics.semantic_similarity * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Keywords</span>
                    <span>{Math.round(result.match_analysis.similarity_metrics.keyword_overlap * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TF-IDF</span>
                    <span>{Math.round(result.match_analysis.similarity_metrics.tfidf_similarity * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Skill Coverage</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.round(result.match_analysis.skill_gaps.overall_skill_coverage * 100)}%
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Matched</span>
                    <span>{result.match_analysis.skill_gaps.total_skills_matched}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Required</span>
                    <span>{result.match_analysis.skill_gaps.total_skills_required}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Resume Quality</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.round(result.match_analysis.text_quality_analysis.quality_score * 100)}%
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Words</span>
                    <span>{result.match_analysis.text_quality_analysis.word_count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Achievements</span>
                    <span>{result.match_analysis.text_quality_analysis.has_quantifiable_achievements ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Action Verbs</span>
                    <span>{result.match_analysis.text_quality_analysis.has_action_verbs ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && <SkillsAnalysis result={result} />}
        {activeTab === 'suggestions' && <ImprovementSuggestions result={result} />}
        {activeTab === 'interview' && <InterviewQuestions result={result} />}
      </motion.div>
    </div>
  );
};

export default AnalysisResults;