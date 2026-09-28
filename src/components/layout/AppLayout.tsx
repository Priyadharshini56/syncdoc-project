import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { NewDocumentModal } from '../modals/NewDocumentModal';

export const AppLayout: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showNewDocModal, setShowNewDocModal] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 45,
          }}
        />
      )}

      {/* Desktop & Mobile Drawer Sidebar */}
      <div
        style={{
          position: isMobileOpen ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          zIndex: isMobileOpen ? 50 : 40,
          height: '100vh',
          display: 'flex',
        }}
        className={isMobileOpen ? 'mobile-open' : ''}
      >
        <Sidebar onNewDocument={() => setShowNewDocModal(true)} />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile Header Bar */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-glass)',
          }}
          className="mobile-header-bar"
        >
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{ color: 'var(--text-primary)', padding: '0.25rem' }}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span style={{ fontWeight: 800, fontSize: '1.125rem' }}>SyncDoc</span>
          <div style={{ width: '22px' }} />
        </div>

        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      {/* New Document Modal */}
      <NewDocumentModal
        isOpen={showNewDocModal}
        onClose={() => setShowNewDocModal(false)}
      />
    </div>
  );
};
