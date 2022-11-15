import styles from '../../styles/components/chat.module.css';
import ChatCurrent from './chat-current';
import ChatsList from './chats-list';
import Friends from '../friend/friends';
import ChatStartNew from './chat-start-new';
import { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export default function Chat() {
  const currentUser = useUser();
  const [chatActive, setChatActive] = useState(true);
  const [chatNewActive, setChatNewActive] = useState(false);
  const [friendListActive, setFriendListActive] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'users', `${currentUser.displayName}`),
      (doc) => {
        setUserData(doc.data());
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles['grid']}>
      <div className={styles['sidebar']}>
        <ChatsList
          setChatActive={setChatActive}
          setChatNewActive={setChatNewActive}
          setFriendListActive={setFriendListActive}
        />
      </div>
      {chatActive && (
        <div className={styles['current']}>
          <ChatCurrent />
        </div>
      )}
      {chatNewActive && (
        <div className={styles['start-new']}>
          <ChatStartNew userData={userData} />
        </div>
      )}
      {friendListActive && (
        <div className={styles['friends']}>
          <Friends userData={userData} />
        </div>
      )}
    </div>
  );
}
