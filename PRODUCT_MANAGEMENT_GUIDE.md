# Product Management Guide for Westend Corporation

This guide explains how to manage product details through the Django admin interface.

## Accessing the Admin Interface

1. Open your web browser and navigate to:
   ```
   http://157.173.221.140/admin
   ```

2. Log in with the superuser credentials you created:
   - Username: rohit
   - Password: (the password you set)

## Understanding the Product Structure

The product catalog is organized in a hierarchical structure:

1. **Verticals (Categories)**: Main product categories like "Groceries & Staples", "Frozen Vegetables", etc.
2. **Vertical Products**: Simple product listings under each vertical (shown on the homepage)
3. **Products**: Detailed product entries with full specifications

## Managing Product Categories (Verticals)

### Adding a New Category

1. In the admin dashboard, click on **Verticals**
2. Click the **Add Vertical** button
3. Fill in the required fields:
   - **Title**: Category name (e.g., "Groceries & Staples")
   - **Description**: Detailed description of the category
   - **Icon Name**: Select an icon from the dropdown (e.g., "Wheat")
   - **Secondary Icon Name**: Select a secondary icon
   - **Gradient**: Color gradient for the category card (e.g., "from-amber-500 to-orange-600")
   - **Bg Gradient**: Background gradient (e.g., "from-primary-50 to-amber-50")
   - **Image**: Upload an image for the category
   - **Button Color**: Color for the button (e.g., "from-amber-500 to-orange-600")
   - **Button Text**: Text for the button (default: "REQUEST QUOTE")
   - **Order**: Numerical order for sorting (lower numbers appear first)
   - **Is Active**: Check to make the category visible on the site

4. In the **Vertical products** section at the bottom, you can add simple product listings that appear under this category on the homepage
5. Click **Save** when done

### Editing an Existing Category

1. In the admin dashboard, click on **Verticals**
2. Click on the category you want to edit
3. Make your changes
4. Click **Save**

## Managing Detailed Products

### Adding a New Product

1. In the admin dashboard, click on **Products**
2. Click the **Add Product** button
3. Fill in the required fields:
   - **Vertical**: Select the category this product belongs to
   - **Name**: Product name
   - **Description**: Detailed product description
   - **Image**: Upload a product image
   - **MOQ**: Minimum Order Quantity (e.g., "100 kg")
   - **Packaging**: Packaging information (e.g., "Bulk/Custom")
   - **Badge**: Optional badge (e.g., "Bestseller", "New", "Organic")
   - **Is Active**: Check to make the product visible on the site
   - **Order**: Numerical order for sorting (lower numbers appear first)
4. Click **Save** when done

### Editing an Existing Product

1. In the admin dashboard, click on **Products**
2. Click on the product you want to edit
3. Make your changes
4. Click **Save**

### Deleting a Product

1. In the admin dashboard, click on **Products**
2. Select the checkbox next to the product(s) you want to delete
3. From the "Action" dropdown, select "Delete selected products"
4. Click "Go"
5. Confirm the deletion

## Managing Contact Inquiries and Quote Requests

### Viewing Contact Inquiries

1. In the admin dashboard, click on **Contact inquiries**
2. You'll see a list of all contact form submissions
3. Click on any entry to view the full details
4. Mark as "Is read" when processed

### Viewing Quote Requests

1. In the admin dashboard, click on **Quote requests**
2. You'll see a list of all product quote requests
3. Click on any entry to view the full details
4. Mark as "Is processed" when handled

## Adding Sample Data

If you want to quickly add sample data to test the website, you can use the Django shell:

1. SSH into your server
2. Navigate to the project directory:
   ```bash
   cd /var/www/westend-Corporation/backend
   ```
3. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```
4. Open the Django shell:
   ```bash
   python manage.py shell
   ```
5. Add sample data:
   ```python
   from api.models import Vertical, VerticalProduct, Product
   
   # Create a vertical (category)
   v1 = Vertical.objects.create(
       title='Groceries & Staples',
       description='Certified organic pulses, premium grains, authentic spice blends',
       icon_name='Wheat',
       secondary_icon_name='Leaf',
       gradient='from-amber-500 to-orange-600',
       bg_gradient='from-primary-50 to-amber-50',
       image='verticals/groceries.jpg',  # You'll need to manually add this image to media/verticals/
       button_color='from-amber-500 to-orange-600',
       button_text='REQUEST QUOTE',
       order=1
   )
   
   # Add products under the vertical
   VerticalProduct.objects.create(vertical=v1, name='Certified Organic Pulses', order=1)
   VerticalProduct.objects.create(vertical=v1, name='Premium Quality Grains', order=2)
   
   # Add a detailed product
   Product.objects.create(
       vertical=v1,
       name='Organic Kabuli Chana',
       description='Premium quality organic chickpeas',
       image='products/chana.jpg',  # You'll need to manually add this image to media/products/
       moq='MOQ: 100 kg',
       packaging='Bulk/Custom',
       badge='Organic',
       order=1
   )
   ```

## Uploading Images

To upload images for products and categories:

1. Create the necessary directories if they don't exist:
   ```bash
   sudo mkdir -p /var/www/westend-Corporation/backend/media/verticals
   sudo mkdir -p /var/www/westend-Corporation/backend/media/products
   sudo chown -R www-data:www-data /var/www/westend-Corporation/backend/media
   ```

2. Upload images through the admin interface when creating/editing products and categories

## Troubleshooting

### Images Not Showing Up

If images don't appear on the website:

1. Check that the image files exist in the correct directories:
   ```bash
   ls -la /var/www/westend-Corporation/backend/media/verticals/
   ls -la /var/www/westend-Corporation/backend/media/products/
   ```

2. Verify permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/westend-Corporation/backend/media
   sudo chmod -R 755 /var/www/westend-Corporation/backend/media
   ```

3. Check Nginx configuration for media files:
   ```bash
   cat /etc/nginx/sites-available/westend-ip
   ```

### Admin Interface Not Accessible

If you can't access the admin interface:

1. Check that the Gunicorn service is running:
   ```bash
   sudo systemctl status westend-backend
   ```

2. Restart the service if needed:
   ```bash
   sudo systemctl restart westend-backend
   ```

3. Check the logs for errors:
   ```bash
   sudo journalctl -u westend-backend
   ```
