

export default function ChatTile(props) {
  const user = props.user;
  const username = user.username;
  
  //TODO:
  //Need to figure out firestore db structure for 
  //getting last message of the chat
  const lastMessage = 'last message placeholder';

  return(
    <div className={styles['chat-tile']}>
      <div className={styles['profile-icon']}>
        {username.charAt(0)}
      </div>
      <div className={styles['username']}>
        {username}
      </div>
      <div className={styles['last-message']}>
        {lastMessage}
      </div>
    </div>
  )
}