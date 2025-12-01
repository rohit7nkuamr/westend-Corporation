from django.db import models
from django.utils import timezone
from PIL import Image
import os

class Feature(models.Model):
    """Features for the About section"""
    ICON_CHOICES = [
        ('Award', 'Award'),
        ('Users', 'Users'),
        ('TrendingUp', 'Trending Up'),
        ('Heart', 'Heart'),
        ('Package', 'Package'),
        ('CheckCircle', 'Check Circle'),
        ('Shield', 'Shield'),
        ('Star', 'Star'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, choices=ICON_CHOICES)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title

class CompanyInfo(models.Model):
    """Company information for the About section"""
    name = models.CharField(max_length=200, default='Westend Corporation')
    tagline = models.CharField(max_length=200, default='Premium Food Products')
    founded_year = models.IntegerField(default=2010)
    description = models.TextField()
    short_description = models.TextField()
    headquarters = models.CharField(max_length=200, default='Delhi, India')
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Company Info'

class Vertical(models.Model):
    """Product Categories/Verticals"""
    ICON_CHOICES = [
        ('Wheat', 'Wheat'),
        ('Snowflake', 'Snowflake'),
        ('Box', 'Box'),
        ('Leaf', 'Leaf'),
        ('Package', 'Package'),
        ('ShoppingBasket', 'Shopping Basket'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, choices=ICON_CHOICES)
    secondary_icon_name = models.CharField(max_length=50, choices=ICON_CHOICES)
    gradient = models.CharField(max_length=100, help_text="e.g., 'from-amber-500 to-orange-600'")
    bg_gradient = models.CharField(max_length=100)
    image = models.ImageField(upload_to='verticals/')
    button_color = models.CharField(max_length=100)
    button_text = models.CharField(max_length=50, default='REQUEST QUOTE')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Optimize image after saving
        if self.image:
            img_path = self.image.path
            try:
                img = Image.open(img_path)
                                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = rgb_img
                
                # Resize if too large (max 1920x1920)
                max_size = (1920, 1920)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save with optimization
                img.save(img_path, 'JPEG', quality=85, optimize=True)
            except Exception as e:
                print(f"Error optimizing image: {e}")
    
    def __str__(self):
        return self.title

class VerticalProduct(models.Model):
    """Products listed under each vertical"""
    vertical = models.ForeignKey(Vertical, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.vertical.title} - {self.name}"

class Product(models.Model):
    """Main products catalog"""
    STOCK_STATUS_CHOICES = [
        ('in_stock', 'In Stock'),
        ('out_of_stock', 'Out of Stock'),
        ('low_stock', 'Low Stock'),
        ('coming_soon', 'Coming Soon'),
    ]
    
    vertical = models.ForeignKey(Vertical, on_delete=models.CASCADE, related_name='product_items')
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Second product image")
    image_3 = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Third product image")
    moq = models.CharField(max_length=100, help_text="Minimum Order Quantity")
    packaging = models.CharField(max_length=200)
    badge = models.CharField(max_length=50, blank=True, help_text="e.g., 'Bestseller', 'New', 'Organic'")
    stock_status = models.CharField(max_length=20, choices=STOCK_STATUS_CHOICES, default='in_stock')
    origin = models.CharField(max_length=100, default='India', help_text="Country or region of origin")
    shelf_life = models.CharField(max_length=100, default='12 Months', help_text="Product shelf life")
    storage = models.CharField(max_length=200, default='Cool & Dry Place', help_text="Storage instructions")
    certifications = models.CharField(max_length=200, blank=True, help_text="e.g., 'FSSAI, Organic India, USDA'")
    features = models.TextField(blank=True, help_text="Product features, one per line")
    brand = models.CharField(max_length=100, default='Westend Organic', help_text="Brand name")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text="Feature this product on the home page")
    featured_order = models.IntegerField(default=0, help_text="Order in which featured products appear (lower numbers appear first)")
    order = models.IntegerField(default=0)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
    
    def save(self, *args, **kwargs):
        # Generate slug
        if not self.slug:
            from django.utils.text import slugify
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        
        super().save(*args, **kwargs)
        
        # Optimize all product images
        for image_field in [self.image, self.image_2, self.image_3]:
            if image_field:
                try:
                    img = Image.open(image_field.path)
                    
                    # Convert to RGB if necessary
                    if img.mode in ('RGBA', 'LA', 'P'):
                        rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                        img = rgb_img
                    
                    # Resize if too large (max 1920x1920)
                    max_size = (1920, 1920)
                    img.thumbnail(max_size, Image.Resampling.LANCZOS)
                    
                    # Save with optimization
                    img.save(image_field.path, 'JPEG', quality=85, optimize=True)
                except Exception as e:
                    print(f"Error optimizing image {image_field.name}: {e}")

    def __str__(self):
        return self.name

class ContactInquiry(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Inquiries'
    
    def __str__(self):
        return f"{self.name} - {self.email}"

class QuoteRequest(models.Model):
    """Quote requests for products"""
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    company = models.CharField(max_length=200)
    quantity = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Quote Request - {self.name}"


class PageVisit(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('products', 'Products Page'),
        ('product_detail', 'Product Detail'),
        ('about', 'About Page'),
        ('contact', 'Contact Page'),
    ]

    ACTION_CHOICES = [
        ('page_view', 'Page View'),
        ('quote_request', 'Quote Request'),
        ('contact_form', 'Contact Form'),
        ('product_view', 'Product View'),
    ]

    page = models.CharField(max_length=50, choices=PAGE_CHOICES)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES, default='page_view')
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    referrer = models.URLField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=100, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = 'Page Visit'
        verbose_name_plural = 'Page Visits'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['page'], name='api_pagevis_page_idx'),
            models.Index(fields=['action'], name='api_pagevis_action_idx'),
            models.Index(fields=['timestamp'], name='api_pagevis_timestamp_idx'),
        ]

    def __str__(self):
        return f"{self.page} - {self.action} @ {self.timestamp.isoformat()}"

