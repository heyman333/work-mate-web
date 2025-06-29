import { useState, useCallback } from "react";
import api from "@/utils/api";
import type { AxiosResponse } from "axios";

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
  handleCallback: (
    code: string,
    callback: (user: GitHubUser) => void
  ) => Promise<void>;
}

export const useGitHubAuth = (): UseGitHubAuthReturn => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  const generateState = useCallback(() => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }, []);

  const getAuthUrl = useCallback(() => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "user:email",
      state: generateState(),
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }, [clientId, redirectUri, generateState]);

  const handleCallback = useCallback(
    async (code: string, callback: (user: GitHubUser) => void) => {
      setIsLoading(true);
      setError(null);

      try {
        const userData: AxiosResponse<{ user: GitHubUser }> = await api.post(
          `/auth/github/callback`,
          {
            code,
          }
        );

        setUser(userData.data.user);
        callback(userData.data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

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
    handleCallback,
  };
};
