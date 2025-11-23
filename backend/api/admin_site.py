from django.contrib.admin import AdminSite
from django.utils import timezone
from django.db.models import Count
from .models import PageVisit
from datetime import timedelta

class WestendAdminSite(AdminSite):
    site_header = "Westend Corporation Admin"
    site_title = "Westend Admin"
    index_title = "Dashboard"
    
    def index(self, request, extra_context=None):
        # Get visitor statistics
        now = timezone.now()
        today = now.date()
        
        # Total visits
        total_visits = PageVisit.objects.count()
        
        # Unique pages visited
        unique_pages = PageVisit.objects.values('page').distinct().count()
        
        # Today's visits
        today_visits = PageVisit.objects.filter(timestamp__date=today).count()
        
        # Recent visits (last 10)
        recent_visits = PageVisit.objects.order_by('-timestamp')[:10]
        
        # Popular pages with visit counts
        popular_pages = (
            PageVisit.objects
            .values('page')
            .annotate(visit_count=Count('id'))
            .order_by('-visit_count')[:10]
        )
        
        context = {
            **self.each_context(request),
            'total_visits': total_visits,
            'unique_pages': unique_pages,
            'today_visits': today_visits,
            'recent_visits': recent_visits,
            'popular_pages': popular_pages,
        }
        
        if extra_context:
            context.update(extra_context)
            
        return super().index(request, context)

# Create custom admin instance
westend_admin_site = WestendAdminSite(name='westend_admin')
