#!/usr/bin/env python
"""
Test the logout endpoint specifically
"""
import os
import sys
import django

sys.path.insert(0, '/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client
from django.contrib.auth.models import User

print("Testing Admin Logout Endpoint")
print("=" * 60)

# Create a client and login
client = Client(SERVER_NAME='westendcorporation.in', HTTP_HOST='westendcorporation.in')

# Get a superuser
user = User.objects.filter(is_superuser=True).first()
print(f"Found superuser: {user.username}")

# Force login (bypass password)
client.force_login(user)
print("User logged in successfully")

# Try to access admin
print("\n1. Accessing /admin/...")
response = client.get('/admin/', secure=True)
print(f"   Status: {response.status_code}")

# Try to logout
print("\n2. Posting to /admin/logout/...")
try:
    response = client.post('/admin/logout/', secure=True, follow=False)
    print(f"   Status: {response.status_code}")
    if response.status_code == 302:
        print(f"   Redirect: {response.url}")
        print("   ✓ Logout works correctly")
    else:
        print(f"   ✗ Unexpected status code")
        print(f"   Content: {response.content[:500]}")
except Exception as e:
    print(f"   ✗ ERROR: {str(e)}")
    import traceback
    traceback.print_exc()

print("=" * 60)
