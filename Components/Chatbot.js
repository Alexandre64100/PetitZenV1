import React, { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      // Simulation d'une réponse simple du bot pour l'instant
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "Bonjour ! Je suis Alex, votre assistant. Comment puis-je vous aider ?", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <section className="chatbot-section">
      <div className="container">
        <h2>Votre Assistant Alex 🤖</h2>
        <p className="chatbot-subtitle">Posez vos questions sur vos documents ou l'administration !</p>

        <div className="chat-window">
          <div className="messages-display">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {messages.length === 0 && (
                <div className="message bot initial">
                    Bonjour ! Je suis Alex, votre assistant virtuel. N'hésitez pas si vous avez des questions.
                </div>
            )}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Tapez votre message ici..."
            />
            <button onClick={handleSendMessage}>Envoyer</button>
          </div>
        </div>
      </div>
    </section>
  );
}
