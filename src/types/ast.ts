import type { BlockType } from './document';

export interface ASTNodeProperties {
  level?: number;
  charCount?: number;
  lineCount?: number;
  language?: string;
  listType?: string;
  version?: number;
  hasConflict?: boolean;
  order?: number;
  totalBlocks?: number;
  lastEditedBy?: string;
  [key: string]: unknown;
}

export interface ASTNode {
  id: string;
  type: BlockType | 'document';
  label: string;
  depth: number;
  properties: ASTNodeProperties;
  children?: ASTNode[];
  activeUser?: string;
  activeColor?: string;
}

export interface ASTDocumentTree {
  documentId: string;
  version: number;
  root: ASTNode;
  totalNodes: number;
}
