import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
    login: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider (props: AuthProvider) {
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=5e8472f8580287836399`;

  const [user, setUser] = useState<User | null>(null);

  async function signIn(code: string) {
    const response = await api.post<AuthResponse>('authenticate', { code });

    const { token, user } = response.data;

    localStorage.setItem('@doWhile:token', token);
    setUser(user);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@doWhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data);
      });
    }
  }, []);

  function signOut() {
    setUser(null);
    localStorage.removeItem('@doWhile:token');
  }

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
