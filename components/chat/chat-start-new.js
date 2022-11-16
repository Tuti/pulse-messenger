import { useState } from 'react';
import { startNewChat } from '../../firebase/firestore';
import styles from '../../styles/components/chat-start-new.module.css';
import ChatCurrent from './chat-current';

export default function ChatStartNew(props) {
  const [input, setInput] = useState('');
  const currentUserData = props.userData;

  async function handleClick() {
    if (input !== '') {
      const results = await startNewChat(currentUserData, input);
      console.log({ results });
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['input-username']}>
        <input
          placeholder="Enter Username"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <ChatCurrent />
    </div>
  );
}
