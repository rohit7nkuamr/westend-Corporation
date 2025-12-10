import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def assign_drinks():
    print("Starting Processed Drinks & Confectionery migration...")
    
    # 1. Get or Create the Target Vertical
    target_vertical_name = "Processed Drinks & Confectionery"
    
    try:
        vertical = Vertical.objects.get(title__iexact=target_vertical_name)
        print(f"Found existing vertical: {vertical.title}")
    except Vertical.DoesNotExist:
        vertical = Vertical.objects.create(
            title=target_vertical_name,
            description='Refreshing drinks and delightful confectionery.',
            icon_name='Snowflake', # Placeholder
            secondary_icon_name='Snowflake',
            gradient='from-pink-500 to-rose-500', 
            bg_gradient='from-pink-50 to-rose-50',
            button_color='bg-rose-600',
            order=5
        )
        print(f"Created new vertical: {target_vertical_name}")

    # 2. List of Products to Move
    product_names = [
        "FANTA CAN", "LIMCA CAN", "THUMS UP CAN", "FANTA GLASS BOTTLE", "MAZZA GLASS BOTTLE",
        "THUMS UP GLASS BOTTLE", "LIMCA GLASS BOTTLE", "FANTA PET BOTTEL", "LIMCA PET BOTTEL",
        "THUMS UP PET BOTTEL", "FANTA UP PET BOTTEL", "CAMPA COLA", "CAMPA LEMON",
        "CAMPA ORANGE", "APPY FIZZ", "FROOTI", "JALANI NIMBU PANI", "JALANI AAM PANNA",
        "KASHMIRA MALA JEERA CAN", "KASHMIRA GLASS BOTTEL", "LAHORI JEERA DRINK",
        "KANCHAZ LEMON DRINKS", "KANCHAZ SHIKANJI DRINKS", "KANCHAZ KACHA AAM DRINKS",
        "KANCHAZ MINT MOJITO DRINKS", "KASMIRA JEERA DRINK CAN", 
        "KASMIRA JEERA DRINK GLASS BTL", "RUBY PEDHA SWEET", "ROOHAFAZA SHARBAT",
        "NESTLE MAHA MUNCH CHOCOLATE", "PULSE KACHHA AAM CANDY JAR SMALL",
        "LONDONDERRY TOFFEE", "MELODY CHOCOLATY TOFFEE", "SHADANI COCONUT PEDA",
        "SHADANI COCONUT SWEET", "SHADANI PAAN MIX SAUNF", "SHADANI IMLI BITE",
        "SHADANI CHATPTA AMLA CANDY", "SHADANI CHATPATI CANDY CAN", 
        "SHADANI MIX FRUIT CANDY CAN", "SHADANI PAAN CANDY CAN", "SHADANI MANGO CANDY CAN",
        "SHADANI LEMON CANDY CAN", "SHADANI BLACK CURRENT CANDY CAN", 
        "SHADANI LITCHI CANDY CAN", "SHADANI KACHA AAM CANDY CAN", 
        "SHADANI SWEET IMLI CANDY CAN", "SHADANI FRUIT JELLY CAN", 
        "SHADANI ANARDANA GOLI CAN", "SHADANI KHATTA MEETHA AAMPAK CAN",
        "SHADANI RAM LADOO CAN", "SHADANI HING PEDA CAN", "SHADANI IMLI BOOTA CAN",
        "SHADANI CHATPATA AMLA CAN", "SHADANI AJWAIN PACHAK CAN", "SHADANI JELLY JELLY CAN",
        "SHADANI KALA KHATTA CAN", "SHADANI MANGO BITE CAN", "SHADANI IMLI BITE CAN",
        "SHADANI MADRASI SAUNF CAN", "SHADANI PLAIN MIX SAUNF CAN", 
        "SHADANI ROASTED SPECIAL SAUNF CAN", "SHADANI PAAN MIX SAUNF CAN", 
        "SHADANI CHENNAI SAUNF CAN", "RINKAS MANGO CANDY JAR", "RINKAS CHATMOLA CANDY JAR",
        "RINKAS COLA CANDY JAR", "RINKAS ORANGE CANDY JAR", "RINKAS LICHI CANDY JAR",
        "RINKAS CHATMOLA GOLI JAR", "RINKAS MIX FRUIT CANDY JAR", 
        "RINKAS KACHI KERY CANDY JAR", "RINKAS AAM PAPAD JAR", "RINKAS IMLI JELLY BAR JAR",
        "RINKAS CHATMOLA (5 POUCH)", "SWEET KHEEL", "PLAIN KHEEL + PATASHA IN JAR",
        "BINGO MAD ANGLE MASALA", "BINGO CHESSES NACHOS", "BINGO MAD ANGLE TOMATO MADNESS",
        "BINGO MAD ANGLE ACHARI MASTI", "BINGO TEDHE MEDHE", "BINGO MAD ANGLE CHAT",
        "BINGO MAD ANGLE PIZZA", "KURKURE MASALA MUNCH", "KURKURE SOLID MASTI",
        "KURKURE RED CHILLI CHATAKA", "KURKURE GREEN CHUTNEY", 
        "LAYS AMERICAN STYLE CREAM & ONION", "LAYS WEST INDIES HOT & SWEET CHILLI",
        "LAYS SPANISH TOMATO TANGO", "LAYS CLASIC SALTED", "LAYS MAGIC MASALA",
        "LAYS CHILLLI LEMON", "LAYS MAX MACHO CHILLI", "UNCLE CHIPS SPICY TREAT",
        "DIAMOND CREAM N ONION CHIPS", "DIAMOND MAGIC MASALA CHIPS", "DIAMOND TOM-CHI CHIPS",
        "DIAMOND CLASIC SALTED CHIPS", "DIAMOND PlAIN SALTED CHIPS", 
        "DIAMOND PIRI PIRI CHIPS", "CHAND TARA", "LAL JUBAN CHURAN STICK",
        "KAALA JADOO CHURAN STICK", "ROSTED MAKHANA PUDINA POP IN JAR",
        "ROSTED MAKHANA HIMALAYAN SALT IN JAR", "ROSTED MAKHANA PERI PERI IN JAR",
        "ROSTED MAKHANA CHEES HERBS IN JAR", "MARUNDA GACHAK", "FINGER JACHAK",
        "BODHI GACHAK", "DOUBLE PATTI GACHAK", "PEANUT GACHAK", "GUR REWARI",
        "SUGAR REWARI", "RAJGIRI LADOO", "ANGOORI PETHA", "BOONDI", "AAM GOLI CAN",
        "SHODHY HARAD CAN", "DHANNA DAL CAN", "SUPER MIX CAN", "MADHUR CHURAN CONT",
        "COCONUT LADDU CAN", "PAN GULKAND JAR", "DRY PAN JAR", 
        "JHILMIL SUPARI CONT (W/O SUPARI)", "MITH PAN CHURAN JAR", 
        "KASHMIRI MIX CAN (W/O SUPARI)", "GREEN MUKHWASH CAN", 
        "BANASARI PAN JAR (W/O SUPARI)", "CALCUTTA PAN JAR", "ROYAL OLYMPIC MUKHWAS CAN",
        "SUGAR COATED SONFF CAN", "MADRASI SONFF( WHITE) CAN", "MADRASI SONFF( GREEN) CAN",
        "APLAM CHAPLAM CAN", "ANARDANA GOLI CAN", "IMLI LADOO (MODAK) CAN",
        "MANCHALI IMLI CAN", "HAZMA HAZAM CAN", "AMLA PACHAK CAN",
        "THANDA MITHA PAN GULKAND JAR", "TOO YUMM MGC DP CHAAT", 
        "TOO YUMM MGC TANGY TOMATO", "TOO YUMM VS CHILLI CHATAKA", 
        "TOO YUMM VS SOUR CREAM & ONION", "TOO YUMM CHIPS INDIAN MASALA",
        "TOO YUMM CHIPS SPANISH TOMATO", "TOO YUMM KARARE CHILLI ACHARI", 
        "TOO YUMM KARARE MUNCHY MASALA", "TOO YUMM KARARE NOODLE MASALA",
        "TOO YUMM PS ALOO CHAAT", "TOO YUMM CHIPS ASCO", "CORNITOS TACO SHELL 4\"",
        "CORNITOS TACO SHELL 6\"", "CORNITOS COATED GREEN PEAS SWABI",
        "CORNITOS COATED GREEN PEA HOT & SPICE", "CORNITOS ROSTED PEANUTS SALTED",
        "CORNITOS PARTY MIX", "CORNITOS ROSTED PUMPKIN SEEDS SALTED",
        "CORNITOS SUNFLOWER SEEDS NATURAL", "CORNITOS CORN NUT LEMON CHILLI CILANTRO",
        "CORNITOS CORN NUT CHEESY JALAPENO", "CORNITOS SUPER SEED (MIX SEED)",
        "CHIPS/WAFERS SAUCY TOMATO", "CHIPS/WAFERS PUDINA JALJIRA"
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
            # Log what we found for verification
            matched_names = list(products.values_list('name', flat=True))
            print(f"  Match: '{name}' -> {[n for n in matched_names]}")
            
            updated = products.update(vertical=vertical)
            found_count += updated
        else:
            # 4. Handle Grouped Products (e.g. "LAYS MAGIC MASALA" -> "LAYS (MAGIC MASALA, ...)")
            # Common prefixes for grouped items
            grouped_prefixes = [
                "LAYS", "KURKURE", "BINGO", "TOO YUMM", "CORNITOS", "DIAMOND", "SHADANI", "RINKAS",
                "ROSTED", "PULSE", "FANTA", "MAKHANA"
            ]
            
            matched = False
            for prefix in grouped_prefixes:
                if name.upper().startswith(prefix):
                    # Check if the prefix exists in DB with parentheses or similar
                    # e.g. "LAYS (..."
                    parent_products = Product.objects.filter(name__istartswith=prefix)
                    if parent_products.exists():
                        updated = parent_products.update(vertical=vertical)
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
    assign_drinks()
