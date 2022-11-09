import {
  query,
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { app } from './firebase';

export const db = getFirestore(app);

export async function storeUser(userCred, displayName) {
  try {
    await setDoc(doc(db, 'users', `${displayName}`), {
      displayName: displayName,
      uid: userCred.user.uid,
      email: userCred.user.email,
      timestamp: serverTimestamp(),
      pendingFriends: [],
      friends: [],
    });
    console.log('stored user');
  } catch (e) {
    console.log(e);
  }
}

export async function userExists(displayName) {
  let user = '';
  const usersRef = collection(db, 'users');
  const displayNameQuery = query(
    usersRef,
    where('displayName', '==', `${displayName}`)
  );

  const snapshot = await getDocs(displayNameQuery);
  if (snapshot.empty) {
    console.log('user does not exist');
    return false;
  } else {
    snapshot.forEach((doc) => {
      if (doc.data().displayName === displayName) {
        console.log(displayName);
        user = doc.data();
      }
    });
    return user;
  }
}

export async function isEmailUsed(email) {
  const usersRef = collection(db, 'users');
  const emailQuery = query(usersRef, where('email', '==', `${email}`));
  const snapshot = await getDocs(emailQuery);

  console.log('checking email');
  if (snapshot.empty) {
    console.log('snapshot is empty');
    return false;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
    return true;
  }
}

export async function addFriend(currentUser, displayName) {
  const user = await userExists(displayName);
  if (!user.uid) {
    console.log('failed user exists');
    return false;
  }

  await setDoc(
    doc(db, 'users', `${currentUser.displayName}`),
    {
      pendingFriends: [
        ...user.pendingFriends,
        { uid: user.uid, displayName: user.displayName },
      ],
    },
    { merge: true }
  );
}

export async function getFriendList(currentUser) {
  const snapshot = await getDocs(
    collection(db, 'users', `${currentUser.displayName}`, 'friends')
  );

  if (snapshot.empty) {
    console.log('empty friend list');
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id);
    });
  }
}

export async function getPendingFriendRequests(currentUser) {
  const snapshot = await getDocs(
    collection(db, 'users', `${currentUser.displayName}`, 'pending-friends')
  );

  if (snapshot.empty) {
    console.log('empty pending requests list');
    return false;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }
}
