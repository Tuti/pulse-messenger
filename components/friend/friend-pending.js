import styles from '../../styles/components/friend-pending.module.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import PendingUsercard from './friend-pending-usercard';

export default function FriendPending(props) {
  const currentUser = useUser();
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
      return <PendingUsercard key={value.uid} value={value} index={index} />;
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
