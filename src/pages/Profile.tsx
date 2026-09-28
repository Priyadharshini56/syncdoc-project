import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/common/Button';
import {
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout, switchUser, availableUsers } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  return (
    <div style={{ padding: '2rem', maxWidth: '840px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          User Profile & Settings
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Manage your account credentials, themes, and session tokens
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-primary)',
              }}
            />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user.name}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user.email}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.375rem' }}>
                <span className="badge badge-live" style={{ textTransform: 'capitalize' }}>
                  Role: {user.role}
                </span>
                <span className="badge badge-pill">{user.team || 'Engineering'}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.25rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                User Identifier
              </div>
              <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                {user.id}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Assigned Cursor Color
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: user.color || '#3b82f6',
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                  {user.color || '#3b82f6'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Preferences */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Interface Appearance</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Currently active: <strong style={{ textTransform: 'capitalize' }}>{theme} Mode</strong>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>
        </div>

        {/* Demo Personas Switcher */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>
            Multi-User Persona Switcher
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Switch personas instantaneously to test concurrent presence, permissions, and roles.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {availableUsers.map((u) => {
              const isSelected = u.id === user.id;

              return (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: isSelected ? 'var(--accent-primary-light)' : 'var(--bg-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{u.role}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Session Token Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.375rem' }}>
            Active Bearer Authorization
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            This JWT bearer token is automatically attached to outgoing REST API calls.
          </p>
          <div
            style={{
              padding: '0.625rem 0.875rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-primary)',
              wordBreak: 'break-all',
            }}
          >
            {localStorage.getItem('syncdoc_token') || 'mock_jwt_token_development'}
          </div>
        </div>

        {/* Logout Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <Button variant="danger" size="md" onClick={logout} icon={<LogOut size={16} />}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
