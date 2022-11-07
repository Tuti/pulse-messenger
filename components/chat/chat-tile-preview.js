import styles from "../../styles/components/chat-tile-preview.module.css";

export default function ChatTilePreview(props) {
  const username = props.username;
  const lastMessage = props.lastMessage;
  //TODO:
  //Need to figure out firestore db structure for
  //getting last message of the chat

  return (
    <div className={styles["container"]}>
      <div className={styles["profile-icon"]}>{username.charAt(0)}</div>
      <div className={styles["message-info"]}>
        <div className={styles["username"]}>{username}</div>
        <div className={styles["last-message"]}>{lastMessage}</div>
      </div>
    </div>
  );
}
