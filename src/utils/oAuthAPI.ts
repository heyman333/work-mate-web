import axios, { type AxiosResponse } from 'axios';

export const googleAuthApi = {
  exchangeCodeForToken: async (clientId: string, redirectUri: string, code: string) => {
    const response: AxiosResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        code,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  },

  getUserInfo: async (accessToken: string) => {
    const response: AxiosResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
};

export const githubAuthApi = {
  exchangeCodeForToken: async (clientId: string, redirectUri: string, code: string) => {
    const response: AxiosResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  },

  getUserInfo: async (accessToken: string) => {
    const response: AxiosResponse = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'WorkMateApp'
        },
      }
    );
    return response.data;
  },

  getUserEmails: async (accessToken: string) => {
    const response: AxiosResponse = await axios.get(
      'https://api.github.com/user/emails',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'WorkMateApp'
        },
      }
    );
    return response.data;
  }
};