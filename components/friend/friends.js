import FriendAdd from './friend-add';
import FriendNavbar from './friend-nav-bar';
import FriendPending from './friend-pending';
import FriendList from './friend-list';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export default function Friends(props) {
  const [activePanel, setActivePanel] = useState('all-list');

  return (
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === 'all-list' && <FriendList userData={props.userData} />}
      {/* may want to consider just passing exact data, ex: pendingReceived */}
      {activePanel === 'pending' && <FriendPending userData={props.userData} />}
      {activePanel === 'blocked' && <>{'blocked TODO'}</>}
      {activePanel === 'add-friend' && <FriendAdd userData={props.userData} />}
    </>
  );
}
