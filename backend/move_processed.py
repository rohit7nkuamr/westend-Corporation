import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def assign_processed_foods():
    print("Starting Processed Foods migration...")
    
    # 1. Get or Create the Target Vertical
    target_vertical_name = "Processed Foods"
    
    try:
        vertical = Vertical.objects.get(title__iexact=target_vertical_name)
        print(f"Found existing vertical: {vertical.title}")
    except Vertical.DoesNotExist:
        vertical = Vertical.objects.create(
            title=target_vertical_name,
            description='Ready-to-cook and ready-to-eat processed food items.',
            icon_name='Package', # Placeholder
            secondary_icon_name='Package',
            gradient='from-orange-500 to-amber-500', 
            bg_gradient='from-orange-50 to-amber-50',
            button_color='bg-orange-600',
            order=6
        )
        print(f"Created new vertical: {target_vertical_name}")

    # 2. List of Products to Move
    product_names = [
        "MAGGI MASALA NOODLES LAGE PACK", "MAGGI MASALA NOODLES", "CHINGS HAKKA NOODLES",
        "CHINGS SINGAPORE NOODLES", "TOP RAMEN MASALA NOODLES", "TOP RAMEN CURRY NOODLES",
        "YIPPEE MAGIC MSL NOODLES", "BAMBINO VERMICELLI", "BAMBINO VEMICILLI ROSTED",
        "ANIL VERMICELLI", "ANIL RAGI VERMICELLI", "KNORR SOUP HOT & SWEET",
        "KNORR SOUP HOT & SOUR VEG", "KNORR SOUP MIX VEG", "KNORR SOUP THICK TOMATO",
        "KNORR SOUP SWEET CORN VEG", "KNORR SOUP SWEET CORN CHICKEN", "KNORR MANCHOW SOUP",
        "KNORR SOUP ITALIAN", "KNORR SOUP MAXICON", "KISSAN MIX FRUIT JAM",
        "KISSAN JAM PINEAPPLE", "KISSAN JAM MANGO", "KISSAN JAM ORANGE", "KISSAN MANGO JAM",
        "KISSAN PINE APPLE JAM", "MAGGI HOT & SWEET SAUCE", "KISSAN TOMATO KETCHUP BOTTLE",
        "CHINGS SAUCE GREEN CHILLY", "CHINGS SAUCE RED CHILLY", "CHINGS SAUCE DARK SOY",
        "CHINGS SHEZWAN CHUTNY", "CHINGS VINIGAR", "VEEBA SAUCE", "SOHNA MANGO PICKLES",
        "SOHNA MIX PIKLES", "SOHNA CHILLI PICKLES", "PATANJALI AMLA MURABBA",
        "PACHRANGA AMLA MURABBA JAR", "PACHRANGA CARROT MURABBA PJ JAR",
        "PACHRANGA APPLE MURABBA JAR", "PACHRANGA TURNIP CAULIFLOWER CARROT",
        "PACHRANGA MANGO UNPEELED", "PACHRANGA MANGO PEELES", "PACHRANGA MIX PICKLE",
        "PACHRANGA RED CHILLI STUFFED", "PACHRANGA AMLA PICKLE PLASTIC JAR",
        "LIJJAT URAD WITH PAPPER", "LIJJAT UDAD WITH GREEN CHILLI", 
        "LIJJAT UDAD WITH RED CHILLI", "LIJJAT PLAIN UDAD", "LIJJAT UDAD JEERA",
        "LIJJAT MOONG PLAIN -50% UDAD + 50% MOONG", 
        "LIJJAT MOONG WITH PEPPER 50% +50% MOONG", "LIJJAT UDAD SPECIAL",
        "LIJJAT MOONG SPECIAL -50% UDAD +50% MOONG", "LIJJAT PUNJABI MASALA SPECIAL",
        "LIJJAT UDADA SINDHI MASALA SPECIAL", "LIJJAT DHAMTA SPECIAL", "PANJABI WADI",
        "NUTELLA SOYA CHUNKS", "SOYA CHUNK MINI", "SOYA CHUNK BIG", "WEIKFILD CORN FLOUR",
        "VIOLA ESSENCE VANILLA", "VIOLA ESSENCE ROSE", "VIOLA ESSENCE KEWRA",
        "VIOLA ESSENCE BIRYANI", "VIOLA ESSENCE MANGO", "VIOLA ESSENCE ORANGE",
        "VIOLA ESSENCE ICECREAM", "VIOLA ESSENCE KHUS"
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
            # Prefixes cover Brands (Knorr, Lijjat) or Types (Soya Chunk)
            grouped_prefixes = [
                "KNORR", "MAGGI", "CHINGS", "BAMBINO", "ANIL", "KISSAN", "VEEBA", 
                "SOHNA", "PATANJALI", "PACHRANGA", "LIJJAT", "VIOLA", "WEIKFILD", 
                "TOP RAMEN", "YIPPEE", "SOYA CHUNK", "NUTELLA"
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
    assign_processed_foods()
