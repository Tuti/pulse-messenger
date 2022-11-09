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
      userDetails: {
        displayName: displayName,
        uid: userCred.user.uid,
        email: userCred.user.email,
        timestamp: serverTimestamp(),
      },
      friends: {
        actual: [],
        blocked: [],
        pendingSent: [],
        pendingReceived: [],
      },
    });
    console.log('stored user');
  } catch (e) {
    console.log(e);
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

export async function userExists(displayName) {
  let user = '';
  const usersRef = collection(db, 'users');
  const displayNameQuery = query(
    usersRef,
    where('userDetails.displayName', '==', `${displayName}`)
  );

  const snapshot = await getDocs(displayNameQuery);
  if (snapshot.empty) {
    console.log('userExists(): false');
    return false;
  } else {
    snapshot.forEach((doc) => {
      user = doc.data();
    });
    return user;
  }
}

export async function addFriend(currentUser, displayName) {
  //allows us to get current user data
  const requestingUser = await userExists(currentUser.displayName);
  const receivingUser = await userExists(displayName);

  //Checks if user exists before proceeding
  if (!receivingUser) {
    return false;
  }

  receivingUser.friends.pendingReceived.forEach((index) => {
    if (index.uid === requestingUser.userDetails.uid) {
      return true;
    }
  });
  // const temp = receivingUser.friends.pendingReceived;
  // console.log({ temp });

  //Adds friend request to requesting user
  await setDoc(
    doc(db, 'users', `${requestingUser.userDetails.displayName}`),
    {
      friends: {
        actual: [...requestingUser.friends.actual],
        blocked: [...requestingUser.friends.blocked],
        pendingReceived: [...requestingUser.friends.pendingReceived],
        pendingSent: [
          ...requestingUser.friends.pendingSent,
          {
            uid: receivingUser.userDetails.uid,
            displayName: receivingUser.userDetails.displayName,
          },
        ],
      },
    },
    { merge: true }
  );

  //Adds friend request to receiving user
  await setDoc(
    doc(db, 'users', `${receivingUser.userDetails.displayName}`),
    {
      friends: {
        actual: [...receivingUser.friends.actual],
        blocked: [...receivingUser.friends.blocked],
        pendingSent: [...receivingUser.friends.pendingSent],
        pendingReceived: [
          ...receivingUser.friends.pendingReceived,
          {
            uid: requestingUser.userDetails.uid,
            displayName: requestingUser.userDetails.displayName,
          },
        ],
      },
    },
    { merge: true }
  );

  return true;
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
