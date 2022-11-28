import { useUser } from '../../context/userContext';
import styles from '../../styles/components/chat-tile-preview.module.css';

export default function ChatTilePreview(props) {
  const currentUser = useUser();
  const chat = props.chat;
  const userName = getUsername(chat.data);
  const lastMessage = getLastMessage(chat.data);

  function getLastMessage(chat) {
    if (chat.messages.length - 1 < 0) {
      return '';
    }
    return chat?.messages[chat.messages.length - 1].message;
  }

  function getUsername(chat) {
    for (const user of chat.users) {
      if (currentUser.displayName !== user) {
        return user;
      }
    }
  }

  function handleClick() {
    console.log('clicked', `${props.tileIndex}`);
    props.setActiveIndex(props.tileIndex);
    props.setCurrentChat(chat);
    props.updateActivePanel('chat');
  }

  return (
    <div
      className={
        props.isActive
          ? `${styles['info']} ${styles['active']}`
          : `${styles['info']}`
      }
      onClick={handleClick}
    >
      <div className={styles['profile-icon']}>{userName.charAt(0)}</div>
      <div className={styles['message-info']}>
        <div className={styles['username']}>{userName}</div>
        <div className={styles['last-message']}>{lastMessage}</div>
      </div>
    </div>
  );
}
