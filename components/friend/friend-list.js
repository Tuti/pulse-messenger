import styles from '../../styles/components/friend.module.css';
import FriendAdd from './friend-add';
import FriendNavbar from './friend-nav-bar';
import FriendPending from './friend-pending';
import { useState } from 'react';

export default function FriendList(props) {
  const [activePanel, setActivePanel] = useState('all-list');

  return (
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === 'all-list' && (
        <>
          <div className={styles['search']}>
            <input id={styles['search']} placeholder={'Search'} />
          </div>
          <ul className={styles['list']}>
            {/* GET FRIENDS LIST AND RENDER HERE*/}
          </ul>
        </>
      )}
      {activePanel === 'pending' && <FriendPending />}
      {activePanel === 'blocked' && <>{'blocked todo'}</>}
      {activePanel === 'add-friend' && <FriendAdd />}
    </>
  );
}
