import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../config/firebase.jsx"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data , setData] = useState(null)

  useEffect(()=>{
    const ref = collection(db,"user")
    getDocs(ref)
     .then((snapshot)=>{
      console.log(snapshot)
     })
  },[])

  const handleSave = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };
  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handleSave(e);
          }}
        >
          <input
            type="email"
            placeholder="Email..."
            required
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}
