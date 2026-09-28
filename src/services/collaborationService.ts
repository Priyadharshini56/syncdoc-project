/**
 * SyncDoc Collaboration & WebSocket / Yjs Service
 * 
 * BACKEND / WEBSOCKET INTEGRATION GUIDE:
 * To connect your real-time server:
 * 1. Set `WS_BASE_URL` in `src/services/api.ts` (or `VITE_WS_URL=ws://localhost:5000/sync`).
 * 2. In `connectToRoom()`, instantiate your WebSocket or Yjs Provider:
 *    ```ts
 *    import * as Y from 'yjs';
 *    import { WebsocketProvider } from 'y-websocket';
 *    const ydoc = new Y.Doc();
 *    const provider = new WebsocketProvider(WS_BASE_URL, documentId, ydoc);
 *    ```
 * 3. Subscribe to awareness and doc updates as indicated in the listener comments below.
 */

import type { Collaborator, CursorPosition, DocumentChange, ConflictData, SyncState } from '../types/collaboration';
import { MOCK_COLLABORATORS, MOCK_SAMPLE_CONFLICT } from '../data/mockData';

export type ChangeCallback = (change: DocumentChange) => void;
export type CursorCallback = (cursors: CursorPosition[]) => void;
export type PresenceCallback = (collaborators: Collaborator[]) => void;
export type ConflictCallback = (conflict: ConflictData) => void;
export type SyncStateCallback = (state: SyncState) => void;

class CollaborationService {
  public activeDocumentId: string | null = null;
  private changeListeners: Set<ChangeCallback> = new Set();
  private cursorListeners: Set<CursorCallback> = new Set();
  private presenceListeners: Set<PresenceCallback> = new Set();
  private conflictListeners: Set<ConflictCallback> = new Set();
  private syncStateListeners: Set<SyncStateCallback> = new Set();

  private isSimulating: boolean = false;
  private simulationInterval: number | null = null;
  public activeCursors: CursorPosition[] = [];
  private currentCollaborators: Collaborator[] = [...MOCK_COLLABORATORS];

  /**
   * Connect to a document collaborative room
   * 
   * BACKEND_INTEGRATION_POINT:
   * Establish WebSocket or Yjs WebsocketProvider connection here
   */
  connect(documentId: string, userId: string, userName: string): void {
    this.activeDocumentId = documentId;
    this.notifySyncState('synced');
    this.notifyPresence(this.currentCollaborators);

    console.log(`[CollaborationService] Connected to room: ${documentId} as ${userName} (${userId})`);
  }

  disconnect(): void {
    this.stopSimulation();
    this.activeDocumentId = null;
    this.changeListeners.clear();
    this.cursorListeners.clear();
    this.presenceListeners.clear();
    this.conflictListeners.clear();
    this.syncStateListeners.clear();
    console.log('[CollaborationService] Disconnected');
  }

  /**
   * Broadcast local block edits to room
   * 
   * BACKEND_INTEGRATION_POINT:
   * Send JSON delta via WebSocket: `socket.send(JSON.stringify({ type: 'BLOCK_UPDATE', delta }))`
   * or mutate Y.Map / Y.XmlFragment in Yjs.
   */
  sendBlockUpdate(blockId: string, content: string, userId: string, userName: string): void {
    this.notifySyncState('saving');
    
    // Simulate short network sync delay
    setTimeout(() => {
      this.notifySyncState('synced');
    }, 400);

    const change: DocumentChange = {
      id: `chg_${Date.now()}`,
      blockId,
      userId,
      userName,
      operation: 'update',
      content,
      timestamp: Date.now(),
    };

    // Notify local subscribers if needed
    console.log('[CollaborationService] Outgoing block update:', change);
  }

