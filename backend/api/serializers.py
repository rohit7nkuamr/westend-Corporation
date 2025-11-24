from rest_framework import serializers
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo

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
    stock_status_display = serializers.CharField(source='get_stock_status_display', read_only=True)
    features_list = serializers.SerializerMethodField()
    inStock = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'image', 'image_2', 'image_3', 
            'moq', 'packaging', 'badge', 'vertical', 'vertical_name', 
            'stock_status', 'stock_status_display', 'inStock', 'origin', 'shelf_life', 
            'storage', 'certifications', 'features', 'features_list', 'brand',
            'is_featured', 'featured_order'
        ]
    
    def get_features_list(self, obj):
        """Convert features text to list"""
        if not obj.features:
            return []
        return [feature.strip() for feature in obj.features.split('\n') if feature.strip()]
    
    def get_inStock(self, obj):
        """Return boolean for frontend compatibility"""
        return obj.stock_status == 'in_stock'

class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = ['name', 'email', 'phone', 'company', 'message']

class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = ['product', 'name', 'email', 'phone', 'company', 'quantity', 'message']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'icon_name', 'order']

class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = ['id', 'name', 'tagline', 'founded_year', 'description', 'short_description', 'headquarters']
