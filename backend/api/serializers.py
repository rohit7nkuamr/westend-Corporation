from rest_framework import serializers
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo, HeroSlide, Certification

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
    vertical_title = serializers.CharField(source='vertical.title', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 'vertical', 'vertical_title',
            'image', 'image_2', 'image_3', 'moq', 'packaging', 'badge',
            'stock_status', 'origin', 'shelf_life', 'storage', 'certifications',
            'features', 'brand', 'is_featured', 'order'
        ]
    
class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone', 'company', 'message']

class QuoteRequestSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = QuoteRequest
        fields = ['product', 'product_name', 'name', 'email', 'phone', 'company', 'quantity', 'message']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['title', 'description', 'icon_name']

class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = ['id', 'name', 'tagline', 'founded_year', 'description', 'short_description', 'headquarters']

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'title', 'subtitle', 'image', 'link_text', 'link_url', 'order']

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'title', 'description', 'image', 'order']
