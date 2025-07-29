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

### **Stunning Gradient Embed with Full Functionality**

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
        height="800px" 
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

/* Responsive Design - Full Functionality */
@media (max-width: 1024px) {
  .sql-quiz-stunning-wrapper {
    padding: 30px 15px;
    margin: 30px 0;
  }
  
  .sql-quiz-stunning-container {
    padding: 25px;
  }
  
  #sql-quiz-stunning-iframe {
    height: 700px !important;
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
    height: 600px !important;
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
    height: 500px !important;
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
// Enhanced responsive iframe management with full functionality
(function() {
  const iframe = document.getElementById('sql-quiz-stunning-iframe');
  
  function setResponsiveHeight() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate available height (more generous for full functionality)
    const availableHeight = viewportHeight - 150; // Less reserved space
    
    if (viewportWidth <= 480px) {
      iframe.style.height = Math.min(500, availableHeight) + 'px';
    } else if (viewportWidth <= 768) {
      iframe.style.height = Math.min(600, availableHeight) + 'px';
    } else if (viewportWidth <= 1024) {
      iframe.style.height = Math.min(700, availableHeight) + 'px';
    } else {
      iframe.style.height = Math.min(800, availableHeight) + 'px';
    }
  }
  
  setResponsiveHeight();
  window.addEventListener('resize', setResponsiveHeight);
  
  // Enhanced loading animation
  iframe.onload = function() {
    iframe.style.opacity = '1';
    iframe.style.transform = 'scale(1)';
  };
  
  // Initial loading state
  iframe.style.opacity = '0.9';
  iframe.style.transform = 'scale(0.98)';
  iframe.style.transition = 'all 0.4s ease';
})();
</script>

## 🎯 **Key Features:**

✅ **Stunning gradient background** with glass morphism effects  
✅ **Full app functionality** - no height restrictions  
✅ **Professional typography** with gradient text effects  
✅ **Interactive tech stack badges** with hover effects  
✅ **Live Demo badge** for credibility  
✅ **Responsive design** that works on all devices  
✅ **Smooth animations** and loading states  
✅ **Beautiful shadows** and depth effects  

## 🚀 **Implementation:**

1. **Copy the stunning code above**
2. **Replace your current embed** in Webflow
3. **Test the full functionality** - all features accessible!
4. **Publish and enjoy** your impressive SQL quiz!

## 🎨 **Visual Highlights:**

- **Gradient background:** Purple to blue to pink
- **Glass morphism container** with backdrop blur
- **Gradient text** for the title
- **Interactive tech badges** with hover effects
- **Professional shadows** and depth
- **Subtle texture overlay** for visual interest

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