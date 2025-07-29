# 🎯 Webflow Integration Guide

## 📋 **Quick Setup**

### **Step 1: Deploy to GitHub Pages**
1. Go to: `https://github.com/damunoz32/sql-quiz-app/settings/pages`
2. Set Source to: **"Deploy from a branch"**
3. Select: **"main"** branch, **"/docs"** folder
4. Click **"Save"**

Your app will be live at: `https://damunoz32.github.io/sql-quiz-app`

### **Step 2: Embed in Webflow (Responsive Solution)**

1. **In Webflow Designer:**
   - Add an **Embed** element to your page
   - Set width to **100%** and height to **800px** (we'll make it responsive)
   - Paste this responsive code:

```html
<!-- Responsive SQL Quiz App Embed -->
<div id="sql-quiz-container" style="width: 100%; max-width: 1200px; margin: 0 auto;">
  <iframe 
    id="sql-quiz-iframe"
    src="https://damunoz32.github.io/sql-quiz-app" 
    width="100%" 
    height="800px" 
    frameborder="0" 
    scrolling="auto"
    style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: height 0.3s ease;"
    title="SQL Quiz Master"
  ></iframe>
</div>

<script>
// Responsive iframe height management
(function() {
  const iframe = document.getElementById('sql-quiz-iframe');
  const container = document.getElementById('sql-quiz-container');
  
  // Function to set responsive height based on viewport
  function setResponsiveHeight() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Mobile devices (portrait)
    if (viewportWidth <= 768 && viewportHeight > viewportWidth) {
      iframe.style.height = '600px';
    }
    // Mobile devices (landscape)
    else if (viewportWidth <= 768 && viewportHeight <= viewportWidth) {
      iframe.style.height = '500px';
    }
    // Tablet devices
    else if (viewportWidth <= 1024) {
      iframe.style.height = '700px';
    }
    // Desktop devices
    else {
      iframe.style.height = '800px';
    }
  }
  
  // Set initial height
  setResponsiveHeight();
  
  // Update height on window resize
  window.addEventListener('resize', function() {
    setResponsiveHeight();
  });
  
  // Optional: Dynamic height adjustment based on content
  // This works if the iframe content is from the same domain
  iframe.onload = function() {
    try {
      // Try to get the actual content height
      const contentHeight = iframe.contentWindow.document.body.scrollHeight;
      if (contentHeight > 0) {
        // Add some buffer space
        const newHeight = Math.max(contentHeight + 50, parseInt(iframe.style.height));
        iframe.style.height = newHeight + 'px';
      }
    } catch(e) {
      // Cross-origin restrictions - fall back to responsive heights
      console.log('Using responsive height fallback');
    }
  };
})();
</script>

<!-- CSS for additional responsive styling -->
<style>
#sql-quiz-container {
  padding: 0 20px;
}

@media (max-width: 768px) {
  #sql-quiz-container {
    padding: 0 10px;
  }
  
  #sql-quiz-iframe {
    border-radius: 8px !important;
  }
}

@media (max-width: 480px) {
  #sql-quiz-container {
    padding: 0 5px;
  }
  
  #sql-quiz-iframe {
    border-radius: 6px !important;
  }
}
</style>

### **Alternative: Simple Responsive Embed**

If you prefer a simpler approach, use this code:

```html
<iframe 
  src="https://damunoz32.github.io/sql-quiz-app" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  scrolling="auto"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); min-height: 600px;"
  title="SQL Quiz Master"
></iframe>

<style>
@media (max-width: 768px) {
  iframe {
    height: 600px !important;
    border-radius: 8px !important;
  }
}

@media (max-width: 480px) {
  iframe {
    height: 500px !important;
    border-radius: 6px !important;
  }
}
</style>

## 🎨 **Customize Colors to Match Your Webflow Site**

### **How to Find Your Webflow Colors:**
1. **In Webflow Designer:**
   - Right-click on any element with your brand color
   - Select "Inspect Element" or use the color picker
   - Copy the hex color code (e.g., `#FF6B35`)

### **Update Colors in the React App:**

1. **Open:** `src/styles/App.css`
2. **Find the `:root` section** (around line 10)
3. **Update these variables:**

