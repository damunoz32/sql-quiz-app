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

// Main quiz container with glass morphism effect
const QuizContainer = styled.div`
  background: var(--background-secondary);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: 30px;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--border-color);
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
  }
`;

// Progress bar container
const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--background-primary);
  border-radius: 4px;
  margin-bottom: 30px;
  overflow: hidden;
  border: 1px solid var(--border-color);
`;

// Progress bar fill
const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 4px;
  transition: width var(--transition-medium);
  width: ${props => props.$progress}%;
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
const QuestionContainer = styled.div`
  margin-bottom: 30px;
`;

// Question text
const QuestionText = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.5;
  
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
  background: var(--background-primary);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: var(--border-radius-small);
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--border-color);
`;

// Options container
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

// Individual option button
const OptionButton = styled.button`
  padding: 16px 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  text-align: left;
  
  &:hover {
    background: rgba(209, 169, 128, 0.1);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  &.selected {
    background: var(--primary-gradient);
    color: var(--background-primary);
    border-color: var(--primary-color);
  }
  
  &.correct {
    background: var(--success-color);
    color: var(--background-primary);
    border-color: var(--success-color);
  }
  
  &.incorrect {
    background: var(--error-color);
    color: var(--background-primary);
    border-color: var(--error-color);
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

// Feedback container
const FeedbackContainer = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
`;

// Feedback title
const FeedbackTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${props => props.$isCorrect ? 'var(--success-color)' : 'var(--error-color)'};
`;

// Feedback text
const FeedbackText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
`;

// SQL example container
const SQLExample = styled.div`
  background: var(--background-secondary);
  border-radius: var(--border-radius-medium);
  padding: 15px;
  border-left: 4px solid var(--primary-color);
  margin-top: 15px;
`;

// SQL example title
const SQLExampleTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

// SQL code
const SQLCode = styled.code`
  background: var(--background-primary);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--border-radius-small);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  display: block;
  white-space: pre-wrap;
  border: 1px solid var(--border-color);
`;

// Button container
const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Action button
const ActionButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius-medium);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
  background: var(--primary-gradient);
  color: var(--background-primary);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

// Meta information container
const MetaContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Timer component
const Timer = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  padding: 10px;
  background: var(--background-primary);
  border-radius: var(--border-radius-medium);
  border: 1px solid var(--border-color);
`;

// QuizInterface component
function QuizInterface({ quizData, updateQuizProgress, onComplete, onContentChange }) {
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
    
    // Trigger height update
    if (onContentChange) {
      setTimeout(onContentChange, 100);
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      
      // Trigger height update
      if (onContentChange) {
        setTimeout(onContentChange, 100);
      }
    } else {
      // Quiz completed
      setIsQuizComplete(true);
      updateQuizProgress({
        score: score,
        isComplete: true,
        currentQuestion: currentQuestionIndex
      });
      onComplete();
      
      // Trigger height update
      if (onContentChange) {
        setTimeout(onContentChange, 100);
      }
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Show loading state
  if (questions.length === 0) {
    return (
      <QuizContainer>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading quiz...</div>
        </div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      {/* Timer */}
      <Timer>
        Time Remaining: {formatTime(timeLeft)}
      </Timer>

      {/* Progress Bar */}
      <ProgressBar>
        <ProgressFill
          $progress={progress}
        />
      </ProgressBar>
      <ProgressText>
        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </ProgressText>

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
          
          <MetaContainer>
            <MetaTag $difficulty={currentQuestion.difficulty}>
              {currentQuestion.difficulty}
            </MetaTag>
            <MetaTag $difficulty="category">
              {currentQuestion.category}
            </MetaTag>
          </MetaContainer>

          {/* Answer Options */}
          <OptionsContainer>
            {currentQuestion.options.map((option, index) => {
              let className = '';
              if (selectedAnswer === index) {
                className = 'selected';
                if (showAnswer) {
                  className = index === currentQuestion.correctAnswer ? 'correct' : 'incorrect';
                }
              }
              
              return (
                <OptionButton
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={className}
                  whileHover={!showAnswer ? { scale: 1.02 } : {}}
                  whileTap={!showAnswer ? { scale: 0.98 } : {}}
                >
                  <OptionLetter>{String.fromCharCode(65 + index)}.</OptionLetter>
                  {option}
                </OptionButton>
              );
            })}
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
                <SQLExampleTitle>SQL Example:</SQLExampleTitle>
                <SQLCode>{currentQuestion.sqlExample}</SQLCode>
              </SQLExample>
            </FeedbackContainer>
          )}
        </QuestionContainer>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <ButtonContainer>
        <ActionButton
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ← Previous
        </ActionButton>
        
        {!showAnswer ? (
          <ActionButton
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Answer
          </ActionButton>
        ) : (
          <ActionButton
            onClick={handleNextQuestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
          </ActionButton>
        )}
      </ButtonContainer>
    </QuizContainer>
  );
}

export default QuizInterface;