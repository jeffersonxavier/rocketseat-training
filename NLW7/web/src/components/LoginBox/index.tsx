import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../services/api';
import styles from './styles.module.scss';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
    login: string;
  }
}

export function LoginBox () {
  const signInUrl = `https://github.com/login/oauth/authorize?client_id=5e8472f8580287836399`;

  async function signIn(code: string) {
    const response = await api.post<AuthResponse>('authenticate', { code });

    const { token, user } = response.data;

    localStorage.setItem('@doWhile:token', token);
    console.log('user', user);
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

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe a sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  )
}
