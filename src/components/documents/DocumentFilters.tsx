import React from 'react';
import { Search, LayoutGrid, List, ArrowUpDown } from 'lucide-react';

export type FilterCategory = 'all' | 'owned' | 'shared' | 'recent' | 'favorites';
export type ViewMode = 'grid' | 'list';
export type SortOption = 'recent' | 'name' | 'collaborators';

interface DocumentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
}) => {
  const filterCategories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Documents' },
    { id: 'owned', label: 'Created by Me' },
    { id: 'shared', label: 'Shared with Me' },
    { id: 'recent', label: 'Recent' },
    { id: 'favorites', label: 'Favorites' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {/* Top row: Search input + View switchers */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Search input with icon */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '450px',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search documents by title or tag..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.875rem 0.55rem 2.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
            }}
          />
        </div>

        {/* Right action group: Sort + Grid/List toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {/* Sort dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.35rem 0.625rem',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowUpDown size={14} />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
                boxShadow: 'none',
              }}
            >
              <option value="recent">Recently Edited</option>
              <option value="name">Document Title</option>
              <option value="collaborators">Collaborators</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              padding: '3px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => onViewModeChange('grid')}
              style={{
                padding: '0.35rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'grid' ? 'var(--bg-elevated)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              style={{
                padding: '0.35rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'list' ? 'var(--bg-elevated)' : 'transparent',
                color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-muted)',
                boxShadow: viewMode === 'list' ? 'var(--shadow-xs)' : 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
              title="List View"
              aria-label="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
      >
        {filterCategories.map((cat) => {
          const isSelected = activeFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange(cat.id)}
              style={{
                padding: '0.4rem 0.875rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: isSelected ? 600 : 500,
                whiteSpace: 'nowrap',
                backgroundColor: isSelected ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
