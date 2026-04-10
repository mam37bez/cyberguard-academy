'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatbotKnowledge, greetings, noAnswerMessages, quickReplies } from '@/data/chatbot-knowledge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(greetings[Math.floor(Math.random() * greetings.length)]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const addUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const findAnswer = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();
    
    // Точное совпадение вопроса
    const exactMatch = chatbotKnowledge.find(
      (item) => item.question.toLowerCase() === lowerQuery
    );
    if (exactMatch) return exactMatch.answer;

    // Поиск по ключевым словам
    const keywordMatch = chatbotKnowledge.find((item) =>
      item.keywords.some((keyword) => lowerQuery.includes(keyword.toLowerCase()))
    );
    if (keywordMatch) return keywordMatch.answer;

    // Поиск в вопросе
    const questionMatch = chatbotKnowledge.find((item) =>
      lowerQuery.includes(item.question.toLowerCase().slice(0, 10))
    );
    if (questionMatch) return questionMatch.answer;

    return null;
  };

  const handleSend = async (message?: string) => {
    const textToSend = message || input.trim();
    if (!textToSend) return;

    addUserMessage(textToSend);
    setInput('');
    setIsTyping(true);

    // Имитация задержки (как будто AI думает)
    await new Promise((resolve) => setTimeout(resolve, 800));

    const answer = findAnswer(textToSend);
    setIsTyping(false);

    if (answer) {
      addBotMessage(answer);
    } else {
      addBotMessage(noAnswerMessages[Math.floor(Math.random() * noAnswerMessages.length)]);
    }
  };

  const handleQuickReply = (query: string) => {
    handleSend(query);
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-md h-[600px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI-Помощник</h3>
                  <p className="text-xs text-white/80">
                    {isTyping ? 'Печатает...' : 'Онлайн'}
                  </p>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-700 text-white rounded-bl-none'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Быстрые ответы */}
            {messages.length <= 1 && (
              <div className="p-3 bg-gray-800 border-t border-gray-700 overflow-x-auto">
                <p className="text-xs text-gray-400 mb-2">Популярные темы:</p>
                <div className="flex gap-2 flex-wrap">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickReply(reply.query)}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-full whitespace-nowrap transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Поле ввода */}
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Задайте вопрос..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
