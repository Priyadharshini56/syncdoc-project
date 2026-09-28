import React from 'react';
import type { BlockType } from '../../types/document';
import {
  Heading1,
  Heading2,
  Heading3,
  Type,
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
} from 'lucide-react';

interface BlockToolbarProps {
  onAddBlock: (type: BlockType, level?: 1 | 2 | 3, listType?: 'bullet' | 'ordered') => void;
  onClose: () => void;
}

export const BlockToolbar: React.FC<BlockToolbarProps> = ({ onAddBlock, onClose }) => {
  const blockTypes = [
    {
      label: 'Paragraph',
      desc: 'Plain text with rich formatting',
      type: 'paragraph' as BlockType,
      icon: Type,
    },
    {
      label: 'Heading 1',
      desc: 'Large section heading',
      type: 'heading' as BlockType,
      level: 1 as const,
      icon: Heading1,
    },
    {
      label: 'Heading 2',
      desc: 'Medium section heading',
      type: 'heading' as BlockType,
      level: 2 as const,
      icon: Heading2,
    },
    {
      label: 'Heading 3',
      desc: 'Small sub-heading',
      type: 'heading' as BlockType,
      level: 3 as const,
      icon: Heading3,
    },
    {
      label: 'Code Block',
      desc: 'Technical code with syntax highlight & copy',
      type: 'code' as BlockType,
      icon: Code,
    },
    {
      label: 'Bullet List',
      desc: 'Create an unordered bullet list',
      type: 'list' as BlockType,
      listType: 'bullet' as const,
      icon: List,
    },
    {
      label: 'Numbered List',
      desc: 'Create an ordered sequence list',
      type: 'list' as BlockType,
      listType: 'ordered' as const,
      icon: ListOrdered,
    },
    {
      label: 'Quote Callout',
      desc: 'Capture architecture decisions or notes',
      type: 'quote' as BlockType,
      icon: Quote,
    },
    {
      label: 'Divider',
      desc: 'Visual horizontal boundary line',
      type: 'divider' as BlockType,
      icon: Minus,
    },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 50,
        width: '260px',
        maxHeight: '320px',
        overflowY: 'auto',
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-xl)',
        padding: '0.5rem',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          padding: '0.25rem 0.5rem',
          letterSpacing: '0.05em',
        }}
      >
        Insert Block Node
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
        {blockTypes.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                onAddBlock(item.type, item.level, item.listType);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.45rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                width: '100%',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div
                style={{
                  padding: '0.35rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
