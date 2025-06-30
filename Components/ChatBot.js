import React, { useState } from 'react';

export default function ChatBot() {
  // État pour les messages de la conversation
  const [messages, setMessages] = useState([]);
  // État pour le texte entré par l'utilisateur
  const [input, setInput] = useState('');
  // État pour gérer la visibilité du chat (true = visible, false = caché)
  const [showChat, setShowChat] = useState(false); // Le chat est caché par défaut

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      // Simulation d'une réponse simple du bot pour l'instant
      setTimeout(() => {
        // Message du bot après le premier envoi : tout en tutoiement
        setMessages(prevMessages => [...prevMessages, { text: "Bonjour ! Je suis ton assistant. Comment puis-je t'aider maintenant ?", sender: 'bot' }]);
      }, 1000);
    }
  };

  // Fonction pour basculer la visibilité du chat
  const toggleChat = () => {
    setShowChat(!showChat); // Inverse l'état actuel (visible devient caché, caché devient visible)
  };

  return (
    <> {/* Fragment React pour pouvoir retourner plusieurs éléments au même niveau */}
      {/* Bouton flottant toujours visible pour ouvrir/fermer le chat */}
      <button className="chatbot-toggle-button" onClick={toggleChat}>
        {showChat ? '✖️' : '💬'} {/* Affiche 'X' si ouvert, bulle de dialogue si fermé */}
      </button>

      {/* Fenêtre du Chat Bot - visible uniquement si showChat est vrai */}
      {showChat && (
        <section className="chatbot-section">
          <div className="chatbot-header-draggable" onClick={toggleChat}>
            <h2>Chat Bot ZEN+ 🤖</h2>
          </div>

          <div className="chat-window">
            <div className="messages-display">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              {messages.length === 0 && (
                  <div className="message bot initial">
                      {/* Message initial du bot : tout en tutoiement */}
                      Bonjour ! Je suis Alex, ton assistant personnel. N'hésite pas à poser des questions.
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
                placeholder="Tape ton message ici..." {/* Changé pour être en tutoiement */}
              />
              <button onClick={handleSendMessage}>Envoyer</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
