import type { ActivityEvent } from '../../types/collaboration';
import { UserPlus, Edit3, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';

interface ActivityPanelProps {
  activities: ActivityEvent[];
}

export const ActivityPanel: React.FC<ActivityPanelProps> = ({ activities }) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'join':
        return <UserPlus size={14} style={{ color: 'var(--accent-emerald)' }} />;
      case 'add_block':
        return <PlusCircle size={14} style={{ color: 'var(--accent-primary)' }} />;
      case 'delete_block':
        return <Trash2 size={14} style={{ color: 'var(--accent-rose)' }} />;
      case 'conflict_resolved':
        return <CheckCircle2 size={14} style={{ color: 'var(--accent-purple)' }} />;
      case 'edit':
      default:
        return <Edit3 size={14} style={{ color: 'var(--accent-amber)' }} />;
    }
  };

  const getActionLabel = (act: ActivityEvent) => {
    switch (act.action) {
      case 'join':
        return 'joined the document';
      case 'add_block':
        return `added block: ${act.targetBlockTitle || ''}`;
      case 'delete_block':
        return `removed block: ${act.targetBlockTitle || ''}`;
      case 'conflict_resolved':
        return `resolved AST conflict: ${act.targetBlockTitle || ''}`;
      case 'edit':
      default:
        return `edited ${act.targetBlockTitle || 'content'}`;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {activities.map((act) => (
        <div
          key={act.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '0.625rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <img
            src={act.userAvatar}
            alt={act.userName}
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              <span style={{ fontWeight: 700 }}>{act.userName}</span>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{getActionLabel(act)}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                marginTop: '3px',
              }}
            >
              {getActionIcon(act.action)}
              <span>{act.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
