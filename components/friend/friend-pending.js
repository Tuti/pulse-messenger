import styles from '../../styles/components/friend-pending.module.css';
import PendingUsercard from './friend-pending-usercard';

export default function FriendPending(props) {
  const pendingRequestsReceived = props.userData?.friends.pendingReceived.map(
    (value, index) => {
      return (
        <PendingUsercard
          key={value.uid}
          userData={props.userData}
          value={value}
          index={index}
        />
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
