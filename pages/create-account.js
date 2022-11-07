import styles from '../styles/pages/Create-Account.module.css';
import Navbar from '../components/navbar';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isEmailUsed, storeUser, userExists } from '../firebase/firestore';

export default function Login() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('msg');

  const router = useRouter();

  async function handleSignUp() {
    // if(email !== confirmEmail) {
    //   setMessage('Email does not match.');
    //   return;
    // }

    const emailUsed = await isEmailUsed(email);
    if (emailUsed) {
      setMessage('Email is already in use');
    }

    if (password !== confirmpass) {
      setMessage('Passwords do not match.');
      return;
    }

    const results = await userExists(displayName);
    if (results) {
      setMessage('Username is already in use.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: displayName });
        storeUser(userCredential, displayName);
      })
      .then(router.push('/home'))
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          setMessage('This account already exists');
          return;
        }
        if (errorCode === 'auth/invalid-email') {
          setMessage('Invalid email');
          return;
        }
        if (errorCode === 'auth/weak-password') {
          setMessage('Password is weak, try again');
          return;
        }
        if (errorCode === 'auth/operation-not-allowed') {
          setMessage('Operation not allowed');
          return;
        }
        setMessage(errorCode);
      });
  }

  return (
    <div className={styles['container']}>
      <Navbar />
      <div className={styles['login-wrapper']}>
        <div className={styles['create-account']}>
          <div className={styles['create-login-form']}>
            <h2 className={styles['header']}>Create Account</h2>
            <input
              className={styles['input']}
              placeholder="username"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              className={styles['input']}
              placeholder="email"
              value={email.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input UNCOMMENT AFTER TESTING
              className={styles['input']} 
              placeholder='verify email' 
              value={email.confirmEmail} 
              onChange={(e) => setEmail({...email, confirmEmail: e.target.value})}
            /> */}
            <input
              className={styles['input']}
              placeholder="password"
              type={'password'}
              value={password.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={styles['input']}
              placeholder="verify password"
              type={'password'}
              value={password.confirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button onClick={handleSignUp}>sign up</button>
          </div>
        </div>
      </div>
      <div
        className={
          message === 'msg'
            ? `${styles['hidden']} ${styles['message']}`
            : styles['message']
        }
      >
        {message}
      </div>
    </div>
  );
}
