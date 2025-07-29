// Navigation.js - Navigation Component
// This component provides the main navigation between different sections of the app
// It includes tabs for switching between Quiz and Database Viewer

import React from 'react';
import styled from 'styled-components';

// Styled component for the navigation container
// Creates a clean, modern navigation bar with proper spacing
const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

// Styled component for individual navigation tabs
// Includes hover effects and active state styling
const NavTab = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(102, 126, 234, 0.1)'
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

// App title component
const AppTitle = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

// Subtitle component
const AppSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  font-size: 1.1rem;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
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
      </NavContainer>
    </>
  );
}

export default Navigation;