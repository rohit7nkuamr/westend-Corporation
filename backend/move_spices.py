import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def assign_spices():
    print("Starting Spices & Seasonings migration...")
    
    # 1. Get or Create the Target Vertical
    target_vertical_name = "Spices & Seasonings"
    
    # Check if it exists first to avoid duplicate errors if strict constraints exist
    try:
        vertical = Vertical.objects.get(title=target_vertical_name)
        print(f"Found existing vertical: {vertical.title}")
    except Vertical.DoesNotExist:
        vertical = Vertical.objects.create(
            title=target_vertical_name,
            description='Premium quality spices and seasonings exported from India.',
            icon_name='Leaf',
            secondary_icon_name='Leaf',
            gradient='from-amber-500 to-red-600',
            bg_gradient='from-amber-50 to-red-50',
            button_color='bg-amber-600',
            order=4 # Arbitrary order, can be changed in admin
        )
        print(f"Created new vertical: {target_vertical_name}")

    # 2. List of Products to Move
    product_names = [
        "CARDAMOM", "L. G. HING POWDER", "CHINGS VINIGAR", "HALDI POWDER", "HALDI SABUT",
        "MIRCH POWDER", "DHANIA PODWER", "AMCHOOR POWDER", "GARAM MASALA (Basic Powder)",
        "KASHMIRI MIRCH POWDER", "DALCHINI POWDER", "SONTH POWDER", "KALI MIRCH POWDER",
        "JEERA SABUT", "CINAMON STICK", "KALI MIRCH SABUT", "MIRCH SABUT WITHOUT STEAM",
        "DHANIA SABUT", "TEJ PATTA", "AJWAIN", "BLACK CUMIN (KALONJI)", "BLACK PEPPER WHOLE",
        "BLACK PEPPER POWDER", "CARDAMOM BLACK", "CARDAMOM GREEN 7 to 8 MM", 
        "CINNAMON STICKS", "CLOVE WHOLE", "CUMIN POWDER", "FENNEL", "GINGER WHOLE DRY",
        "MUSTARD BLACK", "MUSTARD YELLOW", "RAPSEED (RAI)", "RED CHILLI WHOLE", 
        "RED CHILLI FLAKES", "SESAME WHITE HULLED", "SESAME BLACK", "NUTMEG WHOLE",
        "BAY LEAVES", "ROSE PINK ROCK SALT POWDER", "BLACK SALT", "MDH DEGGI MIRCH PWD",
        "MDH CHAT MSL", "MDH KITCHEN KING MSL", "MDH GARAM MSL", "MDH MEAT MSL",
        "MDH CHICKEN MSL", "MDH PAV BHAJI MSL", "MDH AMCHUR PWD", "MDH RAJMAH MSL",
        "MDH DAL MAKHNI MSL", "MDH PANI PURI MSL", "MDH SAMBER MSL", 
        "MDH CHUNKY CHAAT MASALA", "MDH CHANNA MASALA", "MDH KITCHIN KING MASALA",
        "MDH MEAT MASALA", "MDH DEGGI MERCH MASALA PWD", "EVEREST MASALA",
        "EVEREST TEA MASALA", "EVEREST CHOLE MASALA", "EVEREST CHAT MASALA",
        "EVEREST RAJMAAH MASALA", "EVEREST MEAT MASALA", "EVEREST PAV BHAJI MASALA",
        "EVEREST GARAM MASALA", "EVEREST SAMBHAR MASALA", "EVEREST KASURI METHI"
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

        # 3. If still no match, try 'icontains' (User name inside DB name)
        # e.g. User "HALDI POWDER" matches DB "HALDI POWDER (300 GM)"
        if not products.exists():
            products = Product.objects.filter(name__icontains=name.strip())
            
        if products.exists():
            # Log what we found for verification
            matched_names = list(products.values_list('name', flat=True))
            print(f"  Match: '{name}' -> {[n for n in matched_names]}")
            
            updated = products.update(vertical=vertical)
            found_count += updated
        else:
             # 4. Handle Grouped Products / Brand Prefixes
            grouped_prefixes = ["MDH", "EVEREST", "LG", "L.G.", "CHINGS", "SHADANI", "RINKAS", "PATANJALI"]
            
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
                # 5. Last Resort: Keyword Search for Generics
                # If name is simple (e.g. "CARDAMOM"), try finding it inside DB names
                # logic: if "CARDAMOM" is in `Product.name`
                try_generic = Product.objects.filter(name__icontains=name)
                if try_generic.exists():
                     updated = try_generic.update(vertical=vertical)
                     if updated > 0:
                        matched = True
                        print(f"  Match (Generic Keyword): '{name}' -> Found in DB names")
            
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
    assign_spices()
