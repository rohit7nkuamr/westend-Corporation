from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.mail import EmailMessage
import logging
from .models import Vertical, Product, ContactInquiry, QuoteRequest, Feature, CompanyInfo
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

            # Attempt to forward the inquiry to the support email
            try:
                support_email = 'support@westendcorporation.in'
                from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', f"no-reply@{request.get_host()}")
                subject = f"New contact inquiry from {contact.name}"
                body = (
                    f"Name: {contact.name}\n"
                    f"Email: {contact.email}\n"
                    f"Phone: {contact.phone or 'N/A'}\n"
                    f"Company: {contact.company or 'N/A'}\n\n"
                    f"Message:\n{contact.message or ''}\n"
                )

                email = EmailMessage(
                    subject=subject,
                    body=body,
                    from_email=from_email,
                    to=[support_email],
                    reply_to=[contact.email] if contact.email else None,
                )
                email.send(fail_silently=False)
            except Exception:
                logger = logging.getLogger(__name__)
                logger.exception('Failed to send contact inquiry email to support')

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
            serializer.save()
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


class FeatureViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for about section features"""
    queryset = Feature.objects.filter(is_active=True).order_by('order')
    serializer_class = FeatureSerializer


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for company information"""
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
