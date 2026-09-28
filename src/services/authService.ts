import { api } from './api';
import type { User } from '../types/user';
import { CURRENT_USER } from '../data/mockData';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  team?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to POST /api/auth/login
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', payload);
    if (res.success && res.data) {
      return res.data;
    }
    // Mock fallback
    return {
      user: { ...CURRENT_USER, email: payload.email },
      token: `mock_jwt_${Date.now()}`,
    };
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to POST /api/auth/register
   */
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', payload);
    if (res.success && res.data) {
      return res.data;
    }
    // Mock fallback
    return {
      user: {
        id: `usr_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        avatar: CURRENT_USER.avatar,
        role: 'editor',
        team: payload.team || 'Core Team',
        color: '#3b82f6',
      },
      token: `mock_jwt_${Date.now()}`,
    };
  },

  /**
   * BACKEND_INTEGRATION_POINT:
   * Connects to GET /api/auth/me
   */
  async getProfile(): Promise<User> {
    const res = await api.get<User>('/auth/me');
    if (res.success && res.data) {
      return res.data;
    }
    return CURRENT_USER;
  },

  logout(): void {
    localStorage.removeItem('syncdoc_token');
    localStorage.removeItem('syncdoc_user');
  },
};
