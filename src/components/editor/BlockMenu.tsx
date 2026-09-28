import React, { useState } from 'react';
import {
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  MessageSquare,
  CopyPlus,
  Heading1,
  Heading2,
  Type,
  Code,
  List,
  Quote,
  Minus,
} from 'lucide-react';
import type { BlockType } from '../../types/document';

interface BlockMenuProps {
  blockType: BlockType;
  onTurnInto: (type: BlockType, level?: 1 | 2 | 3) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onCopy: () => void;
  onClose: () => void;
}

export const BlockMenu: React.FC<BlockMenuProps> = ({
  onTurnInto,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onCopy,
  onClose,
}) => {
  const [showTurnIntoSubmenu, setShowTurnIntoSubmenu] = useState(false);

  const turnIntoOptions = [
    { label: 'Paragraph', type: 'paragraph' as BlockType, icon: Type },
    { label: 'Heading 1', type: 'heading' as BlockType, level: 1 as const, icon: Heading1 },
    { label: 'Heading 2', type: 'heading' as BlockType, level: 2 as const, icon: Heading2 },
    { label: 'Code Block', type: 'code' as BlockType, icon: Code },
    { label: 'Bullet List', type: 'list' as BlockType, icon: List },
    { label: 'Quote Callout', type: 'quote' as BlockType, icon: Quote },
    { label: 'Divider', type: 'divider' as BlockType, icon: Minus },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 50,
        width: '200px',
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: '0.375rem',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {!showTurnIntoSubmenu ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <button
            onClick={() => setShowTurnIntoSubmenu(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <RefreshCw size={14} style={{ color: 'var(--accent-primary)' }} />
            <span>Turn into</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>▶</span>
          </button>

          <button
            onClick={() => {
              onDuplicate();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <CopyPlus size={14} />
            <span>Duplicate</span>
          </button>

          <button
            onClick={() => {
              onCopy();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Copy size={14} />
            <span>Copy content</span>
          </button>

          <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />

          <button
            onClick={() => {
              onMoveUp();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ArrowUp size={14} />
            <span>Move up</span>
          </button>

          <button
            onClick={() => {
              onMoveDown();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ArrowDown size={14} />
            <span>Move down</span>
          </button>

          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <MessageSquare size={14} />
            <span>Comment</span>
          </button>

          <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />

          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: 'var(--accent-rose)',
              width: '100%',
              textAlign: 'left',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-rose-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Trash2 size={14} />
            <span>Delete block</span>
          </button>
        </div>
      ) : (
        /* Turn into sub-menu */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <button
            onClick={() => setShowTurnIntoSubmenu(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.35rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              marginBottom: '2px',
            }}
          >
            ◀ Back
          </button>
          {turnIntoOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.label}
                onClick={() => {
                  onTurnInto(opt.type, opt.level);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-primary)',
                  width: '100%',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Icon size={14} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
