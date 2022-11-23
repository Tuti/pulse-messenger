import styles from '../../styles/components/chat-messages.module.css';
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';

export default function ChatMessages(props) {
  const currentUser = useUser();
  const chat = props.currentChat;

  const [messages, setMessages] = useState([]);
  const testMessages = [
    // {
    //   displayName: 'user1',
    //   message: 'this is a test message',
    //   timestamp: '7:00am',
    // },
    // {
    //   displayName: 'tuti',
    //   message:
    //     'this is a test message this is a test message this is a test message this is a test message this is a test message this is a test message this is a test message ',
    //   timestamp: '7:00am',
    // },
    // {
    //   displayName: 'user1',
    //   message: 'this is a test message',
    //   timestamp: '7:00am',
    // },
    // {
    //   displayName: 'tuti',
    //   message: 'this is a test message',
    //   timestamp: '7:00am',
    // },
  ];

  // while (!chat.messages) {
  //   //wait
  // }
  const chatHistory = messages.reverse().map((value, index) => {
    const isReceivedMessage = value.displayName !== currentUser.displayName;
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

  useEffect(() => {
    if (chat.messages === undefined) {
      return;
    }
    setMessages(chat.messages);
  }, [chat]);

  return <div className={styles['container']}>{chatHistory}</div>;
}
