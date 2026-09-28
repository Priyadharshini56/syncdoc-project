import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { documentService } from '../services/documentService';
import type { DocumentData } from '../types/document';
import { Button } from '../components/common/Button';
import {
  ArrowLeft,
  Settings,
  Trash2,
  Save,
  Check,
  Sliders,
} from 'lucide-react';

export const DocumentSettings: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  const [document, setDocument] = useState<DocumentData | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [enableAstVector, setEnableAstVector] = useState(true);
  const [strictOptimisticLock, setStrictOptimisticLock] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      const doc = await documentService.getDocumentById(documentId || 'doc_technical_spec');
      setDocument(doc);
      setTitle(doc.title);
      setDescription(doc.description || '');
    };
    fetchDoc();
  }, [documentId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId) return;

    await documentService.updateDocument(documentId, { title, description });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this collaborative document?')) {
      if (documentId) {
        await documentService.deleteDocument(documentId);
      }
      navigate('/documents');
    }
  };

  if (!document) return null;

  return (
    <div style={{ padding: '2rem', maxWidth: '840px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <button
          onClick={() => navigate(`/documents/${documentId}`)}
          style={{
            color: 'var(--text-secondary)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Document Settings
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Configuration for "{document.title}"
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* General Settings Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={16} style={{ color: 'var(--accent-primary)' }} />
            General Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.875rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.375rem' }}>
                Summary / Abstract
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.55rem 0.875rem', resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* AST & Synchronization Options */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={16} style={{ color: 'var(--accent-purple)' }} />
            AST Engine Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Enable Vector Clock Sequencing</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Tags each AST node change with a logical vector clock timestamp.
                </div>
              </div>
              <input
                type="checkbox"
                checked={enableAstVector}
                onChange={(e) => setEnableAstVector(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Strict Intra-Block Optimistic Locking</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Disallows concurrent editing within the exact same block node.
                </div>
              </div>
              <input
                type="checkbox"
                checked={strictOptimisticLock}
                onChange={(e) => setStrictOptimisticLock(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1.5px solid var(--accent-rose-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trash2 size={16} />
            Danger Zone
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Permanently delete this document and all its AST node history. This operation cannot be undone.
          </p>
          <Button type="button" variant="danger" size="sm" onClick={handleDelete} icon={<Trash2 size={14} />}>
            Delete Document
          </Button>
        </div>

        {/* Save Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
          {isSaved && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Check size={16} /> Settings saved!
            </span>
          )}
          <Button type="submit" variant="primary" size="md" icon={<Save size={15} />}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
