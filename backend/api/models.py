from django.db import models
from django.contrib.auth.models import User


# ==========================================================
# Uploaded Documents
# ==========================================================

class UploadedDocument(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True,
    )

    file = models.FileField(upload_to="documents/")

    extracted_text = models.TextField(blank=True)

    summary = models.TextField(blank=True)

    key_points = models.JSONField(default=list, blank=True)

    action_items = models.JSONField(default=list, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):

        return self.file.name


# ==========================================================
# Chat Messages
# ==========================================================

class ChatMessage(models.Model):

    document = models.ForeignKey(
        UploadedDocument,
        on_delete=models.CASCADE,
        related_name="chat_messages",
    )

    sender = models.CharField(
        max_length=10,
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        ordering = ["created_at"]

    def __str__(self):

        return f"{self.sender} - {self.document.id}"


# ==========================================================
# Flashcards
# ==========================================================

class Flashcard(models.Model):

    document = models.ForeignKey(
        UploadedDocument,
        on_delete=models.CASCADE,
        related_name="flashcards",
    )

    question = models.TextField()

    answer = models.TextField()

    is_learned = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):

        return self.question[:60]


# ==========================================================
# Quiz Questions
# ==========================================================

class QuizQuestion(models.Model):

    document = models.ForeignKey(
        UploadedDocument,
        on_delete=models.CASCADE,
        related_name="quiz_questions",
    )

    question = models.TextField()

    option_a = models.CharField(max_length=300)

    option_b = models.CharField(max_length=300)

    option_c = models.CharField(max_length=300)

    option_d = models.CharField(max_length=300)

    correct_answer = models.CharField(max_length=1)

    explanation = models.TextField(blank=True)

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):

        return self.question[:60]


# ==========================================================
# Quiz Attempts
# ==========================================================

class QuizAttempt(models.Model):

    document = models.ForeignKey(
        UploadedDocument,
        on_delete=models.CASCADE,
        related_name="quiz_attempts",
    )

    score = models.IntegerField()

    correct = models.IntegerField()

    wrong = models.IntegerField()

    skipped = models.IntegerField()

    accuracy = models.FloatField()

    time_taken = models.IntegerField()

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):

        return f"{self.document.id} - {self.score}%"