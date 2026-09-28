import type { DocumentData, DocumentMeta } from '../types/document';
import type { Collaborator, VersionHistoryItem, ActivityEvent, ConflictData } from '../types/collaboration';
import type { User } from '../types/user';

export const CURRENT_USER: User = {
  id: 'usr_meghana',
  name: 'Meghana K.',
  email: 'meghana@syncdoc.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  team: 'Core Engine Engineering',
  color: '#3b82f6',
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'usr_darshu',
    name: 'Priya Darshini',
    email: 'darshu@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'editor',
    team: 'Distributed Systems',
    color: '#10b981',
  },
  {
    id: 'usr_swarna',
    name: 'Swarna',
    email: 'swarna@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'editor',
    team: 'Algorithms & CRDT',
    color: '#8b5cf6',
  },
  {
    id: 'usr_ayan',
    name: 'Ayan ',
    email: 'ayan@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'editor',
    team: 'Cloud Infrastructure',
    color: '#f59e0b',
  },
  {
    id: 'usr_vikram',
    name: 'Vikram Singh',
    email: 'vikram@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'viewer',
    team: 'Security & Compliance',
    color: '#0284c7',
  },
];

export const MOCK_COLLABORATORS: Collaborator[] = [
  {
    id: 'usr_meghana',
    name: 'Meghana K. (You)',
    email: 'meghana@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#3b82f6',
    status: 'online',
    currentBlockId: 'blk_01',
    lastActive: 'Just now',
    role: 'owner',
  },
  {
    id: 'usr_darshu',
    name: 'Priya Darshini',
    email: 'darshu@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: '#10b981',
    status: 'online',
    currentBlockId: 'blk_05',
    lastActive: '2m ago',
    role: 'editor',
  },
  {
    id: 'usr_swarna',
    name: 'Swarna',
    email: 'swarna@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    color: '#8b5cf6',
    status: 'online',
    currentBlockId: 'blk_03',
    lastActive: '5m ago',
    role: 'editor',
  },
  {
    id: 'usr_ayan',
    name: 'Ayan ',
    email: 'ayan@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    color: '#f59e0b',
    status: 'idle',
    currentBlockId: 'blk_07',
    lastActive: '12m ago',
    role: 'editor',
  },
  {
    id: 'usr_vikram',
    name: 'Vikram Singh',
    email: 'vikram@syncdoc.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    color: '#0284c7',
    status: 'offline',
    lastActive: '1h ago',
    role: 'viewer',
  },
];

