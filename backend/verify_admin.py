
import os
import django
from django.conf import settings

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

try:
    from api import admin
    print("Successfully imported api.admin")
    from api.models import Brochure
    print("Successfully imported Brochure model")
    from api.admin_site import westend_admin_site
    if validate_registry := getattr(westend_admin_site, '_registry', None):
        if Brochure in validate_registry:
            print("Brochure is registered in westend_admin_site")
        else:
            print("ERROR: Brochure is NOT registered in westend_admin_site")
    else:
        print("Could not inspect registry")

except Exception as e:
    print(f"Error importing admin: {e}")
