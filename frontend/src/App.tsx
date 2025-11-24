import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import HistoryPage from './components/HistoryPage';
import { useState } from 'react';

function App() {
    const [currentUser, setCurrentUser] = useState<string>('A');

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header */}
                <header className="bg-[#1d67ad] text-white shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl font-bold mb-4">Chatbot de Atendimento</h1>

                        {/* User Selector */}
                        <div className="flex items-center gap-3 mb-4">
                            <label className="font-medium">Usuário Ativo:</label>
                            <select
                                value={currentUser}
                                onChange={(e) => setCurrentUser(e.target.value)}
                                className="px-4 py-2 rounded-lg bg-white text-teal-700 font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <option value="A">Usuário A</option>
                                <option value="B">Usuário B</option>
                            </select>
                        </div>

                        {/* Navigation */}
                        <nav className="flex gap-4">
                            <Link
                                to="/"
                                className="px-4 py-2 rounded-lg hover:bg-[#4880ba] transition-colors"
                            >
                                Chat
                            </Link>
                            <Link
                                to="/historico"
                                className="px-4 py-2 rounded-lg hover:bg-[#4880ba] transition-colors"
                            >
                                Histórico
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-8">
                    <Routes>
                        <Route path="/" element={<ChatPage currentUser={currentUser} />} />
                        <Route path="/historico" element={<HistoryPage currentUser={currentUser} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;