import React, { useState, useEffect, useRef } from 'react';

export default function RateChatbot() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Welcome to Jharkhand Darshan! How can I assist you today?' }
  ]);
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [chatLog]);

  async function sendMessage(message) {
    setChatLog(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
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

  return (
    <div className="chatbot-container p-4 rounded shadow max-w-lg mx-auto bg-white mb-10">
      <h2 className="text-xl font-bold mb-3">Rate and Report Chatbot</h2>
      <div className="chat-log h-64 overflow-y-auto mb-4 border border-gray-200 p-3 rounded">
        {chatLog.map((msg, idx) => (
          <div key={idx} className={`message mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block rounded px-3 py-2 ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about Jharkhand tourism..."
          className="flex-grow border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">Send</button>
      </form>
    </div>
  );
}