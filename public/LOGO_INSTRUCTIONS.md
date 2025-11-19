# How to Add Your Logo

## Steps to Add Logo:

1. **Save your logo image** as `logo.png` (or `logo.jpg`, `logo.svg`)
2. **Place it in this folder**: `public/logo.png`
3. **Update the Navbar component** at line 47 in `src/components/Navbar.jsx`:
   
   Change:
   ```javascript
   src="https://i.imgur.com/placeholder.png"
   ```
   
   To:
   ```javascript
   src="/logo.png"
   ```

## Logo Specifications:
- **Format**: PNG with transparent background (recommended) or JPG/SVG
- **Size**: Minimum 200px height for best quality
- **Aspect Ratio**: Your ornate "W" logo works perfectly as-is
- **File Name**: `logo.png` (or update the src path accordingly)

## Current Theme Colors (Matching Your Logo):
- **Primary (Gold/Bronze)**: #f59e0b, #d97706, #b45309
- **Accent (Forest Green)**: #10b981, #059669, #047857
- **Neutral**: Cream and warm grays

Your entire website theme has been updated to match the elegant gold, green, and cream colors from your ornate logo!
