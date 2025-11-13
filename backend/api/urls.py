from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'verticals', views.VerticalViewSet)
router.register(r'products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_inquiry, name='contact'),
    path('quote-request/', views.quote_request, name='quote-request'),
]
