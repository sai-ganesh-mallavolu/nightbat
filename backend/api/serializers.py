from rest_framework import serializers


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