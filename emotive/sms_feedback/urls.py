from django.urls import path
from . import views

urlpatterns = [
    path("send_sms/", views.customer_send_sms),
    path("customer_response/", views.customer_response),
    path("follow_up/", views.customer_follow_up),
    path("app/", views.app)
]
