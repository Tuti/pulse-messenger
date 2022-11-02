import styles from '../styles/components/chat.module.css';
import ChatCurrent from './chat-current';
import ChatsList from './chats-list';

export default function Chat() {
  return(
    <div className={styles['grid']}>
      <div className={styles['sidebar']}>
        <ChatsList />
      </div>
      <div className={styles['current']}>
        <ChatCurrent />
      </div>
    </div>
  )
}