import { PINTEREST_CONFIG } from '../config/pinterest';

class PinterestApiService {
  private accessToken: string | null = null;
  private readonly STATE_KEY = 'pinterest_auth_state';

  constructor() {
    this.accessToken = localStorage.getItem('pinterest_access_token');
  }

  getAuthUrl(): string {
    const state = this.generateSecureState();
    localStorage.setItem(this.STATE_KEY, state);
    
    const params = new URLSearchParams({
      client_id: PINTEREST_CONFIG.clientId,
      redirect_uri: PINTEREST_CONFIG.redirectUri,
      response_type: 'code',
      scope: PINTEREST_CONFIG.scope,
      state
    });
    
    return `https://www.pinterest.com/oauth/?${params.toString()}`;
  }

  private generateSecureState(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private validateState(receivedState: string): boolean {
    const savedState = localStorage.getItem(this.STATE_KEY);
    if (!savedState || savedState !== receivedState) {
      console.error('State validation failed');
      return false;
    }
    return true;
  }

  async exchangeCodeForToken(code: string, state: string): Promise<void> {
    if (!this.validateState(state)) {
      throw new Error('Invalid state parameter - security check failed');
    }

    localStorage.removeItem(this.STATE_KEY);

    try {
      const response = await fetch('/.netlify/functions/pinterest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          redirect_uri: PINTEREST_CONFIG.redirectUri 
        })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to exchange code for token: ${text}`);
      }

      const data = await response.json();
      
      if (!data.access_token) {
        throw new Error('No access token received from Pinterest');
      }
      
      this.setAccessToken(data.access_token);
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error instanceof Error ? error : new Error('Failed to exchange code for token');
    }
  }

  async getUserProfile() {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${PINTEREST_CONFIG.apiBaseUrl}/user_account`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user profile');
    }
    
    return response.json();
  }

  async getBoards() {
    if (!this.accessToken) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${PINTEREST_CONFIG.apiBaseUrl}/boards`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch boards');
    }
    
    return response.json();
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('pinterest_access_token', token);
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem('pinterest_access_token');
    localStorage.removeItem(this.STATE_KEY);
    localStorage.removeItem('pinterest_user');
    localStorage.removeItem('pinterest_boards');
  }
}

export const pinterestApi = new PinterestApiService();