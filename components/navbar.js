import styles from "../styles/components/navbar.module.css";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import { PulseSvg } from "./svgs/Pulse";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar(props) {
  const router = useRouter();
  const user = useUser();

  function handleRoute() {
    if (user) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }

  function handleLogout() {
    if (!user) {
      return;
    }

    signOut(auth);
    router.push("/");
  }

  return (
    <nav className={styles["container"]}>
      <div onClick={handleRoute} className={styles["left"]}>
        <h1 className={styles["title"]}>Pulse</h1>
        <PulseSvg width={"48px"} />
      </div>
      {props.showLogin && (
        <div className={styles["right"]}>
          <button
            onClick={() => {
              router.push("create-account");
            }}
            className={styles["button"]}
          >
            Try Pulse
          </button>
        </div>
      )}
      {user && (
        <div className={styles["right"]}>
          <button onClick={handleLogout} className={styles["button"]}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
