import styles from '../../styles/components/chat-message-input.module.css';
export default function ChatMessageinput(props) {
  function handleClick() {
    props.send();
  }
  return (
    <div className={styles['input']}>
      <input className={styles['user-input']} />
      <button className={styles['send']} onClick={handleClick}>
        send
      </button>
    </div>
  );
}
