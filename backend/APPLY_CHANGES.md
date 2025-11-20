# Instructions for Applying Backend Changes

Follow these steps to apply the changes for featured products management:

1. Apply the migration for featured products:

```bash
cd /var/www/westend-Corporation/backend
source venv/bin/activate

# Run the migration
python manage.py migrate
```

2. Fix mixed content issues in the database:

```bash
# Run the script to fix image URLs
python fix_all_images.py
```

3. Update the admin interface:

```bash
# Copy the new admin.py file
cp api/admin.py.new api/admin.py
```

4. Update the views to support featured products filtering:

```bash
# Copy the new views.py file
cp api/views.py.new api/views.py
```

5. Restart the backend service:

```bash
sudo systemctl restart westend-backend-tcp
```

6. Access the admin panel to manage featured products:

Visit https://westendcorporation.in/admin/ and log in with your admin credentials.

## Managing Featured Products

1. Go to the Products section in the admin panel
2. For each product you want to feature on the homepage:
   - Check the "Is featured" checkbox in the "Featured Settings" section
   - Set the "Featured order" value (lower numbers appear first)
3. Save your changes

The homepage will now display exactly 4 featured products for each vertical. If fewer than 4 featured products are available for a vertical, it will fall back to showing regular products to complete the set of 4.

## Troubleshooting Mixed Content Warnings

If you still see mixed content warnings after applying these changes:

1. Check the browser console to identify which specific images are causing the warnings
2. Verify that all image URLs in the database are using HTTPS
3. Make sure all hardcoded image URLs in the code are using HTTPS
4. Clear your browser cache and reload the page
