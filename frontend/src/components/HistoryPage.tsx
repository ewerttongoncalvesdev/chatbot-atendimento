import { useEffect, useState } from "react";


const API_URL = 'http://localhost:8000/api/chat';

interface HistoryMessage {
    id: number;
    user_id: string;
    message_text: string;
    is_user_message: boolean;
    timestamp: string;
}

interface HistoryPageProps {
    currentUser: string;
}

function HistoryPage({ currentUser }: HistoryPageProps) {
    const [history, setHistory] = useState<HistoryMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchHistory();
    }, [currentUser]);

    const fetchHistory = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/history/?user_id=${currentUser}`);

            if (!response.ok) {
                throw new Error('Erro ao buscar histórico. Tente novamente!');
            }

            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar histórico. Verifique se o backend está rodando.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl h-[600px] bg-white rounded-xl shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-[#1d67ad] text-white px-6 py-4 rounded-t-xl flex justify-between items-center">
                <h2 className="text-xl font-semibold">Histórico - Usuário {currentUser}</h2>
                <button
                    onClick={fetchHistory}
                    disabled={loading}
                    className="px-4 py-2 bg-white text-[#4880ba] font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Carregando...' : 'Atualizar'}
                </button>
            </div>

            {/* History Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Carregando histórico...</p>
                        </div>
                    </div>
                ) : history.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-lg">
                            Nenhuma mensagem no histórico para o Usuário {currentUser}.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((msg) => (
                            <div
                                key={msg.id}
                                className={`p-4 rounded-lg shadow-md border-l-4 ${msg.is_user_message
                                        ? 'bg-green-50 border-teal-600'
                                        : 'bg-gray-50 border-gray-400'
                                    }`}
                            >
                                {/* Message Header */}
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-teal-700">
                                        {msg.is_user_message ? `Usuário ${msg.user_id}` : 'Bot'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(msg.timestamp).toLocaleString('pt-BR')}
                                    </span>
                                </div>

                                {/* Message Content */}
                                <p className="text-gray-800 leading-relaxed">{msg.message_text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HistoryPage;