class HeroSlide(models.Model):
    """Hero carousel slides - separate from categories"""
    title = models.CharField(max_length=200, help_text="Slide title/headline")
    subtitle = models.CharField(max_length=300, blank=True, help_text="Optional subtitle")
    image = models.ImageField(upload_to='hero_slides/', help_text="Recommended: 1920x500px")
    link_text = models.CharField(max_length=100, blank=True, help_text="Button text (optional)")
    link_url = models.CharField(max_length=500, blank=True, help_text="Button link (optional)")
    order = models.IntegerField(default=0, help_text="Display order (lower = first)")
    is_active = models.BooleanField(default=True, help_text="Show on homepage")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Hero Slide'
        verbose_name_plural = 'Hero Slides'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Optimize hero image after saving
        if self.image:
            try:
                img = Image.open(self.image.path)
                
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = rgb_img
                
                # Resize if too large (max 1920x1080 for hero)
                max_size = (1920, 1080)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save with high quality optimization
                img.save(self.image.path, 'JPEG', quality=90, optimize=True)
            except Exception as e:
                print(f"Error optimizing hero image: {e}")
    
    def __str__(self):
        return self.title

class Certification(models.Model):
    """Certifications and compliance badges"""
    title = models.CharField(max_length=200, help_text="Certification name (e.g., 'FSSAI Certified')")
    description = models.TextField(help_text="Brief description")
    image = models.ImageField(upload_to='certifications/', help_text="Certification badge/logo image")
    order = models.IntegerField(default=0, help_text="Display order (lower = first)")
    is_active = models.BooleanField(default=True, help_text="Show on website")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Certification'
        verbose_name_plural = 'Certifications'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Optimize certification image
        if self.image:
            try:
                img = Image.open(self.image.path)
                
                # Convert to RGB if necessary
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    rgb_img.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = rgb_img
                
                # Resize if too large (max 800x800 for certification badges)
                max_size = (800, 800)
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
                
                # Save with optimization
                img.save(self.image.path, 'JPEG', quality=90, optimize=True)
            except Exception as e:
                print(f"Error optimizing certification image: {e}")
    
    def __str__(self):
        return self.title
