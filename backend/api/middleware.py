from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Disable CSRF for API routes
        if request.path.startswith('/api/'):
            setattr(request, '_dont_enforce_csrf_checks', True)
