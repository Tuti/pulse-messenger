import styles from '../../styles/components/chat-messages.module.css';
import { useUser } from '../../context/userContext';
import { useEffect, useState } from 'react';

export default function ChatMessages(props) {
  const currentUser = useUser();
  const chat = props.currentChat;
  const messages = props.currentChat.data.messages;
  const [chatHistory, setChatHistory] = useState([]);

  function generateMessages() {
    const history = chat.data.messages.map((value, index) => {
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

    return history;
  }

  useEffect(() => {
    console.log('chat changes');
    setChatHistory(generateMessages(chat));
  }, [chat]);

  // const history = chat.data.chatHistory.map((value, index) => {
  //   const isReceivedMessage = value.user !== currentUser.displayName;
  //   return (
  //     <div
  //       key={index}
  //       className={
  //         isReceivedMessage ? `${styles['received']}` : `${styles['sent']}`
  //       }
  //     >
  //       <div
  //         className={
  //           isReceivedMessage
  //             ? `${styles['wrapper']} ${styles['received-bg']}`
  //             : `${styles['wrapper']} ${styles['sent-bg']}`
  //         }
  //       >
  //         <div className={styles['sub-heading']}>
  //           <div className={styles['displayName']}>{value.displayName}</div>
  //           <div className={styles['date']}>{`${value.timestamp
  //             .toDate()
  //             .toLocaleDateString('en-us')}`}</div>
  //         </div>
  //         <div className={styles['message-content']}>{value.message}</div>
  //       </div>
  //     </div>
  //   );
  // });

  return <div className={styles['container']}>{chatHistory}</div>;
}
