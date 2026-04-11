'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { chatbotKnowledge, greetings, noAnswerMessages, quickReplies } from '@/data/chatbot-knowledge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      const text = greetings[Math.floor(Math.random() * greetings.length)];
      return [
        {
          id: `${Date.now()}-greeting`,
          text,
          isBot: true,
          timestamp: new Date(),
        },
      ];
    });
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
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="cyberguard-chat-panel"
        className="fixed bottom-6 right-6 z-[60] flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary-600 to-primary-500 text-3xl text-white shadow-xl shadow-primary-950/40 ring-1 ring-white/10 transition-transform hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="sr-only">{isOpen ? 'Закрыть помощник' : 'Открыть помощник'}</span>
        <span aria-hidden>{isOpen ? '✕' : '🤖'}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="cyberguard-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed bottom-24 right-6 z-[55] flex h-[min(600px,calc(100vh-7rem))] w-[min(100vw-1.5rem,28rem)] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-cyber-card/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="border-b border-white/[0.06] bg-gradient-to-r from-primary-600/95 to-primary-500/90 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-2xl ring-1 ring-white/20">
                  🤖
                </div>
                <div>
                  <h3 id="chatbot-title" className="text-lg font-semibold tracking-tight">
                    Помощник
                  </h3>
                  <p className="text-xs text-white/75">
                    {isTyping ? 'Печатает…' : 'CyberGuard Academy'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-cyber-darker/50 p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 ${
                      message.isBot
                        ? 'rounded-bl-none border border-white/[0.08] bg-white/[0.06] text-slate-100'
                        : 'rounded-br-none border border-primary-500/25 bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-950/20'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p
                      className={cn(
                        'mt-1 text-xs',
                        message.isBot ? 'text-slate-500' : 'text-white/65',
                      )}
                    >
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
                  <div className="rounded-2xl rounded-bl-none border border-white/[0.08] bg-white/[0.06] p-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-slate-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-slate-400"
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
              <div className="overflow-x-auto border-t border-white/[0.06] bg-cyber-darker/80 p-3">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">Популярные темы</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleQuickReply(reply.query)}
                      className="whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-primary-500/35 hover:bg-primary-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
                      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Поле ввода */}
            <div className="border-t border-white/[0.06] bg-cyber-darker/90 p-4">
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
                  placeholder="Задайте вопрос…"
                  className="min-w-0 flex-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-primary-500/45 focus:outline-none focus:ring-2 focus:ring-primary-500/25"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-950/30 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  whileHover={reduceMotion || !input.trim() ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion || !input.trim() ? undefined : { scale: 0.92 }}
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
