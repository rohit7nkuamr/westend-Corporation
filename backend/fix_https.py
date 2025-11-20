import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

# Update product images
products = Product.objects.all()
for product in products:
    if product.image and 'http:' in str(product.image):
        path = str(product.image).replace('http:', '')
        product.image.name = path
        product.save()
        print(f"Updated image for product: {product.name}")
    
    if hasattr(product, 'image_2') and product.image_2 and 'http:' in str(product.image_2):
        path = str(product.image_2).replace('http:', '')
        product.image_2.name = path
        product.save()
        print(f"Updated second image for product: {product.name}")

# Update vertical images
verticals = Vertical.objects.all()
for vertical in verticals:
    if vertical.image and 'http:' in str(vertical.image):
        path = str(vertical.image).replace('http:', '')
        vertical.image.name = path
        vertical.save()
        print(f"Updated image for vertical: {vertical.title}")

print('Database image URLs updated to use HTTPS')
