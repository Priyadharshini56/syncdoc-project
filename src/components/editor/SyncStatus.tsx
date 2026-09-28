import React from 'react';
import type { SyncState } from '../../types/collaboration';
import { Check, RefreshCw, AlertTriangle, WifiOff } from 'lucide-react';

interface SyncStatusProps {
  state: SyncState;
  lastSaved?: Date;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ state, lastSaved }) => {
  const getStatusConfig = () => {
    switch (state) {
      case 'saving':
      case 'syncing':
        return {
          icon: <RefreshCw size={13} style={{ animation: 'spin 1s linear infinite' }} />,
          label: state === 'saving' ? 'Saving...' : 'Syncing...',
          color: 'var(--accent-amber)',
          bg: 'var(--accent-amber-light)',
        };
      case 'conflict':
        return {
          icon: <AlertTriangle size={13} />,
          label: 'Conflict Detected',
          color: 'var(--accent-rose)',
          bg: 'var(--accent-rose-light)',
        };
      case 'offline':
      case 'reconnecting':
        return {
          icon: <WifiOff size={13} />,
          label: state === 'reconnecting' ? 'Reconnecting...' : 'Offline Mode',
          color: 'var(--text-muted)',
          bg: 'var(--bg-tertiary)',
        };
      case 'saved':
      case 'synced':
      default:
        return {
          icon: <Check size={13} />,
          label: 'Synced',
          color: 'var(--accent-emerald)',
          bg: 'var(--accent-emerald-light)',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: config.bg,
        color: config.color,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        transition: 'all var(--transition-fast)',
      }}
      title={lastSaved ? `Last saved at ${lastSaved.toLocaleTimeString()}` : 'Real-time synchronization active'}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
};
