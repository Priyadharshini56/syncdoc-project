import React, { useState } from 'react';
import type { Collaborator } from '../../types/collaboration';

interface PresenceAvatarsProps {
  collaborators: Collaborator[];
  currentUserId?: string;
}

export const PresenceAvatars: React.FC<PresenceAvatarsProps> = ({ collaborators }) => {
  const [hoveredCollab, setHoveredCollab] = useState<Collaborator | null>(null);

  const activeCollabs = collaborators.filter((c) => c.status !== 'offline');

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {activeCollabs.slice(0, 4).map((collab, index) => {
          return (
            <div
              key={collab.id}
              style={{
                position: 'relative',
                marginLeft: index > 0 ? '-8px' : '0',
                cursor: 'pointer',
                zIndex: 10 - index,
              }}
              onMouseEnter={() => setHoveredCollab(collab)}
              onMouseLeave={() => setHoveredCollab(null)}
            >
              <img
                src={collab.avatar}
                alt={collab.name}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: `2px solid ${collab.color}`,
                  objectFit: 'cover',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform var(--transition-fast)',
                }}
              />
              <span
                className={`status-dot ${collab.status}`}
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  border: '1.5px solid var(--bg-elevated)',
                  width: '6px',
                  height: '6px',
                }}
              />
            </div>
          );
        })}

        {activeCollabs.length > 4 && (
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              border: '2px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '-8px',
              zIndex: 5,
            }}
          >
            +{activeCollabs.length - 4}
          </div>
        )}
      </div>

      {/* Hover popover tooltip */}
      {hoveredCollab && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '0.625rem 0.875rem',
            zIndex: 60,
            minWidth: '180px',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <span
              className={`status-dot ${hoveredCollab.status}`}
              style={{ width: '8px', height: '8px' }}
            />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {hoveredCollab.name}
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Status:{' '}
            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>
              {hoveredCollab.status}
            </span>
          </div>

          {hoveredCollab.currentBlockId && (
            <div
              style={{
                marginTop: '4px',
                fontSize: '0.6875rem',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                backgroundColor: 'var(--accent-primary-light)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                display: 'inline-block',
              }}
            >
              Editing: Block #{hoveredCollab.currentBlockId.replace('blk_', '')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
