import styles from "../../styles/components/chat-messages.module.css";
import { useUser } from "../../context/userContext";

export default function ChatMessages() {
  const currentUser = useUser();

  //IF LOGGED IN TO ACCOUNT OTHER THAN TUTI
  //WILL NOT WORK CORRECTLY
  //REMEMBER
  const testMessages = [
    {
      displayName: "user1",
      message: "this is a test message",
      timestamp: "7:00am",
    },
    {
      displayName: "tuti",
      message:
        "this is a test message this is a test message this is a test message this is a test message this is a test message this is a test message this is a test message ",
      timestamp: "7:00am",
    },
    {
      displayName: "user1",
      message: "this is a test message",
      timestamp: "7:00am",
    },
    {
      displayName: "tuti",
      message: "this is a test message",
      timestamp: "7:00am",
    },
  ];

  const chatHistory = testMessages.map((value, index) => {
    if (value.displayName !== currentUser.displayName) {
      return (
        <div key={index} className={styles["received"]}>
          <div className={`${styles["wrapper"]} ${styles["received-bg"]}`}>
            <div className={styles["sub-heading"]}>
              <div className={styles["displayName"]}>{value.displayName}</div>
              <div className={styles["date"]}>{value.timestamp}</div>
            </div>
            <div className={styles["message-content"]}>{value.message}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className={styles["sent"]}>
          <div className={`${styles["wrapper"]} ${styles["sent-bg"]}`}>
            <div className={styles["sub-heading"]}>
              <div className={styles["displayName"]}>{value.displayName}</div>
              <div className={styles["date"]}>{value.timestamp}</div>
            </div>
            <div className={styles["message-content"]}>{value.message}</div>
          </div>
        </div>
      );
    }
  });
  return <div className={styles["container"]}>{chatHistory}</div>;
}
