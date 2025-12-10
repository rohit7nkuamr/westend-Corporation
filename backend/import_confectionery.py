
import os
import django
import sys

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def import_confectionery():
    vertical_name = "Processed Drinks & Confectionery"
    try:
        vertical = Vertical.objects.get(title__iexact=vertical_name)
    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{vertical_name}' not found.")
        return

    products_list = [
        "FINGER JACHAK",
        "MARUNDA GACHAK",
        "BODHI GACHAK",
        "PEANUT GACHAK",
        "SUGAR REWARI",
        "RAJGIRI LADOO",
        "BOONDI (5 KG, 4 KG)",
        "ANGOORI PETHA",
        "CHAND TARA",
        "LAL JUBAN CHURAN STICK",
        "KAALA JADOO CHURAN STICK"
    ]

    added_count = 0
    
    for name in products_list:
        # Check if exists to avoid duplicates
        if not Product.objects.filter(name__iexact=name).exists():
            Product.objects.create(
                name=name,
                vertical=vertical,
                description=f"Traditional Indian sweet confection {name.lower()}.",
                packaging="Standard Pack",
                moq="10 kg",
                image="placeholder", # Mark for image fetcher
                is_active=True,
                is_public=True
            )
            print(f"Created: {name}")
            added_count += 1
        else:
            print(f"Skipped: {name} (Already exists)")

    print(f"\nTotal New Products Added: {added_count}")

if __name__ == "__main__":
    import_confectionery()
