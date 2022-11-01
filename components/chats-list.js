import ChatTile from "./chat-tile"


export default function ChatsList(props){
  
  const chatTiles = props.chats.map((value, index) => {
    return(
      <ChatTile 
        key={props.username}
      />
    )
  })

  return(
    <div className={styles['chats-list']}>
      
    </div>
  ) 
} 