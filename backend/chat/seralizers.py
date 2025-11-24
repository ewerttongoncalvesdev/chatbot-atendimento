
from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user_id', 'message_text',
                  'is_user_message', 'timestamp']
        read_only_fields = ['id', 'timestamp']
