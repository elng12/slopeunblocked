#!/bin/bash

# Slope Unblocked Deployment Script
# This script helps deploy the project to various hosting platforms

echo "🚀 Slope Unblocked Deployment Script"
echo "======================================"

# Check if icons directory exists and has files
if [ ! -d "icons" ] || [ -z "$(ls -A icons)" ]; then
    echo "⚠️  Warning: Icons directory is empty!"
    echo "📝 Please generate icons using generate-icons.html before deployment"
    echo ""
    echo "Steps to generate icons:"
    echo "1. Open generate-icons.html in your browser"
    echo "2. Click 'Generate Icons' button"
    echo "3. Download all generated icon files"
    echo "4. Place them in the icons/ directory"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for required files
echo "🔍 Checking required files..."
required_files=("index.html" "manifest.json" "sw.js" "README.md")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "❌ Missing required files:"
    printf '%s\n' "${missing_files[@]}"
    exit 1
fi

echo "✅ All required files present"

# Validate HTML
echo "🔍 Validating HTML structure..."
if command -v tidy &> /dev/null; then
    tidy -q -e index.html
    if [ $? -eq 0 ]; then
        echo "✅ HTML validation passed"
    else
        echo "⚠️  HTML validation warnings (check manually)"
    fi
else
    echo "ℹ️  HTML Tidy not found, skipping validation"
fi

# Check for analytics ID
if grep -q "GA_MEASUREMENT_ID" index.html; then
    echo "⚠️  Remember to replace GA_MEASUREMENT_ID with your actual Google Analytics ID"
fi

# Display deployment options
echo ""
echo "📦 Deployment Options:"
echo "======================"
echo ""
echo "1. 🌐 Netlify:"
echo "   - Drag and drop the entire project folder to Netlify"
echo "   - Or connect your Git repository"
echo "   - netlify.toml is already configured"
echo ""
echo "2. 🔥 Firebase Hosting:"
echo "   - Run: firebase init hosting"
echo "   - Set public directory to: ."
echo "   - Configure as single-page app: No"
echo "   - Run: firebase deploy"
echo ""
echo "3. 📄 GitHub Pages:"
echo "   - Push to GitHub repository"
echo "   - Enable GitHub Pages in repository settings"
echo "   - Set source to main branch"
echo ""
echo "4. ⚡ Vercel:"
echo "   - Connect your Git repository to Vercel"
echo "   - No additional configuration needed"
echo ""
echo "5. 🐳 Docker:"
echo "   - Use nginx:alpine base image"
echo "   - Copy files to /usr/share/nginx/html/"
echo ""
echo "6. 🖥️  Traditional Web Hosting:"
echo "   - Upload all files via FTP/SFTP"
echo "   - .htaccess is configured for Apache servers"
echo ""

# Pre-deployment checklist
echo "📋 Pre-deployment Checklist:"
echo "============================"
echo "□ Icons generated and placed in icons/ directory"
echo "□ Google Analytics ID updated (if using analytics)"
echo "□ Domain name updated in manifest.json and meta tags"
echo "□ HTTPS certificate configured on hosting platform"
echo "□ Service Worker tested in production environment"
echo "□ PWA installation tested on mobile devices"
echo ""

echo "🎉 Ready for deployment!"
echo "📚 See README.md for detailed deployment instructions"