from rest_framework import serializers
from .models import ChatSession, ChatMessage, ChatTicket, CachedResponse, ChatIntent
from api.models import Product, CompanyInfo


class ChatSessionSerializer(serializers.ModelSerializer):
    messages_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ChatSession
        fields = ['session_id', 'created_at', 'last_activity', 'is_active', 'messages_count']
    
    def get_messages_count(self, obj):
        return obj.message_count


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message_type', 'content', 'timestamp', 'response_data', 'confidence']


class ChatTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatTicket
        fields = ['ticket_id', 'name', 'email', 'phone', 'company', 'subject', 'message', 'status', 'created_at']


class ProductChatSerializer(serializers.ModelSerializer):
    """Optimized product serializer for chat display"""
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'image', 'badge', 'stock_status', 'moq', 'packaging']


class CompanyInfoChatSerializer(serializers.ModelSerializer):
    """Company info serializer for chat responses"""
    class Meta:
        model = CompanyInfo
        fields = ['name', 'tagline', 'phone', 'email', 'headquarters', 'description']


class CachedResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CachedResponse
        fields = ['question', 'response', 'response_data', 'confidence']


class ChatIntentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatIntent
        fields = ['name', 'keywords', 'response_template', 'requires_ai']
