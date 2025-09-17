import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import AnalysisResults from './components/AnalysisResults';
import LoadingAnalysis from './components/LoadingAnalysis';
import { analyzeResume } from './services/api';
import { AnalysisResult } from './types';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'job-desc' | 'analyzing' | 'results'>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
    setCurrentStep('job-desc');
  };

  const handleJobDescriptionSubmit = async (description: string) => {
    setJobDescription(description);
    setCurrentStep('analyzing');
    setIsLoading(true);

    try {
      if (resumeFile) {
        const result = await analyzeResume(resumeFile, description);
        setAnalysisResult(result);
        setCurrentStep('results');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('upload');
    setResumeFile(null);
    setJobDescription('');
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FileUpload onFileUpload={handleFileUpload} />
            </motion.div>
          )}

          {currentStep === 'job-desc' && (
            <motion.div
              key="job-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <JobDescriptionInput 
                onSubmit={handleJobDescriptionSubmit}
                onBack={() => setCurrentStep('upload')}
                resumeFileName={resumeFile?.name || ''}
              />
            </motion.div>
          )}

          {currentStep === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingAnalysis />
            </motion.div>
          )}

          {currentStep === 'results' && analysisResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AnalysisResults 
                result={analysisResult}
                onStartOver={handleStartOver}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;