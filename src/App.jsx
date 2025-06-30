import styles from "./App.module.css";
export default function App() {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="email" placeholder="Email..." required/>
        <input type="password" placeholder="Password..." required/>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
