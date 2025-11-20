from django.contrib import admin
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo

class VerticalProductInline(admin.TabularInline):
    model = VerticalProduct
    extra = 0
    readonly_fields = ['name', 'order']
    can_delete = False
    max_num = 0
    
    def has_add_permission(self, request, obj=None):
        return False

@admin.register(Vertical)
class VerticalAdmin(admin.ModelAdmin):
    list_display = ['title', 'image', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title']
    readonly_fields = ['title', 'description', 'icon_name', 'secondary_icon_name', 
                      'gradient', 'bg_gradient', 'button_color', 'button_text', 
                      'order', 'created_at', 'updated_at']
    fields = ['title', 'image', 'is_active']
    inlines = [VerticalProductInline]
    
    def get_readonly_fields(self, request, obj=None):
        # If creating a new object, don't make any fields readonly
        if obj is None:
            return []
        return self.readonly_fields

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'vertical', 'badge', 'stock_status', 'is_active', 'created_at']
    list_filter = ['vertical', 'stock_status', 'is_active', 'badge']
    search_fields = ['name', 'description', 'features']
    list_editable = ['stock_status', 'badge']
    actions = ['mark_as_in_stock', 'mark_as_out_of_stock', 'mark_as_low_stock']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['name', 'description', 'vertical', 'badge', 'brand', 'is_active']
        }),
        ('Images', {
            'fields': ['image', 'image_2', 'image_3']
        }),
        ('Product Details', {
            'fields': ['moq', 'packaging', 'stock_status', 'order']
        }),
        ('Specifications', {
            'fields': ['origin', 'shelf_life', 'storage', 'certifications']
        }),
        ('Features', {
            'fields': ['features'],
            'description': 'Enter one feature per line. These will be displayed as bullet points.'
        }),
    ]
    
    def mark_as_in_stock(self, request, queryset):
        queryset.update(stock_status='in_stock')
    mark_as_in_stock.short_description = "Mark selected products as 'In Stock'"
    
    def mark_as_out_of_stock(self, request, queryset):
        queryset.update(stock_status='out_of_stock')
    mark_as_out_of_stock.short_description = "Mark selected products as 'Out of Stock'"
    
    def mark_as_low_stock(self, request, queryset):
        queryset.update(stock_status='low_stock')
    mark_as_low_stock.short_description = "Mark selected products as 'Low Stock'"

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


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_name', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'tagline', 'founded_year']
