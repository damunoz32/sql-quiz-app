// Navigation.js - Navigation Component
// This component provides the main navigation between different sections of the app
// It includes tabs for switching between Quiz and Database Viewer

import React from 'react';
import styled from 'styled-components';

// Navigation container with glass morphism effect
const NavContainer = styled.nav`
  background: var(--background-secondary);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: var(--shadow-medium);
  border: 1px solid var(--border-color);
`;

// App title styling
const AppTitle = styled.h1`
  text-align: center;
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// App subtitle styling
const AppSubtitle = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 30px;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Navigation tabs container
const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  background: var(--background-primary);
  padding: 8px;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
`;

// Individual tab button styling
const NavTab = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius-medium);
  background: ${props => props.$active ? 'var(--primary-gradient)' : 'transparent'};
  color: ${props => props.$active ? 'var(--background-primary)' : 'var(--text-primary)'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 16px;
  cursor: pointer;
  transition: all var(--transition-medium);
  
  &:hover {
    background: ${props => props.$active 
      ? 'var(--primary-gradient)' 
      : 'rgba(209, 169, 128, 0.1)'
    };
    transform: ${props => props.$active ? 'none' : 'translateY(-1px)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;

// Navigation component function
function Navigation({ currentView, onViewChange }) {
  return (
    <>
      {/* App header with title and description */}
      <AppTitle>SQL Quiz Master</AppTitle>
      <AppSubtitle>
        Test your SQL skills with interactive questions and explore a sample database
      </AppSubtitle>
      
      {/* Navigation tabs */}
      <NavContainer>
        <TabsContainer>
          <NavTab 
            $active={currentView === 'quiz'}
            onClick={() => onViewChange('quiz')}
          >
            📝 Take Quiz
          </NavTab>
          <NavTab 
            $active={currentView === 'database'}
            onClick={() => onViewChange('database')}
          >
            🗄️ Explore Database
          </NavTab>
        </TabsContainer>
      </NavContainer>
    </>
  );
}

export default Navigation;