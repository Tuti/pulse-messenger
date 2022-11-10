import {
  query,
  doc,
  getFirestore,
  setDoc,
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

export async function getUser(displayName) {
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

export async function sendFriendRequest(currentUser, displayName) {
  //allows us to get current user data
  const requestingUser = await getUser(currentUser.displayName);
  const receivingUser = await getUser(displayName);

  //Checks if user exists before proceeding
  if (!receivingUser) {
    return false;
  }

  //check if receieving user already has a
  //request from requesting user
  for (const element of receivingUser.friends.pendingReceived) {
    if (element.uid === requestingUser.userDetails.uid) {
      console.log('already requested');
      return true;
    }
  }

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

export async function acceptFriendRequest(index, currentUser, requestingUser) {
  //currentuser and requestinguser are
  //expected to be their displayNames
  const receivingUserData = await getUser(currentUser);
  const requestingUserData = await getUser(requestingUser);

  //Accepts request on receiving user end
  let pendingReceived = receivingUserData.friends.pendingReceived;
  let friends = receivingUserData.friends.actual;
  let friend = pendingReceived[index];

  if (!receivingUserData && !requestingUserData) {
    return false;
  }

  //Removes pending friend request
  pendingReceived.splice(index, 1);
  friends.push(friend);

  await setDoc(
    doc(db, 'users', `${currentUser}`),
    {
      friends: {
        actual: [...friends],
        blocked: [...receivingUserData.friends.blocked],
        pendingSent: [...receivingUserData.friends.pendingSent],
        pendingReceived: [...pendingReceived],
      },
    },
    { merge: true }
  );

  //Moves pending request to actual friends list
  //on sending user, updates actual and pendingSent
  let pendingSentIndex = -1;
  let pendingSent = requestingUserData.friends.pendingSent;
  friends = requestingUserData.friends.actual;
  for (let i = 0; i < pendingSent.length; i++) {
    if (pendingSent[i].displayName === currentUser) {
      friends.push(friend);
      pendingSent.splice(pendingSentIndex, 1);
    }
  }

  await setDoc(
    doc(db, 'users', `${requestingUser}`),
    {
      friends: {
        actual: [...friends],
        blocked: [...requestingUserData.friends.blocked],
        pendingSent: [...pendingSent],
        pendingReceived: [...requestingUserData.friends.pendingReceived],
      },
    },
    { merge: true }
  );

  return true;
}
