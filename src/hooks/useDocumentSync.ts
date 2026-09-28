import { useState, useEffect, useCallback, useRef } from 'react';
import type { SyncState } from '../types/collaboration';
import { collaborationService } from '../services/collaborationService';
import { documentService } from '../services/documentService';

export function useDocumentSync(documentId: string, initialSyncState: SyncState = 'synced') {
  const [syncState, setSyncState] = useState<SyncState>(initialSyncState);
  const [lastSavedTime, setLastSavedTime] = useState<Date>(new Date());
  const pendingSavesRef = useRef<Map<string, { content: string; timeout: number }>>(new Map());

  useEffect(() => {
    const unsub = collaborationService.onSyncStateChange((state) => {
      setSyncState(state);
      if (state === 'saved' || state === 'synced') {
        setLastSavedTime(new Date());
      }
    });

    return () => {
      unsub();
    };
  }, [documentId]);

  const queueBlockSave = useCallback(
    (blockId: string, content: string, onSaveComplete?: () => void) => {
      setSyncState('saving');

      // Clear existing pending timeout for this block
      const existing = pendingSavesRef.current.get(blockId);
      if (existing) {
        clearTimeout(existing.timeout);
      }

      const timeout = window.setTimeout(async () => {
        try {
          await documentService.updateBlock(documentId, blockId, content);
          setSyncState('synced');
          setLastSavedTime(new Date());
          pendingSavesRef.current.delete(blockId);
          onSaveComplete?.();
        } catch {
          setSyncState('offline');
        }
      }, 700);

      pendingSavesRef.current.set(blockId, { content, timeout });
    },
    [documentId]
  );

  return {
    syncState,
    lastSavedTime,
    queueBlockSave,
    setSyncState,
  };
}
