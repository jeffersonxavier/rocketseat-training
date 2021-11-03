import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import LogoImg from '../../assets/logo.svg';

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = [];
const socket = io('http://localhost:4000');

socket.on('new_message', (message) => {
  messagesQueue.push(message);
});

export function MessageList () {

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length) {
        setMessages(prev => ([
          messagesQueue[0],
          ...prev.slice(0, 2),
        ]));

        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {
          messages.map((message, index) => (
          <li key={index} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
          ))
        }
      </ul>
    </div>
  )
}
