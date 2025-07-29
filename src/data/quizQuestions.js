// quizQuestions.js - SQL Quiz Questions Database
// This file contains all the quiz questions, answers, and explanations
// Questions are organized by difficulty and cover various SQL concepts

export const quizQuestions = [
  // BEGINNER LEVEL QUESTIONS
  {
    id: 1,
    difficulty: 'beginner',
    category: 'SELECT',
    question: 'Which SQL command is used to retrieve data from a database?',
    options: [
      'SELECT',
      'EXTRACT', 
      'GET',
      'RETRIEVE'
    ],
    correctAnswer: 0,
    explanation: 'SELECT is the primary SQL command used to retrieve data from database tables. It allows you to specify which columns and rows you want to see.',
    sqlExample: 'SELECT * FROM customers;'
  },
  
  {
    id: 2,
    difficulty: 'beginner',
    category: 'WHERE',
    question: 'What clause is used to filter records in SQL?',
    options: [
      'FILTER',
      'WHERE',
      'HAVING',
      'CONDITION'
    ],
    correctAnswer: 1,
    explanation: 'The WHERE clause is used to filter records based on specified conditions. It comes after the FROM clause in a SELECT statement.',
    sqlExample: 'SELECT * FROM products WHERE price > 50;'
  },
  
  {
    id: 3,
    difficulty: 'beginner',
    category: 'ORDER BY',
    question: 'How do you sort results in ascending order in SQL?',
    options: [
      'SORT ASC',
      'ORDER BY ASC',
      'ORDER BY',
      'SORT BY'
    ],
    correctAnswer: 2,
    explanation: 'ORDER BY is used to sort results. By default, it sorts in ascending order. You can also use ORDER BY column_name DESC for descending order.',
    sqlExample: 'SELECT * FROM employees ORDER BY last_name;'
  },

  // INTERMEDIATE LEVEL QUESTIONS
  {
    id: 4,
    difficulty: 'intermediate',
    category: 'JOINS',
    question: 'Which type of JOIN returns all records from both tables, even if there is no match?',
    options: [
      'INNER JOIN',
      'LEFT JOIN',
      'FULL OUTER JOIN',
      'CROSS JOIN'
    ],
    correctAnswer: 2,
    explanation: 'FULL OUTER JOIN returns all records from both tables. If there is no match, the result will contain NULL values for the missing side.',
    sqlExample: 'SELECT * FROM orders FULL OUTER JOIN customers ON orders.customer_id = customers.id;'
  },
  
  {
    id: 5,
    difficulty: 'intermediate',
    category: 'AGGREGATE',
    question: 'What function would you use to find the average price of all products?',
    options: [
      'MEAN()',
      'AVERAGE()',
      'AVG()',
      'MEDIAN()'
    ],
    correctAnswer: 2,
    explanation: 'AVG() is the SQL aggregate function used to calculate the average of a numeric column. It ignores NULL values in its calculation.',
    sqlExample: 'SELECT AVG(price) FROM products;'
  },
  
  {
    id: 6,
    difficulty: 'intermediate',
    category: 'GROUP BY',
    question: 'When using GROUP BY, what clause is used to filter grouped results?',
    options: [
      'WHERE',
      'HAVING',
      'FILTER',
      'GROUP WHERE'
    ],
    correctAnswer: 1,
    explanation: 'HAVING is used to filter results after grouping. WHERE filters individual rows before grouping, while HAVING filters groups after aggregation.',
    sqlExample: 'SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;'
  },

  // ADVANCED LEVEL QUESTIONS
  {
    id: 7,
    difficulty: 'advanced',
    category: 'SUBQUERIES',
    question: 'What is a subquery that returns multiple rows and columns called?',
    options: [
      'Scalar subquery',
      'Column subquery',
      'Table subquery',
      'Row subquery'
    ],
    correctAnswer: 2,
    explanation: 'A table subquery returns multiple rows and columns, essentially creating a temporary table that can be used in FROM clauses or JOINs.',
    sqlExample: 'SELECT * FROM (SELECT category, AVG(price) as avg_price FROM products GROUP BY category) as temp;'
  },
  
  {
    id: 8,
    difficulty: 'advanced',
    category: 'WINDOW FUNCTIONS',
    question: 'Which window function would you use to assign a unique rank to each row within a partition?',
    options: [
      'ROW_NUMBER()',
      'RANK()',
      'DENSE_RANK()',
      'NTILE()'
    ],
    correctAnswer: 0,
    explanation: 'ROW_NUMBER() assigns a unique sequential integer to each row within a partition, starting from 1. Unlike RANK(), it never produces ties.',
    sqlExample: 'SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rank FROM employees;'
  },
  
  {
    id: 9,
    difficulty: 'advanced',
    category: 'CTE',
    question: 'What does CTE stand for in SQL?',
    options: [
      'Common Table Expression',
      'Complex Table Element',
      'Conditional Table Extension',
      'Custom Table Entity'
    ],
    correctAnswer: 0,
    explanation: 'CTE stands for Common Table Expression. It allows you to define a temporary named result set that exists within the scope of a single statement.',
    sqlExample: 'WITH sales_summary AS (SELECT category, SUM(amount) FROM sales GROUP BY category) SELECT * FROM sales_summary;'
  },

  // EXPERT LEVEL QUESTIONS
  {
    id: 10,
    difficulty: 'expert',
    category: 'PERFORMANCE',
    question: 'Which of the following is NOT a good practice for SQL performance optimization?',
    options: [
      'Using indexes on frequently queried columns',
      'Avoiding SELECT * in production queries',
      'Using subqueries instead of JOINs when possible',
      'Limiting result sets with WHERE clauses'
    ],
    correctAnswer: 2,
    explanation: 'Using subqueries instead of JOINs is generally NOT a good practice. JOINs are typically more efficient and readable than equivalent subqueries.',
    sqlExample: '-- Better: SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;'
  },
  
  {
    id: 11,
    difficulty: 'expert',
    category: 'TRANSACTIONS',
    question: 'What does ACID stand for in database transactions?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Accuracy, Consistency, Integrity, Data',
      'Atomicity, Concurrency, Integrity, Durability',
      'Accuracy, Consistency, Isolation, Data'
    ],
    correctAnswer: 0,
    explanation: 'ACID stands for Atomicity (all or nothing), Consistency (data remains valid), Isolation (transactions don\'t interfere), and Durability (permanent changes).',
    sqlExample: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 100 WHERE id = 1; COMMIT;'
  },
  
  {
    id: 12,
    difficulty: 'expert',
    category: 'ADVANCED FUNCTIONS',
    question: 'Which function would you use to pivot rows into columns in SQL?',
    options: [
      'PIVOT',
      'CROSS APPLY',
      'UNPIVOT',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'All three functions can be used for pivoting data. PIVOT transforms rows to columns, CROSS APPLY can be used for complex pivoting, and UNPIVOT does the reverse.',
    sqlExample: 'SELECT * FROM sales PIVOT (SUM(amount) FOR month IN ([Jan], [Feb], [Mar])) as pvt;'
  }
];

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty) => {
  return quizQuestions.filter(q => q.difficulty === difficulty);
};

// Helper function to get questions by category
export const getQuestionsByCategory = (category) => {
  return quizQuestions.filter(q => q.category === category);
};

// Helper function to get random questions
export const getRandomQuestions = (count = 10) => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Quiz configuration
export const quizConfig = {
  timeLimit: 300, // 5 minutes per quiz
  questionsPerQuiz: 10,
  passingScore: 70, // 70% to pass
  difficultyWeights: {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4
  }
};