from django.shortcuts import render
from .models import SMSFeedback
from django.conf import settings
from django.http.response import JsonResponse,HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from twilio.twiml.messaging_response import Message, MessagingResponse
from twilio.twiml import TwiML
import http.client, urllib.request, urllib.parse, urllib.error, base64
import logging

logger = logging.getLogger('sms_feedback')
headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'abab87940a084ca8b93cb78973e8d923',
}

import json

# Create your views here.
def customer_send_sms(request):
    data = request.body.decode("utf-8")
    data = json.loads(data)
    logger.info("Received new SMS conversation.")
    logger.info("New conversation parameters: {data}".format(data=json.dumps(data)))
    # Add assertion of different data attributes
    # to make sure they are present and of the right
    # types

    try:
        sms_feedback = SMSFeedback.objects.get(phone_number = "+1" + data["phone_number"])
        sms_feedback.delete()
    except Exception as E:
        # If the object doesn't exist, we don't need to do anything
        pass
    sms_feedback = SMSFeedback(
        customer_name = data["customer_name"],
        phone_number = "+1" + data["phone_number"],
        automated_message = data["automated_message"],
        positive_reply = data["positive_reply"],
        negative_reply = data["negative_reply"],
        follow_up = "",
        product_type = data["product_type"]
    )
    

    sms_feedback.save()

    settings.TWILIO_CLIENT.messages.create(
        to = sms_feedback.phone_number,
        body = sms_feedback.automated_message,
        from_ = "+12062027592"
    )

    return JsonResponse(status = 200, data = {"message": "SMS sent successfully."})
    
@csrf_exempt
def customer_response(request):
    body = request.POST.get("Body", "")
    number = request.POST.get("From", "")
    print("Body", body)
    print("Sender", number)

    conversation_checkpoint = request.session.get("checkpoint")
    sms_feedback = SMSFeedback.objects.get(phone_number = number)
    params = urllib.parse.urlencode({
    })

    docs = {
        "documents": [
            {
            "language": "en",
            "id": "1",
            "text": body
            }
        ]
        }
    try:
        conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')
        conn.request("POST", "/text/analytics/v2.0/sentiment?%s" % params, json.dumps(docs) , headers)
        response = conn.getresponse()
        data = response.read()

        logger.info("Sentiment API Response")
        logger.info("{Response}".format(Response = data))
        
        analytics_response = json.loads(data.decode('utf-8'))
        sentiment = analytics_response["documents"][0]["score"]
        conn.close()
    except Exception as e:
        logger.error("Sentiment API Error")
        logger.error("[Errno {0}] {1}".format(e.errno, e.strerror))

    response = MessagingResponse()

    if conversation_checkpoint == "end":
        response = TwiML()
        request.session.flush()
    elif conversation_checkpoint == 'follow_up':
        response.message("Thank you for your follow up!")
        sms_feedback.follow_up = body
        sms_feedback.save()
        request.session["checkpoint"] = "end"
    else:
        if (sentiment > 0.5):
            response.message(sms_feedback.positive_reply)
        else:
            response.message(sms_feedback.negative_reply)
        request.session["checkpoint"] = "follow_up"

    return HttpResponse(str(response), content_type='text/xml')

def customer_follow_up(request):
    pass

@ensure_csrf_cookie
def app(request):
    return render(request, 'index.html')