# AI Question Generator Guide

## Overview

The SQL Quiz App now includes an AI-powered question generator that can create new SQL quiz questions automatically. This feature allows you to expand your quiz database with fresh, relevant questions without manual creation.

## Features

### 🎯 **Local Template Generation**
- Generate questions using predefined templates
- Multiple difficulty levels (Beginner, Intermediate, Advanced, Expert)
- Various SQL categories (SELECT, WHERE, JOIN, AGGREGATE, etc.)
- Instant generation with no API dependencies

### 🤖 **AI-Powered Generation**
- Create custom questions using AI prompts
- Generate context-specific questions
- Advanced question patterns and scenarios
- Integration with external AI services (OpenAI, etc.)

### 📊 **Question Management**
- Preview generated questions before adding
- Validate question structure and content
- Export questions for review
- Add questions directly to your quiz database

## How to Use

### 1. Access the Generator

1. Navigate to the **Generator** tab in the main navigation
2. You'll see the AI Question Generator interface

### 2. Configure Generation Settings

#### Basic Settings:
- **Number of Questions**: Choose how many questions to generate (1-50)
- **Difficulty Level**: Select from Beginner, Intermediate, Advanced, or Expert
- **Category**: Choose specific SQL categories or "All Categories"

#### AI Settings:
- **Use AI Generation**: Toggle to enable AI-powered generation
- **AI Prompt**: Describe the type of question you want (when AI is enabled)

### 3. Generate Questions

#### Local Template Generation:
1. Set your desired settings
2. Keep "Use AI Generation" unchecked
3. Click **"Generate Questions"**
4. Questions will be generated instantly using local templates

#### AI-Powered Generation:
1. Check "Use AI Generation"
2. Enter a detailed prompt describing your desired question
3. Click **"Generate Questions"**
4. The system will create custom questions based on your prompt

### 4. Review and Add Questions

After generation:
- **Preview**: Review each generated question
- **Add to Quiz**: Add questions to your quiz database
- **Clear Results**: Start over with new generation

## Question Categories

### Beginner Level
- **SELECT**: Basic data retrieval commands
- **WHERE**: Filtering and conditions
- **ORDER BY**: Sorting results

### Intermediate Level
- **JOIN**: Table relationships and joins
- **AGGREGATE**: Functions like COUNT, SUM, AVG
- **GROUP BY**: Grouping and aggregation

### Advanced Level
- **SUBQUERIES**: Nested queries and complex logic
- **WINDOW FUNCTIONS**: Advanced analytical functions

### Expert Level
- **PERFORMANCE**: Query optimization
- **TRANSACTIONS**: ACID properties and transaction management
- **ADVANCED FUNCTIONS**: Complex SQL features

## AI Integration

### Current Implementation
The current version uses local templates for generation. For full AI integration:

### OpenAI Integration
To enable OpenAI API integration:

