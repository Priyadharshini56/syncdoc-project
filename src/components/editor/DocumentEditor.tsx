import React, { useState, useCallback } from 'react';
import type { DocumentData, BlockNode, BlockType } from '../../types/document';
import { DocumentBlock } from './DocumentBlock';
import { SyncStatus } from './SyncStatus';
import { PresenceAvatars } from './PresenceAvatars';
import { ASTTreePanel } from './ASTTreePanel';
import { ActivityPanel } from './ActivityPanel';
import { VersionHistoryPanel } from './VersionHistoryPanel';
import { ConflictPanel } from './ConflictPanel';
import { ShareModal } from '../modals/ShareModal';
import { ExportModal } from '../modals/ExportModal';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useCollaboration } from '../../hooks/useCollaboration';
import { usePresence } from '../../hooks/usePresence';
import { useDocumentSync } from '../../hooks/useDocumentSync';
import {
  Share2,
  Download,
  FolderTree,
  History,
  Activity,
  Play,
  Pause,
  AlertTriangle,
  Plus,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  MOCK_ACTIVITY_STREAM,
  MOCK_VERSION_HISTORY,
} from '../../data/mockData';

interface DocumentEditorProps {
  initialDocument: DocumentData;
  onSaveTitle?: (newTitle: string) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  initialDocument,
  onSaveTitle,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Document state
  const [docTitle, setDocTitle] = useState(initialDocument.title);
  const [blocks, setBlocks] = useState<BlockNode[]>(initialDocument.blocks);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(blocks[0]?.id || null);

  // Panels & Modals toggles
  const [showAstPanel, setShowAstPanel] = useState(true);
  const [rightPanelTab, setRightPanelTab] = useState<'none' | 'activity' | 'history'>('none');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Collaboration hooks
  const {
    remoteCursors,
    activeConflict,
    isSimulating,
    broadcastBlockUpdate,
    broadcastCursor,
    toggleSimulation,
    triggerMockConflict,
    resolveConflict,
  } = useCollaboration(initialDocument.id, user);

  const { collaborators } = usePresence(initialDocument.id, user?.id);
  const { syncState, lastSavedTime, queueBlockSave, setSyncState } = useDocumentSync(
    initialDocument.id,
    'synced'
  );

  // Activity & History state
  const [activities, setActivities] = useState(MOCK_ACTIVITY_STREAM);
  const [versions] = useState(MOCK_VERSION_HISTORY);

