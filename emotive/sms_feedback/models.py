from django.db import models

# Create your models here.
class SMSFeedback(models.Model):
    customer_name = models.CharField(blank=False, max_length = 256)
    phone_number = models.CharField(blank=False, max_length = 12)
    automated_message = models.CharField(blank=False, max_length = 500)
    positive_reply = models.CharField(blank=False, max_length = 500)
    negative_reply = models.CharField(blank=False, max_length = 500)
    follow_up = models.CharField(blank=True, default = None, max_length = 500)
    product_type = models.CharField(blank=False, max_length = 500)