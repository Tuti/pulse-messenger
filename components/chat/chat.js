import styles from '../../styles/components/chat.module.css';
import ChatCurrent from './chat-current';
import ChatsList from './chats-list';
import Friends from '../friend/friends';
import ChatStartNew from './chat-start-new';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, query, collection, where } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { useUser } from '../../context/userContext';

export default function Chat() {
  const currentUser = useUser();

  const [currentChat, setCurrentChat] = useState();
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState();

  const [chatActive, setChatActive] = useState({
    isActive: true,
    activeIndex: 0,
  });
  const [chatNewActive, setChatNewActive] = useState(false);
  const [friendListActive, setFriendListActive] = useState(false);

  function updateActiveIndex(index) {
    setChatActive((chatActive) => ({ ...chatActive, activeIndex: index }));
  }

  function updateIsChatActive(isActive) {
    setChatActive((chatActive) => ({ ...chatActive, isActive: isActive }));
  }

  useEffect(() => {
    const unsubscribeUser = onSnapshot(
      doc(db, 'users', `${currentUser.displayName}`),
      (doc) => {
        setUserData(doc.data());
      }
    );

    return () => {
      unsubscribeUser();
    };
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('users', 'array-contains', `${currentUser.displayName}`)
    );

    const unsubscribeChats = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        chats.push(doc.data());
      });
      setChats(chats);
    });

    return () => {
      unsubscribeChats();
    };
  }, []);

  return (
    <div className={styles['grid']}>
      <div className={styles['sidebar']}>
        <ChatsList
          chats={chats}
          chatActive={chatActive}
          updateIsChatActive={updateIsChatActive}
          updateActiveIndex={updateActiveIndex}
          setCurrentChat={setCurrentChat}
          setChatNewActive={setChatNewActive}
          setFriendListActive={setFriendListActive}
        />
      </div>
      <div className={styles['active-panel']}>
        {chatActive.isActive && <ChatCurrent currentChat={currentChat} />}
        {chatNewActive && <ChatStartNew userData={userData} />}
        {friendListActive && <Friends userData={userData} />}
      </div>
    </div>
  );
}
