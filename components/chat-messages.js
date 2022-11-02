
import styles from '../styles/components/chat-messages.module.css';
import { useUser } from '../context/userContext';

export default function ChatMessages() {

  const currentUser = useUser();

  const testMessages = [
    {
      displayName: 'user1',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      displayName: 'tuti',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      displayName: 'user1',
      message: 'this is a test message',
      timestamp: '7:00am'
    },
    {
      displayName: 'tuti',
      message: 'this is a test message',
      timestamp: '7:00am'
    }
  ];

  const displayMessages = testMessages.map((value, index) => {

    const style_sent = ''
    const style_recieved = '';

    if(value.displayName !== currentUser.displayName) {
      return (
        <div key={index}>
          
        </div>
      )
    }
  }) 
  return(
    <div></div>
  )
}