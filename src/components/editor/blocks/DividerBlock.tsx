import React from 'react';

export const DividerBlock: React.FC = () => {
  return (
    <div style={{ width: '100%', padding: '0.75rem 0' }}>
      <hr
        style={{
          border: 'none',
          borderTop: '1.5px solid var(--border-subtle)',
          margin: 0,
        }}
      />
    </div>
  );
};
