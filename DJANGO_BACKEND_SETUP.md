# Django Backend Setup Guide

## 📋 Overview
This guide explains how to set up the Django backend to work with the React frontend.

## 🗂️ Required Django Models

### 1. Verticals/Categories Model
```python
# models.py
from django.db import models

class Vertical(models.Model):
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
    gradient = models.CharField(max_length=100)  # e.g., 'from-amber-500 to-orange-600'
    bg_gradient = models.CharField(max_length=100)
    image = models.ImageField(upload_to='verticals/')  # or URLField for external images
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
    vertical = models.ForeignKey(Vertical, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.vertical.title} - {self.name}"
```

### 2. Products Model
```python
class Product(models.Model):
    vertical = models.ForeignKey(Vertical, on_delete=models.CASCADE, related_name='product_items')
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    moq = models.CharField(max_length=100)  # Minimum Order Quantity
    packaging = models.CharField(max_length=200)
    badge = models.CharField(max_length=50, blank=True)  # e.g., 'Bestseller', 'New'
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.name
```

### 3. Contact/Inquiry Model
```python
class ContactInquiry(models.Model):
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
```

### 4. Quote Request Model
```python
class QuoteRequest(models.Model):
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
```

## 🔌 Required API Endpoints

### serializers.py
```python
from rest_framework import serializers
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest

class VerticalProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerticalProduct
        fields = ['name']

class VerticalSerializer(serializers.ModelSerializer):
    products = VerticalProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Vertical
        fields = [
            'id', 'title', 'description', 'icon_name', 'secondary_icon_name',
            'gradient', 'bg_gradient', 'image', 'button_color', 'button_text',
            'products'
        ]

class ProductSerializer(serializers.ModelSerializer):
    vertical_name = serializers.CharField(source='vertical.title', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'image', 'moq', 'packaging',
            'badge', 'vertical', 'vertical_name'
        ]

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone', 'company', 'message']

class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ['product', 'name', 'email', 'phone', 'company', 'quantity', 'message']
```

### views.py
```python
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vertical, Product, ContactInquiry, QuoteRequest
from .serializers import (
    VerticalSerializer, ProductSerializer,
    ContactInquirySerializer, QuoteRequestSerializer
)

class VerticalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vertical.objects.filter(is_active=True)
    serializer_class = VerticalSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(vertical_id=category)
        return queryset

@api_view(['POST'])
def contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Optional: Send email notification
        return Response({
            'message': 'Thank you for your inquiry. We will get back to you soon.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def quote_request(request):
    serializer = QuoteRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Optional: Send email notification
        return Response({
            'message': 'Quote request submitted successfully.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

### urls.py
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'verticals', views.VerticalViewSet)
router.register(r'products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_inquiry, name='contact'),
    path('quote-request/', views.quote_request, name='quote-request'),
]
```

## ⚙️ Django Settings Configuration

### settings.py
```python
# CORS Settings (install django-cors-headers)
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
    'your_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ... other middleware
]

# Allow React frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://localhost:5173",  # Vite dev server
]

# For production, add your domain:
# CORS_ALLOWED_ORIGINS = [
#     "https://westendcorp.com",
# ]

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
}
```

## 📦 Required Packages

```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install Pillow  # For image handling
```

## 🚀 Running the Backend

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## 📝 Sample Data Creation

```python
# In Django shell: python manage.py shell

from your_app.models import Vertical, VerticalProduct

# Create Groceries & Staples
vertical1 = Vertical.objects.create(
    title='Groceries & Staples',
    description='Certified organic pulses, premium grains, authentic spice blends, and traditional jaggery products sourced from trusted farms',
    icon_name='Wheat',
    secondary_icon_name='Leaf',
    gradient='from-amber-500 to-orange-600',
    bg_gradient='from-primary-50 to-amber-50',
    image='path/to/image.jpg',
    button_color='from-amber-500 to-orange-600',
    button_text='REQUEST QUOTE',
    order=1
)

VerticalProduct.objects.create(vertical=vertical1, name='Certified Organic Pulses', order=1)
VerticalProduct.objects.create(vertical=vertical1, name='Premium Quality Grains', order=2)
VerticalProduct.objects.create(vertical=vertical1, name='Authentic Spice Blends', order=3)
VerticalProduct.objects.create(vertical=vertical1, name='Traditional Jaggery', order=4)

# Repeat for other verticals...
```

## 🔗 Frontend Configuration

Update `.env` file in React project:
```
REACT_APP_API_URL=http://localhost:8000/api
```

For production:
```
REACT_APP_API_URL=https://api.westendcorp.com/api
```

## ✅ Testing the Integration

1. Start Django backend: `python manage.py runserver`
2. Start React frontend: `npm start`
3. Check browser console for API calls
4. Verify data loads in frontend
5. Test contact form submission

## 📧 Email Notifications (Optional)

Add email configuration in `settings.py`:
```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'
EMAIL_HOST_PASSWORD = 'your-app-password'
DEFAULT_FROM_EMAIL = 'noreply@westendcorp.com'
```

Update views to send emails:
```python
from django.core.mail import send_mail

def contact_inquiry(request):
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        inquiry = serializer.save()
        
        # Send email notification
        send_mail(
            subject=f'New Contact Inquiry from {inquiry.name}',
            message=f'Name: {inquiry.name}\nEmail: {inquiry.email}\nMessage: {inquiry.message}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=['info@westendcorp.com'],
            fail_silently=True,
        )
        
        return Response({'message': 'Thank you for your inquiry.'})
    return Response(serializer.errors, status=400)
```

## 🔒 Security Considerations

1. Use environment variables for sensitive data
2. Enable HTTPS in production
3. Set proper CORS origins
4. Add rate limiting for API endpoints
5. Validate and sanitize all inputs
6. Use Django's CSRF protection

## 📚 Additional Resources

- Django REST Framework: https://www.django-rest-framework.org/
- Django CORS Headers: https://github.com/adamchainz/django-cors-headers
- Django Documentation: https://docs.djangoproject.com/
