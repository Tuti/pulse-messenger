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
  const emailQuery = query(
    usersRef,
    where('userDetails.email', '==', `${email}`)
  );
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

export async function sendFriendRequest(
  currentUserData,
  receivingUserDisplayName
) {
  //allows us to get current user data
  const receivingUserData = await getUser(receivingUserDisplayName);

  //Checks if user exists before proceeding
  if (!receivingUserData) {
    return { success: false, message: 'User does not exist' };
  }

  if (currentUserData.userDetails.displayName === receivingUserDisplayName) {
    return {
      success: false,
      message: "You can't send a friend request to yourself!",
    };
  }
  //check if receieving user already has a
  //request from requesting user
  for (const element of receivingUserData.friends.pendingReceived) {
    if (element.uid === currentUserData.userDetails.uid) {
      return {
        success: false,
        message: 'You have already sent a request to this user',
      };
    }
  }

  //Adds friend request to requesting user
  await setDoc(
    doc(db, 'users', `${currentUserData.userDetails.displayName}`),
    {
      friends: {
        ...currentUserData.friends,

        pendingSent: [
          ...currentUserData.friends.pendingSent,
          {
            uid: receivingUserData.userDetails.uid,
            displayName: receivingUserData.userDetails.displayName,
          },
        ],
      },
    },
    { merge: true }
  );

  //Adds friend request to receiving user
  await setDoc(
    doc(db, 'users', `${receivingUserData.userDetails.displayName}`),
    {
      friends: {
        ...receivingUserData.friends,
        pendingReceived: [
          ...receivingUserData.friends.pendingReceived,
          {
            uid: currentUserData.userDetails.uid,
            displayName: currentUserData.userDetails.displayName,
          },
        ],
      },
    },
    { merge: true }
  );

  return {
    success: true,
    message: `Success! test Sent friend request to ${receivingUserData.userDetails.displayName}.`,
  };
}

export async function acceptFriendRequest(
  index,
  currentUserData,
  requestingUserDisplayName
) {
  //(current logged in) userData is supplied by the
  //ongoing subscription to firestore and is expected to
  //be valid
  //requestingUser is expected to be the displayName
  //of requesting user. This will be used
  //to get their data and confirm they exists.
  const requestingUserData = await getUser(requestingUserDisplayName);

  //Accepts request on receiving user end
  let pendingReceived = currentUserData.friends.pendingReceived;
  let friends = currentUserData.friends.actual;
  let friend = pendingReceived[index];

  if (!requestingUserData) {
    return false;
  }

  //Removes pending friend request
  pendingReceived.splice(index, 1);
  friends.push(friend);

  await setDoc(
    doc(db, 'users', `${currentUserData.userDetails.displayName}`),
    {
      friends: {
        ...currentUserData.friends,
        actual: [...friends],
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
  friend = {
    uid: currentUserData.userDetails.uid,
    displayName: currentUserData.userDetails.displayName,
  };

  for (let i = 0; i < pendingSent.length; i++) {
    if (
      pendingSent[i].displayName === currentUserData.userDetails.displayName
    ) {
      friends.push(friend);
      pendingSent.splice(pendingSentIndex, 1);
      break;
    }
  }

  await setDoc(
    doc(db, 'users', `${requestingUserData.userDetails.displayName}`),
    {
      friends: {
        ...requestingUserData.friends,
        actual: [...friends],
        pendingSent: [...pendingSent],
      },
    },
    { merge: true }
  );

  return true;
}

export async function declineFriendRequest(
  index,
  currentUserData,
  requestingUser
) {
  const requestingUserData = await getUser(requestingUser);

  if (
    !requestingUserData ||
    currentUserData.friends.pendingReceived[index].displayName !==
      requestingUser
  ) {
    return false;
  }

  //Beginning of updating curretUserData
  //Removes requesting user from pending requests
  let pendingReceived = currentUserData.friends.pendingReceived;
  pendingReceived.splice(index, 1);

  await setDoc(
    doc(db, 'users', `${currentUserData.userDetails.displayName}`),
    {
      friends: {
        ...currentUserData.friends,
        pendingReceived: [...pendingReceived],
      },
    },
    { merge: true }
  );

  //Beginning of updating requestingUserData
  let pendingSent = requestingUserData.friends.pendingSent;
  for (let i = 0; i < pendingSent.length; i++) {
    if (
      pendingSent[i].displayName === currentUserData.userDetails.displayName
    ) {
      pendingSent.splice(i, 1);
      break;
    }
  }
  console.log({ pendingSent });
  await setDoc(
    doc(db, 'users', `${requestingUserData.userDetails.displayName}`),
    {
      friends: {
        ...requestingUserData.friends,
        pendingSent: [...pendingSent],
      },
    },
    { merge: true }
  );

  return true;
}
