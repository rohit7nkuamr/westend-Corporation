
import os
import django
import sys
from difflib import SequenceMatcher

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

def has_real_image(p):
    if not p.image: return False
    s = str(p.image).lower()
    return 'placeholder' not in s and s.strip() != ''

def clean_fuzzy():
    print("Scanning for fuzzy duplicates...")
    products = list(Product.objects.all().order_by('name'))
    
    n = len(products)
    to_delete = set()
    
    # Simple O(N^2) scan, but optimized by sorting. 
    # Actually for 300 items O(N^2) is 90,000 checks, which is instant.
    
    deleted_count = 0
    
    for i in range(n):
        if products[i].id in to_delete: continue
        
        for j in range(i + 1, n):
            if products[j].id in to_delete: continue
            
            p1 = products[i]
            p2 = products[j]
            
            # Skip if already marked for deletion
            if p1.id in to_delete: break 
            if p2.id in to_delete: continue
            
            name1 = p1.name.lower().strip()
            name2 = p2.name.lower().strip()
            
            # Check Similarity
            # 1. Exact Substring? ONLY if same vertical!
            #    (e.g. "Ajwain" (Spice) vs "Ajwain Biscuits" (Baked Goods) -> DIFFERENT)
            #    (e.g. "Boondi" (Confectionery) vs "Boondi 5kg" (Confectionery) -> DUPLICATE)
            is_same_vertical = (p1.vertical_id == p2.vertical_id)
            is_substring = (name1 in name2) or (name2 in name1)
            
            # 2. Similarity Ratio
            similarity = similar(name1, name2)
            
            is_match = False
            
            if is_same_vertical:
                if is_substring: is_match = True
                if similarity > 0.80: is_match = True
            else:
                # If different verticals, must be VERY similar (almost identical)
                if similarity > 0.95: is_match = True
            
            if is_match:
                # Potential Duplicate
                if len(name1) < 4 or len(name2) < 4: continue
                
                print(f"\nMatch Found (Vertical: {p1.vertical.title}):\n A: [{p1.id}] '{p1.name}' (Img: {has_real_image(p1)})\n B: [{p2.id}] '{p2.name}' (Img: {has_real_image(p2)})")
                print(f" Ratio: {similarity:.2f} | Substring: {is_substring} | Same Vertical: {is_same_vertical}")
                
                # Decision Logic: Prefer Real Image, then Longer Name
                img1 = has_real_image(p1)
                img2 = has_real_image(p2)
                
                keeper = None
                loser = None
                
                if img1 and not img2:
                    keeper, loser = p1, p2
                elif img2 and not img1:
                    keeper, loser = p2, p1
                else:
                    if len(p1.name) > len(p2.name):
                        keeper, loser = p1, p2
                    else:
                        keeper, loser = p2, p1
                
                print(f" -> ACTION: Keeping '{keeper.name}' | Deleting '{loser.name}'")
                to_delete.add(loser.id)
                loser.delete()
                deleted_count += 1
                
                # If p1 was deleted, stop inner loop
                if loser == p1:
                    break

    print(f"\n--------------------------------")
    print(f"Fuzzy Cleanup Complete.")
    print(f"Total Products Deleted: {deleted_count}")
    print(f"Remaining Count: {Product.objects.count()}")

if __name__ == "__main__":
    clean_fuzzy()
