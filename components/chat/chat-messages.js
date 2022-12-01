import styles from '../../styles/components/chat-messages.module.css';
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';

export default function ChatMessages(props) {
  const currentUser = useUser();
  const chat = props.currentChat;
  const messages = [...props.currentChat.data.messages].reverse();
  const [chatHistory, setChatHistory] = useState([]);

  function generateMessages() {
    const history = messages.map((value, index) => {
      const isReceivedMessage = value.user !== currentUser.displayName;
      return (
        <div
          key={index}
          className={
            isReceivedMessage ? `${styles['received']}` : `${styles['sent']}`
          }
        >
          <div
            className={
              isReceivedMessage
                ? `${styles['message']} ${styles['received-bg']}`
                : `${styles['message']} ${styles['sent-bg']}`
            }
          >
            <div className={styles['sub-heading']}>
              <div className={styles['displayName']}>{value.user}</div>
              <div className={styles['date']}>{`${value.timestamp
                .toDate()
                .toLocaleTimeString()}`}</div>
            </div>
            <div className={styles['message-content']}>{value.message}</div>
          </div>
        </div>
      );
    });

    return history;
  }

  useEffect(() => {
    console.log('chat changes');
    setChatHistory(generateMessages(chat));
  }, [chat]);

  return <div className={styles['container']}>{chatHistory}</div>;
}
