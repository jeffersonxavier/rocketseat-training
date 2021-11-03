import styles from './styles.module.scss';
import LogoImg from '../../assets/logo.svg';

export function MessageList () {
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não veja a hora de começar esse evento. Com certeza vai ser o melhor de todos os tempos, vamos pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/jeffersonxavier.png" alt="Jefferson Xavier" />
            </div>
            <span>Jefferson Xavier</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não veja a hora de começar esse evento. Com certeza vai ser o melhor de todos os tempos, vamos pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/jeffersonxavier.png" alt="Jefferson Xavier" />
            </div>
            <span>Jefferson Xavier</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não veja a hora de começar esse evento. Com certeza vai ser o melhor de todos os tempos, vamos pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/jeffersonxavier.png" alt="Jefferson Xavier" />
            </div>
            <span>Jefferson Xavier</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
