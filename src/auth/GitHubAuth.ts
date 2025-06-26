import { useState, useCallback } from 'react';
import { githubAuthApi } from '../utils/oAuthAPI';

interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface UseGitHubAuthReturn {
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

export const useGitHubAuth = (): UseGitHubAuthReturn => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const generateState = useCallback(() => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }, []);

  const getAuthUrl = useCallback(() => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'user:email',
      state: generateState()
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }, [clientId, redirectUri, generateState]);

  const handleCallback = useCallback(async (code: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const tokens = await githubAuthApi.exchangeCodeForToken(clientId, redirectUri, code);
      const userData = await githubAuthApi.getUserInfo(tokens.access_token);

      try {
        const emails = await githubAuthApi.getUserEmails(tokens.access_token);
        const primaryEmail = emails.find((email: any) => email.primary);
        userData.email = primaryEmail?.email || userData.email;
      } catch (emailError) {
        console.warn('Failed to fetch user emails:', emailError);
      }

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