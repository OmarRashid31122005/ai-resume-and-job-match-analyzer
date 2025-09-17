import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, AlertTriangle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface MatchScoreCardProps {
  result: AnalysisResult;
}

const MatchScoreCard: React.FC<MatchScoreCardProps> = ({ result }) => {
  const { match_score, match_level, match_color } = result.match_analysis;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return Trophy;
    if (score >= 50) return TrendingUp;
    return AlertTriangle;
  };

  const ScoreIcon = getScoreIcon(match_score);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-gray-200"
    >
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          >
            <ScoreIcon className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Match Score</h2>
          
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(match_score)}`}>
            {match_score}%
          </div>
          
          <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold mb-6 ${
            match_level === 'Excellent' ? 'bg-green-100 text-green-800' :
            match_level === 'Good' ? 'bg-blue-100 text-blue-800' :
            match_level === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {match_level} Match
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full bg-gray-200 rounded-full h-3 mb-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${match_score}%` }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className={`h-3 rounded-full ${
              match_score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
              match_score >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
              match_score >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
              'bg-gradient-to-r from-red-400 to-red-600'
            }`}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-600 text-lg"
        >
          {match_score >= 80 
            ? "Excellent! Your resume is well-aligned with this position."
            : match_score >= 60
            ? "Good match! Some improvements could strengthen your application."
            : match_score >= 40
            ? "Fair match. Several areas need attention to improve your chances."
            : "This position may not be the best fit, but we have suggestions to help."
          }
        </motion.p>
      </div>
    </motion.div>
  );
};

export default MatchScoreCard;