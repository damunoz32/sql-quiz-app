// DatabaseViewer.js - Web App Database Explorer Component
// Redesigned for full-fledged web application with proper layout

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleDatabase, sampleQueries, databaseSchema } from '../data/sampleDatabase';

// Main viewer container
const ViewerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: var(--background-card);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-elevated);
  border: 1px solid var(--border-color);
  overflow: hidden;
`;

// Viewer header
const ViewerHeader = styled.div`
  background: var(--secondary-gradient);
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

const ViewerTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  position: relative;
  z-index: 2;
`;

const ViewerSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  position: relative;
  z-index: 2;
`;

// Viewer content
const ViewerContent = styled.div`
  padding: var(--spacing-2xl);
`;

// Tabs container
const TabsContainer = styled.div`
  display: flex;
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xl);
  border: 1px solid var(--border-color);
`;

// Individual tab button
const TabButton = styled.button`
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-medium);
  background: ${props => props.$active ? 'var(--secondary-color)' : 'transparent'};
  color: ${props => props.$active ? 'var(--text-white)' : 'var(--text-secondary)'};
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-medium);
  
  &:hover {
    background: ${props => props.$active 
      ? 'var(--secondary-color)' 
      : 'rgba(139, 92, 246, 0.05)'
    };
  }
`;

// Section container
const SectionContainer = styled.div`
  margin-bottom: var(--spacing-xl);
`;

// Section title
const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
`;

// Table card container
const TableCard = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-card);
`;

// Table title
const TableTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
`;

// Table description
const TableDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
  font-size: 0.95rem;
`;

// Column grid
const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: var(--spacing-md);
  font-size: 0.9rem;
`;

const ColumnHeader = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  padding: var(--spacing-md);
  background: rgba(139, 92, 246, 0.1);
  border-radius: var(--border-radius-small);
`;

const ColumnRow = styled.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
  
  &:last-child {
    border-bottom: none;
  }
`;

// Query input container
const QueryInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-primary);
  color: var(--text-primary);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.95rem;
  resize: vertical;
  margin-bottom: var(--spacing-lg);
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
`;

// Query button
const QueryButton = styled(motion.button)`
  background: var(--secondary-gradient);
  color: var(--text-white);
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-medium);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-medium);
  margin-bottom: var(--spacing-lg);
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

// Results table
const ResultsTable = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-medium);
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin-top: var(--spacing-lg);
  box-shadow: var(--shadow-card);
`;

// Table header
const TableHeader = styled.div`
  background: var(--background-card);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
`;

const TableHeaderText = styled.h4`
  color: var(--text-primary);
  font-weight: 600;
  margin: 0;
  font-size: 1rem;
`;

// Table content
const TableContent = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

// Table row
const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  background: var(--border-color);
  
  &:nth-child(even) {
    background: var(--background-card);
  }
`;

// Table cell
const TableCell = styled.div`
  padding: var(--spacing-md);
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 0.9rem;
  word-break: break-word;
`;

// Sample query card
const QueryCard = styled(motion.div)`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: var(--transition-medium);
  box-shadow: var(--shadow-card);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
    border-color: var(--secondary-color);
  }
`;

// Query title
const QueryTitle = styled.h4`
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  font-size: 1.1rem;
`;

// Query description
const QueryDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
  font-size: 0.95rem;
`;

// Query code
const QueryCode = styled.code`
  background: var(--background-card);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-small);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  display: block;
  white-space: pre-wrap;
  border: 1px solid var(--border-color);
`;

// Query difficulty badge
const QueryDifficulty = styled.span`
  background: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return 'rgba(16, 185, 129, 0.1)';
      case 'intermediate': return 'rgba(245, 158, 11, 0.1)';
      case 'advanced': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(16, 185, 129, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#10B981';
    }
  }};
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-small);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Message components
const Message = styled.div`
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-medium);
  margin-top: var(--spacing-lg);
  font-size: 0.95rem;
  font-weight: 500;
