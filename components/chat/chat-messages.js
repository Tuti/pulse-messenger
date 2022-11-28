import styles from '../../styles/components/chat-messages.module.css';
import { useUser } from '../../context/userContext';
import { useState, useEffect } from 'react';

export default function ChatMessages(props) {
  const currentUser = useUser();
  const chat = props.currentChat;
  const [chatHistory, setChatHistory] = useState([]);

  function generateChatHistory() {
    if (chat.data === undefined) {
      return [];
    }
    const history = chat.data.messages.map((value, index) => {
      console.log('user:', value.user, '| chat content:', value.message);

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
                ? `${styles['wrapper']} ${styles['received-bg']}`
                : `${styles['wrapper']} ${styles['sent-bg']}`
            }
          >
            <div className={styles['sub-heading']}>
              <div className={styles['displayName']}>{value.displayName}</div>
              <div className={styles['date']}>{`${value.timestamp
                .toDate()
                .toLocaleDateString('en-us')}`}</div>
            </div>
            <div className={styles['message-content']}>{value.message}</div>
          </div>
        </div>
      );
    });

    return chatHistory;
  }

  return <div className={styles['container']}>{chatHistory}</div>;
}