export const MOCK_PRIMARY_DOCUMENT: DocumentData = {
  id: 'doc_technical_spec',
  title: 'SyncDoc Architecture & AST Conflict Engine',
  description: 'Enterprise technical specification for structural document synchronization and AST node transformation.',
  ownerId: 'usr_meghana',
  ownerName: 'Meghana K.',
  ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-03-01T09:00:00.000Z',
  updatedAt: '2026-03-19T10:35:00.000Z',
  lastEditedAt: '2 minutes ago',
  lastEditedBy: 'Priya Darshini',
  isFavorite: true,
  status: 'live',
  version: 5,
  tags: ['Architecture', 'RFC', 'CRDT', 'Core'],
  collaborators: [
    {
      id: 'usr_meghana',
      name: 'Meghana K.',
      email: 'meghana@syncdoc.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      color: '#3b82f6',
      role: 'owner',
      status: 'online',
    },
    {
      id: 'usr_darshu',
      name: 'Priya Darshini',
      email: 'darshu@syncdoc.io',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      color: '#10b981',
      role: 'editor',
      status: 'online',
      currentBlockId: 'blk_05',
    },
    {
      id: 'usr_swarna',
      name: 'Swarna K.',
      email: 'swarna@syncdoc.io',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      color: '#8b5cf6',
      role: 'editor',
      status: 'online',
      currentBlockId: 'blk_03',
    },
    {
      id: 'usr_ayan',
      name: 'Ayan ',
      email: 'ayan@syncdoc.io',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      color: '#f59e0b',
      role: 'editor',
      status: 'idle',
    },
  ],
  blocks: [
    {
      id: 'blk_01',
      type: 'heading',
      level: 1,
      content: 'SyncDoc Architecture Overview',
      order: 0,
      metadata: {
        lastEditedBy: 'Meghana K.',
        lastEditedAt: Date.now() - 120000,
        version: 5,
      },
    },
    {
      id: 'blk_02',
      type: 'paragraph',
      content: 'SyncDoc is a real-time collaborative document engine engineered to prevent destructive overwrites. Unlike monolithic editors that treat an entire document as an unbounded string, SyncDoc decomposes documents into discrete Abstract Syntax Tree (AST) blocks.',
      order: 1,
      metadata: {
        lastEditedBy: 'Meghana K.',
        lastEditedAt: Date.now() - 300000,
        version: 4,
      },
    },
    {
      id: 'blk_03',
      type: 'heading',
      level: 2,
      content: 'AST-Based Granular Synchronization',
      order: 2,
      metadata: {
        lastEditedBy: 'Swarna',
        lastEditedAt: Date.now() - 60000,
        remoteUserEditing: 'Swarna',
        remoteUserColor: '#8b5cf6',
        version: 5,
      },
    },
    {
      id: 'blk_04',
      type: 'paragraph',
      content: 'When two developers concurrently edit separate sections of a document, changes are propagated as block-scoped mutation deltas. Because each block maintains independent sequence identifiers, concurrent edits to distinct blocks never collide.',
      order: 3,
      metadata: {
        lastEditedBy: 'Swarna ',
        lastEditedAt: Date.now() - 80000,
        version: 4,
      },
    },
    {
      id: 'blk_05',
      type: 'code',
      language: 'typescript',
      content: `// AST Block Mutation Handler
export function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta): ASTDocumentTree {
  const targetNode = findNodeById(tree.root, delta.blockId);
  if (!targetNode) return tree;

  // Verify vector clocks and detect AST tree conflicts
  if (delta.baseVersion !== targetNode.properties.version) {
    return flagConflict(tree, delta);
  }

  return updateNodeContent(tree, delta.blockId, delta.content);
}`,
      order: 4,
      metadata: {
        lastEditedBy: 'Priya Darshini',
        lastEditedAt: Date.now() - 30000,
        remoteUserEditing: 'Priya Darshini',
        remoteUserColor: '#10b981',
        version: 5,
      },
    },
    {
      id: 'blk_06',
      type: 'quote',
      content: 'Design Rule: Concurrent edits on different blocks merge deterministically without blocking the user interface or clobbering input.',
      order: 5,
      metadata: {
        lastEditedBy: 'Meghana K.',
        lastEditedAt: Date.now() - 600000,
        version: 3,
      },
    },
    {
      id: 'blk_07',
      type: 'heading',
      level: 2,
      content: 'Conflict Resolution Protocol',
      order: 6,
      metadata: {
        lastEditedBy: 'Ayan',
        lastEditedAt: Date.now() - 450000,
        version: 4,
      },
    },
    {
      id: 'blk_08',
      type: 'list',
      listType: 'bullet',
      content: 'Deterministic vector clock sequencing on individual block nodes\nNon-blocking local input buffering during transient network drops\n3-way side-by-side resolution UI for concurrent intra-block mutations\nAutomatic fallback merge for orthogonal line additions',
      order: 7,
      metadata: {
        lastEditedBy: 'Ayan',
        lastEditedAt: Date.now() - 400000,
        version: 4,
      },
    },
    {
      id: 'blk_09',
      type: 'divider',
      content: '',
      order: 8,
      metadata: {
        lastEditedBy: 'Meghana K.',
        lastEditedAt: Date.now() - 900000,
        version: 1,
      },
    },
    {
      id: 'blk_10',
      type: 'paragraph',
      content: 'The frontend coordinates with the upcoming backend Yjs WebSocket provider to maintain seamless CRDT awareness, real-time presence indicators, and instantaneous state hydration.',
      order: 9,
      metadata: {
        lastEditedBy: 'Meghana K.',
        lastEditedAt: Date.now() - 100000,
        version: 5,
      },
    },
  ],
};

