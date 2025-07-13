import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
// import { useNavigate } from "react-router-dom";

function Signup() {
  // const navigate=useNavigate("")
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      alert("OK")
      console.log("Clicked")
    } catch (error) {
      alert(error.message)

    }
  };
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

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
    </>
  );
}

export default Signup;
