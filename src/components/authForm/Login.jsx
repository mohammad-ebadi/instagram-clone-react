import { Input, Button, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "@/store/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const loginUser = useAuthStore((state)=> state.login);

  const handleSignIn = async () => {
    setErrorMsg("");
  
    try {
      const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      if(userCred){
          alert("Your Signed In successfully ✅.");
      const docRef = doc(firestore , "users",userCred.user.uid)
      const docSnap = await getDoc(docRef)
      localStorage.setItem("user-Info" , JSON.stringify(docSnap.data()))
      loginUser(docSnap.data())
      navigate("/");
      }
      
    } catch (error) {
      // alert(error.message);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMsg("No user found with this email.");
          break;
        case "auth/wrong-password":
          setErrorMsg("The password is incorrect.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Your email is not valid.");
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
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      ></Input>
      <Input
        placeholder="Password"
        fontSize={"14"}
        type="password"
        value={inputs.password}
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
          handleSignIn();
        }}
      >
        Login
      </Button>

      
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </>
  );
}

export default Login;
