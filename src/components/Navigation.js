// Navigation.js - Web App Navigation Component
// Modern top navigation bar for the SQL Quiz application

import React, { useState } from 'react';
import styled from 'styled-components';

// Navigation container
const NavContainer = styled.nav`
  background: var(--background-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-light);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-lg);
  height: 70px;
`;

// Brand section
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
  font-weight: 700;
  color: var(--text-white);
  font-size: 1.2rem;
`;

const BrandText = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
`;

// Navigation items
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.95rem;
  cursor: pointer;
  border-radius: var(--border-radius-medium);
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  position: relative;
  
  &:hover {
    background: rgba(6, 182, 212, 0.05);
    color: var(--text-primary);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: var(--primary-color);
    transition: var(--transition-fast);
  }
`;

const NavIcon = styled.span`
  font-size: 1.1rem;
`;

const NavLabel = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

// User section
const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: var(--secondary-gradient);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--text-white);
  font-size: 1rem;
`;

// Mobile menu button
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--spacing-sm);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// Mobile menu
const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--background-secondary);
  border-top: 1px solid var(--border-color);
  box-shadow: var(--shadow-medium);
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const MobileNavItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const MobileNavItem = styled.li``;

const MobileNavButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: var(--spacing-md);
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '500'};
  text-align: left;
  border-radius: var(--border-radius-medium);
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  &:hover {
    background: rgba(6, 182, 212, 0.05);
    color: var(--text-primary);
  }
`;

// Navigation component
const Navigation = ({ currentView, onViewChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      id: 'generator',
      label: 'Generator',
      icon: '🤖',
      view: 'generator'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      view: 'profile'
    }
  ];

  const handleNavClick = (view) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        {/* Brand */}
        <BrandSection>
          <BrandLogo>SQL</BrandLogo>
          <BrandText>Quiz Master</BrandText>
        </BrandSection>

        {/* Desktop Navigation */}
        <NavItems>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavButton
                active={currentView === item.view}
                onClick={() => handleNavClick(item.view)}
              >
                <NavIcon>{item.icon}</NavIcon>
                <NavLabel>{item.label}</NavLabel>
              </NavButton>
            </NavItem>
          ))}
        </NavItems>

        {/* User Section */}
        <UserSection>
          <UserAvatar>LS</UserAvatar>
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </UserSection>
      </NavContent>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileNavItems>
          {navItems.map((item) => (
            <MobileNavItem key={item.id}>
              <MobileNavButton
                active={currentView === item.view}
                onClick={() => handleNavClick(item.view)}
              >
                <NavIcon>{item.icon}</NavIcon>
                <NavLabel>{item.label}</NavLabel>
              </MobileNavButton>
            </MobileNavItem>
          ))}
        </MobileNavItems>
      </MobileMenu>
    </NavContainer>
  );
};

export default Navigation;