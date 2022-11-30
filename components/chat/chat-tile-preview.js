import styles from '../../styles/components/chat-tile-preview.module.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

export default function ChatTilePreview(props) {
  const currentUser = useUser();
  const chat = props.chat;
  const [username, setUsername] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  function getUsername(chat) {
    for (const user of chat.users) {
      if (currentUser.displayName !== user) {
        return user;
      }
    }
  }
  function getLastMessage(chat) {
    if (chat.messages.length - 1 < 0) {
      return '';
    }
    return chat.messages[chat.messages.length - 1].message;
  }

  function handleClick() {
    // console.log('clicked chat tile preview', props.id, chat);
    props.setCurrentChat({ id: props.id, data: chat });
    props.updateActivePanel('chat');
  }

  useEffect(() => {
    setUsername(getUsername(chat));
    setLastMessage(getLastMessage(chat));
  }, [chat]);

  return (
    <div
      className={
        props.isActive
          ? `${styles['info']} ${styles['active']}`
          : `${styles['info']}`
      }
      onClick={handleClick}
    >
      <div className={styles['profile-icon']}>{username.charAt(0)}</div>
      <div className={styles['message-info']}>
        <div className={styles['username']}>{username}</div>
        <div className={styles['last-message']}>{lastMessage}</div>
      </div>
    </div>
  );
}
