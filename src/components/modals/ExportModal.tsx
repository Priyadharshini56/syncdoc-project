import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import type { DocumentData } from '../../types/document';
import { exportService } from '../../services/exportService';
import { FileDown, FileText, Code2, Printer } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, document }) => {
  const exportFormats = [
    {
      id: 'pdf',
      title: 'PDF Document (.pdf)',
      desc: 'Print-ready formatted document with clean typography and page margins.',
      icon: Printer,
      action: () => {
        onClose();
        exportService.exportPdf();
      },
    },
    {
      id: 'html',
      title: 'Sanitized HTML (.html)',
      desc: 'Self-contained HTML package sanitized with DOMPurify.',
      icon: FileText,
      action: () => {
        exportService.exportHtml(document);
        onClose();
      },
    },
    {
      id: 'json',
      title: 'AST Structural JSON (.json)',
      desc: 'Complete Abstract Syntax Tree node hierarchy for backend processing and CRDT exchange.',
      icon: Code2,
      action: () => {
        exportService.exportJsonAst(document);
        onClose();
      },
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Document"
      subtitle={`Choose an output format for "${document.title}"`}
      maxWidth="520px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {exportFormats.map((fmt) => {
          const Icon = fmt.icon;
          return (
            <div
              key={fmt.id}
              onClick={fmt.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.backgroundColor = 'var(--accent-primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {fmt.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {fmt.desc}
                </div>
              </div>

              <FileDown size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
          );
        })}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
