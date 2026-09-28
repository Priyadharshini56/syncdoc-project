import React, { useRef, useEffect } from 'react';
import type { BlockNode } from '../../../types/document';
import { Quote } from 'lucide-react';

interface QuoteBlockProps {
  block: BlockNode;
  isFocused: boolean;
  onChange: (content: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onFocus: () => void;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  block,
  isFocused,
  onChange,
  onEnter,
  onBackspaceEmpty,
  onFocus,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.content]);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    } else if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      onBackspaceEmpty();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        width: '100%',
        padding: '0.625rem 1rem',
        borderLeft: '3px solid var(--accent-primary)',
        backgroundColor: 'var(--accent-primary-light)',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
      }}
    >
      <Quote size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '4px' }} />
      <div style={{ flex: 1 }}>
        <textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          placeholder="Quote or architectural decision note..."
          rows={1}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            padding: 0,
            boxShadow: 'none',
            display: 'block',
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};
