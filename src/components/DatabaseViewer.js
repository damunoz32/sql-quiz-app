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

// Main container for the database viewer
const ViewerContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 0 10px;
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

// Tabs container for switching between views
const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
  background: rgba(102, 126, 234, 0.1);
  padding: 8px;
  border-radius: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Individual tab button
const TabButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
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

const TableCard = styled(motion.div)`
  background: white;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TableName = styled.h3`
  color: #667eea;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const TableDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  font-style: italic;
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

const QueryInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  background: #1e293b;
  color: #e2e8f0;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const QueryButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Results section styling
const ResultsSection = styled.div`
  margin-top: 30px;
`;

const ResultsTable = styled.div`
  background: white;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  background: rgba(102, 126, 234, 0.1);
  padding: 15px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
`;

const TableBody = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: 1px;
  background: #f8fafc;
  
  &:nth-child(even) {
    background: white;
  }
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const TableCell = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  font-size: 14px;
  word-break: break-word;
`;

// Sample queries section
const SampleQueriesSection = styled.div`
  margin-bottom: 40px;
`;

const QueryCard = styled(motion.div)`
  background: white;
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const QueryTitle = styled.h4`
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
`;

const QueryDescription = styled.p`
  color: #666;
  margin-bottom: 12px;
  font-size: 14px;
`;

const QueryCode = styled.div`
  background: #1e293b;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  overflow-x: auto;
`;

const QueryDifficulty = styled.span`
  background: ${props => {
    switch (props.difficulty) {
      case 'beginner': return 'rgba(34, 197, 94, 0.1)';
      case 'intermediate': return 'rgba(59, 130, 246, 0.1)';
      case 'advanced': return 'rgba(245, 158, 11, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#3b82f6';
      case 'advanced': return '#f59e0b';
      default: return '#6b7280';
    }
  }};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

// Error message styling
const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
`;

// Success message styling
const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 14px;
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
          active={activeTab === 'schema'} 
          onClick={() => setActiveTab('schema')}
        >
          📋 Database Schema
        </TabButton>
        <TabButton 
          active={activeTab === 'query'} 
          onClick={() => setActiveTab('query')}
        >
          🔍 Run Queries
        </TabButton>
        <TabButton 
          active={activeTab === 'samples'} 
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
                  <TableName>{tableName.toUpperCase()}</TableName>
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
                <ResultsSection>
                  <SectionHeader>Query Results</SectionHeader>
                  <ResultsTable>
                    <TableHeader>
                      {results.columns.length} columns, {results.data.length} rows
                    </TableHeader>
                    <TableBody>
                      {/* Column Headers */}
                      <TableRow columns={`repeat(${results.columns.length}, 1fr)`}>
                        {results.columns.map((column, index) => (
                          <TableCell key={index} style={{ fontWeight: '600', background: 'rgba(102, 126, 234, 0.1)' }}>
                            {column}
                          </TableCell>
                        ))}
                      </TableRow>
                      
                      {/* Data Rows */}
                      {results.data.map((row, rowIndex) => (
                        <TableRow key={rowIndex} columns={`repeat(${results.columns.length}, 1fr)`}>
                          {results.columns.map((column, colIndex) => (
                            <TableCell key={colIndex}>
                              {row[column] !== undefined ? String(row[column]) : 'NULL'}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </ResultsTable>
                </ResultsSection>
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
                    <QueryDifficulty difficulty={sample.difficulty}>
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