import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { For, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth ,firestore} from "@/config/firebase";
import { signOut } from "firebase/auth";
import { doc,getDoc } from "firebase/firestore";
import { useEffect,useState } from "react";
function SuggestedHeader() {

  const navigate =  useNavigate()
  const [authUser,setAuthUser]= useState(null)

  useEffect(()=>{
     const fetchUserData = async()=>{
      const currentUser= auth.currentUser;
      if(currentUser){
        const userDocRef = doc(firestore, "users",currentUser.uid)
        const userSnap = await getDoc(userDocRef)
        if(userSnap.exists()){
          setAuthUser(userSnap.data());
        }
      }
     }
     fetchUserData()
  },[])
   
  const handleLogout = async ()=>{
    
    try {
      await signOut(auth)
      localStorage.removeItem("user-Info");
      navigate("/auth")
      
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar.Root size={"sm"}>
          <Avatar.Fallback name="Profile" />
          <Avatar.Image src={authUser.profilePicURL} />
        </Avatar.Root>
        {/* show user name here */}
        <Text fontSize={12} fontWeight={"bold"}>
          {authUser.userName}
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        cursor={"pointer"}
        textDecoration={"none"}
        _hover={{ color: "red.500", transition: "0.2s" }}
        fontWeight="bold"
        onClick={()=>{handleLogout()}}
      >
        Log out
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
