import styles from '../../styles/components/chat.module.css';
import ChatCurrent from './chat-current';
import ChatsList from './chats-list';
import Friends from '../friend/friends';
import ChatStartNew from './chat-start-new';
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  doc,
  query,
  collection,
  where,
  orderBy,
} from 'firebase/firestore';
import { useUser } from '../../context/userContext';
import { db } from '../../firebase/firestore';

export default function Chat() {
  const currentUser = useUser();

  const [currentChat, setCurrentChat] = useState([]);
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState();

  const [activeIndex, setActiveIndex] = useState(-1);
  const [chatActive, setChatActive] = useState(true);
  const [chatNewActive, setChatNewActive] = useState(false);

  const [friendListActive, setFriendListActive] = useState(false);

  function updateActivePanel(panelName) {
    switch (panelName) {
      case 'chat':
        setChatActive(true);
        setChatNewActive(false);
        setFriendListActive(false);
        break;
      case 'chatNew':
        setChatNewActive(true);
        setChatActive(false);
        setFriendListActive(false);
        break;
      case 'friendList':
        setFriendListActive(true);
        setChatActive(false);
        setChatNewActive(false);
        break;
      default:
        console.log('reached end of panel switch cases');
    }
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
      //TODO
      //fix query to use orderby so messages show up
      //in correct order in chat-list
      //orderBy('lastMessageTS', 'asc');
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
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setCurrentChat={setCurrentChat}
          updateActivePanel={updateActivePanel}
        />
      </div>
      <div className={styles['active-panel']}>
        {chatActive && <ChatCurrent currentChat={currentChat} />}
        {chatNewActive && <ChatStartNew userData={userData} />}
        {friendListActive && <Friends userData={userData} />}
      </div>
    </div>
  );
}