export const MOCK_DOCUMENTS_LIST: DocumentMeta[] = [
  MOCK_PRIMARY_DOCUMENT,
  {
    id: 'doc_crdt_rfc',
    title: 'Distributed CRDT Synchronization RFC',
    description: 'Formal specification for Yjs-based state vector exchanges and delta compression algorithms.',
    ownerId: 'usr_swarna',
    ownerName: 'Swarna ',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-10T14:20:00.000Z',
    updatedAt: '2026-03-19T09:15:00.000Z',
    lastEditedAt: '15 minutes ago',
    lastEditedBy: 'Swarna ',
    isFavorite: true,
    status: 'live',
    tags: ['CRDT', 'Algorithms', 'RFC'],
    collaborators: [
      MOCK_PRIMARY_DOCUMENT.collaborators[0],
      MOCK_PRIMARY_DOCUMENT.collaborators[2],
    ],
  },
  {
    id: 'doc_api_gateway',
    title: 'API Gateway & Microservices Specification',
    description: 'Endpoint definitions, rate limiting policies, and authentication token validation.',
    ownerId: 'usr_darshu',
    ownerName: 'Priya Darshini',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-12T11:00:00.000Z',
    updatedAt: '2026-03-18T16:40:00.000Z',
    lastEditedAt: 'Yesterday',
    lastEditedBy: 'Priya Darshini',
    isFavorite: false,
    status: 'draft',
    tags: ['Backend', 'API', 'Gateway'],
    collaborators: [
      MOCK_PRIMARY_DOCUMENT.collaborators[0],
      MOCK_PRIMARY_DOCUMENT.collaborators[1],
    ],
  },
  {
    id: 'doc_websocket_benchmark',
    title: 'Real-Time WebSocket Protocol Benchmark',
    description: 'Empirical latency measurements across 10,000 concurrent collaborative sessions.',
    ownerId: 'usr_ayan',
    ownerName: 'Ayan ',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-14T08:30:00.000Z',
    updatedAt: '2026-03-19T08:00:00.000Z',
    lastEditedAt: '3 hours ago',
    lastEditedBy: 'Ayan ',
    isFavorite: false,
    status: 'live',
    tags: ['Performance', 'Benchmarks', 'WebSockets'],
    collaborators: [
      MOCK_PRIMARY_DOCUMENT.collaborators[0],
      MOCK_PRIMARY_DOCUMENT.collaborators[1],
      MOCK_PRIMARY_DOCUMENT.collaborators[2],
      MOCK_PRIMARY_DOCUMENT.collaborators[3],
    ],
  },
  {
    id: 'doc_design_system',
    title: 'Frontend Design System & Component Guidelines',
    description: 'Token hierarchy, accessible typography, color spaces, and micro-interactions.',
    ownerId: 'usr_meghana',
    ownerName: 'Meghana K.',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-05T13:00:00.000Z',
    updatedAt: '2026-03-17T12:00:00.000Z',
    lastEditedAt: '2 days ago',
    lastEditedBy: 'Meghana K.',
    isFavorite: true,
    status: 'live',
    tags: ['Design', 'UI/UX', 'Components'],
    collaborators: [
      MOCK_PRIMARY_DOCUMENT.collaborators[0],
      MOCK_PRIMARY_DOCUMENT.collaborators[1],
    ],
  },
  {
    id: 'doc_security_whitepaper',
    title: 'Enterprise Multi-Tenant Security & Compliance',
    description: 'End-to-end encryption specs, RBAC role definitions, and audit log pipelines.',
    ownerId: 'usr_meghana',
    ownerName: 'Meghana K.',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-02T10:00:00.000Z',
    updatedAt: '2026-03-15T15:30:00.000Z',
    lastEditedAt: '4 days ago',
    lastEditedBy: 'Elena Rostova',
    isFavorite: false,
    status: 'draft',
    tags: ['Security', 'Compliance', 'Audit'],
    collaborators: [
      MOCK_PRIMARY_DOCUMENT.collaborators[0],
      {
        id: 'usr_vikram',
        name: 'Vikram Singh',
        email: 'vikram@syncdoc.io',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        color: '#0284c7',
        role: 'viewer',
        status: 'offline',
      },
    ],
  },
];

