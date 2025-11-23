from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.utils import timezone
from django.db.models import Count
from .models import PageVisit
from datetime import timedelta

@staff_member_required
def admin_dashboard(request):
    """Simple admin dashboard view with visitor statistics"""
    now = timezone.now()
    today = now.date()
    
    # Get visitor statistics
    total_visits = PageVisit.objects.count()
    unique_pages = PageVisit.objects.values('page').distinct().count()
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
        'total_visits': total_visits,
        'unique_pages': unique_pages,
        'today_visits': today_visits,
        'recent_visits': recent_visits,
        'popular_pages': popular_pages,
        'site_title': 'Westend Corporation Admin',
        'site_header': 'Westend Corporation',
        'has_permission': True,
    }
    
    return render(request, 'admin/dashboard.html', context)
