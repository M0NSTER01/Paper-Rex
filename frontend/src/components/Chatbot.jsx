import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chatbot({ 
  context, 
  title = "AI Assistant", 
  welcomeMessage = "Hi there! I am the Paper Rex AI Assistant. How can I help you with your resume or portfolio today?", 
  hideFab = false,
  triggerEvent = null 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: welcomeMessage }] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!triggerEvent) return;
    const handleOpen = () => setIsOpen(true);
    window.addEventListener(triggerEvent, handleOpen);
    return () => window.removeEventListener(triggerEvent, handleOpen);
  }, [triggerEvent]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user', parts: [{ text: userMessage }] }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_BACKEND_URL;
      
      const res = await axios.post(`${API_BASE}/api/chat`, {
        message: userMessage,
        history: messages,
        context: context
      });

      setMessages([...newMessages, { role: 'model', parts: [{ text: res.data.response }] }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([...newMessages, { role: 'model', parts: [{ text: 'Oops! I encountered an error. Please try again later.' }] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!hideFab && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 w-14 h-14 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 sm:w-[460px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '600px', maxHeight: '85vh' }}>
        
        {/* Header */}
        <div className="bg-[var(--color-primary)] p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold font-geist">{title}</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div key={idx} className={`flex gap-2 max-w-[85%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
                <div className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center ${isUser ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${isUser ? 'bg-[var(--color-primary)] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'}`}>
                  {isUser ? msg.parts[0].text : (
                    <div className="markdown-prose">
                      <ReactMarkdown>
                        {msg.parts[0].text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex gap-2 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-gray-200 rounded-tl-none shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-secondary)] disabled:opacity-50 transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </>
  );
}
