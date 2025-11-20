import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def fix_image_urls(url):
    """Convert all image URLs to HTTPS and remove IP addresses"""
    if not url:
        return url
    
    # Convert string representation to actual string if needed
    url_str = str(url)
    
    # Replace http: with https:
    url_str = url_str.replace('http:', 'https:')
    
    # Replace any IP addresses with domain name
    ip_pattern = r'https?://\d+\.\d+\.\d+\.\d+'
    if re.search(ip_pattern, url_str):
        url_str = re.sub(ip_pattern, 'https://westendcorporation.in', url_str)
    
    return url_str

# Update product images
products = Product.objects.all()
for product in products:
    if product.image:
        fixed_url = fix_image_urls(product.image)
        if fixed_url != str(product.image):
            print(f"Updating image for product: {product.name}")
            print(f"  From: {product.image}")
            print(f"  To:   {fixed_url}")
            product.image.name = fixed_url.replace('https://westendcorporation.in/media/', '')
            product.save()
    
    if hasattr(product, 'image_2') and product.image_2:
        fixed_url = fix_image_urls(product.image_2)
        if fixed_url != str(product.image_2):
            print(f"Updating second image for product: {product.name}")
            print(f"  From: {product.image_2}")
            print(f"  To:   {fixed_url}")
            product.image_2.name = fixed_url.replace('https://westendcorporation.in/media/', '')
            product.save()
    
    if hasattr(product, 'image_3') and product.image_3:
        fixed_url = fix_image_urls(product.image_3)
        if fixed_url != str(product.image_3):
            print(f"Updating third image for product: {product.name}")
            print(f"  From: {product.image_3}")
            print(f"  To:   {fixed_url}")
            product.image_3.name = fixed_url.replace('https://westendcorporation.in/media/', '')
            product.save()

# Update vertical images
verticals = Vertical.objects.all()
for vertical in verticals:
    if vertical.image:
        fixed_url = fix_image_urls(vertical.image)
        if fixed_url != str(vertical.image):
            print(f"Updating image for vertical: {vertical.title}")
            print(f"  From: {vertical.image}")
            print(f"  To:   {fixed_url}")
            vertical.image.name = fixed_url.replace('https://westendcorporation.in/media/', '')
            vertical.save()

print('Database image URLs updated to use HTTPS')
