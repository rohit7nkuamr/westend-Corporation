#!/usr/bin/env python
import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product

def update_products():
    """Update existing products with more detailed information"""
    
    # Update product 1 (assuming it exists)
    try:
        product = Product.objects.get(id=1)
        product.features = """Premium quality organic product
Sourced directly from certified organic farms
No pesticides or chemicals used
High nutritional value
Rich in essential nutrients
Naturally processed
Farm fresh quality
Vacuum packed for freshness"""
        product.origin = "Maharashtra, India"
        product.shelf_life = "12 Months"
        product.storage = "Store in a cool, dry place away from direct sunlight"
        product.certifications = "FSSAI, Organic India, USDA Organic"
        product.brand = "Westend Premium"
        product.save()
        print(f"Updated product: {product.name}")
    except Product.DoesNotExist:
        print("Product with ID 1 not found")
    
    # Update product 2 (assuming it exists)
    try:
        product = Product.objects.get(id=2)
        product.features = """100% Natural and Organic
Handpicked from selected farms
Chemical-free cultivation
Rich in antioxidants
High fiber content
Excellent source of protein
Sustainably farmed
Premium export quality"""
        product.origin = "Punjab, India"
        product.shelf_life = "18 Months"
        product.storage = "Keep in airtight container after opening"
        product.certifications = "FSSAI, India Organic, EU Organic"
        product.brand = "Westend Organics"
        product.save()
        print(f"Updated product: {product.name}")
    except Product.DoesNotExist:
        print("Product with ID 2 not found")
    
    # Update product 3 (assuming it exists)
    try:
        product = Product.objects.get(id=3)
        product.features = """Flash frozen at peak freshness
Maintains nutritional value
Ready to cook, no preparation needed
Consistent quality year-round
No artificial preservatives
Individually quick frozen for convenience
Perfect for food service applications
Longer shelf life than fresh alternatives"""
        product.origin = "Himachal Pradesh, India"
        product.shelf_life = "24 Months (frozen)"
        product.storage = "Keep frozen at -18°C or below"
        product.certifications = "FSSAI, ISO 22000, HACCP"
        product.brand = "Westend Fresh Frozen"
        product.save()
        print(f"Updated product: {product.name}")
    except Product.DoesNotExist:
        print("Product with ID 3 not found")
    
    # Update product 4 (assuming it exists)
    try:
        product = Product.objects.get(id=4)
        product.features = """Individually Quick Frozen (IQF) technology
Retains natural color and flavor
No blanching required before cooking
Uniform size and quality
Free from additives and preservatives
Harvested at peak ripeness
Maintains nutritional profile
Versatile ingredient for multiple cuisines"""
        product.origin = "Gujarat, India"
        product.shelf_life = "24 Months (frozen)"
        product.storage = "Store at -18°C or below"
        product.certifications = "FSSAI, BRC Global Standard"
        product.brand = "Westend IQF"
        product.save()
        print(f"Updated product: {product.name}")
    except Product.DoesNotExist:
        print("Product with ID 4 not found")

if __name__ == "__main__":
    print("Updating product data...")
    update_products()
    print("Done!")
