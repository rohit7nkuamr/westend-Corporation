#!/usr/bin/env python
"""
Test logout with detailed timing
"""
import os
import sys
import django
import time

sys.path.insert(0, '/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client
from django.contrib.auth.models import User
from threading import Thread
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Request timed out!")

print("Testing Admin Logout with Timeout Detection")
print("=" * 60)

# Set up signal for timeout
signal.signal(signal.SIGALRM, timeout_handler)

# Create a client and login
client = Client(SERVER_NAME='westendcorporation.in', HTTP_HOST='westendcorporation.in')

# Get a superuser
user = User.objects.filter(is_superuser=True).first()
print(f"Logging in as: {user.username}")

# Force login
client.force_login(user)

# Try to logout with timeout
print("\nAttempting logout...")
start_time = time.time()

try:
    # Set 10 second timeout
    signal.alarm(10)
    
    response = client.post('/admin/logout/', secure=True, follow=False)
    
    # Cancel alarm
    signal.alarm(0)
    
    elapsed = time.time() - start_time
    print(f"✓ Logout completed in {elapsed:.2f} seconds")
    print(f"  Status: {response.status_code}")
    
    if hasattr(response, 'url'):
        print(f"  Redirect: {response.url}")
    
except TimeoutError:
    elapsed = time.time() - start_time
    print(f"✗ TIMEOUT! Logout request hung for {elapsed:.2f}+ seconds")
    print("  This is the issue causing worker timeouts!")
    
except Exception as e:
    elapsed = time.time() - start_time
    print(f"✗ Error after {elapsed:.2f} seconds: {str(e)}")

print("=" * 60)