```css
:root {
  /* PRIMARY COLORS - Update these to match your Webflow site */
  --primary-color: #YOUR_MAIN_COLOR;           /* Main brand color */
  --primary-gradient: linear-gradient(135deg, #YOUR_MAIN_COLOR 0%, #YOUR_SECONDARY_COLOR 100%);
  --secondary-color: #YOUR_SECONDARY_COLOR;     /* Secondary brand color */
  
  /* TEXT COLORS - Match your Webflow text colors */
  --text-primary: #YOUR_TEXT_COLOR;             /* Main text color */
  --text-secondary: #YOUR_SECONDARY_TEXT;       /* Secondary text color */
  
  /* BACKGROUND COLORS */
  --background-primary: #YOUR_BACKGROUND;       /* Main background */
  --border-color: rgba(YOUR_MAIN_COLOR_RGB, 0.2); /* Border color */
}
```

### **Example Color Schemes:**

#### **Modern Blue Theme:**
```css
--primary-color: #3B82F6;
--secondary-color: #1E40AF;
--text-primary: #1F2937;
--text-secondary: #6B7280;
```

#### **Warm Orange Theme:**
```css
--primary-color: #FF6B35;
--secondary-color: #F7931E;
--text-primary: #2D3748;
--text-secondary: #718096;
```

#### **Professional Dark Theme:**
```css
--primary-color: #6366F1;
--secondary-color: #8B5CF6;
--text-primary: #F7FAFC;
--text-secondary: #A0AEC0;
--background-primary: #1A202C;
```

## 🔧 **Advanced Customization**

### **Update Styled Components:**

If you want to change specific component colors, update these files:

1. **Navigation colors:** `src/components/Navigation.js`
2. **Quiz interface colors:** `src/components/QuizInterface.js`
3. **Database viewer colors:** `src/components/DatabaseViewer.js`

### **Font Matching:**

To match your Webflow fonts:

1. **Find your Webflow font** in the Designer
2. **Update the font-family** in `src/styles/App.css`:

```css
body {
  font-family: 'YOUR_WEBFLOW_FONT', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### **Border Radius Matching:**

To match your Webflow border radius:

```css
:root {
  --border-radius-small: 4px;    /* Match your small elements */
  --border-radius-medium: 8px;   /* Match your buttons */
  --border-radius-large: 12px;   /* Match your cards */
  --border-radius-xl: 16px;      /* Match your containers */
}
```

## 📱 **Responsive Design**

The app is already responsive, but you can adjust the iframe height:

```html
<!-- Mobile-friendly height -->
<iframe 
  src="https://damunoz32.github.io/sql-quiz-app" 
  width="100%" 
  height="600px" 
  frameborder="0" 
  scrolling="no"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
  title="SQL Quiz Master"
></iframe>
```

## 🎨 **Premium Visual Enhancement**

### **Stunning Gradient Embed with Controlled Height**

```html
<!-- Stunning SQL Quiz App Embed -->
<div class="sql-quiz-stunning-wrapper">
  <div class="sql-quiz-stunning-container">
    <div class="sql-quiz-header">
      <div class="sql-quiz-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7V4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 7V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="sql-quiz-title">
        <h3>SQL Quiz Master</h3>
        <p>Master database queries through interactive challenges</p>
      </div>
      <div class="sql-quiz-badge">Live Demo</div>
    </div>
    
    <div class="sql-quiz-iframe-container">
      <iframe 
        id="sql-quiz-stunning-iframe"
        src="https://damunoz32.github.io/sql-quiz-app" 
        width="100%" 
        height="600px" 
        frameborder="0" 
        scrolling="auto"
        title="SQL Quiz Master"
      ></iframe>
    </div>
    
    <div class="sql-quiz-footer">
      <div class="tech-stack">
        <span class="tech-item">React</span>
        <span class="tech-item">SQL</span>
        <span class="tech-item">JavaScript</span>
        <span class="tech-item">Interactive</span>
      </div>
    </div>
  </div>
</div>

<style>
.sql-quiz-stunning-wrapper {
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 20px;
  margin: 40px 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.sql-quiz-stunning-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.sql-quiz-stunning-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 30px;
  position: relative;
  z-index: 1;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.sql-quiz-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
  position: relative;
}

.sql-quiz-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 12px;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.sql-quiz-title h3 {
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sql-quiz-title p {
  color: #666;
  margin: 5px 0 0 0;
  font-size: 14px;
  font-family: 'Afacad Flux', sans-serif;
}

.sql-quiz-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
}

.sql-quiz-iframe-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.1);
  margin-bottom: 20px;
}

#sql-quiz-stunning-iframe {
  border: none;
  background: white;
  transition: all 0.3s ease;
  display: block;
}

