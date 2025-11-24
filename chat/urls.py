from django.urls import path
from .views import SendMessageView, HistoryView

urlpatterns = [
    path('send/', SendMessageView.as_view(), name='send_message'),
    path('history/', HistoryView.as_view(), name='history'),
]