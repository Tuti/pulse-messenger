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
    });
    console.log('stored user');
  } catch (e) {
    console.log(e);
  }
}

export async function userExists(displayName) {
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
        return { uid: doc.data().uid, displayName: doc.data().displayName };
      }
    });
  }

  return false; //should not ever hit
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

  const usersRef = collection(db, 'users');
  const idQuery = query(usersRef, where('displayName', '==', `${displayName}`));
  const idSnapshot = await getDocs(idQuery);
  let friend_uid = '';

  if (idSnapshot.empty) {
    console.log('empty snapshot');
    return;
  } else {
    idSnapshot.forEach((doc) => {
      friend_uid = doc.data().uid;
    });
  }

  await setDoc(
    doc(db, 'users', `${currentUser.displayName}`),
    {
      displayName: displayName,
      uid: friend_uid,
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
