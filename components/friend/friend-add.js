import styles from '../../styles/components/friend-add.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext';
import { addFriend } from '../../firebase/firestore';

export default function FriendAdd(props) {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState({
    show: false,
    error: false,
    content: '',
  });
  const currentUser = useUser();

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
            placeholder={'Enter a username'}
          />
          <button
            onClick={async () => {
              console.log('attempting friend request');
              const result = await addFriend(currentUser, displayName);
              if (!result) {
                setMessage({
                  show: true,
                  error: true,
                  content: 'User does not exist',
                });
              } else {
                setMessage({
                  show: true,
                  error: false,
                  content: `Success! Sent friend request to ${displayName}.`,
                });
              }
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
