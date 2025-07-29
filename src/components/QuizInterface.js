// QuizInterface.js - Main Quiz Component
// This component handles the entire quiz experience including:
// - Displaying questions one at a time
// - Multiple choice answer selection
// - Progress tracking
// - Score calculation
// - Immediate feedback with explanations

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions, quizConfig } from '../data/quizQuestions';

// Styled component for the quiz container
// Creates a clean, card-like interface for the quiz
const QuizContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 10px;
  }
`;

// Progress bar container
const ProgressContainer = styled.div`
  margin-bottom: 30px;
`;

// Progress bar styling
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

// Animated progress fill
const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
`;

// Progress text
const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

// Question container
const QuestionContainer = styled(motion.div)`
  margin-bottom: 30px;
`;

// Question text styling
const QuestionText = styled.h2`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Question metadata (difficulty, category)
const QuestionMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  font-size: 14px;
`;

const MetaTag = styled.span`
  background: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return 'rgba(34, 197, 94, 0.1)';
      case 'intermediate': return 'rgba(59, 130, 246, 0.1)';
      case 'advanced': return 'rgba(245, 158, 11, 0.1)';
      case 'expert': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#3b82f6';
      case 'advanced': return '#f59e0b';
      case 'expert': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

// Options container
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Individual option button
const OptionButton = styled(motion.button)`
  background: ${props => {
    if (props.$isSelected) {
      return props.$isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    }
    return 'rgba(255, 255, 255, 0.8)';
  }};
  border: 2px solid ${props => {
    if (props.$isSelected) {
      return props.$isCorrect ? '#22c55e' : '#ef4444';
    }
    return 'rgba(102, 126, 234, 0.2)';
  }};
  color: ${props => {
    if (props.$isSelected) {
      return props.$isCorrect ? '#22c55e' : '#ef4444';
    }
    return '#333';
  }};
  padding: 16px 20px;
  border-radius: 12px;
  text-align: left;
  font-size: 16px;
  cursor: ${props => props.$showAnswer ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    ${props => !props.$showAnswer && `
      background: rgba(102, 126, 234, 0.05);
      border-color: rgba(102, 126, 234, 0.4);
      transform: translateY(-1px);
    `}
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 14px;
  }
`;

// Option letter indicator
const OptionLetter = styled.span`
  font-weight: 600;
  margin-right: 12px;
  color: #667eea;
`;

// Feedback container for explanations
const FeedbackContainer = styled(motion.div)`
  margin-top: 25px;
  padding: 20px;
  background: ${props => props.$isCorrect ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'};
  border: 1px solid ${props => props.$isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border-radius: 12px;
`;

const FeedbackTitle = styled.h3`
  color: ${props => props.$isCorrect ? '#22c55e' : '#ef4444'};
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const FeedbackText = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const SQLExample = styled.div`
  background: #1e293b;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
  margin-top: 10px;
`;

// Navigation buttons container
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Styled button component
const Button = styled(motion.button)`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(255, 255, 255, 0.8)'
  };
  color: ${props => props.variant === 'primary' ? 'white' : '#333'};
  border: 2px solid ${props => props.variant === 'primary' 
    ? 'transparent' 
    : 'rgba(102, 126, 234, 0.2)'
  };
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

// Timer component
const Timer = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 20px;
`;

// QuizInterface component
function QuizInterface({ quizData, updateQuizProgress, onComplete }) {
  // State management for the quiz
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizConfig.timeLimit);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  // Ref to track timer
  const timerRef = useRef(null);

  // Initialize quiz when component mounts
  useEffect(() => {
    const randomQuestions = getRandomQuestions(quizConfig.questionsPerQuiz);
    setQuestions(randomQuestions);
    updateQuizProgress({ totalQuestions: randomQuestions.length });
  }, []); // Empty dependency array - only run once

  // Timer countdown
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (timeLeft > 0 && !isQuizComplete) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isQuizComplete) {
      // Handle quiz completion
      setIsQuizComplete(true);
      const finalScore = selectedAnswer === questions[currentQuestionIndex]?.correctAnswer 
        ? score + 1 
        : score;
      
      updateQuizProgress({
        score: finalScore,
        isComplete: true,
        currentQuestion: currentQuestionIndex
      });
      
      onComplete();
    }
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isQuizComplete]); // Minimal dependencies

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return; // Prevent changing answer after submission
    
    setSelectedAnswer(answerIndex);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowAnswer(true);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      // Handle quiz completion directly
      setIsQuizComplete(true);
      const finalScore = selectedAnswer === questions[currentQuestionIndex]?.correctAnswer 
        ? score + 1 
        : score;
      
      updateQuizProgress({
        score: finalScore,
        isComplete: true,
        currentQuestion: currentQuestionIndex
      });
      
      onComplete();
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // If no questions loaded yet
  if (questions.length === 0) {
    return (
      <QuizContainer>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Loading Quiz...</h2>
        </div>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <QuizContainer>
      {/* Timer */}
      <Timer>
        Time Remaining: {formatTime(timeLeft)}
      </Timer>

      {/* Progress Bar */}
      <ProgressContainer>
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </ProgressBar>
        <ProgressText>
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </ProgressText>
      </ProgressContainer>

      {/* Question */}
      <AnimatePresence mode="wait">
        <QuestionContainer
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionText>{currentQuestion.question}</QuestionText>
          
          <QuestionMeta>
            <MetaTag $difficulty={currentQuestion.difficulty}>
              {currentQuestion.difficulty}
            </MetaTag>
            <MetaTag $difficulty="category">
              {currentQuestion.category}
            </MetaTag>
          </QuestionMeta>

          {/* Answer Options */}
          <OptionsContainer>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleAnswerSelect(index)}
                $isSelected={selectedAnswer === index}
                $isCorrect={index === currentQuestion.correctAnswer}
                $showAnswer={showAnswer}
                whileHover={!showAnswer ? { scale: 1.02 } : {}}
                whileTap={!showAnswer ? { scale: 0.98 } : {}}
              >
                <OptionLetter>{String.fromCharCode(65 + index)}.</OptionLetter>
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>

          {/* Feedback */}
          {showAnswer && (
            <FeedbackContainer
              $isCorrect={selectedAnswer === currentQuestion.correctAnswer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeedbackTitle $isCorrect={selectedAnswer === currentQuestion.correctAnswer}>
                {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
              </FeedbackTitle>
              <FeedbackText>{currentQuestion.explanation}</FeedbackText>
              <SQLExample>
                {currentQuestion.sqlExample}
              </SQLExample>
            </FeedbackContainer>
          )}
        </QuestionContainer>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <ButtonContainer>
        <Button
          variant="secondary"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Previous
        </Button>
        
        {!showAnswer ? (
          <Button
            variant="primary"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleNextQuestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </Button>
        )}
      </ButtonContainer>
    </QuizContainer>
  );
}

export default QuizInterface;