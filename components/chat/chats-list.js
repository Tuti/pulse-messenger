import styles from "../styles/components/chats-list.module.css";
import ChatTilePreview from "./chat-tile-preview";

export default function ChatsList(props) {
  //TODO
  //const chats = props.chats;

  //TEST DATA
  const chats = [
    // {
    //   username: 'username1',
    //   lastMessage: 'this is a test message',
    // },
    // {
    //   username: 'username2',
    //   lastMessage: 'this is a test message',
    // },
    // {
    //   username: 'username3',
    //   lastMessage: 'this is a test message',
    // },
    // {
    //   username: 'username4',
    //   lastMessage: 'this is a test message',
    // },
  ];

  const chatTiles = chats.map((value, index) => {
    return (
      <ChatTilePreview
        key={value.username}
        username={value.username}
        lastMessage={value.lastMessage}
      />
    );
  });

  function handleFriendClick() {
    props.setFriendListActive(true);
    props.setChatActive(false);
  }

  return (
    <>
      <div className={styles["tiles"]}>
        <div onClick={handleFriendClick} className={styles["friends"]}>
          {"Friends"}
        </div>
        {chatTiles.length == 0 && (
          <div className={styles["empty-list"]}>{"no messages yet... :("}</div>
        )}
        {chatTiles.length > 0 && <>{chatTiles}</>}
      </div>
    </>
  );
}