  // Update title handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocTitle(e.target.value);
    onSaveTitle?.(e.target.value);
  };

  // Block change handler: updates only target block
  const handleBlockChange = useCallback(
    (blockId: string, newContent: string) => {
      setBlocks((prev) =>
        prev.map((b) => (b.id === blockId ? { ...b, content: newContent } : b))
      );
      queueBlockSave(blockId, newContent);
      broadcastBlockUpdate(blockId, newContent);
    },
    [queueBlockSave, broadcastBlockUpdate]
  );

  // Focus block handler: updates AST highlight and cursor broadcast
  const handleBlockFocus = useCallback(
    (blockId: string) => {
      setFocusedBlockId(blockId);
      broadcastCursor(blockId, 0);
    },
    [broadcastCursor]
  );

  // Enter key handler: inserts new paragraph block after current
  const handleEnterKey = useCallback((currentBlockId: string) => {
    const newBlockId = `blk_${Date.now()}`;
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === currentBlockId);
      const newBlock: BlockNode = {
        id: newBlockId,
        type: 'paragraph',
        content: '',
        order: idx + 1,
      };
      const updated = [...prev];
      updated.splice(idx + 1, 0, newBlock);
      return updated.map((b, i) => ({ ...b, order: i }));
    });
    setFocusedBlockId(newBlockId);
  }, []);

  // Backspace on empty block: delete block and focus previous
  const handleBackspaceEmpty = useCallback((currentBlockId: string) => {
    setBlocks((prev) => {
      if (prev.length <= 1) return prev; // keep at least 1 block
      const idx = prev.findIndex((b) => b.id === currentBlockId);
      const prevBlock = idx > 0 ? prev[idx - 1] : prev[1];
      if (prevBlock) {
        setFocusedBlockId(prevBlock.id);
      }
      return prev.filter((b) => b.id !== currentBlockId).map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  // Block type conversion (Turn Into)
  const handleTurnInto = useCallback((blockId: string, newType: BlockType, level?: 1 | 2 | 3) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId
          ? {
              ...b,
              type: newType,
              level: newType === 'heading' ? level || 1 : undefined,
              listType: newType === 'list' ? 'bullet' : undefined,
            }
          : b
      )
    );
  }, []);

  // Duplicate block
  const handleDuplicateBlock = useCallback((blockId: string) => {
    setBlocks((prev) => {
      const target = prev.find((b) => b.id === blockId);
      if (!target) return prev;
      const idx = prev.findIndex((b) => b.id === blockId);
      const duplicate: BlockNode = {
        ...target,
        id: `blk_${Date.now()}`,
        order: idx + 1,
      };
      const updated = [...prev];
      updated.splice(idx + 1, 0, duplicate);
      return updated.map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  // Delete block
  const handleDeleteBlock = useCallback((blockId: string) => {
    setBlocks((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((b) => b.id !== blockId).map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  // Move block up
  const handleMoveUp = useCallback((blockId: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === blockId);
      if (idx <= 0) return prev;
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx - 1];
      updated[idx - 1] = temp;
      return updated.map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  // Move block down
  const handleMoveDown = useCallback((blockId: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === blockId);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const updated = [...prev];
      const temp = updated[idx];
      updated[idx] = updated[idx + 1];
      updated[idx + 1] = temp;
      return updated.map((b, i) => ({ ...b, order: i }));
    });
  }, []);

  // Add block after specified block
  const handleAddBlockAfter = useCallback(
    (
      afterBlockId: string,
      type: BlockType,
      level?: 1 | 2 | 3,
      listType?: 'bullet' | 'ordered'
    ) => {
      const newBlockId = `blk_${Date.now()}`;
      setBlocks((prev) => {
        const idx = prev.findIndex((b) => b.id === afterBlockId);
        const newBlock: BlockNode = {
          id: newBlockId,
          type,
          content: '',
          level: type === 'heading' ? level || 1 : undefined,
          listType: type === 'list' ? listType || 'bullet' : undefined,
          order: idx + 1,
        };
        const updated = [...prev];
        updated.splice(idx + 1, 0, newBlock);
        return updated.map((b, i) => ({ ...b, order: i }));
      });
      setFocusedBlockId(newBlockId);
    },
    []
  );

  // Conflict resolution action
  const handleConflictResolved = (chosenContent: string, strategy: 'mine' | 'remote' | 'merge') => {
    if (!activeConflict) return;
    resolveConflict(chosenContent);
    handleBlockChange(activeConflict.blockId, chosenContent);
    setSyncState('synced');

    // Add activity entry
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        userId: user?.id || 'usr_meghan',
        userName: user?.name || 'Meghan K.',
        userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        userColor: '#3b82f6',
        action: 'conflict_resolved',
        targetBlockTitle: `Block #${activeConflict.blockId.replace('blk_', '')} (${strategy})`,
        timestamp: 'Just now',
      },
      ...prev,
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top Navigation & Toolbar Bar */}
      <header
        style={{
          height: '56px',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        {/* Left: Back button + Title input + Sync pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
          <button
            onClick={() => navigate('/documents')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Back to Documents"
          >
            <ArrowLeft size={18} />
          </button>

          <input
            type="text"
            value={docTitle}
            onChange={handleTitleChange}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              padding: '0.2rem 0.5rem',
              backgroundColor: 'transparent',
              maxWidth: '380px',
              textOverflow: 'ellipsis',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          />

          <SyncStatus state={syncState} lastSaved={lastSavedTime} />
        </div>

        {/* Center: Live Simulation Controls (Demonstration feature) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
          }}
        >
          <button
            onClick={() => toggleSimulation(!isSimulating)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 600,
              color: isSimulating ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            }}
            title="Toggle simulated remote collaborator typing & moving cursors"
          >
            {isSimulating ? <Pause size={12} /> : <Play size={12} />}
            <span>{isSimulating ? 'Simulation Live' : 'Start Simulation'}</span>
          </button>

          <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--border-subtle)' }} />

          <button
            onClick={triggerMockConflict}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontWeight: 600,
              color: 'var(--accent-rose)',
            }}
            title="Trigger a simulated AST conflict to test the resolution UI"
          >
            <AlertTriangle size={12} />
            <span>Test Conflict</span>
          </button>
        </div>

        {/* Right: Presence Avatars + Share + Export + Panel Toggles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <PresenceAvatars collaborators={collaborators} currentUserId={user?.id} />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShareModal(true)}
            icon={<Share2 size={14} />}
          >
            Share
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowExportModal(true)}
            icon={<Download size={14} />}
          >
            Export
          </Button>

          {/* Toggle AST Panel */}
          <button
            onClick={() => setShowAstPanel(!showAstPanel)}
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: showAstPanel ? 'var(--accent-primary)' : 'var(--text-secondary)',
              backgroundColor: showAstPanel ? 'var(--accent-primary-light)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle AST Structure Tree"
          >
            <FolderTree size={18} />
          </button>

          {/* Toggle Activity / History Drawer */}
          <button
            onClick={() =>
              setRightPanelTab(rightPanelTab === 'activity' ? 'none' : 'activity')
            }
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: rightPanelTab === 'activity' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              backgroundColor: rightPanelTab === 'activity' ? 'var(--accent-primary-light)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle Activity Feed"
          >
            <Activity size={18} />
          </button>

          <button
            onClick={() =>
              setRightPanelTab(rightPanelTab === 'history' ? 'none' : 'history')
            }
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: rightPanelTab === 'history' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              backgroundColor: rightPanelTab === 'history' ? 'var(--accent-primary-light)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle Version History"
          >
            <History size={18} />
          </button>

          <button
            onClick={() => navigate(`/documents/${initialDocument.id}/settings`)}
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Document Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace: Left AST Panel + Center Canvas + Right Activity Drawer */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left AST Structure Panel */}
        {showAstPanel && (
          <ASTTreePanel
            blocks={blocks}
            selectedBlockId={focusedBlockId}
            onSelectBlock={(bId) => {
              setFocusedBlockId(bId);
              const el = document.getElementById(`block-${bId}`);
              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            documentTitle={docTitle}
          />
        )}

        {/* Center Editor Canvas */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2.5rem 1.5rem 5rem 1.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100%', maxWidth: '820px' }}>
            {/* Document Title Header in Canvas */}
            <h1
              style={{
                fontSize: '2.25rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                marginBottom: '1.75rem',
                lineHeight: 1.25,
              }}
            >
              {docTitle}
            </h1>

            {/* Blocks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {blocks.map((block) => {
                const cursorForBlock = remoteCursors.find((c) => c.blockId === block.id);

                return (
                  <DocumentBlock
                    key={block.id}
                    block={block}
                    isFocused={focusedBlockId === block.id}
                    remoteCursor={cursorForBlock}
                    onChangeContent={handleBlockChange}
                    onEnter={handleEnterKey}
                    onBackspaceEmpty={handleBackspaceEmpty}
                    onFocus={handleBlockFocus}
                    onTurnInto={handleTurnInto}
                    onDuplicate={handleDuplicateBlock}
                    onDelete={handleDeleteBlock}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onAddBlockAfter={handleAddBlockAfter}
                  />
                );
              })}
            </div>

            {/* Add Block Click Zone at Bottom */}
            <div style={{ marginTop: '1.5rem', paddingLeft: '56px' }}>
              <button
                onClick={() => handleEnterKey(blocks[blocks.length - 1]?.id || 'blk_init')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-muted)',
                  border: '1px dashed var(--border-medium)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Plus size={15} />
                <span>Add new block below</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel Drawer (Activity or Version History) */}
        {rightPanelTab !== 'none' && (
          <aside
            style={{
              width: '320px',
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              flexShrink: 0,
            }}
          >
            {/* Panel Tabs Header */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-elevated)',
              }}
            >
              <button
                onClick={() => setRightPanelTab('activity')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: rightPanelTab === 'activity' ? 700 : 500,
                  color: rightPanelTab === 'activity' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: rightPanelTab === 'activity' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.375rem',
                }}
              >
                <Activity size={14} />
                Activity
              </button>

              <button
                onClick={() => setRightPanelTab('history')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: rightPanelTab === 'history' ? 700 : 500,
                  color: rightPanelTab === 'history' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: rightPanelTab === 'history' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.375rem',
                }}
              >
                <History size={14} />
                Version History
              </button>
            </div>

            {/* Panel Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {rightPanelTab === 'activity' ? (
                <ActivityPanel activities={activities} />
              ) : (
                <VersionHistoryPanel
                  versions={versions}
                  onRestoreVersion={(v) => {
                    console.log('Restoring version', v);
                  }}
                />
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Side-by-Side Conflict Resolution Modal */}
      {activeConflict && (
        <ConflictPanel
          conflict={activeConflict}
          onResolve={handleConflictResolved}
          onDismiss={() => resolveConflict(activeConflict.localVersion.content)}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        documentTitle={docTitle}
        collaborators={initialDocument.collaborators}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        document={{
          ...initialDocument,
          title: docTitle,
          blocks,
        }}
      />
    </div>
  );
};
