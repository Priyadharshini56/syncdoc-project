import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/common/Button';
import {
  Layers,
  ArrowRight,
  GitMerge,
  Users,
  History,
  ShieldCheck,
  Cpu,
  Sparkles,
  FolderTree,
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Real-Time Collaboration',
      description:
        'Multi-user live typing with millisecond latency, sub-block presence indicators, and synchronized cursor tracking.',
      icon: Users,
      color: '#2563eb',
    },
    {
      title: 'AST-Aware Structural Editing',
      description:
        'Documents are parsed into discrete Abstract Syntax Tree nodes. Edits to distinct blocks never collide or clobber each other.',
      icon: FolderTree,
      color: '#7c3aed',
    },
    {
      title: 'Intelligent Conflict Resolution',
      description:
        'Side-by-side 3-way visual resolution with Keep Mine, Keep Remote, and AST synthesis for concurrent intra-block changes.',
      icon: GitMerge,
      color: '#e11d48',
    },
    {
      title: 'Live Awareness & Presence',
      description:
        'Visual block state indicators show exactly which teammate is working on a block with animated collaborator name tags.',
      icon: Sparkles,
      color: '#059669',
    },
    {
      title: 'Granular Version History',
      description:
        'Snapshot revisions with block mutation deltas, timestamped checkpoints, and instant one-click time-travel restoration.',
      icon: History,
      color: '#d97706',
    },
    {
      title: 'Secure Sanitized Rendering',
      description:
        'Enterprise-grade security using DOMPurify with strict HTML sanitization against XSS vectors and injection vulnerabilities.',
      icon: ShieldCheck,
      color: '#0284c7',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'User Edits', desc: 'Collaborators edit technical content concurrently' },
    { step: '02', title: 'Document Blocks', desc: 'Edits are isolated to discrete block components' },
    { step: '03', title: 'AST Structure', desc: 'Blocks maintain vector clocks and syntax metadata' },
    { step: '04', title: 'Real-Time Sync', desc: 'Yjs CRDT and WebSocket stream deltas instantly' },
    { step: '05', title: 'Conflict Detection', desc: 'Non-destructive detection triggers 3-way diff' },
    { step: '06', title: 'Merged Document', desc: 'Deterministic document consistency achieved' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          padding: '5rem 1.5rem 4rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow background effects */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <span
              className="badge"
              style={{
                backgroundColor: 'var(--accent-primary-light)',
                color: 'var(--accent-primary)',
                padding: '0.4rem 1rem',
                fontSize: '0.8125rem',
                border: '1px solid rgba(37, 99, 235, 0.2)',
              }}
            >
              <Cpu size={14} />
              <span>SyncDoc Engine 2.0 • AST-Aware Collaboration</span>
            </span>
          </div>

          {/* Hero Heading */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            Collaborate on Documents <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #e11d48 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Without Losing a Single Change.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            A high-performance technical document platform designed for engineering teams.
            Combines real-time collaborative editing, structural AST node isolation, and deterministic conflict resolution.
          </p>

          {/* Action CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/documents/doc_technical_spec')}
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
            >
              Explore Live Editor Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/dashboard')}
              style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Realistic Interactive Product Preview */}
      <section style={{ padding: '0 1.5rem 5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Editor Window Mock Header */}
            <div
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span
                  style={{
                    marginLeft: '0.75rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  SyncDoc Architecture Specification (Live Session)
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span className="badge badge-live" style={{ fontSize: '0.6875rem' }}>
                  <span className="status-dot online" /> 3 Engineers Active
                </span>
                <span className="badge badge-pill" style={{ fontSize: '0.6875rem' }}>
                  AST Synced
                </span>
              </div>
            </div>

            {/* Editor Body Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '380px' }}>
              {/* Mini AST Tree Preview */}
              <div
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRight: '1px solid var(--border-subtle)',
                  padding: '1rem',
                  fontSize: '0.8125rem',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                  AST Structure Tree
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-secondary)' }}>
                  <div>◈ Root Document</div>
                  <div style={{ paddingLeft: '1rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    ├─ Heading 1: Architecture
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>├─ Paragraph: Overview</div>
                  <div style={{ paddingLeft: '1rem', color: '#10b981', fontWeight: 600 }}>
                    ├─ Code Block (Rahul editing)
                  </div>
                  <div style={{ paddingLeft: '1rem' }}>├─ Quote: Design Invariants</div>
                  <div style={{ paddingLeft: '1rem' }}>└─ List: Conflict Protocol</div>
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{ padding: '1.75rem 2.25rem', backgroundColor: 'var(--bg-elevated)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  SyncDoc Architecture Overview
                </h2>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  SyncDoc decomposes documents into discrete Abstract Syntax Tree blocks. Edits are isolated to individual nodes, ensuring concurrent modifications never overwrite unrelated sections.
                </p>

                {/* Simulated Code Block with Rahul's live cursor */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1.5px solid #10b981',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '12px',
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      padding: '1px 8px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Rahul Sharma is editing
                  </div>
                  <pre
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-primary)',
                      margin: 0,
                    }}
                  >
                    <code>{`export function applyBlockDelta(tree: ASTDocumentTree, delta: ASTDelta) {
  // Vector clock validation prevents AST collisions
  return updateNodeContent(tree, delta.blockId, delta.content);
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Built for Resilient Real-Time Collaboration
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Everything your engineering team needs to collaborate on critical technical documents with zero data loss.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all var(--transition-normal)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: `${feat.color}15`,
                      color: feat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works / Visual Flow */}
      <section id="how-it-works" style={{ padding: '5rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              How the AST Engine Synchronizes
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              Deterministic data pipeline from keystroke to conflict-free consensus.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--accent-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {ws.step}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {ws.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{ws.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '4rem 1.5rem 6rem 1.5rem' }}>
        <div
          className="container"
          style={{
            maxWidth: '960px',
            backgroundColor: 'var(--accent-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Build With SyncDoc?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Launch your collaborative technical workspace in seconds. Tested for extreme multi-user concurrency.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/documents/doc_technical_spec')}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            style={{ backgroundColor: '#ffffff', color: 'var(--accent-primary)', fontWeight: 700 }}
          >
            Launch Editor Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-secondary)',
          padding: '2.5rem 1.5rem',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>SyncDoc Collaborative Engine</span>
          </div>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            © 2026 SyncDoc. Engineered for AST-aware document collaboration.
          </div>
        </div>
      </footer>
    </div>
  );
};
