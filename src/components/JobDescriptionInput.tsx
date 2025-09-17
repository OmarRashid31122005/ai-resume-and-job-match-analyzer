import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Sparkles, FileCheck } from 'lucide-react';

interface JobDescriptionInputProps {
  onSubmit: (description: string) => void;
  onBack: () => void;
  resumeFileName: string;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  onSubmit,
  onBack,
  resumeFileName
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      setIsSubmitting(true);
      await onSubmit(jobDescription);
      setIsSubmitting(false);
    }
  };

  const sampleJD = `We are looking for a Senior Software Engineer to join our dynamic team.

Key Responsibilities:
• Design and develop scalable web applications using React, Node.js, and Python
• Collaborate with cross-functional teams to deliver high-quality software solutions
• Implement best practices for code quality, testing, and deployment
• Mentor junior developers and contribute to technical documentation

Required Skills:
• 5+ years of experience in full-stack development
• Proficiency in JavaScript, TypeScript, React, and Node.js
• Experience with Python, Django, or Flask
• Knowledge of cloud platforms (AWS, Azure, or GCP)
• Strong understanding of RESTful APIs and microservices architecture
• Experience with Git, CI/CD, and agile methodologies

Preferred Qualifications:
• Bachelor's degree in Computer Science or related field
• Experience with Docker, Kubernetes, and containerization
• Knowledge of machine learning libraries and frameworks
• Strong problem-solving skills and attention to detail`;

  const fillSample = () => {
    setJobDescription(sampleJD);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
              <FileCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">{resumeFileName}</span>
            </div>
            <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Job Description</span>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Paste Job Description
        </h2>
        <p className="text-lg text-gray-600">
          Add the job description you want to match your resume against
        </p>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <button
              type="button"
              onClick={fillSample}
              className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center space-x-1"
            >
              <Sparkles className="h-4 w-4" />
              <span>Use Sample</span>
            </button>
          </div>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full min-h-[400px] px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-sm font-mono"
            required
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>{jobDescription.length} characters</span>
            <span>{jobDescription.split(/\s+/).filter(word => word.length > 0).length} words</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6">
          <motion.button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Upload
          </motion.button>

          <motion.button
            type="submit"
            disabled={!jobDescription.trim() || isSubmitting}
            className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              !jobDescription.trim() || isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
            whileHover={!jobDescription.trim() || isSubmitting ? {} : { scale: 1.05 }}
            whileTap={!jobDescription.trim() || isSubmitting ? {} : { scale: 0.95 }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {isSubmitting ? 'Analyzing...' : 'Analyze Resume'}
          </motion.button>
        </div>
      </motion.form>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Best Results</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Include the complete job posting with requirements and responsibilities</li>
          <li>• Make sure to include required skills, technologies, and qualifications</li>
          <li>• The more detailed the job description, the better the analysis</li>
          <li>• Don't worry about formatting - our AI can understand various formats</li>
        </ul>
      </div>
    </div>
  );
};

export default JobDescriptionInput;