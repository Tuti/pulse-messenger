import {
  query,
  doc,
  getFirestore,
  setDoc,
  getDocs,
  collection,
  where,
  serverTimestamp,
  addDoc,
  getDoc,
  updateDoc,
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
    return { success: false, message: 'user does not exist' };
  } else {
    snapshot.forEach((doc) => {
      user = doc.data();
    });
    return { success: true, data: user };
  }
}

export async function sendFriendRequest(
  currentUserData,
  receivingUserDisplayName
) {
  //allows us to get current user data
  const results = await getUser(receivingUserDisplayName);

  //Checks if user exists before proceeding
  if (!results.success) {
    return results;
  }
  const receivingUserData = results.data;

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
  const results = await getUser(requestingUserDisplayName);

  if (!results.success) {
    return results;
  }

  const requestingUserData = results.data;
  //Accepts request on receiving user end
  let pendingReceived = currentUserData.friends.pendingReceived;
  let friends = currentUserData.friends.actual;
  let friend = pendingReceived[index];

  //Removes pending friend request
  pendingReceived.splice(index, 1);
  friends.push(friend);

  //TODO use updateDoc()
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

  //TODO use updateDoc()
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
  const results = await getUser(requestingUser);

  if (
    !results.success ||
    currentUserData.friends.pendingReceived[index].displayName !==
      requestingUser
  ) {
    return requestingUserData;
  }

  const requestingUserData = results.data;
  //Beginning of updating curretUserData
  //Removes requesting user from pending requests
  let pendingReceived = currentUserData.friends.pendingReceived;
  pendingReceived.splice(index, 1);

  //TODO use updateDoc()
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

  //TODO use updateDoc()
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

export async function startNewChat(currentUserData, otherUserData) {
  //TODO
  //MIGHT BE DEPRECATED
  // const results = await getUser(displayName);
  // if (!results.success) {
  //   return results;
  // }
  // const otherUserData = results.data;

  const users = [
    currentUserData.userDetails.displayName,
    otherUserData.userDetails.displayName,
  ];

  const chatRef = await addDoc(collection(db, 'chats'), {
    chatName: '',
    users: [...users],
    messages: [],
  });

  const currentUserChats = new Map(Object.entries(currentUserData.chats));
  currentUserChats.set(otherUserData.userDetails.displayName, {
    chatId: chatRef.id,
    users: [...users],
  });

  //TODO use updateDoc()
  await setDoc(
    doc(db, 'users', `${currentUserData.userDetails.displayName}`),
    {
      chats: Object.fromEntries(currentUserChats),
    },
    { merge: true }
  );

  const otherUserChats = new Map(Object.entries(otherUserData.chats));
  otherUserChats.set(currentUserData.userDetails.displayName, {
    chatId: chatRef.id,
    users: [...users],
  });

  //TODO use updateDoc()
  await setDoc(
    doc(db, 'users', `${otherUserData.userDetails.displayName}`),
    {
      chats: Object.fromEntries(otherUserChats),
    },
    { merge: true }
  );

  return { success: true, id: chatRef.id, message: 'started new chat' };
}

export async function sendMessage(chatId, currentUser, messageContent) {
  const chatRef = doc(db, 'chats', chatId);
  const chatSnap = await getDoc(doc(db, 'chats', chatId));
  if (!chatSnap.exists()) {
    return false;
  }
  const messages = chatSnap.data().messages;

  await updateDoc(chatRef, {
    messages: [
      ...messages,
      {
        user: currentUser.userDetails.displayName,
        message: messageContent,
        timestamp: new Date(),
        readTimeStamp: '',
      },
    ],
  });
  return { success: true };
}
