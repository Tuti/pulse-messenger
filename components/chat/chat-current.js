import styles from '../../styles/components/chat-current.module.css';
import ChatMessages from './chat-messages';
import ChatMessageinput from './chat-message-input';

export default function ChatCurrent(props) {
  //TODO: need to switch to this eventually
  // const messages = props.messages;

  return (
    <div className={styles['container']}>
      <ChatMessages />
      <ChatMessageinput />
    </div>
  );
}
