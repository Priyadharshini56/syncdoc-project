import { useState, memo } from 'react';
import type { BlockNode, BlockType } from '../../types/document';
import type { CursorPosition } from '../../types/collaboration';
import { GripVertical, Plus } from 'lucide-react';
import { HeadingBlock } from './blocks/HeadingBlock';
import { ParagraphBlock } from './blocks/ParagraphBlock';
import { CodeBlock } from './blocks/CodeBlock';
import { ListBlock } from './blocks/ListBlock';
import { QuoteBlock } from './blocks/QuoteBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { BlockMenu } from './BlockMenu';
import { BlockToolbar } from './BlockToolbar';
import { CollaborativeCursor } from './CollaborativeCursor';

interface DocumentBlockProps {
  block: BlockNode;
  isFocused: boolean;
  remoteCursor?: CursorPosition;
  onChangeContent: (blockId: string, content: string) => void;
  onEnter: (blockId: string) => void;
  onBackspaceEmpty: (blockId: string) => void;
  onFocus: (blockId: string) => void;
  onTurnInto: (blockId: string, type: BlockType, level?: 1 | 2 | 3) => void;
  onDuplicate: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  onAddBlockAfter: (afterBlockId: string, type: BlockType, level?: 1 | 2 | 3, listType?: 'bullet' | 'ordered') => void;
}

export const DocumentBlock = memo<DocumentBlockProps>(({
  block,
  isFocused,
  remoteCursor,
  onChangeContent,
  onEnter,
  onBackspaceEmpty,
  onFocus,
  onTurnInto,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onAddBlockAfter,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showAddToolbar, setShowAddToolbar] = useState(false);

  const remoteUser = block.metadata?.remoteUserEditing;
  const remoteColor = block.metadata?.remoteUserColor || '#10b981';

  // Render the appropriate block content component
  const renderBlockType = () => {
    switch (block.type) {
      case 'heading':
        return (
          <HeadingBlock
            block={block}
            isFocused={isFocused}
            onChange={(val) => onChangeContent(block.id, val)}
            onEnter={() => onEnter(block.id)}
            onBackspaceEmpty={() => onBackspaceEmpty(block.id)}
            onFocus={() => onFocus(block.id)}
          />
        );
      case 'code':
        return (
          <CodeBlock
            block={block}
            isFocused={isFocused}
            onChange={(val) => onChangeContent(block.id, val)}
            onEnter={() => onEnter(block.id)}
            onBackspaceEmpty={() => onBackspaceEmpty(block.id)}
            onFocus={() => onFocus(block.id)}
          />
        );
      case 'list':
        return (
          <ListBlock
            block={block}
            isFocused={isFocused}
            onChange={(val) => onChangeContent(block.id, val)}
            onEnter={() => onEnter(block.id)}
            onBackspaceEmpty={() => onBackspaceEmpty(block.id)}
            onFocus={() => onFocus(block.id)}
          />
        );
      case 'quote':
        return (
          <QuoteBlock
            block={block}
            isFocused={isFocused}
            onChange={(val) => onChangeContent(block.id, val)}
            onEnter={() => onEnter(block.id)}
            onBackspaceEmpty={() => onBackspaceEmpty(block.id)}
            onFocus={() => onFocus(block.id)}
          />
        );
      case 'divider':
        return <DividerBlock />;
      case 'paragraph':
      default:
        return (
          <ParagraphBlock
            block={block}
            isFocused={isFocused}
            onChange={(val) => onChangeContent(block.id, val)}
            onEnter={() => onEnter(block.id)}
            onBackspaceEmpty={() => onBackspaceEmpty(block.id)}
            onFocus={() => onFocus(block.id)}
          />
        );
    }
  };

  return (
    <div
      id={`block-${block.id}`}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '0.25rem 0.5rem',
        margin: '2px 0',
        borderRadius: 'var(--radius-md)',
        backgroundColor: remoteUser
          ? 'rgba(16, 185, 129, 0.04)'
          : isFocused
          ? 'rgba(59, 130, 246, 0.02)'
          : 'transparent',
        border: remoteUser
          ? `1.5px solid ${remoteColor}`
          : isFocused
          ? '1px solid var(--accent-primary-light)'
          : '1px solid transparent',
        transition: 'all var(--transition-fast)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
        setShowAddToolbar(false);
      }}
    >
      {/* Remote Editing Banner / Indicator */}
      {remoteUser && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '12px',
            backgroundColor: remoteColor,
            color: '#ffffff',
            fontSize: '0.625rem',
            fontWeight: 700,
            padding: '1px 7px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-xs)',
            zIndex: 15,
            letterSpacing: '0.02em',
          }}
        >
          {remoteUser} is editing
        </div>
      )}

      {/* Left Hover Controls (⋮⋮ Handle and + Add Button) */}
      <div
        style={{
          width: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          marginRight: '6px',
          marginTop: '6px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity var(--transition-fast)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* + Add Block Button */}
        <button
          onClick={() => {
            setShowAddToolbar(!showAddToolbar);
            setShowMenu(false);
          }}
          style={{
            padding: '2px',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Add Block below"
        >
          <Plus size={14} />
        </button>

        {/* Drag handle & Block Menu Button */}
        <button
          onClick={() => {
            setShowMenu(!showMenu);
            setShowAddToolbar(false);
          }}
          style={{
            padding: '2px',
            borderRadius: 'var(--radius-xs)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
          }}
          title="Drag or click for Block Actions"
        >
          <GripVertical size={14} />
        </button>

        {/* Block Menu Dropdown */}
        {showMenu && (
          <BlockMenu
            blockType={block.type}
            onTurnInto={(type, level) => onTurnInto(block.id, type, level)}
            onDuplicate={() => onDuplicate(block.id)}
            onDelete={() => onDelete(block.id)}
            onMoveUp={() => onMoveUp(block.id)}
            onMoveDown={() => onMoveDown(block.id)}
            onCopy={() => navigator.clipboard.writeText(block.content)}
            onClose={() => setShowMenu(false)}
          />
        )}

        {/* Add Block Toolbar Dropdown */}
        {showAddToolbar && (
          <BlockToolbar
            onAddBlock={(type, level, listType) =>
              onAddBlockAfter(block.id, type, level, listType)
            }
            onClose={() => setShowAddToolbar(false)}
          />
        )}
      </div>

      {/* Main Block Content Container */}
      <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
        {/* Remote Floating Cursor */}
        {remoteCursor && <CollaborativeCursor cursor={remoteCursor} />}

        {/* Block Content Component */}
        {renderBlockType()}
      </div>
    </div>
  );
});
