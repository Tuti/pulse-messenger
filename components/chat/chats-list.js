import styles from '../../styles/components/chats-list.module.css';
import ChatTilePreview from './chat-tile-preview';
import { useUser } from '../../context/userContext';
import { BsChatDots } from 'react-icons/bs';
import { useState } from 'react';
import { getUser } from '../../firebase/firestore';

export default function ChatsList(props) {
  const currentUser = useUser();
  const chats = props.chats;
  const [activeIndex, setActiveIndex] = useState(-1);

  // TEST DATA
  // const chats = [
  //   {
  //     username: 'username1',
  //     lastMessage: 'this is a test message',
  //   },
  //   {
  //     username: 'username2',
  //     lastMessage: 'this is a test message',
  //   },
  //   {
  //     username: 'username3',
  //     lastMessage: 'this is a test message',
  //   },
  //   {
  //     username: 'username4',
  //     lastMessage: 'this is a test message',
  //   },
  // ];

  const chatTiles = chats.map((doc, index) => {
    function getLastMessage(doc) {
      return doc.messages[doc.messages.length - 1].message;
    }
    function getUsername(doc) {
      for (const user of doc.users) {
        if (currentUser.displayName !== user) {
          return user;
        }
      }
    }
    const username = getUsername(doc);
    return (
      <ChatTilePreview
        key={username}
        username={username}
        lastMessage={getLastMessage(doc)}
        tileIndex={index}
        isActive={index === props.activeIndex}
        setActiveIndex={setActiveIndex}
      />
    );
  });

  function handleNewChat() {
    props.setChatNewActive(true);
    props.setChatActive(false);
    props.setFriendListActive(false);
  }

  function handleFriendClick() {
    props.setFriendListActive(true);
    props.setChatActive(false);
    props.setChatNewActive(false);
  }

  return (
    <>
      <div className={styles['tiles']}>
        <div className={styles['buttons']}>
          <button onClick={handleNewChat} className={styles['start-chat']}>
            <BsChatDots size={'1.5rem'} />
          </button>
          <button onClick={handleFriendClick} className={styles['friends']}>
            {'Friends'}
          </button>
        </div>
        {chatTiles.length == 0 && (
          <div className={styles['empty-list']}>{'no messages yet... :('}</div>
        )}
        {chatTiles.length > 0 && <>{chatTiles}</>}
      </div>
    </>
  );
}
