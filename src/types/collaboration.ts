import type { BlockType } from './document';

export type PresenceStatus = 'online' | 'idle' | 'offline';

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  status: PresenceStatus;
  currentBlockId?: string;
  lastActive: string;
  role: 'owner' | 'editor' | 'viewer';
}

export interface CursorPosition {
  userId: string;
  userName: string;
  userColor: string;
  blockId: string;
  offset: number;
  selectionLength?: number;
}

export type SyncState = 
  | 'saved'
  | 'saving'
  | 'synced'
  | 'syncing'
  | 'conflict'
  | 'reconnecting'
  | 'offline';

export interface DocumentChange {
  id: string;
  blockId: string;
  userId: string;
  userName: string;
  operation: 'insert' | 'update' | 'delete' | 'reorder';
  content?: string;
  timestamp: number;
}

export interface ConflictData {
  id: string;
  blockId: string;
  blockType: BlockType;
  localVersion: {
    content: string;
    updatedAt: number;
    author: string;
  };
  remoteVersion: {
    content: string;
    updatedAt: number;
    author: string;
  };
  suggestedMerge: string;
  resolved: boolean;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userColor: string;
  action: 'edit' | 'add_block' | 'delete_block' | 'join' | 'leave' | 'conflict_resolved';
  targetBlockTitle?: string;
  timestamp: string;
}

export interface VersionHistoryItem {
  version: number;
  id: string;
  timestamp: string;
  authorName: string;
  authorAvatar: string;
  summary: string;
  changesCount: number;
  isCurrent?: boolean;
}
