import { query, doc, getFirestore, setDoc, getDoc, getDocs, collection, where, serverTimestamp } from 'firebase/firestore'
import { app } from './firebase';

const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost:8080');

//TODO database stuff

export async function storeUser(userCred, displayName) {
  try {
    await setDoc(doc(db, 'users', `${displayName}`), {
      displayName: displayName,
      uid: userCred.user.uid,
      email: userCred.user.email,
      timestamp: serverTimestamp()
    });
    console.log('stored user');
  } catch (e) {
    console.log(e)
  }
}

export async function isDisplayNameUsed(displayName) {
  const usersRef = collection(db, 'users');
  const displayNameQuery = query(usersRef, where('displayName', '==', `${displayName}`));
  const snapshot = await getDocs(displayNameQuery);

  console.log('checking displayname');
  if(snapshot.empty) {
    console.log('snapshot is empty');
    return false;
  } else {
    snapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
    }) 
    return true;
  }
}

export async function isEmailUsed(email) {
  const usersRef = collection(db, 'users');
  const emailQuery = query(usersRef, where('email', '==', `${email}`));
  const snapshot = await getDocs(emailQuery);

  console.log('checking email');
  if(snapshot.empty) {
    console.log('snapshot is empty');
    return false;
  } else {
    snapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
    }) 
    return true;
  }
}