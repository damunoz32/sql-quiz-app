# 🎯 Webflow Integration Guide

## 📋 **Quick Setup**

### **Step 1: Deploy to GitHub Pages**
1. Go to: `https://github.com/damunoz32/sql-quiz-app/settings/pages`
2. Set Source to: **"Deploy from a branch"**
3. Select: **"main"** branch, **"/docs"** folder
4. Click **"Save"**

Your app will be live at: `https://damunoz32.github.io/sql-quiz-app`

### **Step 2: Embed in Webflow**
1. **In Webflow Designer:**
   - Add an **Embed** element to your page
   - Set width to **100%** and height to **800px**
   - Paste this code:

```html
<iframe 
  src="https://damunoz32.github.io/sql-quiz-app" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  scrolling="no"
  style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
  title="SQL Quiz Master"
></iframe>
```

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

## 🚀 **Deploy Customized Version**

After making color changes:

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Copy to docs folder:**
   ```bash
   xcopy build\* docs\ /E /I /Y
   ```

3. **Commit and push:**
   ```bash
   git add docs
   git commit -m "Update colors to match Webflow site"
   git push origin main
   ```

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