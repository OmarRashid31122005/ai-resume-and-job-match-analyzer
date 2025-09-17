import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { AnalysisResult } from '../types';

interface SkillsAnalysisProps {
  result: AnalysisResult;
}

const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ result }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Technical Skills']);
  const { skill_gaps, resume_skills, job_skills } = result.match_analysis;

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const getSkillCategoryData = () => {
    const categories: { [key: string]: any } = {};
    
    Object.entries(skill_gaps.matching_skills).forEach(([category, skills]) => {
      if (!categories[category]) categories[category] = {};
      categories[category].matching = skills;
    });

    Object.entries(skill_gaps.missing_skills).forEach(([category, skills]) => {
      if (!categories[category]) categories[category] = {};
      categories[category].missing = skills;
    });

    Object.entries(skill_gaps.skill_coverage).forEach(([category, coverage]) => {
      if (!categories[category]) categories[category] = {};
      categories[category].coverage = coverage;
    });

    return categories;
  };

  const skillCategories = getSkillCategoryData();

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 0.8) return 'text-green-600 bg-green-100';
    if (coverage >= 0.6) return 'text-blue-600 bg-blue-100';
    if (coverage >= 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">Skills Matched</h3>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {skill_gaps.total_skills_matched}
          </div>
          <p className="text-sm text-gray-600">
            Out of {skill_gaps.total_skills_required} required skills
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900">Skills Gap</h3>
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            {skill_gaps.total_skills_required - skill_gaps.total_skills_matched}
          </div>
          <p className="text-sm text-gray-600">
            Skills to develop or highlight
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Star className="h-8 w-8 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900">Coverage</h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {Math.round(skill_gaps.overall_skill_coverage * 100)}%
          </div>
          <p className="text-sm text-gray-600">
            Overall skill alignment
          </p>
        </motion.div>
      </div>

      {/* Priority Gaps */}
      {Object.keys(skill_gaps.priority_gaps).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
            <XCircle className="h-6 w-6 mr-2" />
            High Priority Skills Gap
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(skill_gaps.priority_gaps).map(([category, skills]) => (
              <div key={category} className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Strength Areas */}
      {Object.keys(skill_gaps.strength_areas).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
            <CheckCircle2 className="h-6 w-6 mr-2" />
            Your Strength Areas
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(skill_gaps.strength_areas).map(([category, skills]) => (
              <div key={category} className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Detailed Skills Breakdown */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Detailed Skills Analysis</h3>
        
        {Object.entries(skillCategories).map(([category, data], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <button
              onClick={() => toggleCategory(category)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getCoverageColor(data.coverage || 0)}`}>
                  {Math.round((data.coverage || 0) * 100)}%
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
              </div>
              {expandedCategories.includes(category) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedCategories.includes(category) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-6 border-t border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {/* Matching Skills */}
                  {data.matching && data.matching.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Skills You Have ({data.matching.length})
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {data.matching.map((skill: string, skillIndex: number) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Skills */}
                  {data.missing && data.missing.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-red-800 mb-3 flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Skills to Develop ({data.missing.length})
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {data.missing.map((skill: string, skillIndex: number) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAnalysis;