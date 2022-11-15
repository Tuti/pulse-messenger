import { useState } from 'react';
import { startNewChat } from '../../firebase/firestore';
import styles from '../../styles/components/chat-start-new.module.css';

export default function ChatStartNew(props) {
  const [input, setInput] = useState('');
  const currentUserData = props.userData;
  function handleClick() {
    if (input !== '') {
      startNewChat(currentUserData, input);
    }
  }

  return (
    <div className={styles['container']}>
      <input
        placeholder="Name"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
}
