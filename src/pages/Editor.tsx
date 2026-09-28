import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentService } from '../services/documentService';
import type { DocumentData } from '../types/document';
import { DocumentEditor } from '../components/editor/DocumentEditor';
import { MOCK_PRIMARY_DOCUMENT } from '../data/mockData';
import { Loader2 } from 'lucide-react';

export const Editor: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const [document, setDocument] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoc = async () => {
      setIsLoading(true);
      try {
        const id = documentId || 'doc_technical_spec';
        const doc = await documentService.getDocumentById(id);
        setDocument(doc);
      } catch (err) {
        console.error('Error loading document:', err);
        setDocument(MOCK_PRIMARY_DOCUMENT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoc();
  }, [documentId]);

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-primary)',
          gap: '1rem',
        }}
      >
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }} />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Hydrating collaborative AST document...
        </span>
      </div>
    );
  }

  if (!document) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h2>Document not found</h2>
        <button onClick={() => navigate('/documents')}>Back to Documents</button>
      </div>
    );
  }

  return (
    <DocumentEditor
      initialDocument={document}
      onSaveTitle={(newTitle) => {
        if (documentId) {
          documentService.updateDocument(documentId, { title: newTitle });
        }
      }}
    />
  );
};
