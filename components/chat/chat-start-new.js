import styles from '../../styles/components/chat-start-new.module.css';
import ChatMessages from './chat-messages';
import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';
import { getUser, sendMessage, startNewChat } from '../../firebase/firestore';

export default function ChatStartNew(props) {
  const currentUserData = props.userData;
  const [userNameInput, setUserNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [otherUser, setOtherUser] = useState();

  async function startChatandSendMessage() {
    if (!otherUser) {
      return;
    }
    const newChat = await startNewChat(currentUserData, otherUser);
    const result = await sendMessage(newChat.id, currentUserData, messageInput);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['input-username']}>
        <input
          placeholder="Enter Username"
          value={userNameInput}
          onChange={(e) => {
            setUserNameInput(e.target.value);
          }}
          onBlur={async () => {
            if (
              userNameInput === '' ||
              userNameInput === currentUserData.userDetails.displayName
            ) {
              //TODO
              //show message and change css
              //can't start convo with self
              return;
            }

            const result = await getUser(userNameInput);
            if (!result.success) {
              //TODO
              //show message and change css to show error
              setOtherUser(null);
              console.log('no user');
              return;
            }
            console.log('got user');
            setOtherUser(result.data);
          }}
        />
      </div>
      <ChatMessages />
      <div className={styles['input']}>
        <input
          className={styles['user-input']}
          placeholder={'Type your message'}
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
        <button className={styles['send']} onClick={startChatandSendMessage}>
          send
        </button>
      </div>
    </div>
  );
}
