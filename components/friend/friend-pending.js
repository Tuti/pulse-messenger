import styles from '../../styles/components/friend-pending.module.css';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

export default function FriendPending(props) {
  const currentUser = useUser();
  const displayName = currentUser.displayName;
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'users', `${currentUser.displayName}`),
      (doc) => {
        console.log(doc.data());
        setUserData(doc.data());
      }
    );

    return () => unsubscribe();
  }, []);

  const pendingRequestsReceived = userData?.friends.pendingReceived.map(
    (value, index) => {
      console.log({ value });
      return (
        <div key={value.uid}>
          <div>{value.displayName}</div>
        </div>
      );
    }
  );
  return (
    <>
      <div className={styles['container']}>{pendingRequestsReceived}</div>
    </>
  );
}
