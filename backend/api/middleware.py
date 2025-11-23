from django.utils.deprecation import MiddlewareMixin
from django.utils import timezone
from .models import PageVisit
import logging

logger = logging.getLogger(__name__)

class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Disable CSRF for API routes
        if request.path.startswith('/api/'):
            setattr(request, '_dont_enforce_csrf_checks', True)

class VisitorTrackingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Only track frontend pages, not API, admin, or static files
        if (request.path.startswith('/api/') or 
            request.path.startswith('/admin/') or 
            request.path.startswith('/static/') or
            request.path.startswith('/media/')):
            return None
        
        # Ensure session exists
        if not hasattr(request, 'session') or not request.session.session_key:
            request.session.save()
        
        session_key = request.session.session_key
        current_time = timezone.now()
        
        # Check if this session has visited this page in the last 30 minutes
        recent_visit = PageVisit.objects.filter(
            session_id=session_key,
            page=request.path,
            timestamp__gte=current_time - timezone.timedelta(minutes=30)
        ).first()
        
        if not recent_visit:
            # Create new page visit record
            PageVisit.objects.create(
                page=request.path,
                action='page_view',
                ip_address=self.get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', '')[:500],
                referrer=request.META.get('HTTP_REFERER', ''),
                session_id=session_key,
            )
        
        return None
    
    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
