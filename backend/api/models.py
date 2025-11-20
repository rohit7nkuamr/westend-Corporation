from django.db import models

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
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
    
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
