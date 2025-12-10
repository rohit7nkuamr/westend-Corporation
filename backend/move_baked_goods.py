
import os
import django
import sys

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def move_products():
    target_vertical_name = "Baked Goods"
    try:
        target_vertical = Vertical.objects.get(title__iexact=target_vertical_name)
    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{target_vertical_name}' not found.")
        return

    print(f"Target Vertical: {target_vertical.title}")

    # List of products to move (Exact or partial names)
    products_to_move = [
        "PUNJABI ATTA BISCUITS",
        "COCONUT ALMOND COOKIES",
        "EGGLESS CAKE RUSK"
    ]

    moved_count = 0
    missing_products = []

    for item_name in products_to_move:
        # Try exact match first
        products = Product.objects.filter(name__iexact=item_name)
        
        # If not found, try contains
        if not products.exists():
            products = Product.objects.filter(name__icontains=item_name)

        if products.exists():
            for product in products:
                old_vertical = product.vertical.title
                if old_vertical != target_vertical.title:
                    product.vertical = target_vertical
                    product.save()
                    print(f"Moved: '{product.name}' from '{old_vertical}' to '{target_vertical.title}'")
                    moved_count += 1
                else:
                    print(f"Skipped: '{product.name}' already in '{target_vertical.title}'")
        else:
            print(f"Not Found: '{item_name}'")
            missing_products.append(item_name)

    print(f"\nTotal Moved: {moved_count}")
    if missing_products:
        print(f"Missing Products: {len(missing_products)}")
        for p in missing_products:
            print(f" - {p}")

if __name__ == "__main__":
    move_products()
