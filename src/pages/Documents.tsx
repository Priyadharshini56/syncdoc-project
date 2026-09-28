import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { documentService } from '../services/documentService';
import type { DocumentMeta } from '../types/document';
import { DocumentCard } from '../components/documents/DocumentCard';
import { DocumentListRow } from '../components/documents/DocumentListRow';
import {
  DocumentFilters,
  type FilterCategory,
  type ViewMode,
  type SortOption,
} from '../components/documents/DocumentFilters';
import { NewDocumentModal } from '../components/modals/NewDocumentModal';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { Plus, FileText } from 'lucide-react';

export const Documents: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [documents, setDocuments] = useState<DocumentMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(
    (searchParams.get('filter') as FilterCategory) || 'all'
  );
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showNewDocModal, setShowNewDocModal] = useState(
    searchParams.get('action') === 'new'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      setIsLoading(true);
      const docs = await documentService.getDocuments();
      setDocuments(docs);
      setIsLoading(false);
    };
    fetchDocs();
  }, []);

  useEffect(() => {
    const filterParam = searchParams.get('filter') as FilterCategory;
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, [searchParams]);

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await documentService.toggleFavorite(id);
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  // Filter logic
  const filteredDocs = documents
    .filter((doc) => {
      // Search query
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category tab filter
      switch (activeFilter) {
        case 'owned':
          return doc.ownerId === user?.id;
        case 'shared':
          return doc.ownerId !== user?.id;
        case 'favorites':
          return !!doc.isFavorite;
        case 'recent':
        case 'all':
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'collaborators') {
        return b.collaborators.length - a.collaborators.length;
      }
      // 'recent' by default
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div style={{ padding: '2rem', maxWidth: '1240px', margin: '0 auto' }}>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
            Document Browser
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Browse, search, and manage all your team's collaborative AST specifications
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus size={16} />}
          onClick={() => setShowNewDocModal(true)}
        >
          New Document
        </Button>
      </div>

      {/* Filter & View Mode Controls */}
      <DocumentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Documents List or Grid */}
      {isLoading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading document catalog...
        </div>
      ) : filteredDocs.length === 0 ? (
        /* Empty State */
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-medium)',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <FileText size={24} />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
            No documents found
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            No documents match your current filter criteria or search query. Create your first collaborative document now.
          </p>
          <Button
            variant="primary"
            size="md"
            icon={<Plus size={16} />}
            onClick={() => setShowNewDocModal(true)}
          >
            Create Document
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          {filteredDocs.map((doc) => (
            <DocumentListRow
              key={doc.id}
              document={doc}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* New Document Modal */}
      <NewDocumentModal
        isOpen={showNewDocModal}
        onClose={() => setShowNewDocModal(false)}
      />
    </div>
  );
};
