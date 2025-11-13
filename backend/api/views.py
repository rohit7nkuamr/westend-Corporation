from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vertical, Product, ContactInquiry, QuoteRequest
from .serializers import (
    VerticalSerializer, ProductSerializer,
    ContactInquirySerializer, QuoteRequestSerializer
)

class VerticalViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for product verticals/categories"""
    queryset = Vertical.objects.filter(is_active=True)
    serializer_class = VerticalSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for products"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(vertical_id=category)
        return queryset

@api_view(['POST'])
def contact_inquiry(request):
    """Handle contact form submissions"""
    serializer = ContactInquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Thank you for your inquiry. We will get back to you soon.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def quote_request(request):
    """Handle quote request submissions"""
    serializer = QuoteRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Quote request submitted successfully.'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
