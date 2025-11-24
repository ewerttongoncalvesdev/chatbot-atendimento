import React, { useState } from 'react';

const API_URL = 'http://localhost:8000/api/chat';

interface Message {
    text: string;
    isUser: boolean;
    timestamp: string;
}

interface ChatPageProps {
    currentUser: string;
}

function ChatPage({ currentUser }: ChatPageProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/send/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: currentUser,
                    message_text: inputMessage,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem. Tente novamente!');
            }

            const data = await response.json();

            // Adiciona as mensagens ao chat
            setMessages([
                ...messages,
                {
                    text: data.user_message.message_text,
                    isUser: true,
                    timestamp: data.user_message.timestamp,
                },
                {
                    text: data.bot_message.message_text,
                    isUser: false,
                    timestamp: data.bot_message.timestamp,
                },
            ]);

            setInputMessage('');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar mensagem. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="w-full max-w-4xl h-[600px] bg-white rounded-xl shadow-2xl flex flex-col">
            {/* Chat Header */}
            <div className="bg-[#1d67ad] text-white px-6 py-4 rounded-t-xl">
                <h2 className="text-xl font-semibold">Chat - Usuário {currentUser}</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#e5ddd5] space-y-4">
                {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p className="text-lg">Nenhuma mensagem ainda. Comece a conversa!</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-3 rounded-lg shadow-md ${msg.isUser
                                        ? 'bg-[#dcf8c6]'
                                        : 'bg-white'
                                    }`}
                            >
                                <p className="font-semibold text-sm mb-1 text-[#4880ba]">
                                    {msg.isUser ? `Usuário ${currentUser}` : 'Bot'}
                                </p>
                                <p className="text-gray-800">{msg.text}</p>
                                <span className="block text-xs text-gray-500 mt-2 text-right">
                                    {new Date(msg.timestamp).toLocaleTimeString('pt-BR')}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-100 rounded-b-xl flex gap-3">
                <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    disabled={loading}
                    rows={3}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-200"
                />
                <button
                    onClick={sendMessage}
                    disabled={loading || !inputMessage.trim()}
                    className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
}

export default ChatPage;