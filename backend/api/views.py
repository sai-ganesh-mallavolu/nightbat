from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status 

from .serializers import UploadSerializer

from .models import UploadedDocument
from .services import (
    extract_text,
    clean_text,
    summarize_text,
)


@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "success",
        "message": "NightBat Backend is running 🚀"
    })


@api_view(["POST"])
def upload_document(request):

    serializer = UploadSerializer(data=request.data)

    if serializer.is_valid():

        uploaded_file = serializer.validated_data["file"]

        document = UploadedDocument.objects.create(
            file=uploaded_file
        )

        text = extract_text(document.file.path)
        text = clean_text(text)
        summary = summarize_text(text)
        return Response({
            "success": True,
            "id": document.id,
            "filename": document.file.name,
            "url": document.file.url,
            "summary": summary,
        })

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )