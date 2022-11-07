import { useState } from 'react';
import styles from '../../styles/components/add-friend.module.css';

export default function AddFriend() {
  const [username, setUsername] = useState('');

  function handleClick() {}
  return (
    <>
      <div className={styles['search']}>
        <input
          id={styles['search']}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder={'Enter a username'}
        />
        <button onClick={handleClick} className={styles['button']}>
          Send Request
        </button>
      </div>
    </>
  );
}
