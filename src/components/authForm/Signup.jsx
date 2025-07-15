import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../config/firebase.jsx";
console.log("firestore imported properly")
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate("");

  const [errorMsg, setErrorMsg] = useState("");

  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    setErrorMsg("");

    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.fullName ||
      !inputs.userName
    ) {
      console.log("Please fill all the fields.");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      // if (!newUser && error){
      //   console.log(error)
      //   return
      // }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          userName: inputs.userName,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        console.log("object")
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        console.log("saved to firestore")
        localStorage.setItem("user-Info", JSON.stringify(userDoc));
      }
      alert("Your Account Created successfully ✅.");
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("This email is taken by someone else.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Your email is not valid.");
          break;
        case "auth/weak-password":
          setErrorMsg("Your password must be at least 6 characters long.");
          break;
        default:
          setErrorMsg("An error has occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={"14"}
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      ></Input>

      <Input
        placeholder="Username"
        fontSize={"14"}
        type="text"
        value={inputs.userName}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, userName: e.target.value });
        }}
      ></Input>

      <Input
        placeholder="Full Name"
        fontSize={"14"}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, fullName: e.target.value });
        }}
      ></Input>

      <Input
        placeholder="Password"
        fontSize={"14"}
        type={"text"}
        value={inputs.password}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, password: e.target.value });
        }}
      ></Input>

      <Button
        width={"full"}
        colorScheme={"blue"}
        size={"sm"}
        fontSize={14}
        onClick={() => {
          handleSignup();
        }}
      >
        Sign Up
      </Button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </>
  );
}

export default Signup;
