export type BlockType = 
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'list'
  | 'quote'
  | 'divider';

export interface BlockMetadata {
  lastEditedBy?: string;
  lastEditedAt?: number;
  remoteUserEditing?: string;
  remoteUserColor?: string;
  version?: number;
}

export interface BlockNode {
  id: string;
  type: BlockType;
  content: string;
  level?: 1 | 2 | 3;
  language?: string;
  listType?: 'bullet' | 'ordered';
  order: number;
  metadata?: BlockMetadata;
}

export interface CollaboratorBrief {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'idle' | 'offline';
  currentBlockId?: string;
}

export interface DocumentMeta {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  createdAt: string;
  updatedAt: string;
  lastEditedAt: string;
  lastEditedBy: string;
  isFavorite?: boolean;
  status: 'live' | 'draft' | 'archived';
  collaborators: CollaboratorBrief[];
  tags: string[];
}

export interface DocumentData extends DocumentMeta {
  blocks: BlockNode[];
  version: number;
}

export interface DocumentOutlineItem {
  id: string;
  title: string;
  level: number;
  blockId: string;
}
