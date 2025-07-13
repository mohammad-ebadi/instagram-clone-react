import { Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);
      alert("Login Ok");
      navigate("/");
    } catch (error) {
      alert(error.message);
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
    </>
  );
}

export default Login;
