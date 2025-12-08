from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin, GroupAdmin
from django.utils.html import format_html
from .models import (
    CompanyInfo, Feature, Vertical, Product,
    HeroSlide, ProductCategory, ProductSubcategory,
    PageBackground, SectionBackground,
    Certification, VerticalProduct, Brochure,
    ContactInquiry, QuoteRequest, PageVisit
)
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
    list_editable = ['is_active', 'order']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['title', 'description', 'image', 'is_active', 'order']
        }),
        ('Display Settings', {
            'fields': ['icon_name', 'secondary_icon_name', 'gradient', 'bg_gradient'],
            'classes': ['collapse'],
        }),
        ('Button Settings', {
            'fields': ['button_color', 'button_text'],
            'classes': ['collapse'],
        }),
        ('Timestamps', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse'],
        }),
    ]
    
    inlines = [VerticalProductInline]

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
    list_display = ['name', 'tagline', 'logo_preview', 'use_video_logo']
    readonly_fields = ['logo_preview_large', 'video_preview']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['name', 'tagline', 'founded_year', 'headquarters']
        }),
        ('Logo Settings', {
            'fields': ['logo_image', 'logo_preview_large', 'logo_video', 'video_preview', 'use_video_logo'],
            'description': 'Upload logo image (PNG recommended for transparency) and/or logo video (MP4/WebM). Toggle to switch between them.'
        }),
        ('About Content', {
            'fields': ['short_description', 'description']
        }),
    ]
    
    def logo_preview(self, obj):
        """Small logo preview for list view"""
        if obj.logo_image:
            return format_html('<img src="{}" style="max-height:40px; max-width:40px; object-fit:contain;" />', obj.logo_image.url)
        return '-'
    logo_preview.short_description = 'Logo'
    
    def logo_preview_large(self, obj):
        """Large logo preview for detail view"""
        if obj.logo_image:
            return format_html('<img src="{}" style="max-height:200px; max-width:200px; object-fit:contain; border:1px solid #ddd; padding:10px; background:white;" />', obj.logo_image.url)
        return 'No logo image uploaded'
    logo_preview_large.short_description = 'Logo Preview'
    
    def video_preview(self, obj):
        """Video preview for detail view"""
        if obj.logo_video:
            return format_html(
                '<video autoplay loop muted style="max-height:200px; max-width:200px; border:1px solid #ddd; background:#f0f0f0;">'
                '<source src="{}" type="video/mp4">'
                'Your browser does not support video.'
                '</video>',
                obj.logo_video.url
            )
        return 'No logo video uploaded'
    video_preview.short_description = 'Video Preview'


@admin.register(PageVisit)
class PageVisitAdmin(admin.ModelAdmin):
    list_display = ['page', 'action', 'product', 'ip_address', 'referrer', 'timestamp']
    list_filter = ['page', 'action', 'timestamp']
    search_fields = ['ip_address', 'user_agent', 'referrer', 'session_id']
    readonly_fields = ['page', 'action', 'ip_address', 'user_agent', 'referrer', 'timestamp', 'session_id', 'product']
    date_hierarchy = 'timestamp'
    ordering = ['-timestamp']

class BrochureAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title']

# Register models with custom admin site
westend_admin_site.register(Vertical, VerticalAdmin)
westend_admin_site.register(Product, ProductAdmin)
westend_admin_site.register(ContactInquiry, ContactInquiryAdmin)
westend_admin_site.register(QuoteRequest, QuoteRequestAdmin)
westend_admin_site.register(Feature, FeatureAdmin)
westend_admin_site.register(CompanyInfo, CompanyInfoAdmin)
westend_admin_site.register(PageVisit, PageVisitAdmin)
westend_admin_site.register(Brochure, BrochureAdmin)

# Register Django's default User and Group models
westend_admin_site.register(User, UserAdmin)
westend_admin_site.register(Group, GroupAdmin)

@admin.register(HeroSlide, site=westend_admin_site)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type_display', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'use_video']
    list_editable = ['is_active', 'order']
    search_fields = ['title', 'subtitle']
    readonly_fields = ['media_preview', 'created_at', 'updated_at']
    
    fieldsets = [
        ('Content', {
            'fields': ['title', 'subtitle']
        }),
        ('Media (Image or Video)', {
            'fields': ['image', 'video', 'use_video', 'media_preview'],
            'description': 'Upload an image AND/OR a video. Check "Use video" to show video instead of image.'
        }),
        ('Call to Action (Optional)', {
            'fields': ['link_text', 'link_url'],
            'classes': ['collapse']
        }),
        ('Settings', {
            'fields': ['order', 'is_active', 'created_at', 'updated_at']
        }),
    ]
    
    def media_type_display(self, obj):
        if obj.use_video and obj.video:
            return '🎥 Video'
        return '🖼️ Image'
    media_type_display.short_description = 'Type'
    
    def media_preview(self, obj):
        if obj.use_video and obj.video:
            return format_html(
                '<video width="400" controls><source src="{}" type="video/mp4"></video>',
                obj.video.url
            )
        elif obj.image:
            return format_html(
                '<img src="{}" width="400" style="max-height: 300px; object-fit: contain;" />',
                obj.image.url
            )
        return "No media uploaded"
    media_preview.short_description = 'Preview'

