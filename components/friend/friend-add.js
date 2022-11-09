import styles from '../../styles/components/friend-add.module.css';
import { useState } from 'react';
import { useUser } from '../../context/userContext';
import { addFriend } from '../../firebase/firestore';

export default function FriendAdd(props) {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState({ error: true, content: '' });
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
              setMessage('');
            }}
            placeholder={'Enter a username'}
          />
          <button
            onClick={async () => {
              console.log('attempting friend request');
              const result = await addFriend(currentUser, displayName);
              if (!result) {
                setMessage({ error: true, content: 'User does not exist' });
              } else {
                setMessage({ error: false, content: 'Success' });
              }
            }}
            className={styles['button']}
          >
            Send Request
          </button>
        </div>
        <div
          className={
            message.content === '' && message.error
              ? `${styles['hidden']} ${styles['error-message']}`
              : styles['error-message']
          }
        >{`${message.content}`}</div>
      </div>
    </>
  );
}
