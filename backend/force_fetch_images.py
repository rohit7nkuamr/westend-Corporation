
import os
import warnings
# Suppress warnings immediately
os.environ["PYTHONWARNINGS"] = "ignore"
warnings.filterwarnings("ignore")

import django
import requests
import time
import random
import sys
from io import BytesIO
from django.core.files import File
from duckduckgo_search import DDGS

# Setup Django Environment
sys.path.append('/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product

def force_fetch():
    # Target products with placeholder images
    products_pending = Product.objects.filter(image__icontains='placeholder') | Product.objects.filter(image='')
    
    count = products_pending.count()
    print(f"Starting FORCE FETCH for {count} products...")
    
    if count == 0:
        print("No products need images!")
        return

    # Randomize to avoid getting stuck on the same bad one
    products = list(products_pending)
    random.shuffle(products)

    for product in products:
        print(f"\nProcessing: {product.name} (Vertical: {product.vertical.title})")
        
        # Try multiple search variations
        queries = [
            f"{product.name} product image india",
            f"{product.name} packaging india",
            f"{product.name} brand packet",
            f"{product.name} indian grocery"
        ]

        found_image = False
        
        for query in queries:
            if found_image: break
            
            print(f"  Searching: '{query}'...")
            try:
                with DDGS() as ddgs:
                    # Get up to 3 results per query
                    results = list(ddgs.images(query, max_results=3))
                    
                    for r in results:
                        image_url = r.get('image')
                        if not image_url: continue
                        
                        try:
                            print(f"    Trying: {image_url[:60]}...")
                            response = requests.get(image_url, timeout=10, stream=True)
                            
                            # Validate Content Type
                            ct = response.headers.get('Content-Type', '').lower()
                            if 'image' not in ct:
                                print("    Skip: Not an image content type")
                                continue
                                
                            if response.status_code == 200:
                                # Save it
                                img_temp = BytesIO(response.content)
                                ext = 'jpg'
                                if 'png' in ct: ext = 'png'
                                if 'webp' in ct: ext = 'webp'
                                
                                filename = f"{product.slug}_fetched.{ext}"
                                product.image.save(filename, File(img_temp), save=True)
                                print(f"  SUCCESS! Saved image for {product.name}")
                                found_image = True
                                break
                            else:
                                print(f"    Failed: Status {response.status_code}")
                                
                        except Exception as e:
                            print(f"    Error downloading: {e}")
                            
                    if not found_image:
                        time.sleep(2) # Short pause between queries
                        
            except Exception as search_err:
                print(f"  Search Error: {search_err}")
                if "403" in str(search_err) or "Ratelimit" in str(search_err):
                    print("  HIT RATE LIMIT! Sleeping for 60 seconds...")
                    time.sleep(60)
                else:
                    time.sleep(5)
        
        if not found_image:
            print(f"  FAILED to find image for {product.name} after multiple attempts.")
        
        # Rate limit protection
        delay = random.uniform(10, 20) # Increased delay
        print(f"  Sleeping {delay:.1f}s...")
        time.sleep(delay)

if __name__ == "__main__":
    force_fetch()
