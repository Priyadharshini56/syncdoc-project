import { api } from './api';
import type { DocumentData, DocumentMeta } from '../types/document';
import { MOCK_DOCUMENTS_LIST, MOCK_PRIMARY_DOCUMENT } from '../data/mockData';

// In-memory document storage for development/mock mode
let mockDocuments = [...MOCK_DOCUMENTS_LIST];
const mockFullDocs: Record<string, DocumentData> = {
  [MOCK_PRIMARY_DOCUMENT.id]: { ...MOCK_PRIMARY_DOCUMENT },
};

export const documentService = {
  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to GET /api/documents
   */
  async getDocuments(): Promise<DocumentMeta[]> {
    const res = await api.get<DocumentMeta[]>('/documents');
    if (res.success && res.data) {
      return res.data;
    }
    return mockDocuments;
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to GET /api/documents/:id
   */
  async getDocumentById(id: string): Promise<DocumentData> {
    const res = await api.get<DocumentData>(`/documents/${id}`);
    if (res.success && res.data) {
      return res.data;
    }

    if (mockFullDocs[id]) {
      return mockFullDocs[id];
    }

    // Generate full document from meta if available
    const meta = mockDocuments.find((d) => d.id === id);
    if (meta) {
      const generatedDoc: DocumentData = {
        ...meta,
        version: 1,
        blocks: [
          {
            id: `blk_${Date.now()}_1`,
            type: 'heading',
            level: 1,
            content: meta.title,
            order: 0,
          },
          {
            id: `blk_${Date.now()}_2`,
            type: 'paragraph',
            content: meta.description || 'Start typing content or use slash commands...',
            order: 1,
          },
        ],
      };
      mockFullDocs[id] = generatedDoc;
      return generatedDoc;
    }

    // Default fallback
    return MOCK_PRIMARY_DOCUMENT;
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to POST /api/documents
   */
  async createDocument(title: string, description?: string): Promise<DocumentData> {
    const payload = { title, description };
    const res = await api.post<DocumentData>('/documents', payload);
    if (res.success && res.data) {
      return res.data;
    }

    const newId = `doc_${Date.now()}`;
    const newDoc: DocumentData = {
      id: newId,
      title: title || 'Untitled Document',
      description: description || 'New collaborative technical document',
      ownerId: 'usr_meghan',
      ownerName: 'Meghan K.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastEditedAt: 'Just now',
      lastEditedBy: 'Meghan K.',
      isFavorite: false,
      status: 'draft',
      version: 1,
      tags: ['Technical'],
      collaborators: [MOCK_PRIMARY_DOCUMENT.collaborators[0]],
      blocks: [
        {
          id: `blk_${Date.now()}_1`,
          type: 'heading',
          level: 1,
          content: title || 'Untitled Document',
          order: 0,
        },
        {
          id: `blk_${Date.now()}_2`,
          type: 'paragraph',
          content: 'Begin documenting your system architecture here...',
          order: 1,
        },
      ],
    };

    mockDocuments = [newDoc, ...mockDocuments];
    mockFullDocs[newId] = newDoc;
    return newDoc;
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to PUT /api/documents/:id
   */
  async updateDocument(id: string, updates: Partial<DocumentMeta>): Promise<DocumentMeta> {
    const res = await api.put<DocumentMeta>(`/documents/${id}`, updates);
    if (res.success && res.data) {
      return res.data;
    }

    mockDocuments = mockDocuments.map((doc) =>
      doc.id === id ? { ...doc, ...updates, updatedAt: new Date().toISOString() } : doc
    );
    if (mockFullDocs[id]) {
      mockFullDocs[id] = { ...mockFullDocs[id], ...updates, updatedAt: new Date().toISOString() };
    }
    return mockDocuments.find((d) => d.id === id)!;
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to PUT /api/documents/:docId/blocks/:blockId
   */
  async updateBlock(
    documentId: string,
    blockId: string,
    content: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> {
    const res = await api.put(`/documents/${documentId}/blocks/${blockId}`, { content, metadata });
    if (res.success) return true;

    // Update in-memory mock document
    if (mockFullDocs[documentId]) {
      mockFullDocs[documentId].blocks = mockFullDocs[documentId].blocks.map((blk) =>
        blk.id === blockId ? { ...blk, content, metadata: { ...blk.metadata, ...metadata } } : blk
      );
    }
    return true;
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to DELETE /api/documents/:id
   */
  async deleteDocument(id: string): Promise<boolean> {
    const res = await api.delete(`/documents/${id}`);
    if (res.success) return true;

    mockDocuments = mockDocuments.filter((d) => d.id !== id);
    delete mockFullDocs[id];
    return true;
  },

  async toggleFavorite(id: string): Promise<boolean> {
    const doc = mockDocuments.find((d) => d.id === id);
    if (doc) {
      doc.isFavorite = !doc.isFavorite;
      return true;
    }
    return false;
  },
};
