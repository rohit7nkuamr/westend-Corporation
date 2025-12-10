
import os
import django
import sys

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def import_health_dairy():
    # 1. Health Mixes
    vertical_health_name = "Health Mixes"
    try:
        vertical_health = Vertical.objects.get(title__iexact=vertical_health_name)
        health_products = [
            "HIMALAYA ASHVAGANDHA", "HIMALAYA GUDUCHI", "HIMALAYA NEEM SKIN WELLNESS",
            "HIMALAYA TRIPHALA", "HIMALAYA TULSI RESPIRATORY", "HIMALAYA SUDARSHAN GHANVATI",
            "ZANDU SUDARSHAN GHANVATI", "TRIFLA CHURAN", "SAT ISABGOL",
            "PAIT SAFA CHURNA/TABLET", "WOODWARDS GRIPE WATER", "DABUR GRIPE WATER",
            "BOURNVITA"
        ]
        
        count_health = 0
        for name in health_products:
            if not Product.objects.filter(name__iexact=name).exists():
                Product.objects.create(
                    name=name,
                    vertical=vertical_health,
                    description=f"Authentic {name.lower()} for wellness and health.",
                    packaging="Standard Pack",
                    moq="10 Units",
                    image="placeholder", 
                    is_active=True,
                    is_public=True
                )
                print(f"Created Health: {name}")
                count_health += 1
            else:
                print(f"Skipped Health: {name}")
        print(f"Total Health Mixes Added: {count_health}")

    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{vertical_health_name}' not found.")


    # 2. Dairy & Oil
    vertical_dairy_name = "Dairy & Oil"
    try:
        vertical_dairy = Vertical.objects.get(title__iexact=vertical_dairy_name)
        dairy_products = [
            "GOVERDHAN GHEE", "VERKA GHEE", "SOHNA MUSTARD OIL PET", "IDHYAM OIL"
        ]
        
        count_dairy = 0
        for name in dairy_products:
            if not Product.objects.filter(name__iexact=name).exists():
                Product.objects.create(
                    name=name,
                    vertical=vertical_dairy,
                    description=f"Premium quality {name.lower()}.",
                    packaging="Standard Pack",
                    moq="10 Liters/Kg",
                    image="placeholder", 
                    is_active=True,
                    is_public=True
                )
                print(f"Created Dairy: {name}")
                count_dairy += 1
            else:
                print(f"Skipped Dairy: {name}")
        print(f"Total Dairy & Oil Added: {count_dairy}")

    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{vertical_dairy_name}' not found.")

if __name__ == "__main__":
    import_health_dairy()
