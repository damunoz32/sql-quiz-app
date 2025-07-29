// Navigation.js - Web App Navigation Component
// Modern horizontal navigation bar for desktop web application

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Navigation container
const NavContainer = styled.nav`
  background: var(--background-card);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-light);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

// Navigation content wrapper
const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Logo/Brand section
const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const BrandLogo = styled.div`
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: var(--border-radius-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: var(--text-white);
  font-weight: 700;
`;

const BrandText = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
`;

// Navigation items container
const NavItems = styled.div`
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
`;

// Navigation item
const NavItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-medium);
  transition: var(--transition-fast);
  color: ${props => props.$active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.95rem;
  position: relative;
  
  &:hover {
    background: rgba(6, 182, 212, 0.05);
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background: var(--primary-color);
    transition: var(--transition-fast);
  }
`;

// Navigation icon
const NavIcon = styled.div`
  font-size: 1.1rem;
  line-height: 1;
`;

// Navigation label
const NavLabel = styled.span`
  font-weight: inherit;
`;

// User section (optional)
const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: var(--secondary-gradient);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--text-white);
  font-size: 0.8rem;
`;

// Mobile menu button (hidden on desktop)
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// Navigation component function
function Navigation({ currentView, onViewChange }) {
  const navItems = [
    {
      id: 'quiz',
      label: 'Quiz',
      icon: '📝',
      view: 'quiz'
    },
    {
      id: 'database',
      label: 'Database',
      icon: '🗄️',
      view: 'database'
    },
    {
      id: 'results',
      label: 'Results',
      icon: '🏆',
      view: 'results'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      view: 'profile'
    }
  ];

  return (
    <NavContainer>
      <NavContent>
        {/* Brand/Logo Section */}
        <BrandSection>
          <BrandLogo>SQL</BrandLogo>
          <BrandText>Quiz Master</BrandText>
        </BrandSection>

        {/* Navigation Items */}
        <NavItems>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              $active={currentView === item.view}
              onClick={() => onViewChange(item.view)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavLabel>{item.label}</NavLabel>
            </NavItem>
          ))}
        </NavItems>

        {/* User Section */}
        <UserSection>
          <UserAvatar>LS</UserAvatar>
        </UserSection>

        {/* Mobile Menu Button */}
        <MobileMenuButton>
          ☰
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
}

export default Navigation;