1. **Get API Key**: Sign up at [OpenAI](https://openai.com) and get your API key
2. **Configure**: Add your API key to the environment variables
3. **Use**: Enable AI generation and provide prompts

### Example AI Prompts

#### Basic Questions:
```
"Create a question about SQL JOINs focusing on the difference between INNER JOIN and LEFT JOIN"
```

#### Scenario-Based:
```
"Generate a question about finding the second highest salary using window functions"
```

#### Complex Queries:
```
"Create a question about writing a query to find employees who earn more than their department average"
```

## Technical Implementation

### File Structure
```
src/
├── data/
│   ├── aiQuestionGenerator.js    # Core generation logic
│   └── quizQuestions.js         # Existing questions
├── components/
│   └── QuestionGenerator.js     # UI component
└── App.js                       # Main app integration
```

### Key Functions

#### `generateQuestion(difficulty, category)`
Generates a single question using local templates.

#### `generateQuestions(count, difficulty, categories)`
Generates multiple questions with specified parameters.

#### `generateQuestionWithAI(prompt, apiKey)`
Generates questions using AI API (requires API key).

#### `validateQuestion(question)`
Validates question structure and content.

### Question Structure
```javascript
{
  id: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert',
  category: string,
  question: string,
  options: [string, string, string, string],
  correctAnswer: number, // 0-3
  explanation: string,
  sqlExample: string
}
```

## Customization

### Adding New Templates

1. **Edit `aiQuestionGenerator.js`**
2. **Add new template to `questionTemplates`**:
```javascript
NEW_CATEGORY: [
  {
    template: "Your question template with {placeholders}",
    actions: ["action1", "action2"],
    options: ["option1", "option2", "option3", "option4"],
    correctAnswer: 0,
    category: "NEW_CATEGORY"
  }
]
```

3. **Add to difficulty mappings**:
```javascript
difficultyMappings: {
  beginner: [...existing, 'NEW_CATEGORY'],
  // ... other difficulties
}
```

4. **Add SQL examples and explanations**

### Adding New AI Services

1. **Create new function in `aiQuestionGenerator.js`**:
```javascript
export const generateQuestionWithCustomAI = async (prompt, apiKey) => {
  // Your AI service integration
};
```

2. **Update the QuestionGenerator component** to use your new function

## Best Practices

### Question Generation
- **Variety**: Generate questions across different categories
- **Difficulty Progression**: Start with easier questions and progress
- **Real-world Scenarios**: Use practical examples and contexts
- **Clear Explanations**: Provide detailed explanations for learning

### AI Prompts
- **Be Specific**: Describe exactly what you want
- **Include Context**: Mention difficulty level and category
- **Provide Examples**: Give examples of desired question types
- **Test and Iterate**: Refine prompts based on results

### Quality Control
- **Review Generated Questions**: Always preview before adding
- **Validate Structure**: Ensure questions have proper format
- **Check Accuracy**: Verify SQL examples work correctly
- **Test Difficulty**: Ensure difficulty matches intended level

## Troubleshooting

### Common Issues

#### Questions Not Generating
- Check if all required fields are filled
- Verify difficulty and category selections
- Ensure count is within limits (1-50)

#### AI Generation Failing
- Verify API key is valid and has credits
- Check internet connection
- Review prompt clarity and length

#### Invalid Questions
- Use the validation function to check structure
- Ensure all required fields are present
- Verify correct answer index is valid (0-3)

### Error Messages

#### "No templates found for category"
- Category may not be supported
- Check available categories in `aiConfig.supportedCategories`

#### "Question must have exactly 4 options"
- Generated question has wrong number of options
- Check template configuration

#### "Correct answer must be a number between 0 and 3"
- Correct answer index is invalid
- Verify template configuration

## Future Enhancements

### Planned Features
- **Question Bank Management**: Save and organize generated questions
- **Bulk Import/Export**: Import questions from external sources
- **Advanced AI Models**: Support for multiple AI providers
- **Question Analytics**: Track question performance and difficulty
- **Custom Templates**: User-defined question templates
- **Collaborative Generation**: Share and rate generated questions

### Integration Opportunities
- **Database Integration**: Save questions to external database
- **API Endpoints**: REST API for question management
- **Learning Management Systems**: Integration with LMS platforms
- **Analytics Platforms**: Track learning progress and question effectiveness

## Support

For questions or issues with the AI Question Generator:

1. **Check this guide** for common solutions
2. **Review the code** in `aiQuestionGenerator.js`
3. **Test with different settings** to isolate issues
4. **Check browser console** for error messages

## Contributing

To contribute to the AI Question Generator:

1. **Add new templates** for different SQL concepts
2. **Improve AI integration** with additional providers
3. **Enhance validation** and error handling
4. **Add new question types** and formats
5. **Improve documentation** and examples

---

*This guide covers the AI Question Generator feature. For general app usage, see the main README.md file.*