class ProductSubcategoryInline(admin.TabularInline):
    model = ProductSubcategory
    extra = 1
    fields = ['title', 'order', 'is_active']


@admin.register(ProductCategory, site=westend_admin_site)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'order', 'is_active', 'subcategory_count', 'created_at']
    list_filter = ['is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['title']
    inlines = [ProductSubcategoryInline]
    
    fieldsets = [
        ('Category Information', {
            'fields': ['title', 'icon', 'bg_color']
        }),
        ('Settings', {
            'fields': ['order', 'is_active']
        }),
    ]
    
    def subcategory_count(self, obj):
        return obj.subcategories.count()
    subcategory_count.short_description = 'Subcategories'

@admin.register(ProductSubcategory, site=westend_admin_site)
class ProductSubcategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'order', 'is_active']
    list_filter = ['is_active', 'category']
    list_editable = ['order', 'is_active']
    search_fields = ['title', 'category__title']

@admin.register(Certification, site=westend_admin_site)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['title', 'image', 'is_active', 'order', 'created_at']
    list_filter = ['is_active']
    list_editable = ['is_active', 'order']
    search_fields = ['title', 'description']
    
    fieldsets = [
        ('Content', {
            'fields': ['title', 'description', 'image']
        }),
        ('Settings', {
            'fields': ['order', 'is_active']
        }),
    ]

@admin.register(PageBackground, site=westend_admin_site)
class PageBackgroundAdmin(admin.ModelAdmin):
    list_display = ['page', 'image_preview', 'opacity', 'is_active', 'updated_at']
    list_editable = ['opacity', 'is_active']
    list_filter = ['page', 'is_active']
    search_fields = ['page']
    readonly_fields = ['created_at', 'updated_at', 'image_preview_large']
    
    fieldsets = [
        ('Page Selection', {
            'fields': ['page']
        }),
        ('Background Image', {
            'fields': ['background_image', 'image_preview_large'],
            'description': 'Recommended: 1920x1080px. Images are automatically optimized to JPEG at 80% quality.'
        }),
        ('Display Settings', {
            'fields': ['opacity', 'is_active']
        }),
        ('Timestamps', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse']
        }),
    ]
    
    def image_preview(self, obj):
        if obj.background_image:
            return f'<img src="{obj.background_image.url}" style="max-width:60px; max-height:60px; object-fit:cover; border-radius:4px;" />'
        return '-'
    image_preview.short_description = 'Preview'
    image_preview.allow_tags = True
    
    def image_preview_large(self, obj):
        if obj.background_image:
            return f'<img src="{obj.background_image.url}" style="max-width:400px; max-height:300px; object-fit:contain; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" />'
        return 'No image uploaded'
    image_preview_large.short_description = 'Image Preview'
    image_preview_large.allow_tags = True

@admin.register(SectionBackground, site=westend_admin_site)  
class SectionBackgroundAdmin(admin.ModelAdmin):
    list_display = ['section', 'image_preview', 'opacity', 'is_active', 'updated_at']
    list_editable = ['opacity', 'is_active']
    list_filter = ['section', 'is_active']
    search_fields = ['section']
    readonly_fields = ['created_at', 'updated_at', 'image_preview_large']
    
    fieldsets = [
        ('Section Selection', {
            'fields': ['section']
        }),
        ('Background Image', {
            'fields': ['background_image', 'image_preview_large'],
            'description': 'Recommended: 1920x600px. Images are automatically optimized to JPEG at 80% quality.'
        }),
        ('Display Settings', {
            'fields': ['opacity', 'is_active']
        }),
        ('Timestamps', {
            'fields': ['created_at', 'updated_at'],
            'classes': ['collapse']
        }),
    ]
    
    def image_preview(self, obj):
        if obj.background_image:
            return f'<img src="{obj.background_image.url}" style="max-width:60px; max-height:60px; object-fit:cover; border-radius:4px;" />'
        return '-'
    image_preview.short_description = 'Preview'
    image_preview.allow_tags = True
    
    def image_preview_large(self, obj):
        if obj.background_image:
            return f'<img src="{obj.background_image.url}" style="max-width:400px; max-height:300px; object-fit:contain; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);" />'
        return 'No image uploaded'
    image_preview_large.short_description = 'Image Preview'
    image_preview_large.allow_tags = True

