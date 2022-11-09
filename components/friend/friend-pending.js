import styles from '../../styles/components/friend-pending.module.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import { BsX, BsCheck2, BsCheck } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export default function FriendPending(props) {
  const currentUser = useUser();
  const [userData, setUserData] = useState();

  function acceptRequest() {}

  function declineRequest() {}

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
          <div className={styles['user-info']}>
            <div className={styles['profile-icon']}>
              {value.displayName.charAt(0)}
            </div>
            <div className={styles['displayName']}>{value.displayName}</div>
          </div>
          <div className={styles['accept-decline-buttons']}>
            <button onClick={acceptRequest} className={styles['accept-button']}>
              <BsCheck2 size={'1.5rem'} />
            </button>
            <button
              onClick={declineRequest}
              className={styles['decline-button']}
            >
              <BsX size={'1.5rem'} />
            </button>
          </div>
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
