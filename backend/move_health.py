import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def assign_health_mixes():
    print("Starting Health Mixes migration...")
    
    # 1. Get or Create the Target Vertical
    target_vertical_name = "Health Mixes"
    
    try:
        vertical = Vertical.objects.get(title__iexact=target_vertical_name)
        print(f"Found existing vertical: {vertical.title}")
    except Vertical.DoesNotExist:
        vertical = Vertical.objects.create(
            title=target_vertical_name,
            description='Nutritious health drinks and ayurvedic supplements.',
            icon_name='Heart', # Placeholder (requires icon update later if not valid)
            secondary_icon_name='Heart',
            gradient='from-green-400 to-emerald-600', 
            bg_gradient='from-green-50 to-emerald-50',
            button_color='bg-emerald-600',
            order=8
        )
        print(f"Created new vertical: {target_vertical_name}")

    # 2. List of Products to Move
    product_names = [
        "HORLICKS CHOCOLATE", "HORLICKS ELACHI JAR", "HORLICKS KESAR BADAM JAR",
        "HORLICKS LITE", "HORLICKS MOTHER", "HORLICKS ELAICHI", "COMPLAN CHOCOLATE",
        "COMPLAN CHOCOLATE FLAVOUR", "COMPLAN KESAR BADAM FLAVOUR", "BOOST POWDER",
        "BOOST JAR", "BOURNAVITA", "DABUR CHAWANPRASH SUGER FREE", "DABUR CHAWANPRASH",
        "DABUR ACTIVE BLOOD PURIFIER", "DABUR HONEY", "HIMALAYA ASHVAGANDHA",
        "HIMALAYA GUDUCHI", "HIMALAYA NEEM SKIN WELLNESS", "HIMALAYA TRIPHALA",
        "HIMALAYA TULSI RESPIRATORY", "HIMALAYA SUDARSHAN GHANVATI",
        "ZANDU SUDARSHAN GHANVATI", "TRIFLA CHURAN", "SAT ISABGOL", "PAIT SAFA CHURNA",
        "PAIT SAFA TABLET", "WOODWARDS GRIPE WATER", "DABUR GRIPE WATER",
        "HIMALIYAN LIV 52 TABLET", "HIMALIYAN LIV 52 DS SYRUP"
    ]

    # 3. Find and Update Products
    found_count = 0
    not_found = []
    
    for name in product_names:
        # 1. Exact Match (Case Insensitive)
        products = Product.objects.filter(name__iexact=name)
        
        # 2. If no exact match, try stripping whitespace
        if not products.exists():
            products = Product.objects.filter(name__iexact=name.strip())

        # 3. If still no match, try 'icontains'
        if not products.exists():
            products = Product.objects.filter(name__icontains=name.strip())
            
        if products.exists():
            matched_names = list(products.values_list('name', flat=True))
            print(f"  Match: '{name}' -> {[n for n in matched_names]}")
            updated = products.update(vertical=vertical)
            found_count += updated
        else:
            # 4. Handle Grouped Products / Brand Prefixes
            grouped_prefixes = [
                "HORLICKS", "COMPLAN", "BOOST", "DABUR", "HIMALAYA", "ZANDU", 
                "WOODWARDS", "PAIT SAFA", "BOURNAVITA", "LIV 52"
            ]
            
            matched = False
            for prefix in grouped_prefixes:
                if name.upper().startswith(prefix):
                    parent_products = Product.objects.filter(name__istartswith=prefix)
                    if parent_products.exists():
                        updated = parent_products.update(vertical=vertical)
                        if updated > 0:
                            matched = True
                            print(f"  Match (Grouped): '{name}' -> Parent Group '{prefix}'")
                            break
            
            if not matched:
                not_found.append(name)

    print("-" * 30)
    print(f"Migration Complete.")
    print(f"Total Products Moved: {found_count}")
    
    if not_found:
        print(f"Warning: {len(not_found)} products from the list were NOT found in database:")
        for missing in not_found:
            print(f" - {missing}")
    else:
        print("Success: All products found and moved.")

if __name__ == "__main__":
    assign_health_mixes()
