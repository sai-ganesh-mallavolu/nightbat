from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    health_check,
    upload_document,
    document_history,
    document_detail,
    delete_document,
    reanalyze_document,
    chat_document,
    flashcards,
    mark_flashcard_learned,
    quiz_questions,
    save_quiz_attempt,
    quiz_attempts,
    register_user,
    current_user,
)

urlpatterns = [

    # ==========================================================
    # Health
    # ==========================================================

    path(
        "health/",
        health_check,
    ),

    # ==========================================================
    # Authentication
    # ==========================================================

    path(
        "register/",
        register_user,
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
    ),

    path(
        "me/",
        current_user,
    ),

    # ==========================================================
    # Upload
    # ==========================================================

    path(
        "upload/",
        upload_document,
    ),

    # ==========================================================
    # Document History
    # ==========================================================

    path(
        "history/",
        document_history,
    ),

    path(
        "history/<int:document_id>/",
        document_detail,
    ),

    path(
        "history/<int:document_id>/delete/",
        delete_document,
    ),

    path(
        "history/<int:document_id>/reanalyze/",
        reanalyze_document,
    ),

    # ==========================================================
    # Chat
    # ==========================================================

    path(
        "history/<int:document_id>/chat/",
        chat_document,
    ),

    # ==========================================================
    # Flashcards
    # ==========================================================

    path(
        "history/<int:document_id>/flashcards/",
        flashcards,
    ),

    path(
        "flashcards/<int:flashcard_id>/learn/",
        mark_flashcard_learned,
    ),

    # ==========================================================
    # Quiz
    # ==========================================================

    path(
        "history/<int:document_id>/quiz/",
        quiz_questions,
    ),

    path(
        "history/<int:document_id>/quiz/attempt/",
        save_quiz_attempt,
    ),

    path(
        "history/<int:document_id>/quiz/attempts/",
        quiz_attempts,
    ),

]