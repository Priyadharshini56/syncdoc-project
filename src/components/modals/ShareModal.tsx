import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { CollaboratorBrief } from '../../types/document';
import { Mail, Check, UserPlus } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  collaborators: CollaboratorBrief[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  collaborators: initialCollaborators,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'editor' | 'viewer'>('editor');
  const [collaborators, setCollaborators] = useState<CollaboratorBrief[]>(initialCollaborators);
  const [isSending, setIsSending] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);
    // Simulate invitation dispatch
    await new Promise((res) => setTimeout(res, 500));

    const newCollab: CollaboratorBrief = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      color: '#06b6d4',
      role,
      status: 'idle',
    };

    setCollaborators([...collaborators, newCollab]);
    setIsSending(false);
    setEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 3000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Share "${documentTitle}"`}
      subtitle="Invite teammates to collaborate in real-time on this AST document"
      maxWidth="560px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Send Invite Form */}
        <form onSubmit={handleSendInvite}>
          <label
            style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.375rem',
            }}
          >
            Invite via Email
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="email"
                placeholder="colleague@syncdoc.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.875rem 0.55rem 2.25rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'editor' | 'viewer')}
              style={{
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSending}
              icon={<UserPlus size={15} />}
            >
              Invite
            </Button>
          </div>
        </form>

        {inviteSuccess && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-emerald-light)',
              color: 'var(--accent-emerald)',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            <Check size={16} />
            <span>Invitation sent successfully!</span>
          </div>
        )}

        {/* People With Access */}
        <div>
          <div
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.625rem',
            }}
          >
            People with access
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {collaborators.map((collab) => (
              <div
                key={collab.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={collab.avatar}
                    alt={collab.name}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {collab.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{collab.email}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor:
                        collab.role === 'owner'
                          ? 'var(--accent-primary-light)'
                          : 'var(--bg-tertiary)',
                      color:
                        collab.role === 'owner'
                          ? 'var(--accent-primary)'
                          : 'var(--text-secondary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {collab.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
