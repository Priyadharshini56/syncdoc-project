# SyncDoc Backend & Database Integration Guide

Welcome backend engineering team! This frontend was architected specifically to make connecting your Node.js, Express, MongoDB, and WebSocket/Yjs infrastructure straightforward and type-safe.

---

## 1. Quick Environment Configuration

The frontend connects to the backend through two primary environment variables.
Create a `.env` file in the root of `Sync_doc_frontend`:

```bash
# REST API Base URL
VITE_API_URL=http://localhost:5000/api

# Real-time WebSocket or Yjs Provider URL
VITE_WS_URL=ws://localhost:5000/sync
```

All HTTP requests pass through [src/services/api.ts](file:///c:/Sync_doc_frontend/src/services/api.ts). It automatically adds Bearer JWT tokens from `localStorage.getItem('syncdoc_token')` to all requests.

---

## 2. REST API Endpoints Specification

### Authentication (`/api/auth`)

| Method | Endpoint | Request Body | Expected Response |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ email, password }` | `{ success: true, data: { user: User, token: string } }` |
| `POST` | `/api/auth/register` | `{ name, email, password, team? }` | `{ success: true, data: { user: User, token: string } }` |
| `GET` | `/api/auth/me` | *Headers: Authorization: Bearer `<token>`* | `{ success: true, data: User }` |

### Documents (`/api/documents`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/documents` | Returns array of `DocumentMeta[]` for dashboard & browser |
| `GET` | `/api/documents/:id` | Returns complete `DocumentData` with all `BlockNode[]` |
| `POST` | `/api/documents` | Creates new document `{ title, description? }` |
| `PUT` | `/api/documents/:id` | Updates document metadata (title, status, isFavorite, tags) |
| `DELETE` | `/api/documents/:id` | Removes document from database |
| `PUT` | `/api/documents/:docId/blocks/:blockId` | Updates single block content & AST metadata |

---

## 3. Recommended MongoDB Schemas

### `Document` Collection (`documents`)
```typescript
const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerName: { type: String, required: true },
  ownerAvatar: { type: String },
  status: { type: String, enum: ['live', 'draft', 'archived'], default: 'draft' },
  isFavorite: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
  tags: [{ type: String }],
  collaborators: [{
    id: String,
    name: String,
    email: String,
    avatar: String,
    color: String,
    role: { type: String, enum: ['owner', 'editor', 'viewer'] },
    status: { type: String, enum: ['online', 'idle', 'offline'] },
  }],
}, { timestamps: true });
```

### `Block` Collection (`blocks` or embedded sub-documents)
```typescript
const BlockSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true, index: true },
  id: { type: String, required: true, unique: true }, // e.g. blk_01
  type: { 
    type: String, 
    enum: ['heading', 'paragraph', 'code', 'list', 'quote', 'divider'], 
    required: true 
  },
  content: { type: String, default: '' },
  level: { type: Number }, // 1, 2, or 3 for headings
  language: { type: String }, // For code blocks (e.g. 'typescript')
  listType: { type: String, enum: ['bullet', 'ordered'] },
  order: { type: Number, required: true, index: true },
  metadata: {
    lastEditedBy: String,
    lastEditedAt: Number,
    version: { type: Number, default: 1 },
  }
});
```

---

## 4. Real-Time Collaboration & WebSocket / Yjs Hookup

The frontend has dedicated WebSocket connection hooks in [src/services/collaborationService.ts](file:///c:/Sync_doc_frontend/src/services/collaborationService.ts).

### Option A: Using `y-websocket` (Recommended for Yjs)
1. In your backend, run a standard `y-websocket` server or embed it in Express:
   ```javascript
   const WebSocket = require('ws');
   const { setupWSConnection } = require('y-websocket/bin/utils');
   const wss = new WebSocket.Server({ server });
   wss.on('connection', (ws, req) => {
     setupWSConnection(ws, req);
   });
   ```
2. In frontend [src/services/collaborationService.ts](file:///c:/Sync_doc_frontend/src/services/collaborationService.ts):
   - Instantiate `new WebsocketProvider(WS_BASE_URL, documentId, ydoc)`
   - Bind `ydoc.getArray('blocks')` to local React state.

### Option B: Custom WebSockets
If using native WebSockets or Socket.io, handle these payload types:
- **`BLOCK_UPDATE`**: `{ blockId: string, content: string, userId: string }`
- **`CURSOR_MOVE`**: `{ blockId: string, offset: number, userId: string }`
- **`PRESENCE_UPDATE`**: `{ userId: string, status: 'online' | 'idle' | 'offline' }`
- **`AST_CONFLICT`**: `{ blockId: string, localVersion: {...}, remoteVersion: {...}, suggestedMerge: string }`

---

## 5. Conflict Resolution Workflow

When your backend detects concurrent AST mutations on the same block node:
1. Backend emits `AST_CONFLICT` message over WebSocket.
2. Frontend triggers [src/components/editor/ConflictPanel.tsx](file:///c:/Sync_doc_frontend/src/components/editor/ConflictPanel.tsx).
3. The user picks **"Keep Mine"**, **"Keep Remote"**, or **"Merge"**.
4. The frontend dispatches the chosen resolution back to your backend endpoint:
   `POST /api/documents/:docId/conflicts/resolve` with `{ blockId, strategy: 'mine' | 'remote' | 'merge', resolvedContent }`.

---

## 6. TypeScript Interfaces

All shared data contracts are located in:
- [src/types/document.ts](file:///c:/Sync_doc_frontend/src/types/document.ts)
- [src/types/collaboration.ts](file:///c:/Sync_doc_frontend/src/types/collaboration.ts)
- [src/types/ast.ts](file:///c:/Sync_doc_frontend/src/types/ast.ts)
- [src/types/user.ts](file:///c:/Sync_doc_frontend/src/types/user.ts)

You can copy these types directly into your Node.js/Express backend repository for 100% end-to-end type safety!
