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


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_name', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title', 'description']


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'tagline', 'founded_year']
