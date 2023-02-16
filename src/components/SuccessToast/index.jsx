import styles from "./index.module.css";

export const SuccessToast = () => {
  return (
    <div className={styles.toast_container}>
      <span>The username already exists</span>
    </div>
  );
};
