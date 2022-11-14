import { useEffect } from 'react';
import styles from '../../styles/components/friend-list.module.css';
export default function FriendList() {
  return (
    <>
      <div className={styles['search']}>
        <input id={styles['search']} placeholder={'Search'} />
      </div>
      <ul className={styles['list']}></ul>
    </>
  );
}
