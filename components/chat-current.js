import styles from '../styles/components/chat-current.module.css';
import MessageTile from "./message-tile"


export default function ChatCurrent(props) {
  //TODO: need to switch to this eventually
  // const messages = props.messages;

  const messages = [
    {
      user: 'user1',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      user: 'user2',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      user: 'user3',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      user: 'user4',
      message: 'this is a test message',
      timestamp: '7:00am'
    }
  ];

  //Shows the most recent messages and 
  //can scroll up to look at older messages.
  const messageHistory = messages.map((value, index) => {
    return(
      <MessageTile 
        key={index}
        message={value.message}
        timestamp={value.timestamp}
        user={value.user}
      />
    )       
  })

  return(
    <div className={styles['container']}>
      <div className={styles['message-history']}>
        {messageHistory}
      </div>
      <div className={styles['inputs']}>
        <input className={styles['user-input']}/>
      </div>
    </div>
  )
}