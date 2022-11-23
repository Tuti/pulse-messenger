import styles from '../../styles/components/chats-list.module.css';
import ChatTilePreview from './chat-tile-preview';
import { BsChatDots } from 'react-icons/bs';

export default function ChatsList(props) {
  const chatTiles = props.chats.map((chat, index) => {
    return (
      <ChatTilePreview
        key={index}
        chat={chat}
        tileIndex={index}
        isActive={index === props.activeIndex}
        updateActivePanel={props.updateActivePanel}
        setActiveIndex={props.setActiveIndex}
        setCurrentChat={props.setCurrentChat}
      />
    );
  });

  function handleNewChatClick() {
    props.updateActivePanel('chatNew');
  }

  function handleFriendClick() {
    props.updateActivePanel('friendList');
  }

  return (
    <>
      <div className={styles['tiles']}>
        <div className={styles['buttons']}>
          <button onClick={handleNewChatClick} className={styles['start-chat']}>
            <BsChatDots size={'1.5rem'} />
          </button>
          <button onClick={handleFriendClick} className={styles['friends']}>
            {'Friends'}
          </button>
        </div>
        {chatTiles.length == 0 && (
          <div className={styles['empty-list']}>{'no messages yet... :('}</div>
        )}
        {chatTiles.length > 0 && <>{chatTiles}</>}
      </div>
    </>
  );
}
