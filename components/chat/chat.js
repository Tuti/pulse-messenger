import { useState } from 'react';
import styles from '../../styles/components/chat.module.css';
import ChatCurrent from './chat-current';
import ChatsList from './chats-list';
import FriendList from '../friend/friend-list';

export default function Chat() {
  const [chatActive, setChatActive] = useState(true);
  const [friendListActive, setFriendListActive] = useState(false);

  return (
    <div className={styles['grid']}>
      <div className={styles['sidebar']}>
        <ChatsList
          setChatActive={setChatActive}
          setFriendListActive={setFriendListActive}
        />
      </div>
      {chatActive && (
        <div className={styles['current']}>
          <ChatCurrent />
        </div>
      )}
      {friendListActive && (
        <div className={styles['friend-list']}>
          <FriendList />
        </div>
      )}
    </div>
  );
}
