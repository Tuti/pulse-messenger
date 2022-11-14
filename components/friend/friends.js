import FriendAdd from './friend-add';
import FriendNavbar from './friend-nav-bar';
import FriendPending from './friend-pending';
import FriendList from './friend-list';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firestore';

export default function Friends(props) {
  const currentUser = useUser();
  const [activePanel, setActivePanel] = useState('all-list');
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'users', `${currentUser.displayName}`),
      (doc) => {
        setUserData(doc.data());
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === 'all-list' && <FriendList userData={userData} />}
      {/* may want to consider just passing exact data, ex: pendingReceived */}
      {activePanel === 'pending' && <FriendPending userData={userData} />}
      {activePanel === 'blocked' && <>{'blocked TODO'}</>}
      {activePanel === 'add-friend' && <FriendAdd userData={userData} />}
    </>
  );
}
