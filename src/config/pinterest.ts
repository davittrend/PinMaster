export const PINTEREST_CONFIG = {
  clientId: import.meta.env.VITE_PINTEREST_CLIENT_ID || '1507772',
  clientSecret: import.meta.env.VITE_PINTEREST_CLIENT_SECRET || '12e86e7dd050a39888c5e753908e80fae94f7367',
  redirectUri: import.meta.env.VITE_REDIRECT_URI || 'https://symphonious-pastelito-7f8665.netlify.app/callback',
  scope: 'boards:read,pins:read,pins:write',
  apiBaseUrl: 'https://api.pinterest.com/v5'
};