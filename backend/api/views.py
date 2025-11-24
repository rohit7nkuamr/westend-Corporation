from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.mail import EmailMessage
import logging
from .models import Vertical, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo, PageVisit
from .serializers import (
    VerticalSerializer, ProductSerializer,
    ContactInquirySerializer, QuoteRequestSerializer,
    FeatureSerializer, CompanyInfoSerializer
)

class VerticalViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product verticals/categories"""
    queryset = Vertical.objects.filter(is_active=True).order_by('order', 'title')
    serializer_class = VerticalSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for products"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category if specified
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(vertical_id=category)
        
        # Filter by featured status if specified
        featured = self.request.query_params.get('featured', None)
        if featured and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True).order_by('featured_order', 'order', 'name')
        
        return queryset

@api_view(['POST'])
@csrf_exempt
def contact_inquiry(request):
    """Handle contact form submissions"""
    
    # Add CORS headers to the response
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    try:
        serializer = ContactInquirySerializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()

            # Pre-compute all email details to avoid accessing request in thread
            support_email = 'support@westendcorporation.in'
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@westendcorporation.in')
            contact_name = contact.name
            contact_email = contact.email
            contact_phone = contact.phone or 'N/A'
            contact_company = contact.company or 'N/A'
            contact_message = contact.message or ''

            # Send email in background thread
            def send_email_thread():
                try:
                    import logging as thread_logging
                    subject = f"New contact inquiry from {contact_name}"
                    body = (
                        f"Name: {contact_name}\n"
                        f"Email: {contact_email}\n"
                        f"Phone: {contact_phone}\n"
                        f"Company: {contact_company}\n\n"
                        f"Message:\n{contact_message}\n"
                    )

                    email = EmailMessage(
                        subject=subject,
                        body=body,
                        from_email=from_email,
                        to=[support_email],
                        reply_to=[contact_email] if contact_email else None,
                    )
                    email.send(fail_silently=False)
                except Exception:
                    thread_logging.getLogger(__name__).exception('Failed to send contact inquiry email')

            import threading
            email_thread = threading.Thread(target=send_email_thread, daemon=True)
            email_thread.start()

            return Response({
                'success': True,
                'message': 'Thank you for your inquiry. We will get back to you soon.'
            }, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({
                'success': False,
                'errors': serializer.errors,
                'message': 'Please check your form data and try again.'
            }, status=status.HTTP_400_BAD_REQUEST, headers=headers)
    except Exception as e:
        logging.getLogger(__name__).exception('Contact inquiry handler failed')
        return Response({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR, headers=headers)

@api_view(['POST'])
@csrf_exempt
def quote_request(request):
    """Handle quote request submissions"""
    
    # Add CORS headers to the response
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    try:
        serializer = QuoteRequestSerializer(data=request.data)
        if serializer.is_valid():
            quote = serializer.save()

            # Pre-compute all email details to avoid accessing request in thread
            support_email = 'support@westendcorporation.in'
            from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@westendcorporation.in')
            quote_name = quote.name
            quote_email = quote.email
            quote_phone = quote.phone
            quote_company = quote.company
            quote_quantity = quote.quantity
            quote_message = quote.message or ''
            product_name = quote.product.name if quote.product else "General Inquiry"

            # Send email in background thread
            def send_quote_email_thread():
                try:
                    import logging as thread_logging
                    subject = f"New Quote Request from {quote_name}"
                    body = (
                        f"Name: {quote_name}\n"
                        f"Email: {quote_email}\n"
                        f"Phone: {quote_phone}\n"
                        f"Company: {quote_company}\n"
                        f"Product: {product_name}\n"
                        f"Quantity: {quote_quantity}\n\n"
                        f"Message:\n{quote_message}\n"
                    )

                    email = EmailMessage(
                        subject=subject,
                        body=body,
                        from_email=from_email,
                        to=[support_email],
                        reply_to=[quote_email] if quote_email else None,
                    )
                    email.send(fail_silently=False)
                except Exception:
                    thread_logging.getLogger(__name__).exception('Failed to send quote request email')

            import threading
            email_thread = threading.Thread(target=send_quote_email_thread, daemon=True)
            email_thread.start()

            return Response({
                'success': True,
                'message': 'Quote request submitted successfully.'
            }, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response({
                'success': False,
                'errors': serializer.errors,
                'message': 'Please check your form data and try again.'
            }, status=status.HTTP_400_BAD_REQUEST, headers=headers)
    except Exception as e:
        return Response({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR, headers=headers)


@api_view(['POST'])
@csrf_exempt
def page_visit(request):
    """Record a page visit or action from the frontend"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    try:
        data = request.data if hasattr(request, 'data') else {}
        page = data.get('page') or data.get('page_name') or 'home'
        action = data.get('action', 'page_view')
        session_id = data.get('session_id', '')
        product_id = data.get('product')

        ip = request.META.get('REMOTE_ADDR') or request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0].strip()
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        referrer = request.META.get('HTTP_REFERER', '')

        pv = PageVisit.objects.create(
            page=page,
            action=action,
            session_id=session_id,
            ip_address=ip or None,
            user_agent=user_agent,
            referrer=referrer or None,
            product=Product.objects.filter(id=product_id).first() if product_id else None,
        )

        return Response({'success': True, 'id': pv.id}, status=status.HTTP_201_CREATED, headers=headers)
    except Exception:
        logging.getLogger(__name__).exception('Failed to record page visit')
        return Response({'success': False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR, headers=headers)


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for about section features"""
    queryset = Feature.objects.filter(is_active=True).order_by('order')
    serializer_class = FeatureSerializer


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for company information"""
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
