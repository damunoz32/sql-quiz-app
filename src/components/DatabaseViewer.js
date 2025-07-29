// DatabaseViewer.js - Database Exploration Component
// This component allows users to explore the sample database by:
// - Viewing table schemas and data
// - Running custom SQL queries
// - Seeing query results in a formatted table
// - Learning from sample queries

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleDatabase, sampleQueries, databaseSchema } from '../data/sampleDatabase';

// Main viewer container
const ViewerContainer = styled.div`
  background: var(--background-secondary);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  padding: 30px;
  box-shadow: var(--shadow-heavy);
  border: 1px solid var(--border-color);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
  }
`;

// Section headers
const SectionHeader = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  padding-bottom: 10px;
`;

// Tabs container
const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  background: var(--background-primary);
  padding: 8px;
  border-radius: var(--border-radius-large);
  border: 1px solid var(--border-color);
`;

// Individual tab button
const TabButton = styled.button`
  flex: 1;
  padding: 12px 20px;
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

// Schema section styling
const SchemaSection = styled.div`
  margin-bottom: 40px;
`;

// Table card container
const TableCard = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-large);
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
`;

// Table title
const TableTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 15px;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 10px;
`;

// Table description
const TableDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 10px;
  font-size: 14px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 5px;
  }
`;

const ColumnHeader = styled.div`
  font-weight: 600;
  color: #333;
  padding: 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 6px;
`;

const ColumnRow = styled.div`
  padding: 8px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

// Query section styling
const QuerySection = styled.div`
  margin-bottom: 40px;
`;

// Query input container
const QueryInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-medium);
  background: var(--background-primary);
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(209, 169, 128, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
`;

// Query button
const QueryButton = styled.button`
  background: var(--primary-gradient);
  color: var(--background-primary);
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius-medium);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-medium);
  margin-bottom: 20px;
  
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

// Results table
const ResultsTable = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-medium);
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin-top: 20px;
`;

// Table header
const TableHeader = styled.div`
  background: var(--background-secondary);
  padding: 12px 15px;
  border-bottom: 1px solid var(--border-color);
`;

// Table header text
const TableHeaderText = styled.h4`
  color: var(--text-primary);
  font-weight: 600;
  margin: 0;
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
    background: var(--background-secondary);
  }
`;

// Table cell
const TableCell = styled.div`
  padding: 10px 15px;
  background: var(--background-primary);
  color: var(--text-primary);
  font-size: 14px;
  word-break: break-word;
`;

// Sample queries section
const SampleQueriesSection = styled.div`
  margin-bottom: 40px;
`;

// Sample query card
const QueryCard = styled.div`
  background: var(--background-primary);
  border-radius: var(--border-radius-medium);
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-medium);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
    border-color: var(--primary-color);
  }
`;

// Query title
const QueryTitle = styled.h4`
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.1rem;
`;

// Query description
const QueryDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
  font-size: 14px;
`;

// Query code
const QueryCode = styled.code`
  background: var(--background-secondary);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--border-radius-small);
  font-family: 'Courier New', monospace;
  font-size: 13px;
  display: block;
  white-space: pre-wrap;
  border: 1px solid var(--border-color);
`;

// Query difficulty badge
const QueryDifficulty = styled.span`
  background: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return 'rgba(144, 160, 143, 0.2)';
      case 'intermediate': return 'rgba(209, 169, 128, 0.2)';
      case 'advanced': return 'rgba(116, 136, 115, 0.2)';
      default: return 'rgba(144, 160, 143, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.$difficulty) {
      case 'beginner': return '#90A08F';
      case 'intermediate': return '#D1A980';
      case 'advanced': return '#748873';
      default: return '#90A08F';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

// Error message
const ErrorMessage = styled.div`
  background: var(--error-color);
  color: var(--background-primary);
  padding: 15px;
  border-radius: var(--border-radius-medium);
  margin-top: 15px;
  border: 1px solid var(--error-color);
`;

