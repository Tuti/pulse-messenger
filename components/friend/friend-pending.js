import styles from '../../styles/components/friend-pending.module.css';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { BsFillEmojiDizzyFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

export default function FriendPending(props) {
  const currentUser = useUser();
  const displayName = currentUser.displayName;
  const [userData, setUserData] = useState();

  useEffect(() => {
    //MIGHT WANT TO MOVE THIS TO FRIEND PANEL INSTEAD OF HERE
    const unsubscribe = onSnapshot(
      doc(db, 'users', `${currentUser.displayName}`),
      (doc) => {
        setUserData(doc.data());
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const pendingRequestsReceived = userData?.friends.pendingReceived.map(
    (value, index) => {
      return (
        <div key={value.uid} className={styles['user-card']}>
          <div className={styles['profile-icon']}>
            {value.displayName.charAt(0)}
          </div>
          <div className={styles['user-info']}>{value.displayName}</div>
        </div>
      );
    }
  );
  return (
    <div className={styles['container']}>
      {!pendingRequestsReceived && <></>}
      {pendingRequestsReceived && (
        <>
          <h2
            className={styles['sub-heading']}
          >{`Pending - ${pendingRequestsReceived?.length}`}</h2>
          <div className={styles['requests']}>{pendingRequestsReceived}</div>
        </>
      )}
    </div>
  );
}
