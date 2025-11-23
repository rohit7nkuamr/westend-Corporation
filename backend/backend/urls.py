"""
URL configuration for backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.views_dashboard import admin_dashboard

urlpatterns = [
    path('admin/', admin.site.urls),  # Use default admin site
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),  # Custom dashboard
    path('api/', include('api.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
