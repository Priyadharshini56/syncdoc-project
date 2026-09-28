import { useState, useEffect } from 'react';
import type { Collaborator, PresenceStatus } from '../types/collaboration';
import { collaborationService } from '../services/collaborationService';
import { MOCK_COLLABORATORS } from '../data/mockData';

export function usePresence(documentId: string, currentUserId?: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);
  const [localStatus, setLocalStatus] = useState<PresenceStatus>('online');

  useEffect(() => {
    const unsub = collaborationService.onPresenceChange((updated) => {
      setCollaborators(updated);
    });

    let idleTimer: number;
    const resetIdle = () => {
      if (localStatus !== 'online') {
        setLocalStatus('online');
      }
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        setLocalStatus('idle');
      }, 60000); // 1 minute idle
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);

    return () => {
      unsub();
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
    };
  }, [documentId, localStatus]);

  const activeCollaborators = collaborators.filter(
    (c) => c.status !== 'offline' && c.id !== currentUserId
  );

  return {
    collaborators,
    activeCollaborators,
    localStatus,
  };
}
