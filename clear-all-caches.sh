#!/bin/bash

echo "🧹 Westend Corporation Chatbot - Complete Cache Clear"
echo "======================================================"
echo ""

echo "🔄 Clearing Backend Caches..."
cd /var/www/westend-Corporation/backend
source venv/bin/activate

# Clear Django cache
python manage.py shell -c "
from django.core.cache import cache
from chatbot.models import CachedResponse
cache.clear()
count = CachedResponse.objects.all().delete()
print(f'✅ Backend: Cleared {count[0]} cached responses')
"

echo ""
echo "🔄 Clearing Frontend Caches..."
cd /var/www/westend-Corporation

# Clear frontend build cache
rm -rf dist/ node_modules/.cache/
echo "✅ Frontend: Cleared build cache"

# Rebuild frontend with new cache-busting filename
npm run build > /dev/null 2>&1

# Force new filename for cache busting
NEW_JS=$(ls dist/assets/index-*.js | grep -v map)
NEW_FILENAME="index-$(date +%s).js"
mv "$NEW_JS" "dist/assets/$NEW_FILENAME"

# Update HTML to reference new file
sed -i "s|index-.*\.js|$NEW_FILENAME|g" dist/index.html

echo "✅ Frontend: Rebuilt with cache-busting ($NEW_FILENAME)"

echo ""
echo "🔄 Restarting Services..."
sudo systemctl restart gunicorn
sudo systemctl reload nginx

echo "✅ Services: Restarted"

echo ""
echo "🎉 Cache clearing complete!"
echo ""
echo "📱 For users: Please refresh your browser with:"
echo "   Chrome/Edge: Ctrl+Shift+R"
echo "   Firefox: Ctrl+F5" 
echo "   Safari: Cmd+Shift+R (Mac)"
echo ""
echo "   Or clear browser data for westendcorporation.in"
echo ""
echo "🚀 Chatbot is now running with improved responses!"
