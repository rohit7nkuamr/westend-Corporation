#!/usr/bin/env python3
"""
IndexNow API integration - Instantly notify search engines of new/updated URLs
https://www.indexnow.org/
"""
import requests
import json
from datetime import datetime

# Your IndexNow API key (generate at https://www.bing.com/indexnow)
API_KEY = "3c580d5b402030bf75b586c90b8542e625e1afe701bf37c55e118b1b6f4550e6"
HOST = "westendcorporation.in"
KEY_LOCATION = f"https://{HOST}/{API_KEY}.txt"

def submit_url(url):
    """Submit a single URL to IndexNow"""
    endpoint = "https://api.indexnow.org/indexnow"
    
    payload = {
        "host": HOST,
        "key": API_KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": [url]
    }
    
    try:
        response = requests.post(
            endpoint,
            headers={"Content-Type": "application/json"},
            data=json.dumps(payload),
            timeout=10
        )
        
        if response.status_code == 200:
            print(f"✓ Successfully submitted: {url}")
            return True
        else:
            print(f"✗ Error {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ Exception: {e}")
        return False

def submit_sitemap():
    """Submit all URLs from sitemap"""
    sitemap_url = f"https://{HOST}/sitemap.xml"
    
    try:
        response = requests.get(sitemap_url, timeout=10)
        # Parse sitemap and extract URLs
        import re
        urls = re.findall(r'<loc>(.*?)</loc>', response.text)
        
        print(f"Found {len(urls)} URLs in sitemap")
        
        # Submit in batches of 10,000 (IndexNow limit)
        batch_size = 10000
        for i in range(0, len(urls), batch_size):
            batch = urls[i:i+batch_size]
            
            payload = {
                "host": HOST,
                "key": API_KEY,
                "keyLocation": KEY_LOCATION,
                "urlList": batch
            }
            
            response = requests.post(
                "https://api.indexnow.org/indexnow",
                headers={"Content-Type": "application/json"},
                data=json.dumps(payload),
                timeout=30
            )
            
            if response.status_code == 200:
                print(f"✓ Submitted batch {i//batch_size + 1} ({len(batch)} URLs)")
            else:
                print(f"✗ Error in batch {i//batch_size + 1}: {response.status_code}")
                
    except Exception as e:
        print(f"✗ Exception: {e}")

if __name__ == "__main__":
    print(f"IndexNow Submission - {datetime.now()}")
    print(f"Host: {HOST}")
    print("-" * 50)
    
    # Submit entire sitemap
    submit_sitemap()
    
    print("-" * 50)
    print("Done!")
