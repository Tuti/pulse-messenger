import styles from '../../styles/components/friend-pending.module.css';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

export default function FriendPending(props) {
  const currentUser = useUser();
  const displayName = currentUser.displayName;
  const [data, setData] = useState();

  useEffect(() => {
    const q = query(
      collection(db, 'users', `${displayName}`, 'pending-friends')
    );
  }, []);

  return (
    <>
      <div className={styles['container']}></div>
    </>
  );
}
