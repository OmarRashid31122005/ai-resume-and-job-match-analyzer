import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ImprovementSuggestionsProps {
  result: AnalysisResult;
}

const ImprovementSuggestions: React.FC<ImprovementSuggestionsProps> = ({ result }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return CheckCircle2;
      default: return Lightbulb;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return TrendingUp;
      case 'medium': return Target;
      default: return Lightbulb;
    }
  };

  const groupedSuggestions = result.improvement_suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.type]) {
      acc[suggestion.type] = [];
    }
    acc[suggestion.type].push(suggestion);
    return acc;
  }, {} as Record<string, typeof result.improvement_suggestions>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Improvement Suggestions</h2>
        <p className="text-gray-600">
          Here are {result.improvement_suggestions.length} personalized recommendations to strengthen your resume and application
        </p>
      </div>

      {/* Actionable Recommendations Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <h3 className="font-semibold text-red-900">Immediate Actions</h3>
          </div>
          <div className="text-2xl font-bold text-red-700 mb-2">
            {result.actionable_recommendations.immediate_actions.length}
          </div>
          <p className="text-sm text-red-800">Critical fixes to make now</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Skill Development</h3>
          </div>
          <div className="text-2xl font-bold text-blue-700 mb-2">
            {result.actionable_recommendations.skill_development.length}
          </div>
          <p className="text-sm text-blue-800">Skills to learn or improve</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 border border-purple-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Target className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Resume Optimization</h3>
          </div>
          <div className="text-2xl font-bold text-purple-700 mb-2">
            {result.actionable_recommendations.resume_optimization.length}
          </div>
          <p className="text-sm text-purple-800">Content improvements</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-green-900">Interview Prep</h3>
          </div>
          <div className="text-2xl font-bold text-green-700 mb-2">
            {result.actionable_recommendations.interview_preparation.length}
          </div>
          <p className="text-sm text-green-800">Interview readiness tips</p>
        </motion.div>
      </div>

      {/* Detailed Suggestions by Type */}
      <div className="space-y-6">
        {Object.entries(groupedSuggestions).map(([type, suggestions], typeIndex) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + typeIndex * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 capitalize">
                {type.replace('_', ' ')} Suggestions
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {suggestions.length} recommendation{suggestions.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {suggestions.map((suggestion, index) => {
                const PriorityIcon = getPriorityIcon(suggestion.priority);
                const ImpactIcon = getImpactIcon(suggestion.impact);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + typeIndex * 0.1 + index * 0.05 }}
                    className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityBadgeColor(suggestion.priority)}`}>
                          {suggestion.priority} Priority
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center">
                          <ImpactIcon className="h-3 w-3 mr-1" />
                          {suggestion.impact} Impact
                        </span>
                      </div>
                      <PriorityIcon className={`h-5 w-5 ${
                        suggestion.priority === 'High' ? 'text-red-500' :
                        suggestion.priority === 'Medium' ? 'text-yellow-500' :
                        'text-green-500'
                      }`} />
                    </div>
                    
                    <p className="text-gray-800 leading-relaxed">
                      {suggestion.suggestion}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actionable Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            Immediate Actions
          </h3>
          <ul className="space-y-2">
            {result.actionable_recommendations.immediate_actions.map((action, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{action}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Skill Development
          </h3>
          <ul className="space-y-2">
            {result.actionable_recommendations.skill_development.map((skill, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{skill}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-500" />
            Resume Optimization
          </h3>
          <ul className="space-y-2">
            {result.actionable_recommendations.resume_optimization.map((optimization, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{optimization}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            Interview Preparation
          </h3>
          <ul className="space-y-2">
            {result.actionable_recommendations.interview_preparation.map((prep, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{prep}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;