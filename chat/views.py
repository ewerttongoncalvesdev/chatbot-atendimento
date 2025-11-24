from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .seralizers import MessageSerializer


class SendMessageView(APIView):
    def post(self, request):
        user_name = request.data.get('user_name')
        message_text = request.data.get('message_text')

        if not user_name or not message_text:
            return Response(
                {'error': 'Nome do usuário e mensagem são obrigatórios'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Salva a mensagem do usuário
        user_message = Message.objects.create(
            user_id=user_name,
            message_text=message_text,
            is_user_message=True
        )

        # Resposta mockada automática com nome do usuário
        bot_response = f"Obrigado por seu contato, {user_name}. Em breve responderemos sua solicitação."

        # Salva a resposta do bot
        bot_message = Message.objects.create(
            user_id=user_name,
            message_text=bot_response,
            is_user_message=False
        )

        # Retorno da conversa
        return Response({
            'user_message': MessageSerializer(user_message).data,
            'bot_message': MessageSerializer(bot_message).data
        }, status=status.HTTP_201_CREATED)


class HistoryView(APIView):
    def get(self, request):
        user_name = request.query_params.get('user_name')

        if not user_name:
            return Response(
                {'error': 'Nome do usuário é obrigatório'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Busca histórico de mensagens do usuário
        messages = Message.objects.filter(user_id=user_name).order_by('id')
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
