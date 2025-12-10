
import os
import django
import sys
from collections import defaultdict

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product

def clean_duplicates():
    print("Fetching all products for deep inspection...")
    all_products = Product.objects.all()
    
    # Dictionary to group products by normalized name
    # Key: Normalized Name, Value: List of Product Objects
    groups = defaultdict(list)
    
    for p in all_products:
        # Normalize: Lowercase + Strip Whitespace
        norm_name = p.name.lower().strip()
        groups[norm_name].append(p)
        
    print(f"Total Products: {len(all_products)}")
    print(f"Unique Names: {len(groups)}")
    
    duplicates_found = 0
    deleted_count = 0
    
    for name, products in groups.items():
        if len(products) > 1:
            duplicates_found += 1
            print(f"\nDuplicate Group: '{name}' (Count: {len(products)})")
            
            # Sorting logic:
            # 1. Has Image (Priority)
            # 2. Latest ID (or keep oldest? Usually keeping oldest is safer for SEO/links, 
            #    but here we want the one with the image if newer ones have it. 
            #    Let's score them.)
            
            scored = []
            for p in products:
                score = 0
                has_valid_image = p.image and 'placeholder' not in str(p.image).lower() and str(p.image).strip() != ''
                if has_valid_image:
                    score += 10 # Big boost for real image
                
                # Secondary: ID. Let's keep the LOWER ID (Original) if images are equal?
                # Or Higher ID (Newest)? 
                # Let's Prefer the one with content.
                
                scored.append((score, p.id, p))
            
            # Sort: Score DESC, then ID ASC (Keep oldest if scores tie)
            # x[0] is score (inv for desc), x[1] is ID (asc)
            scored.sort(key=lambda x: (-x[0], x[1]))
            
            keeper = scored[0][2]
            to_delete = [x[2] for x in scored[1:]]
            
            print(f" -> KEEPING: ID {keeper.id} | Img: {keeper.image} | Vertical: {keeper.vertical.title}")
            
            for p in to_delete:
                print(f" -> DELETING: ID {p.id} | Img: {p.image}")
                p.delete()
                deleted_count += 1

    print(f"\n--------------------------------")
    print(f"Deep Scan Complete.")
    print(f"Duplicate Groups Found: {duplicates_found}")
    print(f"Total Products Deleted: {deleted_count}")
    print(f"Final Count: {Product.objects.count()}")

if __name__ == "__main__":
    clean_duplicates()
