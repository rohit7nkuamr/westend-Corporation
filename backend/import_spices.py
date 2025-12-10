
import os
import django
import sys

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def import_spices():
    vertical_name = "Spices & Seasonings"
    try:
        vertical = Vertical.objects.get(title__iexact=vertical_name)
    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{vertical_name}' not found.")
        return

    products_list = [
        "L. G. HING POWDER",
        "HALDI SABUT",
        "DHANIA PODWER",
        "AMCHOOR POWDER",
        "GARAM MASALA",
        "KASHMIRI MIRCH POWDER",
        "DALCHINI POWDER",
        "SONTH POWDER",
        "KALI MIRCH POWDER/SABUT",
        "JEERA SABUT",
        "CINAMON STICK",
        "RED CHILLI WHOLE/FLAKES",
        "AJWAIN",
        "BLACK CUMIN (KALONJI)",
        "CLOVE WHOLE",
        "FENNEL",
        "NUTMEG WHOLE",
        "BLACK SALT",
        "EVEREST MASALA (General Blend)"
    ]

    added_count = 0
    
    for name in products_list:
        # Check if exists to avoid duplicates
        if not Product.objects.filter(name__iexact=name).exists():
            Product.objects.create(
                name=name,
                vertical=vertical,
                description=f"Premium quality {name.lower()} sourced from the finest farms.",
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
    import_spices()
