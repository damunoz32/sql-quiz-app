// aiQuestionGenerator.js - AI-powered SQL Quiz Question Generator
// This module generates new SQL quiz questions using templates and optional AI APIs

// Question templates for different SQL concepts
const questionTemplates = {
  SELECT: [
    {
      template: "Which SQL command is used to {action} from a database?",
      actions: ["retrieve data", "fetch records", "extract information", "get results"],
      options: ["SELECT", "EXTRACT", "GET", "RETRIEVE"],
      correctAnswer: 0,
      category: "SELECT"
    },
    {
      template: "What is the correct syntax to {action} from a table named '{table}'?",
      actions: ["select all columns", "retrieve all data", "get all records"],
      tables: ["employees", "customers", "products", "orders", "users"],
      options: ["SELECT * FROM {table}", "GET * FROM {table}", "EXTRACT * FROM {table}", "RETRIEVE * FROM {table}"],
      correctAnswer: 0,
      category: "SELECT"
    }
  ],
  
  WHERE: [
    {
      template: "Which clause is used to {action} in SQL?",
      actions: ["filter records", "apply conditions", "restrict results", "limit data"],
      options: ["FILTER", "WHERE", "HAVING", "CONDITION"],
      correctAnswer: 1,
      category: "WHERE"
    },
    {
      template: "How do you {action} where {condition}?",
      actions: ["select records", "filter data", "get rows"],
      conditions: ["price > 100", "age >= 18", "status = 'active'", "name LIKE 'A%'"],
      options: ["SELECT * FROM table WHERE {condition}", "SELECT * FROM table FILTER {condition}", "SELECT * FROM table IF {condition}", "SELECT * FROM table WHEN {condition}"],
      correctAnswer: 0,
      category: "WHERE"
    }
  ],
  
  JOIN: [
    {
      template: "Which type of JOIN {description}?",
      descriptions: [
        "returns only matching records from both tables",
        "returns all records from the left table and matching records from the right",
        "returns all records from both tables, even if there is no match",
        "returns the Cartesian product of both tables"
      ],
      options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
      correctAnswers: [0, 1, 2, 3],
      category: "JOINS"
    }
  ],
  
  AGGREGATE: [
    {
      template: "What function would you use to {action}?",
      actions: [
        "find the average value",
        "count the number of records",
        "find the maximum value",
        "calculate the sum of values",
        "find the minimum value"
      ],
      options: [
        ["AVG()", "MEAN()", "AVERAGE()", "MEDIAN()"],
        ["COUNT()", "TOTAL()", "SUM()", "NUMBER()"],
        ["MAX()", "HIGHEST()", "TOP()", "PEAK()"],
        ["SUM()", "TOTAL()", "ADD()", "PLUS()"],
        ["MIN()", "LOWEST()", "BOTTOM()", "SMALLEST()"]
      ],
      correctAnswers: [0, 0, 0, 0, 0],
      category: "AGGREGATE"
    }
  ],
  
  GROUP_BY: [
    {
      template: "When using GROUP BY, what clause is used to {action}?",
      actions: ["filter grouped results", "apply conditions to groups", "restrict aggregated data"],
      options: ["WHERE", "HAVING", "FILTER", "GROUP WHERE"],
      correctAnswer: 1,
      category: "GROUP BY"
    }
  ],
  
  ORDER_BY: [
    {
      template: "How do you {action} in SQL?",
      actions: [
        "sort results in ascending order",
        "sort results in descending order",
        "order results alphabetically",
        "arrange results by a specific column"
      ],
      options: [
        ["ORDER BY column ASC", "SORT BY column ASC", "ORDER BY column", "SORT column ASC"],
        ["ORDER BY column DESC", "SORT BY column DESC", "ORDER BY column REVERSE", "SORT column DESC"],
        ["ORDER BY column", "SORT BY column", "ALPHABETIZE column", "ARRANGE BY column"],
        ["ORDER BY column", "SORT BY column", "ARRANGE column", "ORGANIZE BY column"]
      ],
      correctAnswers: [2, 0, 0, 0],
      category: "ORDER BY"
    }
  ],
  
  SUBQUERIES: [
    {
      template: "What is a subquery that {description} called?",
      descriptions: [
        "returns a single value",
        "returns multiple rows and columns",
        "returns a single column with multiple rows",
        "is used in the FROM clause"
      ],
      options: [
        ["Scalar subquery", "Single subquery", "Value subquery", "Atomic subquery"],
        ["Table subquery", "Multi-row subquery", "Complex subquery", "Matrix subquery"],
        ["Column subquery", "List subquery", "Array subquery", "Vector subquery"],
        ["Derived table", "Inline view", "Table subquery", "Temporary table"]
      ],
      correctAnswers: [0, 0, 0, 2],
      category: "SUBQUERIES"
    }
  ],
  
  WINDOW_FUNCTIONS: [
    {
      template: "Which window function would you use to {action}?",
      actions: [
        "assign a unique rank to each row within a partition",
        "assign the same rank to rows with equal values",
        "assign consecutive ranks without gaps",
        "divide rows into a specified number of groups"
      ],
      options: [
        ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"],
        ["RANK()", "ROW_NUMBER()", "DENSE_RANK()", "NTILE()"],
        ["DENSE_RANK()", "RANK()", "ROW_NUMBER()", "NTILE()"],
        ["NTILE()", "ROW_NUMBER()", "RANK()", "DENSE_RANK()"]
      ],
      correctAnswers: [0, 0, 0, 0],
      category: "WINDOW FUNCTIONS"
    }
  ]
};