`;

const ErrorMessage = styled(Message)`
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const SuccessMessage = styled(Message)`
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

// DatabaseViewer component
function DatabaseViewer() {
  const [activeTab, setActiveTab] = useState('schema');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simple SQL query parser and executor
  const executeQuery = (sqlQuery) => {
    try {
      setError('');
      setSuccess('');
      
      const query = sqlQuery.toLowerCase().trim();
      
      if (query.startsWith('select')) {
        let tableName = '';
        if (query.includes('from customers')) tableName = 'customers';
        else if (query.includes('from products')) tableName = 'products';
        else if (query.includes('from orders')) tableName = 'orders';
        else if (query.includes('from categories')) tableName = 'categories';
        else if (query.includes('from order_items')) tableName = 'order_items';
        
        if (!tableName) {
          throw new Error('Table not found. Available tables: customers, products, orders, categories, order_items');
        }
        
        const data = sampleDatabase[tableName];
        
        if (!data) {
          throw new Error(`Table '${tableName}' not found`);
        }
        
        let filteredData = data;
        if (query.includes('where')) {
          if (query.includes('city = "new york"')) {
            filteredData = data.filter(row => row.city === 'New York');
          } else if (query.includes('price > 100')) {
            filteredData = data.filter(row => row.price > 100);
          } else if (query.includes('category_id = 1')) {
            filteredData = data.filter(row => row.category_id === 1);
          }
        }
        
        if (query.includes('order by')) {
          if (query.includes('order by name')) {
            filteredData.sort((a, b) => a.name?.localeCompare(b.name));
          } else if (query.includes('order by price')) {
            filteredData.sort((a, b) => a.price - b.price);
          }
        }
        
        setResults({
          columns: Object.keys(filteredData[0] || {}),
          data: filteredData.slice(0, 50)
        });
        
        setSuccess(`Query executed successfully! Found ${filteredData.length} rows.`);
      } else {
        throw new Error('Only SELECT queries are supported in this demo');
      }
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  const handleSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery.query);
    setActiveTab('query');
  };

  const handleExecuteQuery = () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }
    executeQuery(query);
  };

  return (
    <ViewerContainer>
      {/* Viewer Header */}
      <ViewerHeader>
        <ViewerTitle>Database Explorer</ViewerTitle>
        <ViewerSubtitle>Explore tables and run SQL queries</ViewerSubtitle>
      </ViewerHeader>

      <ViewerContent>
        {/* Navigation Tabs */}
        <TabsContainer>
          <TabButton 
            $active={activeTab === 'schema'} 
            onClick={() => setActiveTab('schema')}
          >
            📋 Database Schema
          </TabButton>
          <TabButton 
            $active={activeTab === 'query'} 
            onClick={() => setActiveTab('query')}
          >
            🔍 Run Queries
          </TabButton>
          <TabButton 
            $active={activeTab === 'samples'} 
            onClick={() => setActiveTab('samples')}
          >
            💡 Sample Queries
          </TabButton>
        </TabsContainer>

        <AnimatePresence mode="wait">
          {/* Database Schema Tab */}
          {activeTab === 'schema' && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SectionContainer>
                <SectionTitle>Database Tables</SectionTitle>
                {Object.entries(databaseSchema).map(([tableName, schema]) => (
                  <TableCard
                    key={tableName}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableTitle>{tableName.toUpperCase()}</TableTitle>
                    <TableDescription>{schema.description}</TableDescription>
                    <ColumnGrid>
                      <ColumnHeader>Column Name</ColumnHeader>
                      <ColumnHeader>Data Type</ColumnHeader>
                      <ColumnHeader>Description</ColumnHeader>
                      {schema.columns.map((column, index) => (
                        <React.Fragment key={index}>
                          <ColumnRow>{column.name}</ColumnRow>
                          <ColumnRow>{column.type}</ColumnRow>
                          <ColumnRow>{column.description}</ColumnRow>
                        </React.Fragment>
                      ))}
                    </ColumnGrid>
                  </TableCard>
                ))}
              </SectionContainer>
            </motion.div>
          )}

          {/* Query Tab */}
          {activeTab === 'query' && (
            <motion.div
              key="query"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SectionContainer>
                <SectionTitle>SQL Query Editor</SectionTitle>
                <QueryInput
                  placeholder="Enter your SQL query here...&#10;Example: SELECT * FROM customers WHERE city = 'New York';"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <QueryButton
                  onClick={handleExecuteQuery}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Execute Query
                </QueryButton>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                {results && (
                  <ResultsTable>
                    <TableHeader>
                      <TableHeaderText>
                        {results.columns.length} columns, {results.data.length} rows
                      </TableHeaderText>
                    </TableHeader>
                    <TableContent>
                      <TableRow>
                        {results.columns.map((column, index) => (
                          <TableCell key={index} style={{ fontWeight: '600', background: 'rgba(139, 92, 246, 0.1)' }}>
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                      
                      {results.data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {results.columns.map((column, colIndex) => (
                            <TableCell key={colIndex}>
                              {row[column] !== undefined ? String(row[column]) : 'NULL'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableContent>
                  </ResultsTable>
                )}
              </SectionContainer>
            </motion.div>
          )}

          {/* Sample Queries Tab */}
          {activeTab === 'samples' && (
            <motion.div
              key="samples"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SectionContainer>
                <SectionTitle>Sample Queries</SectionTitle>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', fontSize: '0.95rem' }}>
                  Click on any query below to load it into the query editor and try it out!
                </p>
                {sampleQueries.map((sample, index) => (
                  <QueryCard
                    key={index}
                    onClick={() => handleSampleQuery(sample)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                      <QueryTitle>{sample.title}</QueryTitle>
                      <QueryDifficulty $difficulty={sample.difficulty}>
                        {sample.difficulty}
                      </QueryDifficulty>
                    </div>
                    <QueryDescription>{sample.description}</QueryDescription>
                    <QueryCode>{sample.query}</QueryCode>
                  </QueryCard>
                ))}
              </SectionContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </ViewerContent>
    </ViewerContainer>
  );
}

export default DatabaseViewer;