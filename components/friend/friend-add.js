import { useState } from 'react';
import { useUser } from '../../context/userContext';
import { addFriend } from '../../firebase/firestore';
import styles from '../../styles/components/friend-add.module.css';

export default function FriendAdd(props) {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
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
            onClick={() => {
              console.log('attempting friend request');
              const result = addFriend(currentUser, displayName);

              if (!result) {
                setMessage('User does not exist');
              }
            }}
            className={styles['button']}
          >
            Send Request
          </button>
        </div>
        <div
          className={
            message === ''
              ? `${styles['hidden']} ${styles['error-message']}`
              : styles['error-message']
          }
        >{`${message}`}</div>
      </div>
    </>
  );
}
