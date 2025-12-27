from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'chatbot'

router = DefaultRouter()
router.register(r'sessions', views.ChatSessionViewSet, basename='chat-sessions')

urlpatterns = [
    path('message/', views.chat_message, name='chat-message'),
    path('ticket/', views.create_chat_ticket, name='create-chat-ticket'),
    path('history/<str:session_id>/', views.chat_history, name='chat-history'),
    path('', include(router.urls)),
]
