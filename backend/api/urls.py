from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'verticals', views.VerticalViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'features', views.FeatureViewSet)
router.register(r'company-info', views.CompanyInfoViewSet)
router.register(r'hero-slides', views.HeroSlideViewSet, basename='heroslide')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', views.contact_inquiry, name='contact'),
    path('quote-request/', views.quote_request, name='quote-request'),
    path('page-visit/', views.page_visit, name='page-visit'),
]
