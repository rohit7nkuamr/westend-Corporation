from django.db import models

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
    vertical = models.ForeignKey(Vertical, on_delete=models.CASCADE, related_name='product_items')
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    moq = models.CharField(max_length=100, help_text="Minimum Order Quantity")
    packaging = models.CharField(max_length=200)
    badge = models.CharField(max_length=50, blank=True, help_text="e.g., 'Bestseller', 'New', 'Organic'")
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
