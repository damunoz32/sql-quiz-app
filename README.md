# SQL Quiz Master 🗄️

An interactive SQL learning application designed to help you practice and master SQL skills through quizzes and hands-on database exploration.

## 🌟 Features

### 📝 Interactive Quiz System
- **Multiple Difficulty Levels**: Beginner to Expert questions
- **Real-time Feedback**: Immediate explanations for each answer
- **Progress Tracking**: Visual progress bar and score tracking
- **Timer**: 5-minute time limit per quiz session
- **Random Questions**: Fresh questions every time you take a quiz

### 🗄️ Database Explorer
- **Sample E-commerce Database**: Realistic data with customers, products, orders, and categories
- **Interactive Query Editor**: Write and execute SQL queries
- **Schema Documentation**: Detailed table structures and relationships
- **Sample Queries**: Pre-built examples to learn from
- **Results Display**: Formatted table view of query results

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Professional transitions and hover effects
- **Accessibility**: Screen reader support and keyboard navigation
- **Dark Code Theme**: Syntax highlighting for SQL queries

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sql-quiz-app.git
   cd sql-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📚 How to Use

### Taking the Quiz
1. Click "📝 Take Quiz" to start
2. Read each question carefully
3. Select your answer from the multiple choice options
4. Click "Submit Answer" to see immediate feedback
5. Review the explanation and SQL example
6. Continue to the next question
7. View your final score and performance

### Exploring the Database
1. Click "🗄️ Explore Database" to access the database viewer
2. **Schema Tab**: View table structures and relationships
3. **Query Tab**: Write and execute custom SQL queries
4. **Sample Queries Tab**: Click any example to load it into the editor

### Sample Queries to Try
```sql
-- Basic SELECT
SELECT * FROM customers WHERE city = 'New York';

-- JOIN Tables
SELECT c.first_name, c.last_name, o.total_amount 
FROM customers c 
JOIN orders o ON c.id = o.customer_id;

-- Aggregate Functions
SELECT AVG(total_amount) as average_order FROM orders;

-- GROUP BY
SELECT customer_id, COUNT(*) as order_count 
FROM orders 
GROUP BY customer_id;
```

## 🏗️ Project Structure

```
sql-quiz-app/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   └── manifest.json      # PWA manifest
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Navigation.js
│   │   ├── QuizInterface.js
│   │   └── DatabaseViewer.js
│   ├── data/             # Data files
│   │   ├── quizQuestions.js
│   │   └── sampleDatabase.js
│   ├── styles/           # CSS files
│   │   └── App.css
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎯 Quiz Categories

The quiz covers various SQL concepts:

- **SELECT Statements**: Basic data retrieval
- **WHERE Clauses**: Filtering data
- **ORDER BY**: Sorting results
- **JOINS**: Combining data from multiple tables
- **Aggregate Functions**: COUNT, AVG, SUM, etc.
- **GROUP BY**: Grouping and summarizing data
- **Subqueries**: Nested queries
- **Window Functions**: Advanced analytics
- **CTEs**: Common Table Expressions
- **Performance Optimization**: Best practices

## 🗄️ Database Schema

The sample database includes:

### Customers Table
- Customer information (name, email, location)
- Registration dates and order history

### Products Table
- Product catalog with prices and inventory
- Category relationships

### Orders Table
- Customer orders with totals and status
- Order dates and completion status

### Categories Table
- Product categories and descriptions

### Order_Items Table
- Individual items within each order
- Quantities and unit prices

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Smooth animations
- **JavaScript ES6+**: Modern JavaScript features
- **CSS3**: Advanced styling and animations
- **HTML5**: Semantic markup

## 🎨 Design Features

- **Glass Morphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Grid**: Adapts to any screen size
- **Interactive Elements**: Hover effects and transitions
- **Color-coded Difficulty**: Visual difficulty indicators
- **Professional Typography**: Inter font family

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **High Contrast Mode**: Adapts to user preferences
- **Reduced Motion**: Respects motion preferences
- **Focus Indicators**: Clear focus states

## 🚀 Deployment

### Deploy to GitHub Pages
1. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/sql-quiz-app"
   ```
2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `build` folder to Netlify
3. Configure custom domain if needed

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dante Munoz**
- GitHub: [@damunoz32](https://github.com/damunoz32)
- Portfolio: [dantemunoz.webflow.io](https://dantemunoz.webflow.io)

## 🙏 Acknowledgments

- React team for the amazing framework
- Styled Components for CSS-in-JS
- Framer Motion for animations
- The SQL community for inspiration

## 📞 Support

If you have questions or need help:
1. Check the documentation above
2. Look at the code comments
3. Open an issue on GitHub
4. Contact the author

---

**Happy SQL Learning! 🎉**