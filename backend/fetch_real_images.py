
import os
import warnings
# Suppress warnings immediately
os.environ["PYTHONWARNINGS"] = "ignore"
warnings.filterwarnings("ignore")

import django
import requests
import time
import random
from io import BytesIO
from django.core.files import File
from duckduckgo_search import DDGS

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical

def fetch_images():
    try:
        vertical = Vertical.objects.get(title="Processed Foods")
    except Vertical.DoesNotExist:
        print("Vertical 'Processed Foods' not found!")
        return

    # Filter products that are in Processed Foods
    # We can check if name is in the list or just process all in that vertical
    
    # Import garbage collector and warnings
    import gc
    import warnings
    import os
    
    # Force ignore all warnings
    os.environ["PYTHONWARNINGS"] = "ignore"
    warnings.filterwarnings("ignore")
    
    print(f"Starting continuous image enrichment process (Optimized Mode)...")


    while True:
        # Re-fetch the queryset in each iteration to get fresh data
        products_pending = Product.objects.filter(image__icontains='placeholder') | Product.objects.filter(image='')
        
        count = products_pending.count()
        if count == 0:
            print("All products have been processed! Exiting.")
            break
            
        print(f"Remaining products to process: {count}")
        
        # Take 1 random pending product at a time
        # This prevents getting stuck on a single product if it keeps failing (e.g. 403 errors)
        batch = products_pending.order_by('?')[:1]
        
        for product in batch:
            print(f"Searching for: {product.name}...")
            
            # Using a context manager for DDGS ensures subprocesses are killed after use
            try:
                with DDGS() as ddgs:
                    query = f"{product.name} product image india"
                    
                    results = list(ddgs.images(
                        query,
                        region="in-en",
                        safesearch="off",
                        size="Medium",
                        type_image="photo",
                        max_results=2
                    ))
                    
                    if results:
                        success = False
                        for result in results:
                            image_url = result['image']
                            print(f"  Attempting URL: {image_url}")
                            
                            try:
                                headers = {
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                                }
                                # Use a Session for better connection handling
                                with requests.Session() as session:
                                    response = session.get(image_url, headers=headers, timeout=15)
                                    
                                    if response.status_code == 200:
                                        content_type = response.headers.get('content-type', '').lower()
                                        ext = 'jpg'
                                        if 'png' in content_type: ext = 'png'
                                        elif 'webp' in content_type: ext = 'webp'
                                            
                                        filename = f"{product.slug}.{ext}"
                                        
                                        img_temp = BytesIO(response.content)
                                        product.image.save(filename, File(img_temp), save=True)
                                        print(f"  SUCCESS: Saved image for {product.name}")
                                        success = True
                                        
                                        # Clear large objects explicitly
                                        del img_temp
                                        break
                                    else:
                                        print(f"  Failed (Status {response.status_code})")
                            except Exception as e:
                                print(f"  Download error: {e}")
                                
                        if not success:
                           print(f"  Could not download any images for {product.name}")
                           # Slightly punitive delay for failed items so we don't hammer
                    else:
                        print("  No search results found.")
                        
            except Exception as e:
                print(f"  Search/Processing error: {e}")
            
            # Force Garbage Collection
            gc.collect()
            
            # Randomized Delay (Anti-Bot: Human-like behavior)
            import random
            sleep_time = random.uniform(30, 50)
            print(f"  Waiting {sleep_time:.1f} seconds (Randomized safety delay)...")
            time.sleep(sleep_time)

if __name__ == "__main__":
    fetch_images()
