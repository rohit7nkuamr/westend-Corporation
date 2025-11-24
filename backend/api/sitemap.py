from django.http import HttpResponse
from django.urls import reverse
from .models import Product, Vertical
from django.utils import timezone


def sitemap_view(request):
    """Generate XML sitemap for search engines"""
    
    # Get all active products
    products = Product.objects.filter(is_active=True)
    verticals = Vertical.objects.filter(is_active=True)
    
    sitemap_xml = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage -->
    <url>
        <loc>https://westendcorporation.in/</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Products Page -->
    <url>
        <loc>https://westendcorporation.in/products</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    
    <!-- About Page -->
    <url>
        <loc>https://westendcorporation.in/about</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <!-- Contact Page -->
    <url>
        <loc>https://westendcorporation.in/contact</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    
'''.format(lastmod=timezone.now().strftime('%Y-%m-%d'))
    
    # Add all product URLs
    for product in products:
        sitemap_xml += f'''    <!-- Product: {product.name} -->
    <url>
        <loc>https://westendcorporation.in/product/{product.slug}</loc>
        <lastmod>{product.updated_at.strftime('%Y-%m-%d')}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    
'''
    
    # Close the sitemap
    sitemap_xml += '</urlset>'
    
    return HttpResponse(sitemap_xml, content_type='application/xml')
