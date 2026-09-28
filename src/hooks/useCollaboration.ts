import { useState, useEffect, useCallback } from 'react';
import type { CursorPosition, ConflictData } from '../types/collaboration';
import { collaborationService } from '../services/collaborationService';
import type { User } from '../types/user';

export function useCollaboration(documentId: string, currentUser: User | null) {
  const [remoteCursors, setRemoteCursors] = useState<CursorPosition[]>([]);
  const [activeConflict, setActiveConflict] = useState<ConflictData | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(collaborationService.getIsSimulating());

  useEffect(() => {
    if (!currentUser) return;

    collaborationService.connect(documentId, currentUser.id, currentUser.name);

    const unsubCursor = collaborationService.onCursorChange((cursors) => {
      // Filter out self
      setRemoteCursors(cursors.filter((c) => c.userId !== currentUser.id));
    });

    const unsubConflict = collaborationService.onConflict((conflict) => {
      setActiveConflict(conflict);
    });

    return () => {
      unsubCursor();
      unsubConflict();
      collaborationService.disconnect();
    };
  }, [documentId, currentUser]);

  const broadcastBlockUpdate = useCallback(
    (blockId: string, content: string) => {
      if (!currentUser) return;
      collaborationService.sendBlockUpdate(blockId, content, currentUser.id, currentUser.name);
    },
    [currentUser]
  );

  const broadcastCursor = useCallback(
    (blockId: string, offset: number) => {
      if (!currentUser) return;
      collaborationService.sendCursorPosition(
        blockId,
        offset,
        currentUser.id,
        currentUser.name,
        currentUser.color || '#3b82f6'
      );
    },
    [currentUser]
  );

  const toggleSimulation = useCallback((enable: boolean) => {
    collaborationService.toggleSimulation(enable);
    setIsSimulating(enable);
  }, []);

  const triggerMockConflict = useCallback(() => {
    collaborationService.triggerDemoConflict();
  }, []);

  const resolveConflict = useCallback((resolvedContent: string) => {
    setActiveConflict(null);
    return resolvedContent;
  }, []);

  return {
    remoteCursors,
    activeConflict,
    isSimulating,
    broadcastBlockUpdate,
    broadcastCursor,
    toggleSimulation,
    triggerMockConflict,
    resolveConflict,
  };
}
