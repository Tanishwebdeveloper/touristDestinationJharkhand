import React, { useState, useEffect, useRef } from 'react';

export default function JharkhandTourismChatbot() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Welcome to Jharkhand Darshan! How can I assist you today?' }
  ]);
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);  // popup open/fullscreen toggle

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog, isOpen]);

  async function sendMessage(message) {
    setChatLog(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await fetch('http://localhost:5000/api/jharkhand-tourism-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Chat API error');

      const reader = response.body.getReader();
      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
      
        let chunk = new TextDecoder().decode(value).trim();
        // Ignore empty chunks or the done message
        if (!chunk || chunk === 'data: [DONE]') continue;
      
        // Remove the event prefix "data: "
        if (chunk.startsWith('data:')) {
          chunk = chunk.slice('data:'.length).trim();
        }
      
        let data;
        try {
          data = JSON.parse(chunk);
        } catch {
          // If parse fails, ignore chunk
          continue;
        }
      
        // Extract text parts as before
        const textParts = data?.candidates?.[0]?.content?.parts || [];
        const text = textParts.map(part => part.text).join('');
      
        if (text) {
          // Append text to current bot message
          setChatLog(log => {
            const newLog = [...log];
            if (newLog[newLog.length - 1]?.sender === 'bot') {
              newLog[newLog.length - 1].text += text;
            } else {
              newLog.push({ sender: 'bot', text });
            }
            return newLog;
          });
        }
      }
    } catch (err) {
      setChatLog(log => [...log, { sender: 'bot', text: 'Error contacting chatbot' }]);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  if (!isOpen) {
    // Render small clickable popup bubble at bottom right
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          backgroundColor: '#2563eb',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          userSelect: 'none',
          fontSize: 16
        }}
        title="Open Chatbot"
      >
        Chat
      </div>
    );
  }

  // Fullscreen chatbot window
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0, right: 0,
        backgroundColor: 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="text-xl font-bold">Jharkhand Tourism Chatbot</h2>
        <button onClick={() => setIsOpen(false)} style={{ fontSize: 24, cursor: 'pointer', background: 'none', border: 'none' }} title="Close chat">
          &times;
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '1rem', borderRadius: 8 }}>
        {chatLog.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: msg.sender === 'user' ? '#bfdbfe' : '#e5e7eb',
              padding: '0.5rem 1rem',
              borderRadius: 999,
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        <input
          style={{
            flexGrow: 1,
            padding: '0.5rem',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about Jharkhand tourism..."
        />
        <button type="submit" style={{
          padding: '0 1rem',
          borderRadius: 8,
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Send
        </button>
      </form>
    </div>
  );
}