"""
ASGI config for bookmanagement project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from userapp import consumers
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookmanagement.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            # WebSocket URL routing
            path('ws/chat/', consumers.ChatConsumer.as_asgi()), # Make sure to import your chat consumer
        ])
    ),
})
