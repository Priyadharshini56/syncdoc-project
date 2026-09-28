import React, { useState } from 'react';
import type { VersionHistoryItem } from '../../types/collaboration';
import { RotateCcw, Check } from 'lucide-react';
import { Button } from '../common/Button';

interface VersionHistoryPanelProps {
  versions: VersionHistoryItem[];
  onRestoreVersion?: (version: number) => void;
}

export const VersionHistoryPanel: React.FC<VersionHistoryPanelProps> = ({
  versions,
  onRestoreVersion,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(5);
  const [restoredNotice, setRestoredNotice] = useState<string | null>(null);

  const handleRestore = (ver: number) => {
    onRestoreVersion?.(ver);
    setRestoredNotice(`Restored to revision v${ver}`);
    setTimeout(() => setRestoredNotice(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {restoredNotice && (
        <div
          style={{
            padding: '0.5rem 0.75rem',
            backgroundColor: 'var(--accent-emerald-light)',
            color: 'var(--accent-emerald)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <Check size={14} />
          {restoredNotice}
        </div>
      )}

      {versions.map((ver) => {
        const isSelected = selectedVersion === ver.version;

        return (
          <div
            key={ver.id}
            onClick={() => setSelectedVersion(ver.version)}
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isSelected ? 'var(--accent-primary-light)' : 'var(--bg-secondary)',
              border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                  }}
                >
                  v{ver.version}
                </span>
                {ver.isCurrent && (
                  <span className="badge badge-live" style={{ fontSize: '0.625rem', padding: '1px 5px' }}>
                    Current
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{ver.timestamp}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '4px 0' }}>
              <img
                src={ver.authorAvatar}
                alt={ver.authorName}
                style={{ width: '18px', height: '18px', borderRadius: '50%' }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {ver.authorName}
              </span>
            </div>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.35,
                marginTop: '4px',
              }}
            >
              {ver.summary}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.625rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                {ver.changesCount} block deltas
              </span>

              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {!ver.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestore(ver.version);
                    }}
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.6875rem' }}
                    icon={<RotateCcw size={11} />}
                  >
                    Restore
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
