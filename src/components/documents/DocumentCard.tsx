import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentMeta } from '../../types/document';
import { FileText, Clock, Star } from 'lucide-react';

interface DocumentCardProps {
  document: DocumentMeta;
  onToggleFavorite?: (id: string, e: React.MouseEvent) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onToggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/documents/${document.id}`)}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-medium)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
      }}
    >
      <div>
        {/* Top bar: Status & Favorite */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`badge ${document.status === 'live' ? 'badge-live' : 'badge-draft'}`}>
              <span className={`status-dot ${document.status === 'live' ? 'online' : 'idle'}`} />
              {document.status === 'live' ? 'Live' : 'Draft'}
            </span>
            {document.tags.slice(0, 1).map((tag) => (
              <span key={tag} className="badge badge-pill">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(document.id, e);
            }}
            style={{
              color: document.isFavorite ? 'var(--accent-amber)' : 'var(--text-muted)',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Favorite document"
          >
            <Star size={16} fill={document.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title & Description */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.5rem' }}>
          <div
            style={{
              padding: '0.375rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-primary-light)',
              color: 'var(--accent-primary)',
              marginTop: '2px',
            }}
          >
            <FileText size={18} />
          </div>
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.35,
              }}
            >
              {document.title}
            </h4>
          </div>
        </div>

        {document.description && (
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginTop: '0.375rem',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {document.description}
          </p>
        )}
      </div>

      {/* Footer Info */}
      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '0.875rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Collaborators Stack */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {document.collaborators.slice(0, 3).map((collab, idx) => (
            <img
              key={collab.id}
              src={collab.avatar}
              alt={collab.name}
              title={`${collab.name} (${collab.role})`}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                border: '2px solid var(--bg-elevated)',
                marginLeft: idx > 0 ? '-8px' : '0',
                objectFit: 'cover',
              }}
            />
          ))}
          {document.collaborators.length > 3 && (
            <span
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '2px solid var(--bg-elevated)',
                marginLeft: '-8px',
                fontSize: '0.6875rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              +{document.collaborators.length - 3}
            </span>
          )}
        </div>

        {/* Last edited timestamp */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <Clock size={13} />
          <span>{document.lastEditedAt}</span>
        </div>
      </div>
    </div>
  );
};
