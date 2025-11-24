from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .seralizers import MessageSerializer


class SendMessageView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')  # MUDOU AQUI
        message_text = request.data.get('message_text')

        if not user_id or not message_text:  # MUDOU AQUI
            return Response(
                {'error': 'user_id e message_text são obrigatórios'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Salva a mensagem do usuário
        user_message = Message.objects.create(
            user_id=user_id,  # MUDOU AQUI
            message_text=message_text,
            is_user_message=True
        )

        # Resposta mockada diferente por usuário
        if user_id == 'A':
            bot_response = "Obrigado por seu contato, Usuário A. Em breve responderemos sua solicitação."
        elif user_id == 'B':
            bot_response = "Obrigado por seu contato, Usuário B. Nossa equipe entrará em contato em breve."
        else:
            bot_response = f"Obrigado por seu contato, {user_id}. Em breve responderemos."

        # Salva a resposta do bot
        bot_message = Message.objects.create(
            user_id=user_id,  # MUDOU AQUI
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
        user_id = request.query_params.get('user_id')  # MUDOU AQUI

        if not user_id:  # MUDOU AQUI
            return Response(
                {'error': 'user_id é obrigatório'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Busca histórico de mensagens do usuário
        messages = Message.objects.filter(user_id=user_id).order_by('id')  # MUDOU AQUI
        serializer = MessageSerializer(messages, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)