import React from 'react';
import type { BlockNode } from '../../types/document';
import {
  FolderTree,
  FileCode,
  Type,
  Heading,
  List,
  Quote,
  Minus,
} from 'lucide-react';

interface ASTTreePanelProps {
  blocks: BlockNode[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  documentTitle: string;
}

export const ASTTreePanel: React.FC<ASTTreePanelProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  documentTitle,
}) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'heading':
        return <Heading size={14} style={{ color: 'var(--accent-primary)' }} />;
      case 'code':
        return <FileCode size={14} style={{ color: 'var(--accent-emerald)' }} />;
      case 'list':
        return <List size={14} style={{ color: 'var(--accent-purple)' }} />;
      case 'quote':
        return <Quote size={14} style={{ color: 'var(--accent-amber)' }} />;
      case 'divider':
        return <Minus size={14} style={{ color: 'var(--text-muted)' }} />;
      case 'paragraph':
      default:
        return <Type size={14} style={{ color: 'var(--text-secondary)' }} />;
    }
  };

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: '0.875rem 1rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-elevated)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FolderTree size={16} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            AST Hierarchy
          </span>
        </div>
        <span className="badge badge-pill" style={{ fontSize: '0.6875rem' }}>
          {blocks.length} Nodes
        </span>
      </div>

      {/* Tree Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.5rem' }}>
        {/* Root Document Node */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-tertiary)',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--accent-primary)' }}>◈</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Document: {documentTitle}
          </span>
        </div>

        {/* Child Block Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '0.75rem', borderLeft: '1.5px dashed var(--border-medium)' }}>
          {blocks.map((block, index) => {
            const isSelected = selectedBlockId === block.id;
            const hasRemoteEditor = !!block.metadata?.remoteUserEditing;
            const previewText = block.content.trim() || `(Empty ${block.type})`;

            return (
              <div
                key={block.id}
                onClick={() => onSelectBlock(block.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? 'var(--accent-primary-light)'
                    : hasRemoteEditor
                    ? 'rgba(16, 185, 129, 0.08)'
                    : 'transparent',
                  border: isSelected
                    ? '1px solid var(--accent-primary)'
                    : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = hasRemoteEditor
                      ? 'rgba(16, 185, 129, 0.08)'
                      : 'transparent';
                  }
                }}
              >
                {/* Node Icon */}
                <span style={{ display: 'flex', alignItems: 'center' }}>{getNodeIcon(block.type)}</span>

                {/* Node Label & Preview */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                    }}
                  >
                    <span>
                      {block.type.toUpperCase()}{block.level ? ` (H${block.level})` : ''}
                    </span>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                      #{index + 1}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '1px',
                    }}
                  >
                    {previewText}
                  </div>
                </div>

                {/* Remote Editor Tag on Tree */}
                {hasRemoteEditor && (
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: block.metadata?.remoteUserColor || 'var(--accent-emerald)',
                      flexShrink: 0,
                    }}
                    title={`${block.metadata?.remoteUserEditing} is editing this node`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer / AST Meta */}
      <div
        style={{
          padding: '0.625rem 0.875rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-elevated)',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>AST Vector: Active</span>
        <span>Version 5</span>
      </div>
    </div>
  );
};