.sql-quiz-footer {
  display: flex;
  justify-content: center;
}

.tech-stack {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.tech-item {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

/* Responsive Design - Controlled Heights */
@media (max-width: 1024px) {
  .sql-quiz-stunning-wrapper {
    padding: 30px 15px;
    margin: 30px 0;
  }
  
  .sql-quiz-stunning-container {
    padding: 25px;
  }
  
  #sql-quiz-stunning-iframe {
    height: 550px !important;
  }
}

@media (max-width: 768px) {
  .sql-quiz-stunning-wrapper {
    padding: 20px 10px;
    margin: 20px 0;
  }
  
  .sql-quiz-stunning-container {
    padding: 20px;
  }
  
  .sql-quiz-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .sql-quiz-badge {
    position: static;
    align-self: center;
  }
  
  #sql-quiz-stunning-iframe {
    height: 500px !important;
  }
  
  .sql-quiz-title h3 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .sql-quiz-stunning-wrapper {
    padding: 15px 5px;
  }
  
  .sql-quiz-stunning-container {
    padding: 15px;
  }
  
  #sql-quiz-stunning-iframe {
    height: 450px !important;
  }
  
  .sql-quiz-title h3 {
    font-size: 18px;
  }
  
  .tech-stack {
    gap: 8px;
  }
  
  .tech-item {
    padding: 6px 12px;
    font-size: 11px;
  }
}
</style>

<script>
// Controlled responsive iframe management - No footer overlap
(function() {
  const iframe = document.getElementById('sql-quiz-stunning-iframe');
  
  function setResponsiveHeight() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe height that won't overlap footer
    // Reserve more space for page content, navigation, and footer
    const safeHeight = viewportHeight - 300; // More conservative space reservation
    
    if (viewportWidth <= 480px) {
      iframe.style.height = Math.min(450, safeHeight) + 'px';
    } else if (viewportWidth <= 768) {
      iframe.style.height = Math.min(500, safeHeight) + 'px';
    } else if (viewportWidth <= 1024) {
      iframe.style.height = Math.min(550, safeHeight) + 'px';
    } else {
      iframe.style.height = Math.min(600, safeHeight) + 'px';
    }
  }
  
  setResponsiveHeight();
  window.addEventListener('resize', setResponsiveHeight);
  
  // Optional: Dynamic height adjustment based on content
  // This works if the iframe content is from the same domain
  iframe.onload = function() {
    try {
      // Try to get the actual content height
      const contentHeight = iframe.contentWindow.document.body.scrollHeight;
      if (contentHeight > 0) {
        // Add some buffer space
        const newHeight = Math.max(contentHeight + 50, parseInt(iframe.style.height));
        iframe.style.height = newHeight + 'px';
      }
    } catch(e) {
      // Cross-origin restrictions - fall back to responsive heights
      console.log('Using responsive height fallback');
    }
  };
})();
</script>

## 🎨 **Professional MVP Embed**

### **Clean, Functional SQL Quiz Embed - Full Height**

