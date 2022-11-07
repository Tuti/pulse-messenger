import styles from "../../styles/components/add-friend.module.css";

export default function AddFriend() {
  return (
    <>
      <div className={styles["search"]}>
        <input id={styles["search"]} placeholder={"Enter a username"} />
        <button className={styles["button"]}>Send Request</button>
      </div>
    </>
  );
}