// Success message
const SuccessMessage = styled.div`
  background: var(--success-color);
  color: var(--background-primary);
  padding: 15px;
  border-radius: var(--border-radius-medium);
  margin-top: 15px;
  border: 1px solid var(--success-color);
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
      
      // Convert query to lowercase for easier parsing
      const query = sqlQuery.toLowerCase().trim();
      
      // Basic SELECT query parsing
      if (query.startsWith('select')) {
        // Extract table name (very basic parsing)
        let tableName = '';
        if (query.includes('from customers')) tableName = 'customers';
        else if (query.includes('from products')) tableName = 'products';
        else if (query.includes('from orders')) tableName = 'orders';
        else if (query.includes('from categories')) tableName = 'categories';
        else if (query.includes('from order_items')) tableName = 'order_items';
        
        if (!tableName) {
          throw new Error('Table not found. Available tables: customers, products, orders, categories, order_items');
        }
        
        // Get data from the specified table
        const data = sampleDatabase[tableName];
        
        if (!data) {
          throw new Error(`Table '${tableName}' not found`);
        }
        
        // Basic WHERE clause parsing
        let filteredData = data;
        if (query.includes('where')) {
          // Very basic WHERE parsing - just for demonstration
          if (query.includes('city = "new york"')) {
            filteredData = data.filter(row => row.city === 'New York');
          } else if (query.includes('price > 100')) {
            filteredData = data.filter(row => row.price > 100);
          } else if (query.includes('category_id = 1')) {
            filteredData = data.filter(row => row.category_id === 1);
          }
        }
        
        // Basic ORDER BY parsing
        if (query.includes('order by')) {
          if (query.includes('order by name')) {
            filteredData.sort((a, b) => a.name?.localeCompare(b.name));
          } else if (query.includes('order by price')) {
            filteredData.sort((a, b) => a.price - b.price);
          }
        }
        
        setResults({
          columns: Object.keys(filteredData[0] || {}),
          data: filteredData.slice(0, 50) // Limit to 50 rows for display
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

  // Handle sample query selection
  const handleSampleQuery = (sampleQuery) => {
    setQuery(sampleQuery.query);
    setActiveTab('query');
  };

  // Handle query execution
  const handleExecuteQuery = () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }
    executeQuery(query);
  };

  return (
    <ViewerContainer>
      <SectionHeader>Database Explorer</SectionHeader>
      
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
            <SchemaSection>
              <SectionHeader>Database Tables</SectionHeader>
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
            </SchemaSection>
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
            <QuerySection>
              <SectionHeader>SQL Query Editor</SectionHeader>
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

              {/* Error Message */}
              {error && <ErrorMessage>{error}</ErrorMessage>}

              {/* Success Message */}
              {success && <SuccessMessage>{success}</SuccessMessage>}

              {/* Results */}
              {results && (
                <ResultsTable>
                  <TableHeader>
                    {results.columns.length} columns, {results.data.length} rows
                  </TableHeader>
                  <TableContent>
                    {/* Column Headers */}
                    <TableRow>
                      {results.columns.map((column, index) => (
                        <TableCell key={index} style={{ fontWeight: '600', background: 'rgba(102, 126, 234, 0.1)' }}>
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Data Rows */}
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
            </QuerySection>
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
            <SampleQueriesSection>
              <SectionHeader>Sample Queries</SectionHeader>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Click on any query below to load it into the query editor and try it out!
              </p>
              {sampleQueries.map((sample, index) => (
                <QueryCard
                  key={index}
                  onClick={() => handleSampleQuery(sample)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <QueryTitle>{sample.title}</QueryTitle>
                    <QueryDifficulty $difficulty={sample.difficulty}>
                      {sample.difficulty}
                    </QueryDifficulty>
                  </div>
                  <QueryDescription>{sample.description}</QueryDescription>
                  <QueryCode>{sample.query}</QueryCode>
                </QueryCard>
              ))}
            </SampleQueriesSection>
          </motion.div>
        )}
      </AnimatePresence>
    </ViewerContainer>
  );
}

export default DatabaseViewer;