```html
<!-- Professional SQL Quiz App Embed - Full Height -->
<div class="sql-quiz-mvp-wrapper">
  <div class="sql-quiz-mvp-container">
    <div class="sql-quiz-header">
      <h3>SQL Quiz Master</h3>
      <p>Interactive database query practice</p>
    </div>
    
    <div class="sql-quiz-iframe-container">
      <iframe 
        id="sql-quiz-mvp-iframe"
        src="https://damunoz32.github.io/sql-quiz-app" 
        width="100%" 
        height="100%" 
        frameborder="0" 
        scrolling="no"
        title="SQL Quiz Master"
      ></iframe>
    </div>
  </div>
</div>

<style>
.sql-quiz-mvp-wrapper {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid #e9ecef;
  height: calc(100vh - 200px); /* Full viewport height minus space for header/footer */
  min-height: 600px; /* Minimum height to ensure usability */
  max-height: 800px; /* Maximum height to prevent excessive expansion */
}

.sql-quiz-mvp-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sql-quiz-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0; /* Don't shrink the header */
}

.sql-quiz-header h3 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Jost', sans-serif;
}

.sql-quiz-header p {
  color: #666;
  margin: 0;
  font-size: 14px;
  font-family: 'Afacad Flux', sans-serif;
}

.sql-quiz-iframe-container {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  flex: 1; /* Take up remaining space */
  min-height: 0; /* Allow container to shrink */
}

#sql-quiz-mvp-iframe {
  border: none;
  background: white;
  display: block;
  width: 100%;
  height: 100%;
}

/* Responsive Design - Full Height MVP */
@media (max-width: 1024px) {
  .sql-quiz-mvp-wrapper {
    padding: 15px;
    margin: 15px 0;
    height: calc(100vh - 180px);
    min-height: 550px;
    max-height: 750px;
  }
  
  .sql-quiz-mvp-container {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .sql-quiz-mvp-wrapper {
    padding: 10px;
    margin: 10px 0;
    height: calc(100vh - 160px);
    min-height: 500px;
    max-height: 700px;
  }
  
  .sql-quiz-mvp-container {
    padding: 12px;
  }
  
  .sql-quiz-header h3 {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .sql-quiz-mvp-wrapper {
    padding: 8px;
    height: calc(100vh - 140px);
    min-height: 450px;
    max-height: 650px;
  }
  
  .sql-quiz-mvp-container {
    padding: 10px;
  }
  
  .sql-quiz-header h3 {
    font-size: 16px;
  }
}

/* Ensure the wrapper doesn't exceed viewport */
@media (max-height: 600px) {
  .sql-quiz-mvp-wrapper {
    height: calc(100vh - 120px);
    min-height: 400px;
    max-height: 500px;
  }
}
</style>

<script>
// Full height responsive iframe management - MVP
(function() {
  const iframe = document.getElementById('sql-quiz-mvp-iframe');
  const wrapper = document.querySelector('.sql-quiz-mvp-wrapper');
  
  function setResponsiveHeight() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate available height (reserve space for page elements)
    const reservedSpace = 200; // Space for header, footer, navigation
    const availableHeight = viewportHeight - reservedSpace;
    
    // Set wrapper height based on viewport
    if (viewportWidth <= 480px) {
      wrapper.style.height = Math.min(Math.max(availableHeight, 450), 650) + 'px';
    } else if (viewportWidth <= 768) {
      wrapper.style.height = Math.min(Math.max(availableHeight, 500), 700) + 'px';
    } else if (viewportWidth <= 1024) {
      wrapper.style.height = Math.min(Math.max(availableHeight, 550), 750) + 'px';
    } else {
      wrapper.style.height = Math.min(Math.max(availableHeight, 600), 800) + 'px';
    }
  }
  
  setResponsiveHeight();
  window.addEventListener('resize', setResponsiveHeight);
  
  // Ensure iframe loads properly
  iframe.onload = function() {
    iframe.style.opacity = '1';
  };
  
  // Initial loading state
  iframe.style.opacity = '0.9';
  iframe.style.transition = 'opacity 0.3s ease';
})();
</script>

## 🎨 **Dynamic Height Embed - Full App Interface**

### **Auto-Sizing SQL Quiz Embed - No Constraints**

```html
<!-- Dynamic Height SQL Quiz App Embed -->
<div class="sql-quiz-dynamic-wrapper">
  <div class="sql-quiz-dynamic-container">
    <div class="sql-quiz-header">
      <h3>SQL Quiz Master</h3>
      <p>Interactive database query practice</p>
    </div>
    
    <div class="sql-quiz-iframe-container">
      <iframe 
        id="sql-quiz-dynamic-iframe"
        src="https://damunoz32.github.io/sql-quiz-app" 
        width="100%" 
        height="800px" 
        frameborder="0" 
        scrolling="no"
        title="SQL Quiz Master"
      ></iframe>
    </div>
  </div>
</div>

<style>
.sql-quiz-dynamic-wrapper {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid #e9ecef;
}

.sql-quiz-dynamic-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sql-quiz-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.sql-quiz-header h3 {
  color: #333;
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Jost', sans-serif;
}

.sql-quiz-header p {
  color: #666;
  margin: 0;
  font-size: 14px;
  font-family: 'Afacad Flux', sans-serif;
}

.sql-quiz-iframe-container {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

#sql-quiz-dynamic-iframe {
  border: none;
  background: white;
  display: block;
  width: 100%;
  transition: height 0.3s ease;
}

