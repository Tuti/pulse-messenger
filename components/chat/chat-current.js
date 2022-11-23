import styles from '../../styles/components/chat-current.module.css';
import ChatMessages from './chat-messages';
import ChatMessageinput from './chat-message-input';

export default function ChatCurrent(props) {
  return (
    <div className={styles['container']}>
      <ChatMessages currentChat={props.currentChat} />
      <ChatMessageinput />
    </div>
  );
}
