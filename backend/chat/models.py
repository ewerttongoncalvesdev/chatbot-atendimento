from django.db import models


class Message (models.Model):
    user_id = models.CharField(max_length=10)
    message_texte = models.TextField()
    is_user_message = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

        def __str__(self):
            return f"{self.user_id} - {self.message_text[:50]}"
