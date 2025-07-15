import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function GoogleAuth() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate("");

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (result) {
        const userDoc = {
          uid: result.user.uid,
          email: result.user.email,
          userName: result.user.email.split("@")[0],
          fullName: result.user.displayName,
          bio: "",
          profilePicURL: result.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(firestore, "users", result.user.uid), userDoc);
        localStorage.setItem("user-Info", JSON.stringify(userDoc));
      }

      alert(`Signed in successfully as ${user.displayName}`);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          setErrorMsg(
            "The sign-in popup was closed before completing the sign-in."
          );
          break;
        case "auth/cancelled-popup-request":
          setErrorMsg(
            "Another popup request was already in progress. Please try again."
          );
          break;
        case "auth/network-request-failed":
          setErrorMsg(
            "Network error Please check your connection and try again."
          );
          break;
        default:
          setErrorMsg("Google sign-in failed. Please try again.");
      }
    }
  };
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src="/google.png" w={5} alt="Google logo"></Image>
        <Text
          mx={2}
          color={"blue.500"}
          onClick={() => {
            handleGoogle();
          }}
        >
          Login with Google
        </Text>
      </Flex>
      <p>{errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}</p>
    </>
  );
}

export default GoogleAuth;
