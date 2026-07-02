from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


from .models import (
    UploadedDocument,
    ChatMessage,
    Flashcard,
    QuizQuestion,
    QuizAttempt,
)

from .serializers import (
    UploadSerializer,
    ChatMessageSerializer,
    FlashcardSerializer,
    QuizQuestionSerializer,
    QuizAttemptSerializer,
    UserSerializer,
    RegisterSerializer,
)

from .services import (
    extract_text,
    summarize_text,
    chat_with_document,
    generate_flashcards,
    generate_quiz,
)


# ==========================================================
# Health Check
# ==========================================================

@api_view(["GET"])
def health_check(request):

    return Response({

        "status": "success",

        "message": "NightBat Backend is running 🚀"

    })


# ==========================================================
# Upload Document
# ==========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_document(request):

    serializer = UploadSerializer(data=request.data)

    if serializer.is_valid():

        uploaded_file = serializer.validated_data["file"]

        document = UploadedDocument.objects.create(

            user=request.user,

            file=uploaded_file,

        )

        # Extract document text

        text = extract_text(document.file.path)

        # AI Summary

        ai_result = summarize_text(text)

        # Save

        document.extracted_text = text

        document.summary = ai_result["summary"]

        document.key_points = ai_result["key_points"]

        document.action_items = ai_result["action_items"]

        document.save()

        return Response({

            "success": True,

            "id": document.id,

            "filename": document.file.name,

            "url": document.file.url,

            "summary": document.summary,

            "key_points": document.key_points,

            "action_items": document.action_items,

        })

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )

# ==========================================================
# Document History
# ==========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def document_history(request):

    documents = UploadedDocument.objects.filter(

        user=request.user

    ).order_by("-uploaded_at")

    history = []

    for document in documents:

        has_analysis = (

            bool(document.summary)

            or len(document.key_points) > 0

            or len(document.action_items) > 0

        )

        history.append({

            "id": document.id,

            "filename": document.file.name.split("/")[-1],

            "uploaded_at": document.uploaded_at,

            "has_analysis": has_analysis,

        })

    return Response(history)

# ==========================================================
# Document Detail
# ==========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def document_detail(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

        return Response({

            "id": document.id,

            "filename": document.file.name.split("/")[-1],

            "summary": document.summary,

            "key_points": document.key_points,

            "action_items": document.action_items,

            "uploaded_at": document.uploaded_at,

        })

    except UploadedDocument.DoesNotExist:

        return Response(

            {

                "error": "Document not found"

            },

            status=status.HTTP_404_NOT_FOUND

        )


