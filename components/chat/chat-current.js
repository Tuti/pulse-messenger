import styles from '../../styles/components/chat-current.module.css';
import ChatMessages from './chat-messages';
import ChatMessageinput from './chat-message-input';

export default function ChatCurrent(props) {
  return (
    <div className={styles['container']}>
      <ChatMessages
        currentChat={props.currentChat}
        messages={props.currentChat?.data?.messages}
      />
      <ChatMessageinput chatId={props.currentChat.id} />
    </div>
  );
}