  /**
   * Broadcast local cursor movement
   * 
   * BACKEND_INTEGRATION_POINT:
   * Update awareness state: `provider.awareness.setLocalStateField('cursor', { blockId, offset })`
   */
  sendCursorPosition(blockId: string, offset: number, _userId: string, userName: string, _userColor: string): void {
    console.log(`[CollaborationService] Cursor moved: ${userName} at ${blockId}:${offset}`);
  }

  /**
   * Triggers an AST conflict to demonstrate side-by-side resolution UI
   */
  triggerDemoConflict(customConflict?: ConflictData): void {
    const conflict = customConflict || MOCK_SAMPLE_CONFLICT;
    this.notifySyncState('conflict');
    this.conflictListeners.forEach((cb) => cb(conflict));
  }

  /**
   * Toggle mock multi-user simulation for demo & evaluation
   */
  toggleSimulation(enabled: boolean): void {
    this.isSimulating = enabled;
    if (enabled) {
      this.startSimulation();
    } else {
      this.stopSimulation();
    }
  }

  getIsSimulating(): boolean {
    return this.isSimulating;
  }

  private startSimulation(): void {
    if (this.simulationInterval) return;

    let tick = 0;
    this.simulationInterval = window.setInterval(() => {
      tick++;

      // Simulate remote cursor movements
      const blkIds = ['blk_02', 'blk_03', 'blk_04', 'blk_05', 'blk_07'];
      const mockPositions: CursorPosition[] = [
        {
          userId: 'usr_rahul',
          userName: 'Rahul Sharma',
          userColor: '#10b981',
          blockId: blkIds[(tick + 1) % blkIds.length],
          offset: (tick * 7) % 35,
        },
        {
          userId: 'usr_ananya',
          userName: 'Ananya Patel',
          userColor: '#8b5cf6',
          blockId: blkIds[(tick + 3) % blkIds.length],
          offset: (tick * 11) % 45,
        },
      ];
      this.activeCursors = mockPositions;
      this.notifyCursors(mockPositions);

      // Randomly simulate a collaborator typing on block blk_05
      if (tick % 6 === 0) {
        this.notifyChange({
          id: `sim_chg_${Date.now()}`,
          blockId: 'blk_05',
          userId: 'usr_rahul',
          userName: 'Rahul Sharma',
          operation: 'update',
          content: `// Rahul Sharma editing live...\nexport function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta): ASTDocumentTree {\n  // Sequence clock verified at tick #${tick}\n  return updateNodeContent(tree, delta.blockId, delta.content);\n}`,
          timestamp: Date.now(),
        });
      }
    }, 2500);
  }

  private stopSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    this.activeCursors = [];
    this.notifyCursors([]);
  }

  // Listener subscriptions
  onBlockChange(cb: ChangeCallback): () => void {
    this.changeListeners.add(cb);
    return () => this.changeListeners.delete(cb);
  }

  onCursorChange(cb: CursorCallback): () => void {
    this.cursorListeners.add(cb);
    return () => this.cursorListeners.delete(cb);
  }

  onPresenceChange(cb: PresenceCallback): () => void {
    this.presenceListeners.add(cb);
    return () => this.presenceListeners.delete(cb);
  }

  onConflict(cb: ConflictCallback): () => void {
    this.conflictListeners.add(cb);
    return () => this.conflictListeners.delete(cb);
  }

  onSyncStateChange(cb: SyncStateCallback): () => void {
    this.syncStateListeners.add(cb);
    return () => this.syncStateListeners.delete(cb);
  }

  private notifyChange(change: DocumentChange): void {
    this.changeListeners.forEach((cb) => cb(change));
  }

  private notifyCursors(cursors: CursorPosition[]): void {
    this.cursorListeners.forEach((cb) => cb(cursors));
  }

  private notifyPresence(collaborators: Collaborator[]): void {
    this.presenceListeners.forEach((cb) => cb(collaborators));
  }

  private notifySyncState(state: SyncState): void {
    this.syncStateListeners.forEach((cb) => cb(state));
  }
}

export const collaborationService = new CollaborationService();
