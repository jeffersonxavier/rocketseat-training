import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

export function LoginBox () {

  const { signInUrl, user } = useContext(AuthContext);
  console.log('user', user)

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
