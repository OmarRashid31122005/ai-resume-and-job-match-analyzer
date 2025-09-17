import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Brain, FileText, Target, Lightbulb, MessageSquare } from 'lucide-react';

const LoadingAnalysis: React.FC = () => {
  const steps = [
    { icon: FileText, label: 'Parsing Resume', description: 'Extracting text and structure' },
    { icon: Brain, label: 'AI Analysis', description: 'Processing with ML models' },
    { icon: Target, label: 'Skill Matching', description: 'Comparing skills and requirements' },
    { icon: Lightbulb, label: 'Generating Insights', description: 'Creating improvement suggestions' },
    { icon: MessageSquare, label: 'Interview Prep', description: 'Preparing mock questions' },
  ];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Main Loading Animation */}
        <div className="relative">
          <motion.div
            className="w-24 h-24 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyzing Your Resume
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our AI is working hard to provide you with detailed insights
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <step.icon className="h-5 w-5 text-white" />
              </motion.div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{step.label}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <motion.div
                className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200"
        >
          <h3 className="font-semibold text-gray-900 mb-2">💡 Did you know?</h3>
          <p className="text-sm text-gray-700">
            Our AI analyzes over 100+ different skill categories and uses advanced NLP 
            to understand context, not just keywords. This typically takes 10-30 seconds.
          </p>
        </motion.div>

        {/* Processing indicator */}
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingAnalysis;