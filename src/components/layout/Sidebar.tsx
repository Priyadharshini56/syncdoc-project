import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Clock,
  Star,
  Trash2,
  Settings,
  Layers,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';

interface SidebarProps {
  onNewDocument?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewDocument }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, switchUser, availableUsers } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Documents', path: '/documents', icon: FileText },
    { label: 'Shared With Me', path: '/documents?filter=shared', icon: Users },
    { label: 'Recent', path: '/documents?filter=recent', icon: Clock },
    { label: 'Favorites', path: '/documents?filter=favorites', icon: Star },
    { label: 'Trash', path: '/documents?filter=trash', icon: Trash2 },
    { label: 'Settings', path: '/profile', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path.includes('?')) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path && !location.search;
  };

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        flexShrink: 0,
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '1.25rem 1.25rem 1rem 1.25rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Layers size={18} />
          </div>
          <div>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              SyncDoc
            </span>
          </div>
        </Link>

        <button
          onClick={toggleTheme}
          style={{
            color: 'var(--text-secondary)',
            padding: '0.35rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Primary Action Button */}
      <div style={{ padding: '1rem 1.25rem 0.5rem 1.25rem' }}>
        <Button
          variant="primary"
          size="md"
          icon={<PlusCircle size={16} />}
          onClick={onNewDocument || (() => navigate('/documents?action=new'))}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          New Document
        </Button>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, padding: '0.75rem 0.75rem', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    backgroundColor: active ? 'var(--accent-primary-light)' : 'transparent',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <Icon size={18} style={{ opacity: active ? 1 : 0.75 }} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User profile & Demo switcher */}
      <div
        style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-elevated)',
          position: 'relative',
        }}
      >
        {/* User Switcher Dropdown Popover */}
        {showUserMenu && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '1rem',
              right: '1rem',
              marginBottom: '0.5rem',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.75rem',
              zIndex: 100,
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              Switch Demo Persona
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {availableUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setShowUserMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: user?.id === u.id ? 'var(--accent-primary-light)' : 'transparent',
                    color: user?.id === u.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                    textAlign: 'left',
                    width: '100%',
                    fontSize: '0.8125rem',
                  }}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    style={{ width: '22px', height: '22px', borderRadius: '50%' }}
                  />
                  <span style={{ fontWeight: 600 }}>{u.name}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.5rem',
                  color: 'var(--accent-rose)',
                  fontSize: '0.8125rem',
                  width: '100%',
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Current user trigger card */}
        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.35rem',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name || 'User'}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span
              className="status-dot online"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: '2px solid var(--bg-elevated)',
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name || 'Meghan K.'}
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.team || 'Core Engineering'}
            </div>
          </div>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </div>
    </aside>
  );
};
