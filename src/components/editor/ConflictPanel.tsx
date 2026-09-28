import React, { useState } from 'react';
import type { ConflictData } from '../../types/collaboration';
import { AlertTriangle, GitMerge } from 'lucide-react';
import { Button } from '../common/Button';

interface ConflictPanelProps {
  conflict: ConflictData;
  onResolve: (chosenContent: string, strategy: 'mine' | 'remote' | 'merge') => void;
  onDismiss: () => void;
}

export const ConflictPanel: React.FC<ConflictPanelProps> = ({ conflict, onResolve, onDismiss }) => {
  const [activeTab, setActiveTab] = useState<'side_by_side' | 'merge_preview'>('side_by_side');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          backgroundColor: 'var(--bg-elevated)',
          border: '1.5px solid var(--accent-rose)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Conflict Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--accent-rose-light)',
            borderBottom: '1px solid rgba(225, 29, 72, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-rose)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                AST Mutation Conflict Detected
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Two collaborators concurrently modified AST block #{conflict.blockId.replace('blk_', '')} ({conflict.blockType})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.375rem' }}>
            <button
              onClick={() => setActiveTab('side_by_side')}
              style={{
                padding: '0.35rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'side_by_side' ? 'var(--bg-elevated)' : 'transparent',
                color: activeTab === 'side_by_side' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              Side-by-Side Diff
            </button>
            <button
              onClick={() => setActiveTab('merge_preview')}
              style={{
                padding: '0.35rem 0.625rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: activeTab === 'merge_preview' ? 'var(--bg-elevated)' : 'transparent',
                color: activeTab === 'merge_preview' ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              AST Merge Rationale
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'side_by_side' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Local Version */}
              <div
                style={{
                  border: '1.5px solid var(--accent-primary)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'var(--accent-primary-light)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    Your Local Version
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {conflict.localVersion.author}
                  </span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <pre
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.55,
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {conflict.localVersion.content}
                  </pre>
                </div>
              </div>

              {/* Remote Version */}
              <div
                style={{
                  border: '1.5px solid var(--accent-purple)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'var(--accent-purple-light)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                    Remote Inbound Version
                  </span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {conflict.remoteVersion.author}
                  </span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <pre
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      lineHeight: 1.55,
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {conflict.remoteVersion.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            /* Merge Rationale / Preview */
            <div
              style={{
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <GitMerge size={18} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  AST-Synthesized Smart Merge
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                SyncDoc AST engine combined non-overlapping syntactic clauses while buffering optimistic locks.
              </p>
              <pre
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {conflict.suggestedMerge}
              </pre>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <button
            onClick={onDismiss}
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Dismiss for now
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onResolve(conflict.localVersion.content, 'mine')}
            >
              Keep Mine
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onResolve(conflict.remoteVersion.content, 'remote')}
            >
              Keep Remote
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<GitMerge size={15} />}
              onClick={() => onResolve(conflict.suggestedMerge, 'merge')}
            >
              Merge (AST Smart Resolution)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
