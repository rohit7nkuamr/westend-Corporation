"""
URL configuration for backend project.
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.admin_site import westend_admin_site
from api.sitemap import sitemap_view

urlpatterns = [
    path('admin/', westend_admin_site.urls),  # Use custom admin site with analytics dashboard
    path('api/', include('api.urls')),
    path('sitemap.xml', sitemap_view, name='sitemap'),  # XML sitemap for SEO
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
