
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

def report_dupes():
    print("Scanning for fuzzy duplicates (REPORT ONLY)...")
    products = list(Product.objects.all().order_by('name'))
    n = len(products)
    
    seen = set()
    
    for i in range(n):
        p1 = products[i]
        for j in range(i + 1, n):
            p2 = products[j]
            
            # Optimization: Sort of
            # Only check same vertical to reduce noise/cost
            if p1.vertical_id != p2.vertical_id: continue
            
            name1 = p1.name.lower().strip()
            name2 = p2.name.lower().strip()
            
            # Skip checking against "variants" that are clearly different
            # e.g. "Red" vs "Green"
            if 'red' in name1 and 'green' in name2: continue
            if 'green' in name1 and 'red' in name2: continue
            
            # 1. Substring
            is_substring = (name1 in name2) or (name2 in name1)
            
            # 2. Similarity
            similarity = similar(name1, name2)
            
            threshold = 0.90 # High constraint
            
            # If substring, lower threshold allowed
            if is_substring and similarity > 0.6:
                # Still check context
                pass
            elif similarity < threshold:
                continue
                
            pair_key = tuple(sorted([p1.id, p2.id]))
            if pair_key in seen: continue
            seen.add(pair_key)
            
            print(f"\nPotential Duplicate in '{p1.vertical.title}':")
            print(f"  [A] ID:{p1.id:<4} Name: {p1.name:<30} (Img: {'Yes' if has_real_image(p1) else 'No'})")
            print(f"  [B] ID:{p2.id:<4} Name: {p2.name:<30} (Img: {'Yes' if has_real_image(p2) else 'No'})")
            print(f"  Similarity: {similarity:.2f}")

if __name__ == "__main__":
    report_dupes()
