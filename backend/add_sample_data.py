"""
Script to add sample data to the database
Run with: python manage.py shell < add_sample_data.py
"""

from api.models import Vertical, VerticalProduct, Product

# Clear existing data (optional)
print("Clearing existing data...")
Vertical.objects.all().delete()

# Create Groceries & Staples
print("\nCreating Groceries & Staples vertical...")
v1 = Vertical.objects.create(
    title='Groceries & Staples',
    description='Certified organic pulses, premium grains, authentic spice blends, and traditional jaggery products sourced from trusted farms',
    icon_name='Wheat',
    secondary_icon_name='Leaf',
    gradient='from-amber-500 to-orange-600',
    bg_gradient='from-primary-50 to-amber-50',
    image='https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop',
    button_color='from-amber-500 to-orange-600',
    button_text='REQUEST QUOTE',
    order=1,
    is_active=True
)

VerticalProduct.objects.create(vertical=v1, name='Certified Organic Pulses', order=1)
VerticalProduct.objects.create(vertical=v1, name='Premium Quality Grains', order=2)
VerticalProduct.objects.create(vertical=v1, name='Authentic Spice Blends', order=3)
VerticalProduct.objects.create(vertical=v1, name='Traditional Jaggery', order=4)

# Create Frozen Vegetables
print("Creating Frozen Vegetables vertical...")
v2 = Vertical.objects.create(
    title='Frozen Vegetables',
    description='IQF (Individually Quick Frozen) vegetables processed at peak freshness using advanced cold chain technology to preserve nutrients',
    icon_name='Snowflake',
    secondary_icon_name='Package',
    gradient='from-emerald-500 to-teal-600',
    bg_gradient='from-emerald-50 to-teal-50',
    image='https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop',
    button_color='from-emerald-500 to-teal-600',
    button_text='REQUEST QUOTE',
    order=2,
    is_active=True
)

VerticalProduct.objects.create(vertical=v2, name='IQF Cut Vegetables', order=1)
VerticalProduct.objects.create(vertical=v2, name='Whole Frozen Vegetables', order=2)
VerticalProduct.objects.create(vertical=v2, name='Ready-to-Cook Range', order=3)
VerticalProduct.objects.create(vertical=v2, name='Organic Frozen Options', order=4)

# Create Processed Foods
print("Creating Processed Foods vertical...")
v3 = Vertical.objects.create(
    title='Processed Foods',
    description='FSSAI certified processed foods manufactured in state-of-the-art facilities maintaining international hygiene standards',
    icon_name='Box',
    secondary_icon_name='ShoppingBasket',
    gradient='from-slate-500 to-blue-600',
    bg_gradient='from-gray-50 to-neutral-50',
    image='https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&h=600&fit=crop',
    button_color='from-slate-500 to-blue-600',
    button_text='REQUEST QUOTE',
    order=3,
    is_active=True
)

VerticalProduct.objects.create(vertical=v3, name='Canned Vegetables', order=1)
VerticalProduct.objects.create(vertical=v3, name='Ready-to-Eat Meals', order=2)
VerticalProduct.objects.create(vertical=v3, name='Frozen Snacks', order=3)
VerticalProduct.objects.create(vertical=v3, name='Dairy Products', order=4)

# Add sample products
print("\nAdding sample products...")

Product.objects.create(
    vertical=v1,
    name='Organic Kabuli Chana',
    description='Premium quality organic chickpeas sourced from certified organic farms',
    image='https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
    moq='MOQ: 100 kg',
    packaging='Bulk/Custom',
    badge='Organic',
    order=1,
    is_active=True
)

Product.objects.create(
    vertical=v1,
    name='Punjabi Jaggery Powder',
    description='Traditional jaggery powder made from pure sugarcane',
    image='https://images.unsplash.com/photo-1599909533730-f9d7c4bc0c5d?w=500&h=500&fit=crop',
    moq='MOQ: 200 kg',
    packaging='Bulk/Custom',
    badge='Traditional',
    order=2,
    is_active=True
)

Product.objects.create(
    vertical=v2,
    name='Frozen Diced Potato (IQF)',
    description='Individually Quick Frozen diced potatoes, ready to cook',
    image='https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop',
    moq='MOQ: 500 kg',
    packaging='Bulk/Custom',
    badge='IQF',
    order=1,
    is_active=True
)

Product.objects.create(
    vertical=v2,
    name='Frozen Green Peas',
    description='Fresh green peas frozen at peak ripeness',
    image='https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop',
    moq='MOQ: 300 kg',
    packaging='Bulk/Custom',
    badge='Fresh',
    order=2,
    is_active=True
)

Product.objects.create(
    vertical=v3,
    name='Canned Sweet Corn Kernels',
    description='Premium quality sweet corn kernels in brine',
    image='https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&h=500&fit=crop',
    moq='MOQ: 100 cans',
    packaging='Canned',
    badge='Canned',
    order=1,
    is_active=True
)

Product.objects.create(
    vertical=v3,
    name='Ready-to-Eat Dal Makhani',
    description='Authentic Dal Makhani ready in minutes',
    image='https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&h=500&fit=crop',
    moq='MOQ: 50 packets',
    packaging='Packaged',
    badge='Ready-to-Eat',
    order=2,
    is_active=True
)

print("\n✅ Sample data added successfully!")
print(f"Created {Vertical.objects.count()} verticals")
print(f"Created {VerticalProduct.objects.count()} vertical products")
print(f"Created {Product.objects.count()} products")
