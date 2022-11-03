import styles from '../styles/components/friend-nav-bar.module.css';

export default function FriendNavbar(props) {
  return(
    <>
      <nav className={styles['top-nav']}>
        {/* TODO CHANGE BG COLOR ON CLICK TO SHOW ACTIVE*/}
        <div 
          className={styles['button']} 
          onClick={() => {props.setActivePanel('all-list')}}
        >
          {'All'}
        </div>
        <div 
          className={styles['button']}
          onClick={() => {props.setActivePanel('pending')}}
        >
          {'Pending'}
        </div>
        <div 
          className={`${styles['button']} ${styles['add-friend-bg']}`}
          onClick={() => {props.setActivePanel('add-friend')}}
        >
          {'Add Friend'}
        </div>
      </nav>
    </>
  )
}