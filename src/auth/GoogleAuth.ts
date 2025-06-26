import { useState, useCallback } from 'react';
import { googleAuthApi } from '../utils/oAuthAPI';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface UseGoogleAuthReturn {
  user: GoogleUser | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const getAuthUrl = useCallback(() => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }, [clientId, redirectUri]);

  const handleCallback = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const tokens = await googleAuthApi.exchangeCodeForToken(clientId, redirectUri, code);
      const userData = await googleAuthApi.getUserInfo(tokens.access_token);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  }, [clientId, redirectUri]);

  const login = useCallback(() => {
    window.location.href = getAuthUrl();
  }, [getAuthUrl]);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    handleCallback
  };
};