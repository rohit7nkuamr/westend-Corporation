
import os
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
    products = Product.objects.filter(vertical=vertical)
    
    print(f"Found {products.count()} products to process.")
    
    ddgs = DDGS()

    for product in products:
        # Skip if it doesn't have the placeholder (assuming we only want to update placeholders)
        # Or just update all to be safe? User said "placeholder image i dont want that"
        # Let's assume we update all in this vertical since they were just imported.
        
        print(f"Searching for: {product.name}...")
        
        query = f"{product.name} product india clear high quality"
        
        try:
            results = list(ddgs.images(
                query,
                region="in-en",
                safesearch="off",
                size="Medium",
                type_image="photo",
                max_results=3
            ))
            
            if results:
                image_url = results[0]['image']
                print(f"  Found URL: {image_url}")
                
                # Download image
                try:
                    headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                    response = requests.get(image_url, headers=headers, timeout=10)
                    
                    if response.status_code == 200:
                        # Extract extension
                        content_type = response.headers.get('content-type', '')
                        ext = 'jpg'
                        if 'png' in content_type:
                            ext = 'png'
                        elif 'jpeg' in content_type:
                            ext = 'jpg'
                        elif 'webp' in content_type:
                            ext = 'webp'
                            
                        filename = f"{product.slug}.{ext}"
                        
                        # Save to model
                        img_temp = BytesIO(response.content)
                        product.image.save(filename, File(img_temp), save=True)
                        print(f"  Saved image for {product.name}")
                        
                        # Sleep to be polite
                        time.sleep(random.uniform(1.0, 2.5))
                        
                    else:
                        print(f"  Failed to download {image_url}: Status {response.status_code}")
                except Exception as e:
                    print(f"  Error downloading image: {e}")
            else:
                print("  No results found.")
                
        except Exception as e:
            print(f"  Search error: {e}")
            time.sleep(5) # Backoff on error

if __name__ == "__main__":
    fetch_images()
