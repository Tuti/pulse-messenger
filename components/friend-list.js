import styles from '../styles/components/friend-list.module.css';

export default function FriendList() {
  return(
    <>
      <div className={styles['search-wrapper']}>
        <h1 id={styles['heading']}>Search</h1>
        <input id={styles['search']}/>
      </div>
      <ul className={styles['list']}>
        
      </ul>
    </>
    
  )
}
