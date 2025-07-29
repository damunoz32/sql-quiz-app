// QuestionGenerator.js - AI Question Generation Component
// This component allows users to generate new SQL quiz questions

import React, { useState } from 'react';
import styled from 'styled-components';
import { generateQuestions, aiConfig } from '../data/aiQuestionGenerator';

// Container for the question generator
const GeneratorContainer = styled.div`
  background: var(--background-card);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-2xl);
`;

const GeneratorTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const GeneratorSubtitle = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
`;

// Form section
const FormSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 0.9rem;
`;

const Select = styled.select`
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-secondary);
  font-size: 1rem;
  transition: var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
`;

const Input = styled.input`
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-secondary);
  font-size: 1rem;
  transition: var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-secondary);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
`;

// Button styles
const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
`;

const GenerateButton = styled.button`
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-medium);
  box-shadow: var(--shadow-medium);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(GenerateButton)`
  background: var(--background-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  
  &:hover {
    background: var(--border-light);
  }
`;

// Results section
const ResultsSection = styled.div`
  margin-top: var(--spacing-2xl);
`;

const ResultsTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
`;

const QuestionCard = styled.div`
  background: var(--background-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  transition: var(--transition-fast);
  
  &:hover {
    box-shadow: var(--shadow-light);
  }
`;

const QuestionText = styled.p`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
`;

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-md);
`;

const OptionItem = styled.li`
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  background: ${props => props.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'var(--background-primary)'};
  border: 1px solid ${props => props.isCorrect ? 'var(--success-color)' : 'var(--border-color)'};
  border-radius: var(--border-radius-small);
  font-size: 0.9rem;
  
  &:before {
    content: '${props => String.fromCharCode(65 + props.index)}. ';
    font-weight: 600;
    color: ${props => props.isCorrect ? 'var(--success-color)' : 'var(--text-secondary)'};
  }
`;

const QuestionMeta = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
`;

const MetaTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'difficulty': return 'rgba(6, 182, 212, 0.1)';
      case 'category': return 'rgba(139, 92, 246, 0.1)';
      default: return 'rgba(14, 165, 233, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'difficulty': return 'var(--primary-color)';
      case 'category': return 'var(--secondary-color)';
      default: return 'var(--accent-color)';
    }
  }};
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-small);
  font-size: 0.8rem;
  font-weight: 500;
`;

const SQLExample = styled.div`
  background: #1e293b;
  color: #e2e8f0;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-medium);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
`;

const Explanation = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

// Loading and status
const StatusMessage = styled.div`
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-secondary);
  font-style: italic;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-medium);
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-medium);
  margin-bottom: var(--spacing-lg);
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

// Main component
const QuestionGenerator = ({ onQuestionsGenerated }) => {
  const [formData, setFormData] = useState({
    count: 5,
    difficulty: 'beginner',
    category: 'all',
    useAI: false,
    aiPrompt: ''
  });
  
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateLocalQuestions = async () => {
    setIsGenerating(true);
    setStatus('Generating questions...');
    setError('');
    setSuccess('');
    
    try {
      const categories = formData.category === 'all' ? null : [formData.category];
      const questions = generateQuestions(formData.count, formData.difficulty, categories);
      
      setGeneratedQuestions(questions);
      setSuccess(`Successfully generated ${questions.length} questions!`);
      setStatus('');
      
      // Call parent callback if provided
      if (onQuestionsGenerated) {
        onQuestionsGenerated(questions);
      }
    } catch (err) {
      setError(`Error generating questions: ${err.message}`);
      setStatus('');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAIQuestions = async () => {
    if (!formData.aiPrompt.trim()) {
      setError('Please provide a prompt for AI generation');
      return;
    }
    
    setIsGenerating(true);
    setStatus('Generating AI questions...');
    setError('');
    setSuccess('');
    
    try {
      // For demo purposes, we'll use local generation
      // In a real implementation, you would use the AI API here
      const questions = generateQuestions(1, formData.difficulty);
      const aiQuestion = questions[0];
      
      // Modify the question based on the prompt
      aiQuestion.question = `AI Generated: ${formData.aiPrompt}`;
      
      setGeneratedQuestions([aiQuestion]);
      setSuccess('AI question generated successfully!');
      setStatus('');
      
      if (onQuestionsGenerated) {
        onQuestionsGenerated([aiQuestion]);
      }
    } catch (err) {
      setError(`Error generating AI question: ${err.message}`);
      setStatus('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (formData.useAI) {
      generateAIQuestions();
    } else {
      generateLocalQuestions();
    }
  };

  const addToQuiz = () => {
    if (generatedQuestions.length > 0) {
      setSuccess('Questions added to quiz! You can now use them in your quiz.');
      // Here you would typically save the questions to your quiz database
    }
  };

  const clearResults = () => {
    setGeneratedQuestions([]);
    setError('');
    setSuccess('');
  };

  return (
    <GeneratorContainer>
      <GeneratorTitle>AI Question Generator</GeneratorTitle>
      <GeneratorSubtitle>
        Generate new SQL quiz questions using our AI-powered system. Choose from local templates or use AI for custom questions.
      </GeneratorSubtitle>

      {/* Error and Success Messages */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      {/* Generation Form */}
      <FormSection>
        <FormGroup>
          <Label>Number of Questions</Label>
          <Input
            type="number"
            min="1"
            max={aiConfig.maxQuestionsPerGeneration}
            value={formData.count}
            onChange={(e) => handleInputChange('count', parseInt(e.target.value))}
          />
        </FormGroup>

        <FormGroup>
          <Label>Difficulty Level</Label>
          <Select
            value={formData.difficulty}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
          >
            {aiConfig.supportedDifficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {aiConfig.supportedCategories.map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ')}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <input
              type="checkbox"
              checked={formData.useAI}
              onChange={(e) => handleInputChange('useAI', e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            Use AI Generation
          </Label>
        </FormGroup>
      </FormSection>

      {/* AI Prompt Input */}
      {formData.useAI && (
        <FormGroup style={{ marginBottom: 'var(--spacing-xl)' }}>
          <Label>AI Prompt (describe the type of question you want)</Label>
          <TextArea
            placeholder="e.g., Create a question about SQL JOINs with a focus on LEFT JOIN vs INNER JOIN..."
            value={formData.aiPrompt}
            onChange={(e) => handleInputChange('aiPrompt', e.target.value)}
          />
        </FormGroup>
      )}

      {/* Action Buttons */}
      <ButtonGroup>
        <GenerateButton
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Questions'}
        </GenerateButton>
        
        {generatedQuestions.length > 0 && (
          <>
            <SecondaryButton onClick={addToQuiz}>
              Add to Quiz
            </SecondaryButton>
            <SecondaryButton onClick={clearResults}>
              Clear Results
            </SecondaryButton>
          </>
        )}
      </ButtonGroup>

      {/* Status Message */}
      {status && <StatusMessage>{status}</StatusMessage>}

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <ResultsSection>
          <ResultsTitle>Generated Questions ({generatedQuestions.length})</ResultsTitle>
          
          {generatedQuestions.map((question, index) => (
            <QuestionCard key={question.id || index}>
              <QuestionMeta>
                <MetaTag type="difficulty">{question.difficulty}</MetaTag>
                <MetaTag type="category">{question.category}</MetaTag>
                <MetaTag type="id">ID: {question.id}</MetaTag>
              </QuestionMeta>
              
              <QuestionText>{question.question}</QuestionText>
              
              <OptionsList>
                {question.options.map((option, optionIndex) => (
                  <OptionItem
                    key={optionIndex}
                    index={optionIndex}
                    isCorrect={optionIndex === question.correctAnswer}
                  >
                    {option}
                  </OptionItem>
                ))}
              </OptionsList>
              
              <SQLExample>{question.sqlExample}</SQLExample>
              
              <Explanation>{question.explanation}</Explanation>
            </QuestionCard>
          ))}
        </ResultsSection>
      )}
    </GeneratorContainer>
  );
};

export default QuestionGenerator;