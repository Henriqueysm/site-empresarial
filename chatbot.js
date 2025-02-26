const chatHeader = document.getElementById('chat-header');
const chatBody = document.getElementById('chat-body');
const sendMessageButton = document.getElementById('sendMessage');
const userMessageInput = document.getElementById('userMessage');
const messagesContainer = document.getElementById('messages');

// Abrir/fechar chatbot
chatHeader.addEventListener('click', () => {
  chatBody.style.display = chatBody.style.display === 'none' ? 'flex' : 'none';
});

// Chamar a função quando o chat for aberto
chatHeader.addEventListener('click', () => {
  chatBody.style.display = chatBody.style.display === 'none' ? 'flex' : 'none';
  if (chatBody.style.display === 'flex') {
    loadChatHistory(); // Carregar o histórico de mensagens
  }
});

// Enviar mensagem do usuário
sendMessageButton.addEventListener('click', () => {
  const userMessage = userMessageInput.value.trim();
  if (userMessage) {
    appendMessage('Você', userMessage);
    userMessageInput.value = '';
    botResponse(userMessage);
  }
});

// Enviar mensagem ao pressionar Enter
userMessageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita quebra de linha no input
    sendMessage();
  }
});

// Enviar mensagem do usuário (refatorado para reutilização)
sendMessageButton.addEventListener('click', sendMessage);

function sendMessage() {
  const userMessage = userMessageInput.value.trim();
  if (userMessage) {
    appendMessage('Você', userMessage);
    userMessageInput.value = '';
    botResponse(userMessage);
  }
}


// Adicionar mensagem na tela
function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  messageElement.style.margin = '5px 0';
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


// Função para remover acentos e padronizar para minúsculas
function normalizeText(text) {
  return text
    .normalize("NFD") // Separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase(); // Converte para minúsculas
}

function botResponse(userMessage) {
  const botReplies = {
    'nome': 'Sou o assistente virtual da empresa! Como posso ajudar?',
    'ola': 'Olá! Como posso ajudar você?',
    'oi': 'Oi, Tudo bom? Me diga como posso te ajudar?',
    'ajuda': 'Qual seria o seu problema?',
    'contato': 'Você pode nos contatar pelo telefone: (XX) XXXX-XXXX.',
    'telefone': 'Você pode nos contatar pelo telefone: (XX) XXXX-XXXX.',
    'orcamento': 'Para mais informações sobre orçamento você pode nos contatar pelo telefone: (XX) XXXX-XXXX.',
    'preço': 'Para um orçamento detalhado vou pedir que entre em contato conosco no telefone: (XX) XXXX-XXXX.',
    'cartao': 'Aceitamos cartão de débito, pix, boleto e parcelamentos em até 10x no cartão de crédito, Para mais detalhes, entre em contato no telefone (XX) XXXX-XXXX.!',
    'credito': 'Aceitamos cartão de débito, pix, boleto e parcelamentos em até 10x no cartão de crédito, Para mais detalhes, entre em contato no telefone (XX) XXXX-XXXX.!',
    'debito': 'Aceitamos cartão de débito, pix, boleto e parcelamentos em até 10x no cartão de crédito, Para mais detalhes, entre em contato no telefone (XX) XXXX-XXXX.!',
    'pix': 'Aceitamos cartão de débito, pix, boleto e parcelamentos em até 10x no cartão de crédito, Para mais detalhes, entre em contato no telefone (XX) XXXX-XXXX.!',
    'boleto': 'Aceitamos cartão de débito, pix, boleto e parcelamentos em até 10x no cartão de crédito, Para mais detalhes, entre em contato no telefone (XX) XXXX-XXXX.!',
    'endereco': 'Nosso endereço é [xxxxxxxxx]. Atendemos de segunda a sexta, das 8h às 18h.',
    'onde': 'Nosso endereço é [xxxxxxxxx]. Atendemos de segunda a sexta, das 8h às 18h.',
    'fica':'Nosso endereço é [xxxxxxxxx]. Atendemos de segunda a sexta, das 8h às 18h.',
    'local':'Nosso endereço é [xxxxxxxxx]. Atendemos de segunda a sexta, das 8h às 18h.',
    'cidade':'Nosso endereço é [xxxxxxxxx]. Atendemos de segunda a sexta, das 8h às 18h.',
    'funcionamento':'Atendemos de segunda a sexta, das 8h às 18h.',
    'horário':'Atendemos de segunda a sexta, das 8h às 18h.',
  };

  // Normaliza a mensagem do usuário
  const normalizedMessage = normalizeText(userMessage);

  // Verificar se alguma palavra-chave está contida na mensagem
  for (const key in botReplies) {
    if (normalizedMessage.includes(key)) {
      appendMessage('Bot', botReplies[key]);
      return;
    }
  }

  // Resposta padrão se nenhuma palavra-chave for encontrada
  appendMessage('Bot', 'Desculpe, não entendi. Pode reformular?');
}


function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  messageElement.style.margin = '5px 0';
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Salvar as mensagens no localStorage
  saveChatHistory();
}

// Função para salvar o histórico de mensagens no localStorage
function saveChatHistory() {
  const messages = [];
  const messageElements = messagesContainer.getElementsByTagName('div');
  
  // Coletar todas as mensagens e adicionar a um array
  for (let messageElement of messageElements) {
    messages.push(messageElement.textContent);
  }
  
  // Salvar o array no localStorage
  localStorage.setItem('chatHistory', JSON.stringify(messages));
}

// Carregar o histórico de mensagens ao abrir o chat
function loadChatHistory() {
  const savedMessages = localStorage.getItem('chatHistory');
  if (savedMessages) {
    const messages = JSON.parse(savedMessages);
    // Exibir todas as mensagens salvas
    for (let message of messages) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      messageElement.style.margin = '5px 0';
      messagesContainer.appendChild(messageElement);
    }
  }
}

// Chamar a função quando o chat for aberto
chatHeader.addEventListener('click', () => {
  chatBody.style.display = chatBody.style.display === 'none' ? 'flex' : 'none';
  if (chatBody.style.display === 'flex') {
    loadChatHistory(); // Carregar o histórico de mensagens
  }
});


// Limpar o histórico do chat
function clearChatHistory() {
  localStorage.removeItem('chatHistory');
  messagesContainer.innerHTML = ''; // Limpar as mensagens na tela
}

// Exemplo de botão para limpar o histórico
const clearButton = document.getElementById('clearChatButton');
clearButton.addEventListener('click', clearChatHistory);
