#!/usr/bin/env python
"""
More detailed test to identify the 400 error cause
"""
import os
import sys
import django

sys.path.insert(0, '/var/www/westend-Corporation/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client
from django.conf import settings

print("=" * 60)
print("DETAILED ADMIN DIAGNOSTICS")
print("=" * 60)

print("\nDjango Settings Check:")
print(f"DEBUG: {settings.DEBUG}")
print(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
print(f"SECURE_SSL_REDIRECT: {getattr(settings, 'SECURE_SSL_REDIRECT', False)}")
print(f"SESSION_COOKIE_SECURE: {getattr(settings, 'SESSION_COOKIE_SECURE', False)}")
print(f"CSRF_COOKIE_SECURE: {getattr(settings, 'CSRF_COOKIE_SECURE', False)}")

print("\nTesting with different server names...")

test_hosts = [
    'localhost',
    '127.0.0.1',
    'westendcorporation.in',
    'www.westendcorporation.in',
    '157.173.221.140'
]

for host in test_hosts:
    client = Client(SERVER_NAME=host, HTTP_HOST=host)
    try:
        response = client.get('/admin/', follow=False, secure=False)
        print(f"\n{host}:")
        print(f"  Status: {response.status_code}")
        if hasattr(response, 'url'):
            print(f"  Redirect: {response.url}")
    except Exception as e:
        print(f"\n{host}:")
        print(f"  Error: {str(e)}")

print("\n" + "=" * 60)
