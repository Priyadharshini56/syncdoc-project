import React, { useRef, useEffect } from 'react';
import type { BlockNode } from '../../../types/document';

interface HeadingBlockProps {
  block: BlockNode;
  isFocused: boolean;
  onChange: (content: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onFocus: () => void;
}

export const HeadingBlock: React.FC<HeadingBlockProps> = ({
  block,
  isFocused,
  onChange,
  onEnter,
  onBackspaceEmpty,
  onFocus,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const level = block.level || 1;

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

  const getFontSize = () => {
    switch (level) {
      case 1:
        return '1.875rem';
      case 2:
        return '1.45rem';
      case 3:
      default:
        return '1.2rem';
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
        placeholder={`Heading ${level}...`}
        rows={1}
        style={{
          width: '100%',
          resize: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: getFontSize(),
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: 'var(--text-primary)',
          lineHeight: 1.3,
          padding: '0.25rem 0',
          boxShadow: 'none',
          display: 'block',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};
