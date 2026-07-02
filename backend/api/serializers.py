from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from .models import (
    UploadedDocument,
    ChatMessage,
    Flashcard,
    QuizQuestion,
    QuizAttempt,
)


# ==========================================================
# Upload
# ==========================================================

class UploadSerializer(serializers.Serializer):

    file = serializers.FileField()

    def validate_file(self, value):

        allowed_extensions = [".pdf", ".docx", ".txt"]

        filename = value.name.lower()

        if not any(filename.endswith(ext) for ext in allowed_extensions):

            raise serializers.ValidationError(
                "Only PDF, DOCX and TXT files are allowed."
            )

        max_size = 10 * 1024 * 1024  # 10 MB

        if value.size > max_size:

            raise serializers.ValidationError(
                "Maximum file size is 10 MB."
            )

        return value


# ==========================================================
# Chat
# ==========================================================

class ChatMessageSerializer(serializers.ModelSerializer):

    class Meta:

        model = ChatMessage

        fields = [

            "id",

            "sender",

            "message",

            "created_at",

        ]


# ==========================================================
# Flashcards
# ==========================================================

class FlashcardSerializer(serializers.ModelSerializer):

    class Meta:

        model = Flashcard

        fields = "__all__"


# ==========================================================
# Quiz Questions
# ==========================================================

class QuizQuestionSerializer(serializers.ModelSerializer):

    class Meta:

        model = QuizQuestion

        fields = "__all__"


# ==========================================================
# Quiz Attempts
# ==========================================================

class QuizAttemptSerializer(serializers.ModelSerializer):

    class Meta:

        model = QuizAttempt

        fields = "__all__"


# ==========================================================
# User Serializer
# ==========================================================

class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = [

            "id",

            "username",

            "email",

            "first_name",

            "last_name",

        ]


# ==========================================================
# Register Serializer
# ==========================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(

        write_only=True,

        validators=[validate_password],

    )

    confirm_password = serializers.CharField(

        write_only=True,

    )

    class Meta:

        model = User

        fields = [

            "username",

            "email",

            "password",

            "confirm_password",

            "first_name",

            "last_name",

        ]

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError(

                {

                    "password": "Passwords do not match."

                }

            )

        return attrs

    def create(self, validated_data):

        validated_data.pop("confirm_password")

        user = User.objects.create_user(

            username=validated_data["username"],

            email=validated_data["email"],

            password=validated_data["password"],

            first_name=validated_data.get("first_name", ""),

            last_name=validated_data.get("last_name", ""),

        )

        return user