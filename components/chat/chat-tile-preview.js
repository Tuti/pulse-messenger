import styles from '../../styles/components/chat-tile-preview.module.css';

export default function ChatTilePreview(props) {
  const index = props.index;
  const username = props.username;
  const lastMessage = props.lastMessage;
  //TODO:
  //Need to figure out firestore db structure for
  //getting last message of the chat
  //check kevin powell video for good last message css
  //so we get elipses thing at end of message

  function handleClick() {
    props.setActiveIndex(index);
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
      <div className={styles['profile-icon']}>{username.charAt(0)}</div>
      <div className={styles['message-info']}>
        <div className={styles['username']}>{username}</div>
        <div className={styles['last-message']}>{lastMessage}</div>
      </div>
    </div>
  );
}