// Difficulty mappings
const difficultyMappings = {
  beginner: ['SELECT', 'WHERE', 'ORDER_BY'],
  intermediate: ['JOIN', 'AGGREGATE', 'GROUP_BY'],
  advanced: ['SUBQUERIES', 'WINDOW_FUNCTIONS'],
  expert: ['SUBQUERIES', 'WINDOW_FUNCTIONS', 'JOIN', 'AGGREGATE']
};

// SQL examples for different concepts
const sqlExamples = {
  SELECT: [
    "SELECT * FROM customers;",
    "SELECT name, email FROM users;",
    "SELECT DISTINCT category FROM products;"
  ],
  WHERE: [
    "SELECT * FROM products WHERE price > 50;",
    "SELECT * FROM employees WHERE department = 'IT';",
    "SELECT * FROM orders WHERE order_date >= '2023-01-01';"
  ],
  JOIN: [
    "SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;",
    "SELECT * FROM employees e LEFT JOIN departments d ON e.dept_id = d.id;",
    "SELECT * FROM products p FULL OUTER JOIN categories cat ON p.category_id = cat.id;"
  ],
  AGGREGATE: [
    "SELECT AVG(price) FROM products;",
    "SELECT COUNT(*) FROM orders;",
    "SELECT MAX(salary) FROM employees;"
  ],
  GROUP_BY: [
    "SELECT category, AVG(price) FROM products GROUP BY category;",
    "SELECT department, COUNT(*) FROM employees GROUP BY department;",
    "SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;"
  ],
  ORDER_BY: [
    "SELECT * FROM employees ORDER BY last_name;",
    "SELECT * FROM products ORDER BY price DESC;",
    "SELECT * FROM orders ORDER BY order_date ASC, total_amount DESC;"
  ],
  SUBQUERIES: [
    "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);",
    "SELECT * FROM (SELECT category, AVG(price) as avg_price FROM products GROUP BY category) as temp;",
    "SELECT name FROM employees WHERE id IN (SELECT employee_id FROM sales);"
  ],
  WINDOW_FUNCTIONS: [
    "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rank FROM employees;",
    "SELECT name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank FROM employees;",
    "SELECT name, salary, LAG(salary) OVER (ORDER BY hire_date) as prev_salary FROM employees;"
  ]
};

// Explanations for different concepts
const explanations = {
  SELECT: "SELECT is the primary SQL command used to retrieve data from database tables. It allows you to specify which columns and rows you want to see.",
  WHERE: "The WHERE clause is used to filter records based on specified conditions. It comes after the FROM clause in a SELECT statement.",
  JOIN: "JOIN clauses are used to combine rows from two or more tables based on a related column between them.",
  AGGREGATE: "Aggregate functions perform calculations on a set of values and return a single value. Common functions include COUNT, SUM, AVG, MAX, and MIN.",
  GROUP_BY: "GROUP BY is used to group rows that have the same values in specified columns into summary rows.",
  ORDER_BY: "ORDER BY is used to sort the result set in ascending or descending order based on specified columns.",
  SUBQUERIES: "A subquery is a query nested inside another query. It can be used in SELECT, FROM, WHERE, and HAVING clauses.",
  WINDOW_FUNCTIONS: "Window functions perform calculations across a set of table rows that are somehow related to the current row."
};

// Utility functions
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const replacePlaceholders = (template, replacements) => {
  let result = template;
  Object.keys(replacements).forEach(key => {
    result = result.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
  });
  return result;
};

