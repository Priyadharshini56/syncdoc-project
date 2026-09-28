import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentMeta } from '../../types/document';
import { FileText, Clock, Star, MoreHorizontal } from 'lucide-react';

interface DocumentListRowProps {
  document: DocumentMeta;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
}

export const DocumentListRow: React.FC<DocumentListRowProps> = ({ document, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/documents/${document.id}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.875rem 1.25rem',
        backgroundColor: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border-subtle)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)',
        gap: '1rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(document.id, e);
        }}
        style={{
          color: document.isFavorite ? 'var(--accent-amber)' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Toggle favorite"
      >
        <Star size={16} fill={document.isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div
        style={{
          padding: '0.35rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--accent-primary-light)',
          color: 'var(--accent-primary)',
          flexShrink: 0,
        }}
      >
        <FileText size={18} />
      </div>

      <div style={{ flex: 2, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {document.title}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {document.description}
        </div>
      </div>

      <div style={{ width: '100px', flexShrink: 0 }}>
        <span className={`badge ${document.status === 'live' ? 'badge-live' : 'badge-draft'}`}>
          <span className={`status-dot ${document.status === 'live' ? 'online' : 'idle'}`} />
          {document.status === 'live' ? 'Live' : 'Draft'}
        </span>
      </div>

      <div
        style={{
          width: '160px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
        }}
      >
        <img
          src={document.ownerAvatar}
          alt={document.ownerName}
          style={{ width: '22px', height: '22px', borderRadius: '50%' }}
        />
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {document.ownerName}
        </span>
      </div>

      <div style={{ width: '90px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {document.collaborators.slice(0, 3).map((collab, idx) => (
          <img
            key={collab.id}
            src={collab.avatar}
            alt={collab.name}
            title={collab.name}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '2px solid var(--bg-elevated)',
              marginLeft: idx > 0 ? '-6px' : '0',
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: '120px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        <Clock size={13} />
        <span>{document.lastEditedAt}</span>
      </div>

      <button
        style={{ color: 'var(--text-muted)', padding: '0.25rem' }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/documents/${document.id}/settings`);
        }}
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};
