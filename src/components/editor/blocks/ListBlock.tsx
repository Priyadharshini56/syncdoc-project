import React, { useRef, useEffect } from 'react';
import type { BlockNode } from '../../../types/document';

interface ListBlockProps {
  block: BlockNode;
  isFocused: boolean;
  onChange: (content: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onFocus: () => void;
}

export const ListBlock: React.FC<ListBlockProps> = ({
  block,
  isFocused,
  onChange,
  onEnter,
  onBackspaceEmpty,
  onFocus,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isOrdered = block.listType === 'ordered';

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
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', width: '100%' }}>
      <div
        style={{
          width: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: 'var(--accent-primary)',
          fontWeight: 700,
          userSelect: 'none',
          marginTop: '0.3rem',
        }}
      >
        {isOrdered ? `${block.order + 1}.` : '•'}
      </div>
      <div style={{ flex: 1 }}>
        <textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          placeholder="List item..."
          rows={1}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            padding: '0.2rem 0',
            boxShadow: 'none',
            display: 'block',
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};
