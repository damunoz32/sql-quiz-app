// App.js - Full-Fledged Web Application
// Modern SQL Quiz application with desktop-first design

import React, { useState } from 'react';
import styled from 'styled-components';
import QuizInterface from './components/QuizInterface';
import DatabaseViewer from './components/DatabaseViewer';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import QuestionGenerator from './components/QuestionGenerator';
import './styles/App.css';

// Main app container
const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--background-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

// Header section
const Header = styled.header`
  background: var(--background-header);
  padding: var(--spacing-2xl) 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--text-white);
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`;

const HeaderTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  line-height: 1.2;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.9;
  margin: 0;
  line-height: 1.6;
`;

// Main content area
const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 var(--spacing-lg);
`;

// Content section wrapper
const ContentSection = styled.section`
  margin-bottom: var(--spacing-3xl);
`;

// Section title
const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

// Results component
const ResultsContainer = styled.div`
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResultsCard = styled.div`
  background: var(--background-card);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-3xl);
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--border-color);
  max-width: 600px;
  width: 100%;
`;

const ResultsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const ResultsScore = styled.div`
  font-size: 4rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-lg);
`;

const ResultsText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
`;

const RestartButton = styled.button`
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-medium);
  box-shadow: var(--shadow-medium);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-heavy);
  }
`;

// Profile component
const ProfileContainer = styled.div`
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileCard = styled.div`
  background: var(--background-card);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-3xl);
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--border-color);
  max-width: 600px;
  width: 100%;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: var(--primary-gradient);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-white);
  font-weight: 700;
  margin: 0 auto var(--spacing-lg);
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

const ProfileText = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
`;

// App component
function App() {
  const [currentView, setCurrentView] = useState('quiz');
  const [quizData, setQuizData] = useState({
    currentQuestion: 0,
    score: 0,
    totalQuestions: 0,
    userAnswers: [],
    isComplete: false
  });

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const updateQuizProgress = (newData) => {
    setQuizData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

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

  const handleQuestionsGenerated = (newQuestions) => {
    // Here you could save the generated questions to your quiz database
    console.log('New questions generated:', newQuestions);
    // For now, we'll just log them. In a real app, you'd save them to your question database
  };

  const sendHeightToParent = () => {
    try {
      const height = document.body.scrollHeight;
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'RESIZE',
          height: height
        }, '*');
        console.log('Sent height to parent:', height);
      }
    } catch (error) {
      console.log('Error sending height to parent:', error);
    }
  };

  React.useEffect(() => {
    sendHeightToParent();
    
    const timer = setTimeout(sendHeightToParent, 500);
    
    const handleResize = () => {
      setTimeout(sendHeightToParent, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'quiz':
        return (
          <ContentSection>
            <SectionTitle>SQL Quiz Challenge</SectionTitle>
            <SectionSubtitle>
              Test your SQL knowledge with interactive questions. Learn through practice and get instant feedback on your answers.
            </SectionSubtitle>
            <QuizInterface 
              quizData={quizData}
              updateQuizProgress={updateQuizProgress}
              onComplete={() => setCurrentView('results')}
              onContentChange={sendHeightToParent}
            />
          </ContentSection>
        );
      case 'database':
        return (
          <ContentSection>
            <SectionTitle>Database Explorer</SectionTitle>
            <SectionSubtitle>
              Explore the sample database schema, run SQL queries, and learn from example queries.
            </SectionSubtitle>
            <DatabaseViewer />
          </ContentSection>
        );
      case 'generator':
        return (
          <ContentSection>
            <SectionTitle>AI Question Generator</SectionTitle>
            <SectionSubtitle>
              Generate new SQL quiz questions using our AI-powered system. Create custom questions or use templates.
            </SectionSubtitle>
            <QuestionGenerator onQuestionsGenerated={handleQuestionsGenerated} />
          </ContentSection>
        );
      case 'results':
        return (
          <ContentSection>
            <ResultsContainer>
              <ResultsCard>
                <ResultsTitle>Quiz Complete!</ResultsTitle>
                <ResultsScore>
                  {quizData.score} / {quizData.totalQuestions}
                </ResultsScore>
                <ResultsText>
                  {quizData.score === quizData.totalQuestions 
                    ? "Perfect score! You're a SQL master! 🎉" 
                    : `Great job! You got ${Math.round((quizData.score / quizData.totalQuestions) * 100)}% correct. Keep practicing! 💪`
                  }
                </ResultsText>
                <RestartButton onClick={resetQuiz}>
                  Take Quiz Again
                </RestartButton>
              </ResultsCard>
            </ResultsContainer>
          </ContentSection>
        );
      case 'profile':
        return (
          <ContentSection>
            <ProfileContainer>
              <ProfileCard>
                <ProfileAvatar>LS</ProfileAvatar>
                <ProfileTitle>SQL Quiz Master</ProfileTitle>
                <ProfileText>
                  Welcome to your SQL learning journey! Track your progress, 
                  review your results, and keep improving your database skills.
                </ProfileText>
              </ProfileCard>
            </ProfileContainer>
          </ContentSection>
        );
      default:
        return <QuizInterface />;
    }
  };

  return (
    <AppContainer>
      {/* Header */}
      <Header>
        <HeaderContent>
          <HeaderTitle>SQL Quiz Master</HeaderTitle>
          <HeaderSubtitle>
            Master SQL through interactive quizzes and hands-on database exploration
          </HeaderSubtitle>
        </HeaderContent>
      </Header>

      {/* Navigation */}
      <Navigation 
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <MainContent>
        <ErrorBoundary>
          {renderCurrentView()}
        </ErrorBoundary>
      </MainContent>
    </AppContainer>
  );
}

export default App;