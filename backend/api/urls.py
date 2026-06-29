from django.urls import path

from .views import (
    health_check,
    upload_document,
)

urlpatterns = [
    path("health/", health_check),
    path("upload/", upload_document),
]