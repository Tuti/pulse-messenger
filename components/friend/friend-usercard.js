import styles from '../../styles/components/friend-tile.module.css';

export default function FriendTile(props) {
  const user = '';
  return (
    <div className={styles['user-card']}>
      <div className={styles['user-info']}>
        <div className={styles['profile-icon']}>
          {user.displayName.charAt(0)}
        </div>
        <div className={styles['displayName']}>{user.displayName}</div>
      </div>
    </div>
  );
}
