import styles from "../styles/components/message-tile.module.css";

export default function MessageTile(props) {
  return <div className={styles["message"]}>{props.message}</div>;
}
