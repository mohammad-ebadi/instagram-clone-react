import React from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.jsx";

export default function Login2() {
  const [text, setText] = useState("");

  const handleText = async (e) => {
    e.preventDefault();
    console.log(text);

    const ref = collection(db, "comment");

    try {
      await addDoc(ref, { text: text });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleText}>
        <input
          type="text"
          required
          placeholder="Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
