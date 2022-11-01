
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return(
    <div className={styles['container']}>
      <Navbar showLogin={false}/>
    </div>
  )
}