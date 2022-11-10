import styles from '../../styles/components/friend-pending-usercard.module.css';
import { BsX, BsCheck2 } from 'react-icons/bs';
import { acceptFriendRequest } from '../../firebase/firestore';
import { useUser } from '../../context/userContext';
export default function PendingUsercard(props) {
  const currentUser = useUser();
  const requestingUser = props.value;

  return (
    <div className={styles['user-card']}>
      <div className={styles['user-info']}>
        <div className={styles['profile-icon']}>
          {requestingUser.displayName.charAt(0)}
        </div>
        <div className={styles['displayName']}>
          {requestingUser.displayName}
        </div>
      </div>
      <div className={styles['accept-decline-buttons']}>
        <button
          className={styles['accept-button']}
          onClick={async () => {
            console.log('displayname: ', `${currentUser.displayName}`);
            const results = await acceptFriendRequest(
              props.index,
              currentUser.displayName,
              requestingUser.displayName
            );
            console.log({ results });
          }}
        >
          <BsCheck2 size={'1.5rem'} />
        </button>
        <button
          className={styles['decline-button']}
          onClick={async () => {
            declineRequest(props.index);
          }}
        >
          <BsX size={'1.5rem'} />
        </button>
      </div>
    </div>
  );
}
