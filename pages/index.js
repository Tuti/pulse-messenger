import styles from '../styles/pages/Landing-Page.module.css'
import Navbar from '../components/navbar';
import Head from 'next/head'
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useUser } from '../context/userContext';

export default function LandingPage() {
  const router = useRouter();
  const user = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('msg');

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then(console.log('logged in'))
      .then(router.push('/home'))
      .catch((error) => {
        setMessage(error.code);
      });
  }

  if(user) {
    router.push('/home');
  }
  
  return (
    <div className={styles['container']}>
      <Head>
        <title>Pulse Messenger</title>
        <meta name="Pulse messenger built with next.js" content="A online messaging platform"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Navbar showLogin={true}/>
      <main className={styles['main']}>
        <div className={styles['login']}>
          <div className={styles['hero']}>
            <p className={styles['p']}>Stay in touch with Pulse.</p>
          </div>
          <div className={styles['inputs']}>
            <input 
              className={styles['user-input']} 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}} 
              type={'email'} 
              placeholder={'Email'}
            />
            <input 
              className={styles['user-input']} 
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              type={'password'} 
              placeholder={'Password'}/>
            <button className={styles['login-button']} onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className={message === 'msg' ? `${styles['hidden']} ${styles['message']}` : styles['message']}>
          {`${message}`}
        </div>
      </main>
    </div>
  )
}
