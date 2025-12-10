
import os
import django
import sys

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def import_remaining():
    # 1. Groceries & Staples
    v_groceries_name = "Groceries & Staples"
    try:
        v_groceries = Vertical.objects.get(title__iexact=v_groceries_name)
        groceries_list = [
            "TATA SALT LITE", "SABUDANA", "BESAN (4 lbs)", "SHAKKAR IN JAR",
            "MASALA GUR IN JAR", "PILLSBOURY ATTA", "ASHIRWAD WHEAT FLOUR",
            "Malka Masoor", "Moong Whole/Split/Washed", "Urad Split/Washed/Gotta",
            "Chickpea Kabuli Chana", "Cowpea White Whole", "Rajma Chitra/Jammu"
        ]
        
        count = 0
        for name in groceries_list:
            if not Product.objects.filter(name__iexact=name).exists():
                Product.objects.create(
                    name=name,
                    vertical=v_groceries,
                    description=f"Premium quality {name.lower()} for everyday cooking.",
                    packaging="Standard Pack",
                    moq="10 Units",
                    image="placeholder", 
                    is_active=True,
                    is_public=True
                )
                print(f"Created Grocery: {name}")
                count += 1
            else:
                print(f"Skipped Grocery: {name}")
        print(f"Total Groceries Added: {count}")

    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{v_groceries_name}' not found.")


    # 2. Frozen Vegetables
    v_frozen_name = "Frozen Vegetables"
    try:
        v_frozen = Vertical.objects.get(title__iexact=v_frozen_name)
        frozen_list = [
            "FROZEN SEMI CIRCLE CARROT & PEAS(CARROT-70% & PEAS-30%)"
        ]
        
        count = 0
        for name in frozen_list:
            if not Product.objects.filter(name__iexact=name).exists():
                Product.objects.create(
                    name=name,
                    vertical=v_frozen,
                    description=f"Freshly frozen {name.lower()} relying on cold chain storage.",
                    packaging="Frozen Pack",
                    moq="Wait for quote",
                    image="placeholder", 
                    is_active=True,
                    is_public=True
                )
                print(f"Created Frozen: {name}")
                count += 1
            else:
                print(f"Skipped Frozen: {name}")
        print(f"Total Frozen Added: {count}")

    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{v_frozen_name}' not found.")


    # 3. Processed Foods
    v_processed_name = "Processed Foods"
    try:
        v_processed = Vertical.objects.get(title__iexact=v_processed_name)
        processed_list = [
            "CHINGS SINGAPORE NOODLES", "TOP RAMEN MASALA NOODLES", "TOP RAMEN CURRY NOODLES",
            "YIPPEE MAGIC MSL NOODLES", "CHINGS VINIGAR", "WEIKFILD CORN FLOUR",
            "VIOLA ESSENCE (VANILLA, ROSE, KEWRA, BIRYANI, MANGO, ORANGE, ICECREAM, KHUS)",
            "PHOOL MAKHANA", "NUTELLA SOYA CHUNKS", "SOYA CHUNK MINI/BIG",
            "PANJABI WADI", "CORNITOS TACO SHELL",
            # Expanded Chana Varieties
            "Roasted Chana with Skin", "Roasted Chana without Skin",
            "Hing Chana (Roasted)", "Lemon Roasted Chana"
        ]
        
        count = 0
        for name in processed_list:
            if not Product.objects.filter(name__iexact=name).exists():
                Product.objects.create(
                    name=name,
                    vertical=v_processed,
                    description=f"Delicious {name.lower()} ready for consumption or cooking.",
                    packaging="Standard Pack",
                    moq="10 Units",
                    image="placeholder", 
                    is_active=True,
                    is_public=True
                )
                print(f"Created Processed: {name}")
                count += 1
            else:
                print(f"Skipped Processed: {name}")
        print(f"Total Processed Foods Added: {count}")

    except Vertical.DoesNotExist:
        print(f"Error: Vertical '{v_processed_name}' not found.")

if __name__ == "__main__":
    import_remaining()
