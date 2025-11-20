import os
import django
import re
from django.db.models import FileField

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Product, Vertical
from django.conf import settings
from django.db import models

def fix_image_urls():
    """
    Comprehensive fix for image URLs:
    1. Replace http: with https:
    2. Replace IP addresses with domain name
    3. Fix any relative paths
    """
    print("Starting comprehensive image URL fix...")
    
    # Get all models in the project
    all_models = []
    for app_config in django.apps.apps.get_app_configs():
        all_models.extend(app_config.get_models())
    
    # Process each model
    for model in all_models:
        print(f"Checking model: {model.__name__}")
        
        # Get all FileField and ImageField fields
        file_fields = []
        for field in model._meta.get_fields():
            if isinstance(field, models.FileField) or isinstance(field, models.ImageField):
                file_fields.append(field.name)
        
        if not file_fields:
            continue
            
        print(f"  Found file fields: {', '.join(file_fields)}")
        
        # Process each instance of the model
        for instance in model.objects.all():
            for field_name in file_fields:
                field = getattr(instance, field_name)
                if not field:
                    continue
                
                # Get the current URL
                current_url = str(field)
                
                # Fix the URL
                fixed_url = current_url
                
                # Replace http: with https:
                if 'http:' in fixed_url:
                    fixed_url = fixed_url.replace('http:', 'https:')
                
                # Replace IP addresses with domain name
                ip_pattern = r'https?://\d+\.\d+\.\d+\.\d+'
                if re.search(ip_pattern, fixed_url):
                    fixed_url = re.sub(ip_pattern, 'https://westendcorporation.in', fixed_url)
                
                # If URL changed, update the field
                if fixed_url != current_url:
                    print(f"    Updating {model.__name__}.{field_name} for {instance}:")
                    print(f"      From: {current_url}")
                    print(f"      To:   {fixed_url}")
                    
                    # If it's a full URL, extract the path part
                    if fixed_url.startswith('https://westendcorporation.in/media/'):
                        field.name = fixed_url.replace('https://westendcorporation.in/media/', '')
                    else:
                        field.name = fixed_url
                    
                    # Save the instance
                    try:
                        instance.save(update_fields=[field_name])
                    except Exception as e:
                        print(f"      Error saving: {e}")

    print("Image URL fix completed.")

if __name__ == "__main__":
    fix_image_urls()
