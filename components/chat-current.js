import MessageTile from "./message-tile"


export default function ChatCurrent(props) {
  //Shows the most recent messages and 
  //can scroll up to look at older messages.
  const messageHistory = props.messages.map((value, index) => {
    return(
      <MessageTile 
        key={value.timestamp}
        message={value.message}
        timestamp={value.timestamp}
        user={value.user}
      />
    )       
  })

  return(
    <div className={styles['chat']}>
      <div className={styles['message-history']}>
        {messageHistory}
      </div>
      <div className={styles['inputs']}>
        <input className={styles['user-input']}/>
      </div>
    </div>
  )
}