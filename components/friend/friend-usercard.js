import styles from '../../styles/components/friend-tile.module.css';

export default function FriendTile(props) {
  return (
    <div className={styles['user-card']}>
      <div className={styles['user-info']}>
        <div className={styles['profile-icon']}></div>
        <div className={styles['displayName']}></div>
      </div>
    </div>
  );
}
