import React, { useRef, useEffect } from 'react';
import type { BlockNode } from '../../../types/document';

interface ParagraphBlockProps {
  block: BlockNode;
  isFocused: boolean;
  onChange: (content: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onFocus: () => void;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
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
    <div style={{ width: '100%', position: 'relative' }}>
      <textarea
        ref={textareaRef}
        value={block.content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        placeholder="Type '/' for commands or begin writing..."
        rows={1}
        style={{
          width: '100%',
          resize: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '1rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1.65,
          padding: '0.2rem 0',
          boxShadow: 'none',
          display: 'block',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};
