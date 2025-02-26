import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSpinner, FaTimes } from 'react-icons/fa';
import MarkdownRenderer from './MarkdownRenderer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onEndChat: () => void;
}

// 메시지 아이템 컴포넌트를 메모이제이션하여 성능 최적화
const MessageItem = React.memo(({ message }: { message: Message }) => (
  <div className={`message-item ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
    <div className={`message-bubble ${message.role === 'user' ? 'message-bubble-user' : 'message-bubble-assistant'}`}>
      {message.role === 'user' ? (
        <p className='text-sm'>{message.content}</p>
      ) : (
        <MarkdownRenderer content={message.content} />
      )}
    </div>
  </div>
));

// 입력 필드 컴포넌트를 메모이제이션하여 성능 최적화
const ChatInput = React.memo(
  ({
    input,
    setInput,
    handleSendMessage,
    isLoading,
  }: {
    input: string;
    setInput: (value: string) => void;
    handleSendMessage: () => void;
    isLoading: boolean;
  }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <div className='flex flex-col gap-1'>
        <div className='chat-input-group'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='메시지를 입력하세요...'
            disabled={isLoading}
            className='chat-input'
            autoComplete='off'
            spellCheck='false'
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className='chat-send-button btn-glow-effect'
            aria-label='메시지 보내기'
          >
            {isLoading ? (
              <FaSpinner className='animate-spin text-lg' />
            ) : (
              <div className='relative w-full h-full flex items-center justify-center'>
                <FaPaperPlane className='text-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300' />
                <div className='absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full scale-0 group-hover:scale-100 transition-all duration-300'></div>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  },
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, onEndChat }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className='flex flex-col h-full glass-card rounded-modern-lg overflow-hidden'>
      <div className='flex justify-between items-center p-3 border-b border-purple-300/50 bg-white'>
        <h2 className='text-lg font-semibold text-gray-800'>작가와의 대화</h2>
        <button
          onClick={onEndChat}
          className='text-gray-500 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-gray-100'
          title='대화 종료'
        >
          <FaTimes className='text-lg' />
        </button>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-white'>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='p-4 pt-3 pb-3 border-t border-purple-300/50 bg-white bg-opacity-70 backdrop-blur-sm'>
        <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