// Main question generation function
export const generateQuestion = (difficulty = 'beginner', category = null) => {
  // Determine available categories for the difficulty
  const availableCategories = category ? [category] : difficultyMappings[difficulty];
  const selectedCategory = getRandomElement(availableCategories);
  
  // Get templates for the selected category
  const templates = questionTemplates[selectedCategory];
  if (!templates) {
    throw new Error(`No templates found for category: ${selectedCategory}`);
  }
  
  // Select a random template
  const template = getRandomElement(templates);
  
  // Generate question based on template type
  let question, options, correctAnswer;
  
  if (template.template.includes('{action}')) {
    const action = getRandomElement(template.actions);
    question = replacePlaceholders(template.template, { action });
    options = template.options;
    correctAnswer = template.correctAnswer;
  } else if (template.template.includes('{table}')) {
    const table = getRandomElement(template.tables);
    const action = getRandomElement(template.actions);
    question = replacePlaceholders(template.template, { action, table });
    options = template.options.map(opt => replacePlaceholders(opt, { table }));
    correctAnswer = template.correctAnswer;
  } else if (template.template.includes('{condition}')) {
    const condition = getRandomElement(template.conditions);
    const action = getRandomElement(template.actions);
    question = replacePlaceholders(template.template, { action, condition });
    options = template.options.map(opt => replacePlaceholders(opt, { condition }));
    correctAnswer = template.correctAnswer;
  } else if (template.template.includes('{description}')) {
    const descriptionIndex = Math.floor(Math.random() * template.descriptions.length);
    const description = template.descriptions[descriptionIndex];
    question = replacePlaceholders(template.template, { description });
    options = template.options;
    correctAnswer = template.correctAnswers[descriptionIndex];
  } else {
    // Handle array of options for different actions
    const actionIndex = Math.floor(Math.random() * template.actions.length);
    const action = template.actions[actionIndex];
    question = replacePlaceholders(template.template, { action });
    options = template.options[actionIndex];
    correctAnswer = template.correctAnswers[actionIndex];
  }
  
  // Generate unique ID
  const id = Date.now() + Math.random();
  
  // Get SQL example and explanation
  const sqlExample = getRandomElement(sqlExamples[selectedCategory] || []);
  const explanation = explanations[selectedCategory];
  
  return {
    id: Math.floor(id),
    difficulty,
    category: selectedCategory,
    question,
    options,
    correctAnswer,
    explanation,
    sqlExample
  };
};

// Generate multiple questions
export const generateQuestions = (count = 10, difficulty = 'beginner', categories = null) => {
  const questions = [];
  const usedQuestions = new Set();
  
  for (let i = 0; i < count; i++) {
    let question;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
      question = generateQuestion(difficulty, categories ? getRandomElement(categories) : null);
      attempts++;
    } while (usedQuestions.has(question.question) && attempts < maxAttempts);
    
    usedQuestions.add(question.question);
    questions.push(question);
  }
  
  return questions;
};

// AI API integration (optional)
export const generateQuestionWithAI = async (prompt, apiKey = null) => {
  if (!apiKey) {
    console.warn('No API key provided for AI generation. Using local templates instead.');
    return generateQuestion();
  }
  
  try {
    // Example OpenAI API call (you would need to implement this based on your preferred AI service)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SQL instructor. Generate a multiple choice SQL quiz question with 4 options, one correct answer, an explanation, and a SQL example. Return the response as JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('AI generation failed:', error);
    return generateQuestion(); // Fallback to local generation
  }
};

// Question validation
export const validateQuestion = (question) => {
  const required = ['id', 'difficulty', 'category', 'question', 'options', 'correctAnswer', 'explanation', 'sqlExample'];
  
  for (const field of required) {
    if (!question[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  if (!Array.isArray(question.options) || question.options.length !== 4) {
    return { valid: false, error: 'Question must have exactly 4 options' };
  }
  
  if (typeof question.correctAnswer !== 'number' || question.correctAnswer < 0 || question.correctAnswer > 3) {
    return { valid: false, error: 'Correct answer must be a number between 0 and 3' };
  }
  
  return { valid: true };
};

// Export configuration
export const aiConfig = {
  maxQuestionsPerGeneration: 50,
  supportedDifficulties: ['beginner', 'intermediate', 'advanced', 'expert'],
  supportedCategories: Object.keys(questionTemplates),
  defaultQuestionCount: 10
};