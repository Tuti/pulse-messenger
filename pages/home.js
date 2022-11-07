import styles from "../styles/pages/Home.module.css";
import Navbar from "../components/navbar";
import Chat from "../components/chat";
import { useUser } from "../context/userContext";

export default function Home() {
  const currentUser = useUser();

  return (
    <>
      {!currentUser && (
        <div className={styles["container"]}>
          {/* TODO LOADING ANIMATION */}
        </div>
      )}
      {currentUser && (
        <div className={styles["container"]}>
          <Navbar showLogin={false} />
          <Chat />
        </div>
      )}
    </>
  );
}
