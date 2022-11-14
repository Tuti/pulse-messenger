import styles from '../../styles/components/friend-add.module.css';
import { useState } from 'react';
import { sendFriendRequest } from '../../firebase/firestore';

export default function FriendAdd(props) {
  const currentUserData = props.userData;
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState({
    show: false,
    error: false,
    content: '',
  });

  async function handleRequest() {
    const result = await sendFriendRequest(currentUserData, displayName);
    if (!result.success) {
      setMessage({
        show: true,
        error: true,
        content: result.message,
      });
    } else {
      setMessage({
        show: true,
        error: false,
        content: `Success! Sent friend request to ${displayName}.`,
      });
    }
  }
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['search']}>
          <input
            id={styles['search-input']}
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
              if (message.content !== '') {
                setMessage({ show: false, error: false, content: '' });
              }
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleRequest();
              }
            }}
            placeholder={'Enter a username'}
          />
          <button
            onClick={async () => {
              await handleRequest();
            }}
            className={styles['button']}
          >
            Send Request
          </button>
        </div>
        {message.show && message.error && (
          <div className={styles['error-message']}>{message.content}</div>
        )}
        {message.show && !message.error && (
          <div className={styles['success-message']}>{message.content}</div>
        )}
      </div>
    </>
  );
}
