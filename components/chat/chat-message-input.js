import { useState } from 'react';
import { useUser } from '../../context/userContext';
import { sendMessage } from '../../firebase/firestore';
import styles from '../../styles/components/chat-message-input.module.css';
export default function ChatMessageinput(props) {
  const currentUser = useUser();
  const [messageInput, setMessageInput] = useState('');

  function handleClick() {
    console.log('send message display name: ', currentUser.displayName);
    sendMessage(props.chatId, currentUser.displayName, messageInput);
    setMessageInput('');
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      sendMessage(props.chatId, currentUser.displayName, messageInput);
      setMessageInput('');
    }
  }
  return (
    <div className={styles['input']}>
      <input
        className={styles['user-input']}
        value={messageInput}
        onChange={(e) => {
          setMessageInput(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={'Type message'}
      />
      <button className={styles['send']} onClick={handleClick}>
        send
      </button>
    </div>
  );
}
