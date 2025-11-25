# 🤖 Chatbot de Atendimento Simulado

Sistema de chat fullstack desenvolvido com Django REST Framework e React + TypeScript, implementando um chatbot simulado com histórico de conversas por usuário.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Decisões Técnicas](#decisões-técnicas)
- [API Endpoints](#api-endpoints)

---

## 🎯 Sobre o Projeto

Este projeto implementa um sistema de chat com backend em Django e frontend em React, onde dois usuários fictícios (A e B) podem enviar mensagens e receber respostas automáticas do bot. O sistema mantém um histórico completo de conversas separado por usuário.

### Requisitos Atendidos

✅ Login mockado com seleção de usuário (A ou B)  
✅ Interface de chat funcional com envio e recebimento de mensagens  
✅ Persistência de dados no banco SQLite  
✅ Respostas automáticas diferentes por usuário  
✅ Tela de histórico com filtro por usuário  
✅ Atualização em tempo real ao trocar de usuário

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.12**
- **Django 5.2.8**
- **Django REST Framework** - API RESTful
- **django-cors-headers** - Habilitação de CORS
- **SQLite** - Banco de dados

### Frontend
- **React 18** com **TypeScript**
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Estilização
- **Fetch API** - Requisições HTTP

---

## ⚙️ Funcionalidades

### 1. Login Mockado
- Seleção simples entre "Usuário A" e "Usuário B" via dropdown
- Estado gerenciado no React (sem autenticação real)
- Persistência do usuário ativo durante a navegação

### 2. Tela de Chat
- Interface intuitiva de chat em tempo real
- Envio de mensagens com identificação do usuário
- Respostas automáticas personalizadas por usuário
- Exibição de timestamp em cada mensagem
- Salvamento automático no banco de dados

### 3. Tela de Histórico
- Visualização completa do histórico de conversas
- Filtro automático por usuário ativo
- Atualização instantânea ao trocar de usuário
- Identificação visual entre mensagens do usuário e do bot
- Botão de atualização manual

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.8+** 
- **Node.js 14+** e **npm**
- **Git**

---

## 🔧 Instalação e Execução

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/chatbot-atendimento.git
cd chatbot-atendimento
```

### 2️⃣ Configurar o Backend (Django)

```bash
# Navegar para a pasta do backend
cd backend

# Criar e ativar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install django djangorestframework django-cors-headers

# Criar as tabelas no banco de dados
python manage.py makemigrations
python manage.py migrate

# Iniciar o servidor Django
python manage.py runserver
```

✅ Backend rodando em: `http://localhost:8000`

### 3️⃣ Configurar o Frontend (React)

**Abra um NOVO terminal** (mantenha o backend rodando):

```bash
# Navegar para a pasta do frontend
cd chatbot-frontend

# Instalar dependências
npm install

# Iniciar o servidor React
npm run dev
```

✅ Frontend rodando em: `http://localhost:5173` ou `http://localhost:3000`

### 4️⃣ Acessar a Aplicação

Abra seu navegador e acesse: `http://localhost:5173` (ou a porta indicada)

---

## 📁 Estrutura do Projeto

```
chatbot-atendimento/
│
├── backend/                  # Django Backend
│   ├── chat/                 # App principal
│   │   ├── models.py         # Model Message
│   │   ├── serializers.py    # Serializer para API
│   │   ├── views.py          # Views da API
│   │   └── urls.py           # Rotas da API
│   ├── core/                 # Configurações do projeto
│   │   ├── settings.py       # Configurações (CORS, DB, etc)
│   │   └── urls.py           # URLs principais
│   ├── manage.py
│   └── db.sqlite3            # Banco de dados
│
└── chatbot-frontend/         # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── ChatPage.tsx      # Tela de chat
    │   │   └── HistoryPage.tsx   # Tela de histórico
    │   ├── App.tsx               # Componente principal
    │   └── index.css             # Estilos Tailwind
    ├── package.json
    └── tailwind.config.js
```

---

## 🧠 Decisões Técnicas

### Backend (Django)

#### Modelagem de Dados
Optei por um modelo simples e eficiente:

```python
class Message(models.Model):
    user_id = models.CharField(max_length=10)        # Identificador do usuário (A ou B)
    message_text = models.TextField()                # Conteúdo da mensagem
    is_user_message = models.BooleanField()          # True = usuário, False = bot
    timestamp = models.DateTimeField(auto_now_add=True)  # Data/hora automática
```

**Justificativas:**
- `user_id` como CharField permite flexibilidade futura (ex: adicionar mais usuários)
- `is_user_message` facilita distinguir mensagens do usuário e do bot
- `timestamp` com `auto_now_add=True` garante registro automático
- `ordering = ['timestamp']` no Meta garante ordem cronológica

#### API RESTful
Implementei dois endpoints principais:

1. **POST /api/chat/send/** - Envia mensagem e retorna resposta do bot
2. **GET /api/chat/history/?user_id=A** - Busca histórico filtrado

**Justificativa:** API RESTful segue padrões da indústria e facilita escalabilidade.

#### CORS
Configurei `django-cors-headers` para permitir requisições do frontend nas portas 3000 e 5173.

**Justificativa:** Necessário para comunicação entre frontend e backend em desenvolvimento.

### Frontend (React + TypeScript)

#### Gerenciamento de Estado
Utilizei `useState` do React para gerenciar:
- Usuário ativo (A ou B)
- Mensagens do chat
- Estado de carregamento
- Histórico de mensagens

**Justificativa:** Para este escopo, hooks nativos são suficientes. Contextos ou Redux seriam over-engineering.

#### TypeScript
Implementei interfaces para tipagem forte:

```typescript
interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatPageProps {
  currentUser: string;
}
```

**Justificativa:** TypeScript previne erros em tempo de desenvolvimento e melhora a manutenibilidade.

#### Tailwind CSS
Optei por Tailwind ao invés de CSS tradicional.

**Justificativas:**
- Desenvolvimento mais rápido com classes utilitárias
- Consistência visual sem arquivos CSS separados
- Fácil customização e responsividade
- Melhor performance (CSS não utilizado é removido)

#### React Router
Implementei roteamento para separar Chat (`/`) e Histórico (`/historico`).

**Justificativa:** Segue padrão de SPA (Single Page Application) com navegação fluida.

### Comunicação Frontend-Backend

Utilizei **Fetch API** nativa do JavaScript para requisições HTTP.

**Justificativa:** 
- Nativo do navegador (sem dependências extras)
- Suficiente para o escopo do projeto
- Async/await torna o código mais legível

---

## 📡 API Endpoints

### 1. Enviar Mensagem

**Endpoint:** `POST /api/chat/send/`

**Request Body:**
```json
{
  "user_id": "A",
  "message_text": "Olá, preciso de ajuda!"
}
```

**Response (201 Created):**
```json
{
  "user_message": {
    "id": 1,
    "user_id": "A",
    "message_text": "Olá, preciso de ajuda!",
    "is_user_message": true,
    "timestamp": "2025-11-24T19:00:00Z"
  },
  "bot_message": {
    "id": 2,
    "user_id": "A",
    "message_text": "Obrigado por seu contato, Usuário A. Em breve responderemos sua solicitação.",
    "is_user_message": false,
    "timestamp": "2025-11-24T19:00:01Z"
  }
}
```

### 2. Buscar Histórico

**Endpoint:** `GET /api/chat/history/?user_id=A`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "user_id": "A",
    "message_text": "Olá, preciso de ajuda!",
    "is_user_message": true,
    "timestamp": "2025-11-24T19:00:00Z"
  },
  {
    "id": 2,
    "user_id": "A",
    "message_text": "Obrigado por seu contato...",
    "is_user_message": false,
    "timestamp": "2025-11-24T19:00:01Z"
  }
]
```

---

## 🧪 Testando a Aplicação

1. ✅ Selecione "Usuário A" no dropdown
2. ✅ Envie uma mensagem no chat
3. ✅ Verifique se o bot respondeu
4. ✅ Navegue para "Histórico"
5. ✅ Confirme que as mensagens aparecem
6. ✅ Troque para "Usuário B"
7. ✅ Verifique que o histórico mudou

---

## 🔮 Melhorias Futuras

- [ ] Autenticação real com JWT
- [ ] WebSockets para chat em tempo real
- [ ] Paginação no histórico
- [ ] Testes unitários (Pytest + Jest)
- [ ] Deploy em produção 
- [ ] Integração com IA 
- [ ] Suporte a múltiplos usuários
- [ ] Upload de arquivos/imagens

---

## 👨‍💻 Autor

**Ewertton Gonçalves**
- GitHub: [@ewerttongongalvesdev](https://github.com/ewerttongoncalvesdev)
- LinkedIn: [Ewertton Gonçalves](https://www.linkedin.com/in/ewerttongoncalves/)
- Email: dev.ewerttongoncalves@gmail.com

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
