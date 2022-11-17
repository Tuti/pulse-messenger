import styles from '../../styles/components/chat-start-new.module.css';
import ChatCurrent from './chat-current';
import ChatMessageinput from './chat-message-input';
import ChatMessages from './chat-messages';
import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';
import { startNewChat } from '../../firebase/firestore';

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
        {/* <div className={styles['wrapper']}>
          <BsPencilSquare size={'1.5rem'} />
        </div> */}
        <input
          placeholder="Enter Username"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button onClick={handleClick}>click me</button>
      </div>
      <ChatMessages />
      <ChatMessageinput />
    </div>
  );
}
