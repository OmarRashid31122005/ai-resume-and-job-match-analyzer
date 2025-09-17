export interface AnalysisResult {
  status: string;
  match_analysis: {
    match_score: number;
    match_level: string;
    match_color: string;
    similarity_metrics: {
      semantic_similarity: number;
      keyword_overlap: number;
      tfidf_similarity: number;
      overall_similarity: number;
    };
    resume_skills: Record<string, string[]>;
    job_skills: Record<string, string[]>;
    skill_gaps: {
      missing_skills: Record<string, string[]>;
      matching_skills: Record<string, string[]>;
      skill_coverage: Record<string, number>;
      priority_gaps: Record<string, string[]>;
      strength_areas: Record<string, string[]>;
      total_skills_required: number;
      total_skills_matched: number;
      overall_skill_coverage: number;
    };
    resume_key_phrases: Array<{
      phrase: string;
      score: number;
      category: string;
    }>;
    job_key_phrases: Array<{
      phrase: string;
      score: number;
      category: string;
    }>;
    text_quality_analysis: {
      word_count: number;
      character_count: number;
      sentence_count: number;
      avg_sentence_length: number;
      has_quantifiable_achievements: boolean;
      has_action_verbs: boolean;
      quality_score: number;
    };
    analysis_metadata: {
      total_resume_words: number;
      total_job_words: number;
      processing_method: string;
    };
  };
  improvement_suggestions: Array<{
    type: string;
    suggestion: string;
    impact: string;
    priority: string;
  }>;
  interview_questions: Array<{
    category: string;
    question: string;
    rationale: string;
    difficulty: string;
  }>;
  actionable_recommendations: {
    immediate_actions: string[];
    skill_development: string[];
    resume_optimization: string[];
    interview_preparation: string[];
  };
  resume_preview: {
    first_200_chars: string;
    word_count: number;
    estimated_reading_time: string;
  };
  analysis_metadata: {
    timestamp: string;
    processing_method: string;
    models_used: string[];
    total_skills_identified: number;
    api_costs: string;
  };
}

export interface SkillCoverage {
  category: string;
  coverage: number;
  missing: string[];
  matching: string[];
}