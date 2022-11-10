import FriendAdd from './friend-add';
import FriendNavbar from './friend-nav-bar';
import FriendPending from './friend-pending';
import { useState } from 'react';
import FriendList from './friend-list';

export default function Friends(props) {
  const [activePanel, setActivePanel] = useState('all-list');

  return (
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === 'all-list' && <FriendList />}
      {activePanel === 'pending' && <FriendPending />}
      {activePanel === 'blocked' && <>{'blocked todo'}</>}
      {activePanel === 'add-friend' && <FriendAdd />}
    </>
  );
}