export const MOCK_VERSION_HISTORY: VersionHistoryItem[] = [
  {
    version: 5,
    id: 'ver_5',
    timestamp: '2 minutes ago',
    authorName: 'Priya Darshini',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    summary: 'Updated applyBlockDelta implementation with vector clock checks',
    changesCount: 3,
    isCurrent: true,
  },
  {
    version: 4,
    id: 'ver_4',
    timestamp: '8 minutes ago',
    authorName: 'Swarna',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    summary: 'Added AST granular synchronization explanations and conflict list',
    changesCount: 6,
  },
  {
    version: 3,
    id: 'ver_3',
    timestamp: '25 minutes ago',
    authorName: 'Meghana K.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    summary: 'Refined code block annotations and system design rules',
    changesCount: 4,
  },
  {
    version: 2,
    id: 'ver_2',
    timestamp: '1 hour ago',
    authorName: 'Ayan',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    summary: 'Drafted initial protocol outline and bullet list specifications',
    changesCount: 8,
  },
  {
    version: 1,
    id: 'ver_1',
    timestamp: '3 hours ago',
    authorName: 'Meghana K.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    summary: 'Initial document creation with title and architecture thesis',
    changesCount: 2,
  },
];

export const MOCK_ACTIVITY_STREAM: ActivityEvent[] = [
  {
    id: 'act_1',
    userId: 'usr_darshu',
    userName: 'Priya Darshini',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userColor: '#10b981',
    action: 'edit',
    targetBlockTitle: 'AST Block Mutation Handler (Code Block)',
    timestamp: '2 minutes ago',
  },
  {
    id: 'act_2',
    userId: 'usr_swarna',
    userName: 'Swarna',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    userColor: '#8b5cf6',
    action: 'edit',
    targetBlockTitle: 'AST-Based Granular Synchronization',
    timestamp: '5 minutes ago',
  },
  {
    id: 'act_3',
    userId: 'usr_swarna',
    userName: 'Swarna',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    userColor: '#8b5cf6',
    action: 'join',
    timestamp: '8 minutes ago',
  },
  {
    id: 'act_4',
    userId: 'usr_ayan',
    userName: 'Ayan ',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    userColor: '#f59e0b',
    action: 'add_block',
    targetBlockTitle: 'Conflict Resolution Protocol List',
    timestamp: '20 minutes ago',
  },
  {
    id: 'act_5',
    userId: 'usr_meghana',
    userName: 'Meghana K.',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    userColor: '#3b82f6',
    action: 'conflict_resolved',
    targetBlockTitle: 'Resolved AST vector divergence',
    timestamp: '35 minutes ago',
  },
];

export const MOCK_SAMPLE_CONFLICT: ConflictData = {
  id: 'conf_sample_01',
  blockId: 'blk_05',
  blockType: 'code',
  localVersion: {
    content: `// Local change (Your version)
export function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta): ASTDocumentTree {
  const targetNode = findNodeById(tree.root, delta.blockId);
  if (!targetNode) return tree;

  // Strict optimistic locking with local rollback buffer
  if (delta.baseVersion !== targetNode.properties.version) {
    return bufferOptimisticRollback(tree, delta);
  }

  return updateNodeContent(tree, delta.blockId, delta.content);
}`,
    updatedAt: Date.now() - 45000,
    author: 'Meghana K. (You)',
  },
  remoteVersion: {
    content: `// Remote change (Rahul's version)
export function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta): ASTDocumentTree {
  const targetNode = findNodeById(tree.root, delta.blockId);
  if (!targetNode) return tree;

  // Verify vector clocks and detect AST tree conflicts
  if (delta.baseVersion !== targetNode.properties.version) {
    return flagConflict(tree, delta);
  }

  return updateNodeContent(tree, delta.blockId, delta.content);
}`,
    updatedAt: Date.now() - 30000,
    author: 'Priya Darshini',
  },
  suggestedMerge: `// Merged AST resolution (Combined)
export function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta): ASTDocumentTree {
  const targetNode = findNodeById(tree.root, delta.blockId);
  if (!targetNode) return tree;

  // Reconciled: Check vector clocks, then flag conflict with local rollback buffer
  if (delta.baseVersion !== targetNode.properties.version) {
    bufferOptimisticRollback(tree, delta);
    return flagConflict(tree, delta);
  }

  return updateNodeContent(tree, delta.blockId, delta.content);
}`,
  resolved: false,
};
