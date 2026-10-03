import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loader} role="status" aria-label="Loading page">
      <span className={styles.mark} aria-hidden="true" />
    </div>
  );
}
