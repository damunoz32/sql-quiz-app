// QuizInterface.js - Web App Quiz Component
// Redesigned for full-fledged web application with proper layout

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions, quizConfig } from '../data/quizQuestions';

// Main quiz container
const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: var(--background-card);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--border-color);
  overflow: hidden;
`;

// Quiz header
const QuizHeader = styled.div`
  background: var(--primary-gradient);
  padding: var(--spacing-xl) var(--spacing-2xl);
  color: var(--text-white);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const QuizTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  position: relative;
  z-index: 2;
`;

const QuizSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  position: relative;
  z-index: 2;
`;

// Quiz content
const QuizContent = styled.div`
  padding: var(--spacing-2xl);
`;

// Progress section
const ProgressSection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const ProgressTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const ProgressText = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

// Progress bar
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: var(--border-light);
  border-radius: var(--border-radius-small);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
`;

const ProgressBarFill = styled(motion.div)`
  height: 100%;
  background: var(--primary-gradient);
  border-radius: var(--border-radius-small);
`;

// Timer component
const TimerContainer = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  border: 1px solid var(--border-color);
`;

const TimerText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
`;

// Question section
const QuestionSection = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  border: 1px solid var(--border-color);
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const QuestionNumber = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const QuestionHelp = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-small);
  transition: var(--transition-fast);
  
  &:hover {
    background: var(--border-light);
    color: var(--primary-color);
  }
`;

const QuestionText = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  margin: 0;
`;

// Options container
const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

// Option button with modern design
const OptionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--background-card);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  cursor: pointer;
  transition: var(--transition-medium);
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  
  &:hover {
    border-color: var(--primary-color);
    background: rgba(6, 182, 212, 0.05);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  &.selected {
    background: var(--primary-color);
    color: var(--text-white);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-medium);
  }
  
  &.correct {
    background: var(--success-color);
    color: var(--text-white);
    border-color: var(--success-color);
  }
  
  &.incorrect {
    background: var(--error-color);
    color: var(--text-white);
    border-color: var(--error-color);
  }
`;

// Option radio button
const OptionRadio = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$selected ? 'var(--text-white)' : 'var(--border-color)'};
  border-radius: 50%;
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: ${props => props.$selected ? 'var(--text-white)' : 'transparent'};
    border-radius: 50%;
    transition: var(--transition-fast);
  }
`;

// Feedback section
const FeedbackSection = styled(motion.div)`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  border: 1px solid var(--border-color);
  border-left: 4px solid ${props => props.$isCorrect ? 'var(--success-color)' : 'var(--error-color)'};
`;

const FeedbackTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: ${props => props.$isCorrect ? 'var(--success-color)' : 'var(--error-color)'};
`;

const FeedbackText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  font-size: 0.95rem;
`;

// SQL example
const SQLExample = styled.div`
  background: var(--background-card);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-md);
  border: 1px solid var(--border-color);
`;

const SQLExampleTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
`;

const SQLCode = styled.code`
  background: var(--background-primary);
  color: var(--text-primary);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-small);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
  display: block;
  white-space: pre-wrap;
  border: 1px solid var(--border-color);
`;

// Action button
const ActionButton = styled(motion.button)`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-medium);
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

// QuizInterface component
function QuizInterface({ quizData, updateQuizProgress, onComplete, onContentChange }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizConfig.timeLimit);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const timerRef = useRef(null);

  // Initialize quiz
  useEffect(() => {
    const randomQuestions = getRandomQuestions(quizConfig.questionsPerQuiz);
    setQuestions(randomQuestions);
    updateQuizProgress({ totalQuestions: randomQuestions.length });
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (timeLeft > 0 && !isQuizComplete) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isQuizComplete) {
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
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isQuizComplete]);

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowAnswer(true);
    
    if (onContentChange) {
      setTimeout(onContentChange, 100);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      
      if (onContentChange) {
        setTimeout(onContentChange, 100);
      }
    } else {
      setIsQuizComplete(true);
      updateQuizProgress({
        score: score,
        isComplete: true,
        currentQuestion: currentQuestionIndex
      });
      onComplete();
      
      if (onContentChange) {
        setTimeout(onContentChange, 100);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentQuestionIndex];

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
      {/* Quiz Header */}
      <QuizHeader>
        <QuizTitle>SQL Quiz Challenge</QuizTitle>
        <QuizSubtitle>Test your database knowledge</QuizSubtitle>
      </QuizHeader>

      <QuizContent>
        {/* Timer */}
        <TimerContainer>
          <TimerText>⏱️ Time Remaining: {formatTime(timeLeft)}</TimerText>
        </TimerContainer>

        {/* Progress */}
        <ProgressSection>
          <ProgressHeader>
            <ProgressTitle>Progress</ProgressTitle>
            <ProgressText>{currentQuestionIndex + 1} / {questions.length}</ProgressText>
          </ProgressHeader>
          <ProgressBarContainer>
            <ProgressBarFill
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </ProgressBarContainer>
        </ProgressSection>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuestionSection
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionHeader>
              <QuestionNumber>Question {currentQuestionIndex + 1} / {questions.length}</QuestionNumber>
              <QuestionHelp>?</QuestionHelp>
            </QuestionHeader>
            <QuestionText>{currentQuestion.question}</QuestionText>
          </QuestionSection>
        </AnimatePresence>

        {/* Options */}
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
                <OptionRadio $selected={selectedAnswer === index} />
                {option}
              </OptionButton>
            );
          })}
        </OptionsContainer>

        {/* Feedback */}
        {showAnswer && (
          <FeedbackSection
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
          </FeedbackSection>
        )}

        {/* Action Button */}
        <ActionButton
          onClick={!showAnswer ? handleSubmitAnswer : handleNextQuestion}
          disabled={!showAnswer && selectedAnswer === null}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {!showAnswer ? 'Submit Answer' : 
           currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </ActionButton>
      </QuizContent>
    </QuizContainer>
  );
}

export default QuizInterface;