#!/usr/bin/env python
"""
Script to add sample data to the Westend Corporation website.
Run this script from the backend directory with the virtual environment activated:

cd /var/www/westend-Corporation/backend
source venv/bin/activate
python ../add_sample_data.py
"""

import os
import sys
import django
from django.core.files import File
from pathlib import Path

# Set up Django environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Now we can import Django models
from api.models import Vertical, VerticalProduct, Product

def create_sample_data():
    print("Creating sample data for Westend Corporation...")
    
    # Create sample directories for media files if they don't exist
    media_dir = Path('/var/www/westend-Corporation/backend/media')
    verticals_dir = media_dir / 'verticals'
    products_dir = media_dir / 'products'
    
    verticals_dir.mkdir(exist_ok=True, parents=True)
    products_dir.mkdir(exist_ok=True, parents=True)
    
    # Create sample verticals (categories)
    verticals = [
        {
            'title': 'Groceries & Staples',
            'description': 'Certified organic pulses, premium grains, authentic spice blends, and traditional jaggery products sourced from trusted farms',
            'icon_name': 'Wheat',
            'secondary_icon_name': 'Leaf',
            'gradient': 'from-amber-500 to-orange-600',
            'bg_gradient': 'from-primary-50 to-amber-50',
            'button_color': 'from-amber-500 to-orange-600',
            'products': [
                'Certified Organic Pulses',
                'Premium Quality Grains',
                'Authentic Spice Blends',
                'Traditional Jaggery'
            ]
        },
        {
            'title': 'Frozen Vegetables',
            'description': 'Flash-frozen vegetables that lock in nutrients and flavor, perfect for quick meals and food service applications',
            'icon_name': 'Snowflake',
            'secondary_icon_name': 'Package',
            'gradient': 'from-blue-500 to-cyan-600',
            'bg_gradient': 'from-blue-50 to-cyan-50',
            'button_color': 'from-blue-500 to-cyan-600',
            'products': [
                'Mixed Vegetables',
                'Green Peas',
                'Sweet Corn',
                'Cauliflower Florets'
            ]
        },
        {
            'title': 'Processed Foods',
            'description': 'Ready-to-cook and ready-to-eat products made with premium ingredients and authentic recipes',
            'icon_name': 'Box',
            'secondary_icon_name': 'ShoppingBasket',
            'gradient': 'from-red-500 to-orange-600',
            'bg_gradient': 'from-red-50 to-orange-50',
            'button_color': 'from-red-500 to-orange-600',
            'products': [
                'Ready-to-Cook Mixes',
                'Instant Meals',
                'Snack Foods',
                'Breakfast Items'
            ]
        }
    ]
    
    # Create verticals and their products
    for i, vertical_data in enumerate(verticals):
        print(f"Creating vertical: {vertical_data['title']}")
        
        # Create vertical
        vertical = Vertical.objects.create(
            title=vertical_data['title'],
            description=vertical_data['description'],
            icon_name=vertical_data['icon_name'],
            secondary_icon_name=vertical_data['secondary_icon_name'],
            gradient=vertical_data['gradient'],
            bg_gradient=vertical_data['bg_gradient'],
            image='verticals/placeholder.jpg',  # Placeholder image
            button_color=vertical_data['button_color'],
            button_text='REQUEST QUOTE',
            order=i+1
        )
        
        # Create vertical products
        for j, product_name in enumerate(vertical_data['products']):
            print(f"  - Adding vertical product: {product_name}")
            VerticalProduct.objects.create(
                vertical=vertical,
                name=product_name,
                order=j+1
            )
        
        # Create detailed products for each vertical
        if vertical_data['title'] == 'Groceries & Staples':
            products = [
                {
                    'name': 'Organic Kabuli Chana',
                    'description': 'Premium quality organic chickpeas sourced from certified organic farms. High in protein and fiber, perfect for salads, curries, and hummus.',
                    'moq': 'MOQ: 100 kg',
                    'packaging': 'Bulk/Custom',
                    'badge': 'Organic'
                },
                {
                    'name': 'Basmati Rice',
                    'description': 'Aromatic, long-grain basmati rice from the foothills of the Himalayas. Aged for 12 months for perfect texture and aroma.',
                    'moq': 'MOQ: 200 kg',
                    'packaging': '25kg bags',
                    'badge': 'Premium'
                },
                {
                    'name': 'Turmeric Powder',
                    'description': 'High-curcumin turmeric powder ground from selected turmeric fingers. Vibrant color and authentic flavor for curries and health supplements.',
                    'moq': 'MOQ: 50 kg',
                    'packaging': 'Vacuum sealed bags',
                    'badge': 'Organic'
                }
            ]
        elif vertical_data['title'] == 'Frozen Vegetables':
            products = [
                {
                    'name': 'IQF Green Peas',
                    'description': 'Individually Quick Frozen green peas that maintain their natural sweetness and nutritional value. Harvested and frozen within hours.',
                    'moq': 'MOQ: 500 kg',
                    'packaging': '10kg cartons',
                    'badge': 'IQF'
                },
                {
                    'name': 'Mixed Vegetables',
                    'description': 'Premium blend of carrots, corn, peas, and green beans. Flash-frozen to lock in nutrients and flavor.',
                    'moq': 'MOQ: 500 kg',
                    'packaging': '10kg cartons',
                    'badge': ''
                },
                {
                    'name': 'Cauliflower Florets',
                    'description': 'Carefully selected cauliflower florets, cleaned and frozen at peak freshness. Ready to use in any recipe.',
                    'moq': 'MOQ: 300 kg',
                    'packaging': '5kg bags',
                    'badge': 'New'
                }
            ]
        else:
            products = [
                {
                    'name': 'Ready-to-Cook Butter Chicken Mix',
                    'description': 'Authentic butter chicken spice blend with tomato and cream powder. Just add chicken and water for a restaurant-quality dish in minutes.',
                    'moq': 'MOQ: 100 kg',
                    'packaging': '100g sachets',
                    'badge': 'Bestseller'
                },
                {
                    'name': 'Instant Khichdi Mix',
                    'description': 'Nutritious and comforting one-pot meal with rice, lentils, and spices. Ready in just 5 minutes by adding hot water.',
                    'moq': 'MOQ: 200 kg',
                    'packaging': '80g cups',
                    'badge': 'Vegetarian'
                },
                {
                    'name': 'Mango Pickle',
                    'description': 'Traditional Indian mango pickle made with raw mangoes, spices, and mustard oil. Perfect accompaniment to any meal.',
                    'moq': 'MOQ: 200 kg',
                    'packaging': '200g jars',
                    'badge': ''
                }
            ]
        
        # Create products
        for j, product_data in enumerate(products):
            print(f"  - Adding product: {product_data['name']}")
            Product.objects.create(
                vertical=vertical,
                name=product_data['name'],
                description=product_data['description'],
                image='products/placeholder.jpg',  # Placeholder image
                moq=product_data['moq'],
                packaging=product_data['packaging'],
                badge=product_data['badge'],
                order=j+1
            )
    
    print("\nSample data created successfully!")
    print("\nNOTE: Placeholder images have been used. You should upload real images through the admin interface.")
    print("Access the admin interface at: http://157.173.221.140/admin")

if __name__ == "__main__":
    # Check if data already exists
    if Vertical.objects.exists():
        overwrite = input("Data already exists. Do you want to add more sample data anyway? (y/n): ")
        if overwrite.lower() != 'y':
            print("Operation cancelled.")
            sys.exit(0)
    
    create_sample_data()
