import { useState } from 'react';
import styles from '../styles/components/friend.module.css';
import AddFriend from './add-friend';
import FriendNavbar from './friend-nav-bar';

export default function Friend(props) {
  const [activePanel, setActivePanel] = useState('all-list');

  return(
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === 'all-list' &&
        <>
          <div className={styles['search']}>
            <input id={styles['search']} placeholder={'Search'}/>
          </div>
          <ul className={styles['list']}>
            {/* GET FRIENDS LIST AND RENDER HERE*/}
          </ul>
        </>
      }
      {activePanel === 'pending' &&
        <>

        </>
      }
      {activePanel === 'add-friend' &&
        <AddFriend />
      }
    </>
  )
}