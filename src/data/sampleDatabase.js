// sampleDatabase.js - Sample E-commerce Database
// This file contains a realistic sample database for users to explore
// It includes tables for customers, products, orders, and categories
// Users can run SQL queries against this data to practice

export const sampleDatabase = {
  // CUSTOMERS TABLE - Contains customer information
  customers: [
    { id: 1, first_name: 'John', last_name: 'Smith', email: 'john.smith@email.com', city: 'New York', state: 'NY', registration_date: '2023-01-15', total_orders: 5 },
    { id: 2, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.j@email.com', city: 'Los Angeles', state: 'CA', registration_date: '2023-02-20', total_orders: 3 },
    { id: 3, first_name: 'Michael', last_name: 'Brown', email: 'mike.brown@email.com', city: 'Chicago', state: 'IL', registration_date: '2023-03-10', total_orders: 8 },
    { id: 4, first_name: 'Emily', last_name: 'Davis', email: 'emily.davis@email.com', city: 'Houston', state: 'TX', registration_date: '2023-01-25', total_orders: 2 },
    { id: 5, first_name: 'David', last_name: 'Wilson', email: 'david.wilson@email.com', city: 'Phoenix', state: 'AZ', registration_date: '2023-04-05', total_orders: 6 },
    { id: 6, first_name: 'Lisa', last_name: 'Anderson', email: 'lisa.anderson@email.com', city: 'Philadelphia', state: 'PA', registration_date: '2023-02-12', total_orders: 4 },
    { id: 7, first_name: 'James', last_name: 'Taylor', email: 'james.taylor@email.com', city: 'San Antonio', state: 'TX', registration_date: '2023-03-18', total_orders: 7 },
    { id: 8, first_name: 'Jennifer', last_name: 'Martinez', email: 'jen.martinez@email.com', city: 'San Diego', state: 'CA', registration_date: '2023-01-30', total_orders: 1 },
    { id: 9, first_name: 'Robert', last_name: 'Garcia', email: 'rob.garcia@email.com', city: 'Dallas', state: 'TX', registration_date: '2023-04-12', total_orders: 9 },
    { id: 10, first_name: 'Amanda', last_name: 'Rodriguez', email: 'amanda.rod@email.com', city: 'San Jose', state: 'CA', registration_date: '2023-02-28', total_orders: 3 }
  ],

  // CATEGORIES TABLE - Product categories
  categories: [
    { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    { id: 2, name: 'Clothing', description: 'Apparel and fashion items' },
    { id: 3, name: 'Home & Garden', description: 'Home improvement and garden supplies' },
    { id: 4, name: 'Books', description: 'Books and educational materials' },
    { id: 5, name: 'Sports', description: 'Sports equipment and athletic gear' },
    { id: 6, name: 'Beauty', description: 'Beauty and personal care products' }
  ],

  // PRODUCTS TABLE - Product information
  products: [
    { id: 1, name: 'Laptop Pro', category_id: 1, price: 1299.99, stock_quantity: 25, description: 'High-performance laptop for professionals' },
    { id: 2, name: 'Wireless Headphones', category_id: 1, price: 199.99, stock_quantity: 50, description: 'Noise-cancelling wireless headphones' },
    { id: 3, name: 'Smartphone X', category_id: 1, price: 899.99, stock_quantity: 30, description: 'Latest smartphone with advanced features' },
    { id: 4, name: 'Men\'s T-Shirt', category_id: 2, price: 24.99, stock_quantity: 100, description: 'Comfortable cotton t-shirt' },
    { id: 5, name: 'Women\'s Jeans', category_id: 2, price: 59.99, stock_quantity: 75, description: 'Stylish denim jeans' },
    { id: 6, name: 'Garden Hose', category_id: 3, price: 39.99, stock_quantity: 40, description: '50-foot heavy-duty garden hose' },
    { id: 7, name: 'Coffee Maker', category_id: 3, price: 89.99, stock_quantity: 20, description: 'Programmable coffee maker' },
    { id: 8, name: 'Programming Book', category_id: 4, price: 49.99, stock_quantity: 60, description: 'Learn SQL and database design' },
    { id: 9, name: 'Yoga Mat', category_id: 5, price: 29.99, stock_quantity: 80, description: 'Non-slip yoga mat' },
    { id: 10, name: 'Face Cream', category_id: 6, price: 34.99, stock_quantity: 45, description: 'Anti-aging face cream' },
    { id: 11, name: 'Tablet Air', category_id: 1, price: 649.99, stock_quantity: 35, description: 'Lightweight tablet for productivity' },
    { id: 12, name: 'Running Shoes', category_id: 5, price: 119.99, stock_quantity: 55, description: 'Comfortable running shoes' }
  ],

  // ORDERS TABLE - Customer orders
  orders: [
    { id: 1, customer_id: 1, order_date: '2023-05-15', total_amount: 1349.98, status: 'completed' },
    { id: 2, customer_id: 2, order_date: '2023-05-16', total_amount: 299.98, status: 'completed' },
    { id: 3, customer_id: 3, order_date: '2023-05-17', total_amount: 959.98, status: 'completed' },
    { id: 4, customer_id: 4, order_date: '2023-05-18', total_amount: 84.98, status: 'completed' },
    { id: 5, customer_id: 5, order_date: '2023-05-19', total_amount: 129.98, status: 'completed' },
    { id: 6, customer_id: 1, order_date: '2023-05-20', total_amount: 199.99, status: 'completed' },
    { id: 7, customer_id: 6, order_date: '2023-05-21', total_amount: 149.97, status: 'completed' },
    { id: 8, customer_id: 7, order_date: '2023-05-22', total_amount: 179.97, status: 'completed' },
    { id: 9, customer_id: 8, order_date: '2023-05-23', total_amount: 34.99, status: 'completed' },
    { id: 10, customer_id: 9, order_date: '2023-05-24', total_amount: 649.99, status: 'completed' },
    { id: 11, customer_id: 10, order_date: '2023-05-25', total_amount: 104.98, status: 'completed' },
    { id: 12, customer_id: 3, order_date: '2023-05-26', total_amount: 89.99, status: 'completed' },
    { id: 13, customer_id: 5, order_date: '2023-05-27', total_amount: 49.99, status: 'completed' },
    { id: 14, customer_id: 7, order_date: '2023-05-28', total_amount: 119.99, status: 'completed' },
    { id: 15, customer_id: 9, order_date: '2023-05-29', total_amount: 899.99, status: 'completed' }
  ],

  // ORDER_ITEMS TABLE - Individual items in each order
  order_items: [
    { id: 1, order_id: 1, product_id: 1, quantity: 1, unit_price: 1299.99 },
    { id: 2, order_id: 1, product_id: 2, quantity: 1, unit_price: 199.99 },
    { id: 3, order_id: 2, product_id: 2, quantity: 1, unit_price: 199.99 },
    { id: 4, order_id: 2, product_id: 3, quantity: 1, unit_price: 899.99 },
    { id: 5, order_id: 3, product_id: 3, quantity: 1, unit_price: 899.99 },
    { id: 6, order_id: 3, product_id: 4, quantity: 2, unit_price: 24.99 },
    { id: 7, order_id: 4, product_id: 4, quantity: 2, unit_price: 24.99 },
    { id: 8, order_id: 4, product_id: 6, quantity: 1, unit_price: 39.99 },
    { id: 9, order_id: 5, product_id: 5, quantity: 1, unit_price: 59.99 },
    { id: 10, order_id: 5, product_id: 9, quantity: 1, unit_price: 29.99 },
    { id: 11, order_id: 5, product_id: 10, quantity: 1, unit_price: 34.99 },
    { id: 12, order_id: 6, product_id: 2, quantity: 1, unit_price: 199.99 },
    { id: 13, order_id: 7, product_id: 5, quantity: 1, unit_price: 59.99 },
    { id: 14, order_id: 7, product_id: 9, quantity: 2, unit_price: 29.99 },
    { id: 15, order_id: 7, product_id: 10, quantity: 1, unit_price: 34.99 },
    { id: 16, order_id: 8, product_id: 7, quantity: 1, unit_price: 89.99 },
    { id: 17, order_id: 8, product_id: 8, quantity: 1, unit_price: 49.99 },
    { id: 18, order_id: 8, product_id: 10, quantity: 1, unit_price: 34.99 },
    { id: 19, order_id: 9, product_id: 10, quantity: 1, unit_price: 34.99 },
    { id: 20, order_id: 10, product_id: 11, quantity: 1, unit_price: 649.99 },
    { id: 21, order_id: 11, product_id: 8, quantity: 1, unit_price: 49.99 },
    { id: 22, order_id: 11, product_id: 9, quantity: 1, unit_price: 29.99 },
    { id: 23, order_id: 11, product_id: 10, quantity: 1, unit_price: 34.99 },
    { id: 24, order_id: 12, product_id: 7, quantity: 1, unit_price: 89.99 },
    { id: 25, order_id: 13, product_id: 8, quantity: 1, unit_price: 49.99 },
    { id: 26, order_id: 14, product_id: 12, quantity: 1, unit_price: 119.99 },
    { id: 27, order_id: 15, product_id: 3, quantity: 1, unit_price: 899.99 }
  ]
};

// Sample SQL queries that users can try
export const sampleQueries = [
  {
    title: 'Basic SELECT',
    description: 'Get all customers from New York',
    query: 'SELECT * FROM customers WHERE city = "New York";',
    difficulty: 'beginner'
  },
  {
    title: 'JOIN Tables',
    description: 'Get customer names with their order totals',
    query: 'SELECT c.first_name, c.last_name, o.total_amount FROM customers c JOIN orders o ON c.id = o.customer_id;',
    difficulty: 'intermediate'
  },
  {
    title: 'Aggregate Functions',
    description: 'Find the average order amount',
    query: 'SELECT AVG(total_amount) as average_order FROM orders;',
    difficulty: 'intermediate'
  },
  {
    title: 'GROUP BY',
    description: 'Count orders by customer',
    query: 'SELECT customer_id, COUNT(*) as order_count FROM orders GROUP BY customer_id;',
    difficulty: 'intermediate'
  },
  {
    title: 'Complex JOIN',
    description: 'Get product names with category names',
    query: 'SELECT p.name as product_name, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id;',
    difficulty: 'intermediate'
  },
  {
    title: 'Subquery',
    description: 'Find customers who spent more than average',
    query: 'SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders));',
    difficulty: 'advanced'
  }
];

// Database schema information
export const databaseSchema = {
  customers: {
    description: 'Customer information and registration details',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Primary key, unique customer identifier' },
      { name: 'first_name', type: 'VARCHAR(50)', description: 'Customer first name' },
      { name: 'last_name', type: 'VARCHAR(50)', description: 'Customer last name' },
      { name: 'email', type: 'VARCHAR(100)', description: 'Customer email address' },
      { name: 'city', type: 'VARCHAR(50)', description: 'Customer city' },
      { name: 'state', type: 'VARCHAR(2)', description: 'Customer state (2-letter code)' },
      { name: 'registration_date', type: 'DATE', description: 'Date customer registered' },
      { name: 'total_orders', type: 'INTEGER', description: 'Total number of orders placed' }
    ]
  },
  categories: {
    description: 'Product categories for organization',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Primary key, unique category identifier' },
      { name: 'name', type: 'VARCHAR(50)', description: 'Category name' },
      { name: 'description', type: 'TEXT', description: 'Category description' }
    ]
  },
  products: {
    description: 'Product catalog with pricing and inventory',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Primary key, unique product identifier' },
      { name: 'name', type: 'VARCHAR(100)', description: 'Product name' },
      { name: 'category_id', type: 'INTEGER', description: 'Foreign key to categories table' },
      { name: 'price', type: 'DECIMAL(10,2)', description: 'Product price' },
      { name: 'stock_quantity', type: 'INTEGER', description: 'Available inventory' },
      { name: 'description', type: 'TEXT', description: 'Product description' }
    ]
  },
  orders: {
    description: 'Customer orders with totals and status',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Primary key, unique order identifier' },
      { name: 'customer_id', type: 'INTEGER', description: 'Foreign key to customers table' },
      { name: 'order_date', type: 'DATE', description: 'Date order was placed' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', description: 'Total order amount' },
      { name: 'status', type: 'VARCHAR(20)', description: 'Order status (completed, pending, etc.)' }
    ]
  },
  order_items: {
    description: 'Individual items within each order',
    columns: [
      { name: 'id', type: 'INTEGER', description: 'Primary key, unique item identifier' },
      { name: 'order_id', type: 'INTEGER', description: 'Foreign key to orders table' },
      { name: 'product_id', type: 'INTEGER', description: 'Foreign key to products table' },
      { name: 'quantity', type: 'INTEGER', description: 'Quantity ordered' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', description: 'Price per unit at time of order' }
    ]
  }
};