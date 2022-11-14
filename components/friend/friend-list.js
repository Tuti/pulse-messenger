import styles from '../../styles/components/friend-list.module.css';
export default function FriendList(props) {
  const friendCards = props.userData?.friends.actual.map((value, index) => {
    return (
      <div key={value.uid} className={styles['user-card']}>
        <div className={styles['user-info']}>
          <div className={styles['profile-icon']}>
            {value.displayName.charAt(0)}
          </div>
          <div className={styles['displayName']}>{value.displayName}</div>
        </div>
      </div>
    );
  });
  return (
    <div className={styles['list']}>
      <div className={styles['search']}>
        <input id={styles['search']} placeholder={'Search'} />
      </div>
      <h2
        className={styles['sub-heading']}
      >{`Friends - ${friendCards?.length}`}</h2>
      <div className={styles['friend-cards']}>{friendCards}</div>
    </div>
  );
}
