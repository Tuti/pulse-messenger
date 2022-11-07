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
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export async function storeUser(userCred, displayName) {
  try {
    await setDoc(doc(db, "users", `${displayName}`), {
      displayName: displayName,
      uid: userCred.user.uid,
      email: userCred.user.email,
      timestamp: serverTimestamp(),
    });
    console.log("stored user");
  } catch (e) {
    console.log(e);
  }
}

export async function userExists(displayName) {
  const usersRef = collection(db, "users");
  const displayNameQuery = query(
    usersRef,
    where("displayName", "==", `${displayName}`)
  );
  const snapshot = await getDocs(displayNameQuery);

  console.log("checking displayname");
  if (snapshot.empty) {
    console.log("snapshot is empty");
    return false;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    return true;
  }
}

export async function isEmailUsed(email) {
  const usersRef = collection(db, "users");
  const emailQuery = query(usersRef, where("email", "==", `${email}`));
  const snapshot = await getDocs(emailQuery);

  console.log("checking email");
  if (snapshot.empty) {
    console.log("snapshot is empty");
    return false;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    return true;
  }
}

export async function addFriend(user, displayName) {
  const usersRef = collection(db, "users");
  const idQuery = query(usersRef, where("displayName", "==", `${displayName}`));
  const id_snapshot = await getDocs(idQuery);

  let friend_uid = "";

  if (id_snapshot.empty) {
    console.log("empty snapshot");
    return;
  } else {
    id_snapshot.forEach((doc) => {
      friend_uid = doc.data().uid;
    });
  }

  await setDoc(
    doc(
      db,
      "users",
      `${user.displayName}`,
      "pending-friends",
      `${displayName}`
    ),
    {
      displayName: displayName,
      uid: friend_uid,
    }
  );
}

export async function getFriendList(currentUser) {
  const snapshot = await getDocs(
    collection(db, "users", `${currentUser.displayName}`, "friends")
  );

  if (snapshot.empty) {
    console.log("empty friend list");
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log(doc.id);
    });
  }
}
