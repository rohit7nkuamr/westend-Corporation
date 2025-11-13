from django.contrib import admin
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest

class VerticalProductInline(admin.TabularInline):
    model = VerticalProduct
    extra = 1

@admin.register(Vertical)
class VerticalAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    inlines = [VerticalProductInline]

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'vertical', 'badge', 'is_active', 'created_at']
    list_filter = ['vertical', 'is_active']
    search_fields = ['name', 'description']

@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'company', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'company', 'message']
    readonly_fields = ['created_at']

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'product', 'is_processed', 'created_at']
    list_filter = ['is_processed', 'created_at']
    search_fields = ['name', 'email', 'company']
    readonly_fields = ['created_at']
