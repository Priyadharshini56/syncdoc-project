import React from 'react';
import type { CursorPosition } from '../../types/collaboration';

interface CollaborativeCursorProps {
  cursor: CursorPosition;
}

export const CollaborativeCursor: React.FC<CollaborativeCursorProps> = ({ cursor }) => {
  // Approximate cursor horizontal offset based on character index
  const leftPosition = Math.min(cursor.offset * 8.2, 500);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${leftPosition}px`,
        top: '2px',
        bottom: '2px',
        pointerEvents: 'none',
        zIndex: 20,
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
      }}
    >
      {/* Blinking vertical cursor line */}
      <div
        style={{
          width: '2px',
          height: '100%',
          backgroundColor: cursor.userColor,
          borderRadius: '1px',
          boxShadow: `0 0 6px ${cursor.userColor}`,
        }}
      />

      {/* Collaborator Name Badge */}
      <div
        style={{
          position: 'absolute',
          top: '-18px',
          left: '0',
          backgroundColor: cursor.userColor,
          color: '#ffffff',
          fontSize: '0.6875rem',
          fontWeight: 700,
          padding: '1px 5px',
          borderRadius: 'var(--radius-xs)',
          whiteSpace: 'nowrap',
          boxShadow: 'var(--shadow-xs)',
          lineHeight: '1.2',
          letterSpacing: '0.01em',
          userSelect: 'none',
        }}
      >
        {cursor.userName}
      </div>
    </div>
  );
};
