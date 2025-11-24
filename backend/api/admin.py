from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from .models import Vertical, VerticalProduct, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo, PageVisit
from .admin_site import westend_admin_site

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
    list_display = ['title', 'image', 'is_active', 'order', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title']
    list_editable = ['is_active']
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

class FeaturedProductFilter(admin.SimpleListFilter):
    title = 'Featured Status'
    parameter_name = 'featured'
    
    def lookups(self, request, model_admin):
        return (
            ('yes', 'Featured'),
            ('no', 'Not Featured'),
        )
    
    def queryset(self, request, queryset):
        if self.value() == 'yes':
            return queryset.filter(is_featured=True)
        if self.value() == 'no':
            return queryset.filter(is_featured=False)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'vertical', 'badge', 'stock_status', 'is_active', 'is_featured', 'featured_order']
    list_filter = ['vertical', 'stock_status', 'is_active', 'badge', FeaturedProductFilter]
    search_fields = ['name', 'slug', 'description', 'features']
    list_editable = ['stock_status', 'badge', 'is_featured', 'featured_order']
    readonly_fields = ['slug']
    actions = ['mark_as_in_stock', 'mark_as_out_of_stock', 'mark_as_low_stock', 'mark_as_featured', 'mark_as_not_featured']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['name', 'slug', 'description', 'vertical', 'badge', 'brand', 'is_active']
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
        ('Featured Settings', {
            'fields': ['is_featured', 'featured_order'],
            'description': 'Control whether this product appears on the home page'
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
    
    def mark_as_featured(self, request, queryset):
        queryset.update(is_featured=True)
    mark_as_featured.short_description = "Mark selected products as featured"
    
    def mark_as_not_featured(self, request, queryset):
        queryset.update(is_featured=False)
    mark_as_not_featured.short_description = "Remove selected products from featured"

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


@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ['page', 'action', 'product', 'ip_address', 'referrer', 'timestamp']
    list_filter = ['page', 'action', 'timestamp']
    search_fields = ['ip_address', 'user_agent', 'referrer', 'session_id']
    readonly_fields = ['page', 'action', 'ip_address', 'user_agent', 'referrer', 'timestamp', 'session_id', 'product']
    date_hierarchy = 'timestamp'
    ordering = ['-timestamp']

# Register models with custom admin site
westend_admin_site.register(Vertical, VerticalAdmin)
westend_admin_site.register(Product, ProductAdmin)
westend_admin_site.register(ContactInquiry, ContactInquiryAdmin)
westend_admin_site.register(QuoteRequest, QuoteRequestAdmin)
westend_admin_site.register(Feature, FeatureAdmin)
westend_admin_site.register(CompanyInfo, CompanyInfoAdmin)
westend_admin_site.register(PageVisit, PageVisitAdmin)

# Register Django's default User and Group models
westend_admin_site.register(User, UserAdmin)
westend_admin_site.register(Group, GroupAdmin)
