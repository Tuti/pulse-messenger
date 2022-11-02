import styles from '../styles/pages/Home.module.css';
import Navbar from '../components/navbar';
import Chat from '../components/chat';

export default function Home() {
  return(
    <div className={styles['container']}>
      <Navbar showLogin={false}/>
      <Chat />
    </div>
  )
}