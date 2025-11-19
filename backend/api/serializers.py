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

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'icon_name', 'order']

class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = ['id', 'name', 'tagline', 'founded_year', 'description', 'short_description', 'headquarters']
