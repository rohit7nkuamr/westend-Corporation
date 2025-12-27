from django.contrib import admin
from .models import ChatSession, ChatMessage, CachedResponse, ChatIntent, ChatTicket


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'user_ip', 'message_count', 'is_active', 'last_activity']
    list_filter = ['is_active', 'created_at', 'last_activity']
    search_fields = ['session_id', 'user_ip']
    readonly_fields = ['session_id', 'created_at', 'last_activity']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related().prefetch_related('messages')


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'message_type', 'intent', 'confidence', 'ai_tokens_used', 'timestamp']
    list_filter = ['message_type', 'intent', 'timestamp']
    search_fields = ['content', 'intent']
    readonly_fields = ['timestamp']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('session')


@admin.register(CachedResponse)
class CachedResponseAdmin(admin.ModelAdmin):
    list_display = ['question_short', 'intent', 'confidence', 'usage_count', 'last_used']
    list_filter = ['intent', 'created_at', 'last_used']
    search_fields = ['question', 'response', 'intent']
    readonly_fields = ['question_hash', 'created_at', 'last_used']
    
    def question_short(self, obj):
        return obj.question[:50] + '...' if len(obj.question) > 50 else obj.question
    question_short.short_description = 'Question'


@admin.register(ChatIntent)
class ChatIntentAdmin(admin.ModelAdmin):
    list_display = ['name', 'priority', 'requires_ai', 'is_active']
    list_filter = ['requires_ai', 'is_active', 'priority']
    search_fields = ['name', 'keywords']
    list_editable = ['priority', 'requires_ai', 'is_active']


@admin.register(ChatTicket)
class ChatTicketAdmin(admin.ModelAdmin):
    list_display = ['ticket_id', 'name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['ticket_id', 'name', 'email', 'subject']
    readonly_fields = ['ticket_id', 'created_at', 'updated_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('session')
