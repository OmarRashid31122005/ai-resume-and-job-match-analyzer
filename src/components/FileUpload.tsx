import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const hasError = fileRejections.length > 0;
  const hasFile = acceptedFiles.length > 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Resume
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Get instant AI-powered analysis and match scoring against job descriptions
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">PDF, DOCX, DOC, TXT</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">Max 10MB</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">100% Free</span>
          </div>
        </div>
      </div>

      <motion.div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : hasError
            ? 'border-red-400 bg-red-50'
            : hasFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {hasFile ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          ) : hasError ? (
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
          ) : (
            <Upload className={`mx-auto h-16 w-16 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          )}
          
          <div>
            {hasFile ? (
              <div>
                <p className="text-lg font-semibold text-green-700">Resume uploaded successfully!</p>
                <p className="text-sm text-gray-600 mt-1">{acceptedFiles[0].name}</p>
              </div>
            ) : hasError ? (
              <div>
                <p className="text-lg font-semibold text-red-700">Upload failed</p>
                <p className="text-sm text-red-600 mt-1">
                  {fileRejections[0].errors[0].message}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                </p>
                <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              </div>
            )}
          </div>
          
          {!hasFile && !hasError && (
            <motion.button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="mr-2 h-5 w-5" />
              Choose File
            </motion.button>
          )}
        </div>
      </motion.div>

      {hasFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600 mb-4">
            Ready to analyze your resume against job descriptions
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;