/* Responsive Design - Dynamic Height */
@media (max-width: 1024px) {
  .sql-quiz-dynamic-wrapper {
    padding: 15px;
    margin: 15px 0;
  }
  
  .sql-quiz-dynamic-container {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .sql-quiz-dynamic-wrapper {
    padding: 10px;
    margin: 10px 0;
  }
  
  .sql-quiz-dynamic-container {
    padding: 12px;
  }
  
  .sql-quiz-header h3 {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .sql-quiz-dynamic-wrapper {
    padding: 8px;
  }
  
  .sql-quiz-dynamic-container {
    padding: 10px;
  }
  
  .sql-quiz-header h3 {
    font-size: 16px;
  }
}
</style>

<script>
// Dynamic iframe height management - Auto-size to content
(function() {
  const iframe = document.getElementById('sql-quiz-dynamic-iframe');
  let resizeObserver;
  let messageListener;
  
  function setIframeHeight(height) {
    if (height && height > 0) {
      // Add some buffer space for better appearance
      const adjustedHeight = height + 50;
      iframe.style.height = adjustedHeight + 'px';
      console.log('Iframe height set to:', adjustedHeight + 'px');
    }
  }
  
  function handleMessage(event) {
    // Only accept messages from our iframe
    if (event.origin !== 'https://damunoz32.github.io') {
      return;
    }
    
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'RESIZE' && data.height) {
        setIframeHeight(data.height);
      }
    } catch (e) {
      console.log('Message parsing error:', e);
    }
  }
  
  function setupMessageListener() {
    messageListener = handleMessage;
    window.addEventListener('message', messageListener);
  }
  
  function removeMessageListener() {
    if (messageListener) {
      window.removeEventListener('message', messageListener);
    }
  }
  
  // Initialize
  setupMessageListener();
  
  // Fallback: Try to get height after iframe loads
  iframe.onload = function() {
    console.log('Iframe loaded, attempting to get content height...');
    
    // Wait a bit for content to fully render
    setTimeout(() => {
      try {
        // Try to access iframe content (may fail due to CORS)
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const bodyHeight = iframeDoc.body.scrollHeight;
        
        if (bodyHeight > 0) {
          setIframeHeight(bodyHeight);
        } else {
          // Fallback: Set a reasonable default height
          setIframeHeight(600);
        }
      } catch (e) {
        console.log('CORS restriction - using fallback height');
        // CORS restriction - set a reasonable default
        setIframeHeight(600);
      }
    }, 1000);
  };
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', removeMessageListener);
})();
</script>

## 🎯 **Key Features:**

✅ **Dynamic height adjustment** - iframe automatically sizes to content  
✅ **No height constraints** - expands to show full app interface  
✅ **No internal scrolling** - entire app visible at once  
✅ **Message-based communication** - iframe can request height changes  
✅ **Fallback sizing** - reasonable defaults if communication fails  
✅ **Responsive design** - works on all screen sizes  
✅ **Clean, professional design** - matches your website aesthetic  

## 🚀 **How It Works:**

1. **Iframe loads** with initial height
2. **App sends height message** to parent page
3. **Parent adjusts iframe height** to match content
4. **No scrolling needed** - full app interface visible
5. **Fallback protection** - reasonable defaults if communication fails

## 🚀 **Implementation:**

1. **Copy the dynamic height code above**
2. **Replace your current embed** in Webflow
3. **Test that iframe expands** to show full app
4. **Verify no scrolling** is needed
5. **Publish and enjoy** your fully visible SQL quiz!

This solution will make the iframe automatically size itself to show the complete app interface without any scrolling or height constraints.

## 🎯 **Quick Enhancement Tips**

1. **Choose the design that matches your site's aesthetic**
2. **Test on different devices** to ensure responsiveness
3. **Consider adding loading animations** for better UX
4. **Use consistent color schemes** with your Webflow site
5. **Add subtle hover effects** for interactivity

## 🚀 **Implementation Steps**

1. **Copy your preferred option** from above
2. **Replace the current embed code** in Webflow
3. **Test the responsive behavior** on different devices
4. **Adjust colors** to match your site's palette
5. **Publish and enjoy** your enhanced SQL quiz!

## 🎯 **Pro Tips**

1. **Test on different devices** - The app is responsive
2. **Use Webflow's color picker** to get exact color matches
3. **Consider your brand guidelines** when choosing colors
4. **Test the contrast** for accessibility
5. **Keep the gradient subtle** if your brand is minimal

## 🔗 **Useful Links**

- **Your App:** `https://damunoz32.github.io/sql-quiz-app`
- **GitHub Repo:** `https://github.com/damunoz32/sql-quiz-app`
- **Webflow Site:** `https://dantemunoz.webflow.io`

---

**Need help?** Check the main README.md or contact me for assistance!