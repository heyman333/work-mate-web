export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  githubId?: string;
  googleId?: string;
}

export interface UserJoinRequest {
  email: string;
  name: string;
  profileImage?: string;
  githubId?: string;
  googleId?: string;
}

export interface UserCheckRequest {
  email?: string;
  githubId?: string;
  googleId?: string;
}

export interface ApiError {
  error: string;
}

export interface SuccessResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