# ==========================================================
# Delete Document
# ==========================================================

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_document(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

        document.file.delete(save=False)

        document.delete()

        return Response({

            "success": True,

            "message": "Document deleted successfully"

        })

    except UploadedDocument.DoesNotExist:

        return Response(

            {

                "error": "Document not found"

            },

            status=status.HTTP_404_NOT_FOUND

        )


# ==========================================================
# Reanalyze Document
# ==========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reanalyze_document(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

        text = extract_text(document.file.path)

        ai_result = summarize_text(text)

        document.extracted_text = text

        document.summary = ai_result["summary"]

        document.key_points = ai_result["key_points"]

        document.action_items = ai_result["action_items"]

        document.save()

        return Response({

            "success": True,

            "message": "Document analyzed successfully.",

            "summary": document.summary,

            "key_points": document.key_points,

            "action_items": document.action_items,

        })

    except UploadedDocument.DoesNotExist:

        return Response(

            {

                "error": "Document not found"

            },

            status=status.HTTP_404_NOT_FOUND

        )
    
# ==========================================================
# Chat with Document (GET + POST)
# ==========================================================

@api_view(["GET", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def chat_document(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

        # DELETE

        if request.method == "DELETE":

            ChatMessage.objects.filter(
                document=document
            ).delete()

            return Response({
                "success": True,
                "message": "Conversation cleared."
            })

    except UploadedDocument.DoesNotExist:

        return Response(
            {
                "error": "Document not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    # ======================
    # GET
    # ======================

    if request.method == "GET":

        messages = ChatMessage.objects.filter(
            document=document
        ).order_by("created_at")

        serializer = ChatMessageSerializer(
            messages,
            many=True
        )

        return Response(serializer.data)

    # ======================
    # POST
    # ======================

    question = request.data.get("question")

    if not question:

        return Response(
            {
                "error": "Question is required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    ChatMessage.objects.create(
        document=document,
        sender="user",
        message=question
    )

    answer = chat_with_document(
        document.extracted_text,
        question
    )

    ChatMessage.objects.create(
        document=document,
        sender="ai",
        message=answer
    )

    return Response({
        "success": True,
        "answer": answer
    })
# ==========================================================
# Flashcards (GET + POST)
# ==========================================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def flashcards(request, document_id):

    try:

        document = UploadedDocument.objects.get(
            id=document_id,
            user=request.user
        )
        

    except UploadedDocument.DoesNotExist:

        return Response(
            {
                "error": "Document not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    existing = Flashcard.objects.filter(
        document=document
    )

    # ===========================
    # GET → Load Existing Cards
    # ===========================

    if request.method == "GET":

        serializer = FlashcardSerializer(
            existing,
            many=True,
        )

        return Response({

            "success": True,

            "flashcards": serializer.data,

        })

    # ===========================
    # POST → Already Generated
    # ===========================

    if existing.exists():

        serializer = FlashcardSerializer(
            existing,
            many=True,
        )

        return Response({

            "success": True,

            "cached": True,

            "flashcards": serializer.data,

        })

    # ===========================
    # Generate Flashcards
    # ===========================

    cards = generate_flashcards(
        document.extracted_text
    )

    for card in cards:

        Flashcard.objects.create(

            document=document,

            question=card.get("question", ""),

            answer=card.get("answer", ""),

        )

    serializer = FlashcardSerializer(

        Flashcard.objects.filter(
            document=document
        ),

        many=True,

    )

    return Response({

        "success": True,

        "cached": False,

        "flashcards": serializer.data,

    })

# ==========================================================
# Mark Flashcard Learned
# ==========================================================

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_flashcard_learned(request, flashcard_id):

    try:

        flashcard = Flashcard.objects.get(

            id=flashcard_id,

            document__user=request.user,

        )

    except Flashcard.DoesNotExist:

        return Response(

            {

                "error": "Flashcard not found."

            },

            status=status.HTTP_404_NOT_FOUND

        )

    flashcard.is_learned = request.data.get(

        "is_learned",

        True,

    )

    flashcard.save()

    return Response({

        "success": True,

        "is_learned": flashcard.is_learned,

    })
    
# ==========================================================
# Quiz (GET + POST)
# ==========================================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def quiz_questions(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

    except UploadedDocument.DoesNotExist:

        return Response(
            {
                "error": "Document not found."
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    # ==========================
    # GET
    # ==========================

    if request.method == "GET":

        quiz = QuizQuestion.objects.filter(
            document=document
        )

        serializer = QuizQuestionSerializer(
            quiz,
            many=True,
        )

        return Response({

            "success": True,

            "questions": serializer.data,

        })

    # ==========================
    # POST
    # ==========================

    existing = QuizQuestion.objects.filter(
        document=document
    )

    if existing.exists():

        serializer = QuizQuestionSerializer(
            existing,
            many=True,
        )

        return Response({

            "success": True,

            "cached": True,

            "questions": serializer.data,

        })

    quiz = generate_quiz(

        document.extracted_text

    )

    for question in quiz:

        QuizQuestion.objects.create(

            document=document,

            question=question["question"],

            option_a=question["option_a"],

            option_b=question["option_b"],

            option_c=question["option_c"],

            option_d=question["option_d"],

            correct_answer=question["correct_answer"],

            explanation=question["explanation"],

        )

    serializer = QuizQuestionSerializer(

        QuizQuestion.objects.filter(

            document=document

        ),

        many=True,

    )

    return Response({

        "success": True,

        "cached": False,

        "questions": serializer.data,

    })

# ==========================================================
# Save Quiz Attempt
# ==========================================================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_quiz_attempt(request, document_id):
    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

    except UploadedDocument.DoesNotExist:

        return Response(

            {

                "error": "Document not found."

            },

            status=status.HTTP_404_NOT_FOUND,

        )

    attempt = QuizAttempt.objects.create(

        document=document,

        score=request.data.get("score", 0),

        correct=request.data.get("correct", 0),

        wrong=request.data.get("wrong", 0),

        skipped=request.data.get("skipped", 0),

        accuracy=request.data.get("accuracy", 0),

        time_taken=request.data.get("time_taken", 0),

    )

    serializer = QuizAttemptSerializer(attempt)

    return Response({

        "success": True,

        "attempt": serializer.data,

    })


# ==========================================================
# Quiz Attempts
# ==========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def quiz_attempts(request, document_id):

    try:

        document = UploadedDocument.objects.get(

            id=document_id,

            user=request.user,

        )

    except UploadedDocument.DoesNotExist:

        return Response(

            {

                "error": "Document not found."

            },

            status=status.HTTP_404_NOT_FOUND,

        )

    attempts = QuizAttempt.objects.filter(

        document=document

    ).order_by("-created_at")

    serializer = QuizAttemptSerializer(

        attempts,

        many=True,

    )

    return Response({

        "success": True,

        "attempts": serializer.data,

    })
# ==========================================================
# Register
# ==========================================================

@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():

        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({

            "success": True,

            "user": UserSerializer(user).data,

            "access": str(refresh.access_token),

            "refresh": str(refresh),

        })

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST,

    )


# ==========================================================
# Current Logged In User
# ==========================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):

    serializer = UserSerializer(request.user)

    return Response(serializer.data)