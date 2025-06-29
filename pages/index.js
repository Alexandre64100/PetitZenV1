import { useState } from 'react';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Salut ! Je suis Alex, créateur de PetitZen ! 👋 Comment puis-je t'aider ?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = { id: messages.length + 1, type: 'user', text: inputMessage };
    setMessages([...messages, newMessage]);
    
    setTimeout(() => {
      const botResponse = { 
        id: messages.length + 2, 
        type: 'bot', 
        text: "Super question ! PetitZen va révolutionner ta gestion admin. Inscris-toi à la beta gratuite !" 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setInputMessage('');
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <h2>🧘 PetitZen</h2>
        </div>
      </div>
      <div className="hero">
        <div className="logo">🧘</div>
        <h1>PetitZen.tech</h1>
        <p className="tagline">Votre assistant administratif intelligent</p>
        <p style={{color: '#666', marginBottom: '2rem'}}>SaaS pour auto-entrepreneurs</p>
        <button className="button">Commencer gratuitement</button>
      </div>
      
      {/* Bouton chat flottant */}
      {!showChat && (
        <button 
          className="chat-button-floating" 
          onClick={() => setShowChat(true)}
          aria-label="Ouvrir le chat"
        >
          💬
        </button>
      )}
      
      {/* Container du chat */}
      {showChat && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>💬 Chat avec Alex</h3>
            <button onClick={() => setShowChat(false)} style={{background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'white'}}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.type}`}>
                {msg.type === 'bot' && <span className="avatar">🤖</span>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tape ton message..."
            />
            <button onClick={handleSendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
}
