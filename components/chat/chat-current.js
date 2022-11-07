import styles from '../../styles/components/chat-current.module.css';
import ChatMessages from './chat-messages';
import MessageTile from '../message-tile';

export default function ChatCurrent(props) {
  //TODO: need to switch to this eventually
  // const messages = props.messages;

  return (
    <>
      <div className={styles['message-history']}>
        <ChatMessages />
      </div>
      <div className={styles['input']}>
        <input className={styles['user-input']} />
        <button className={styles['send']}>send</button>
      </div>
    </>
  );
}
