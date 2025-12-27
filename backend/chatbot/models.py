from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
import uuid


class ChatSession(models.Model):
    """Chat session for tracking conversations"""
    session_id = models.CharField(max_length=100, unique=True, default=uuid.uuid4)
    user_ip = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    message_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-last_activity']
        indexes = [
            models.Index(fields=['session_id']),
            models.Index(fields=['last_activity']),
            models.Index(fields=['is_active']),
        ]
    
    def __str__(self):
        return f"Session {self.session_id[:8]}... ({self.message_count} messages)"
    
    def update_activity(self):
        self.last_activity = timezone.now()
        self.save(update_fields=['last_activity'])


class ChatMessage(models.Model):
    """Individual chat messages"""
    MESSAGE_TYPES = [
        ('user', 'User Message'),
        ('bot', 'Bot Message'),
        ('system', 'System Message'),
    ]
    
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    
    # AI-related fields (for bot messages)
    intent = models.CharField(max_length=100, null=True, blank=True)
    confidence = models.FloatField(null=True, blank=True)
    ai_tokens_used = models.IntegerField(default=0)  # Track API usage costs
    
    # Response data (for structured responses)
    response_data = models.JSONField(default=dict, blank=True)
    
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['timestamp']
        indexes = [
            models.Index(fields=['session', 'timestamp']),
            models.Index(fields=['message_type']),
            models.Index(fields=['intent']),
        ]
    
    def __str__(self):
        return f"{self.message_type}: {self.content[:50]}..."


class CachedResponse(models.Model):
    """Cache frequently asked questions to reduce AI API calls"""
    question_hash = models.CharField(max_length=64, unique=True)  # SHA-256 hash
    question = models.TextField()
    response = models.TextField()
    response_data = models.JSONField(default=dict)
    intent = models.CharField(max_length=100)
    confidence = models.FloatField()
    usage_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-usage_count']
        indexes = [
            models.Index(fields=['question_hash']),
            models.Index(fields=['intent']),
            models.Index(fields=['last_used']),
        ]
    
    def __str__(self):
        return f"Cached: {self.question[:30]}... (used {self.usage_count} times)"


class ChatIntent(models.Model):
    """Predefined chat intents for pattern matching"""
    name = models.CharField(max_length=100, unique=True)
    keywords = models.TextField(help_text="Comma-separated keywords")
    response_template = models.TextField()
    requires_ai = models.BooleanField(default=False, help_text="Use AI for this intent or template response")
    priority = models.IntegerField(default=0, help_text="Higher priority intents are checked first")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-priority', 'name']
    
    def __str__(self):
        return f"{self.name} (Priority: {self.priority})"


class ChatTicket(models.Model):
    """Support tickets created through chat"""
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='tickets')
    ticket_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Ticket {self.ticket_id}: {self.subject}"
