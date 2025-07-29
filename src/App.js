// App.js - Main Application Component
// This is the root component that contains our entire SQL Quiz application
// Think of this as the "container" that holds all other parts of our app

import React, { useState } from 'react';
import styled from 'styled-components';
import QuizInterface from './components/QuizInterface';
import DatabaseViewer from './components/DatabaseViewer';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

// Styled component for the main app container
// This creates a responsive layout that works on all screen sizes
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

// Main content area with proper spacing and layout
const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// App component - this is where our application logic lives
function App() {
  // State management using React hooks
  // 'currentView' tracks which part of the app the user is viewing
  // 'quizData' stores the current quiz questions and user progress
  const [currentView, setCurrentView] = useState('quiz'); // 'quiz', 'database', 'results'
  const [quizData, setQuizData] = useState({
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    userAnswers: [],
    isComplete: false
  });

  // Function to handle navigation between different views
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Function to update quiz progress when user answers questions
  const updateQuizProgress = (newData) => {
    setQuizData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Function to reset the quiz for a fresh start
  const resetQuiz = () => {
    setQuizData({
      currentQuestion: 0,
      score: 0,
      totalQuestions: 0,
      userAnswers: [],
      isComplete: false
    });
    setCurrentView('quiz');
  };

  // Render the appropriate component based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'quiz':
        return (
          <QuizInterface 
            quizData={quizData}
            updateQuizProgress={updateQuizProgress}
            onComplete={() => setCurrentView('results')}
          />
        );
      case 'database':
        return <DatabaseViewer />;
      case 'results':
        return (
          <div>
            {/* Results component will be created later */}
            <h2>Quiz Results</h2>
            <p>Score: {quizData.score} / {quizData.totalQuestions}</p>
            <button onClick={resetQuiz}>Take Quiz Again</button>
          </div>
        );
      default:
        return <QuizInterface />;
    }
  };

  return (
    <AppContainer>
      <MainContent>
        {/* Navigation component for switching between quiz and database views */}
        <Navigation 
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        
        {/* Error Boundary for graceful error handling */}
        <ErrorBoundary>
          {/* Render the current view (quiz, database, or results) */}
          {renderCurrentView()}
        </ErrorBoundary>
      </MainContent>
    </AppContainer>
  );
}

export default App;