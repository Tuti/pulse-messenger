import { useState } from "react";
import styles from "../styles/components/friend.module.css";
import AddFriend from "./friend/add-friend";
import FriendNavbar from "./friend/friend-nav-bar";

export default function Friend(props) {
  const [activePanel, setActivePanel] = useState("all-list");

  return (
    <>
      <FriendNavbar setActivePanel={setActivePanel} />
      {activePanel === "all-list" && (
        <>
          <div className={styles["search"]}>
            <input id={styles["search"]} placeholder={"Search"} />
          </div>
          <ul className={styles["list"]}>
            {/* GET FRIENDS LIST AND RENDER HERE*/}
          </ul>
        </>
      )}
      {activePanel === "pending" && <>{"pending todo"}</>}
      {activePanel === "blocked" && <>{"blocked todo"}</>}
      {activePanel === "add-friend" && <AddFriend />}
    </>
  );
}
