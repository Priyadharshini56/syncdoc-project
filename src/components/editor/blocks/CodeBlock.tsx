import React, { useRef, useEffect, useState } from 'react';
import type { BlockNode } from '../../../types/document';
import { Copy, Check, Code } from 'lucide-react';

interface CodeBlockProps {
  block: BlockNode;
  isFocused: boolean;
  onChange: (content: string) => void;
  onEnter: () => void;
  onBackspaceEmpty: () => void;
  onFocus: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  block,
  isFocused,
  onChange,
  onBackspaceEmpty,
  onFocus,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 60)}px`;
    }
  }, [block.content]);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newContent = block.content.substring(0, start) + '  ' + block.content.substring(end);
      onChange(newContent);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    } else if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault();
      onBackspaceEmpty();
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Code header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.375rem 0.875rem',
          backgroundColor: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600 }}>
          <Code size={13} style={{ color: 'var(--accent-primary)' }} />
          <span>{block.language || 'typescript'}</span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.2rem 0.4rem',
            borderRadius: 'var(--radius-xs)',
            color: copied ? 'var(--accent-emerald)' : 'var(--text-muted)',
            fontSize: '0.6875rem',
            fontWeight: 600,
          }}
          title="Copy Code"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Textarea */}
      <div style={{ padding: '0.75rem 1rem' }}>
        <textarea
          ref={textareaRef}
          value={block.content}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          placeholder="// Enter technical code snippet..."
          rows={2}
          spellCheck={false}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            backgroundColor: 'transparent',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
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
