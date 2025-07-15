import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

function Sidebar() {
  const navigate=useNavigate()
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
    <>
      <Box
        h={"100vh"}
        borderRight={"1px solid black"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{ base: 2, md: 4 }}
      >
        <Flex direction={"column"} gap={5} w="full" h={"full"}>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/logo.png"></img>
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/logo2.png"></img>
          </Link>

          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/home.png"></img>
            <p>Home</p>
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/home.png"></img>
          </Link>

          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/search.png"></img>
            <p>Search</p>
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/search.png"></img>
          </Link>

          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/notifications.png"></img>
            <p>Notifications</p>
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/notifications.png"></img>
          </Link>

          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/add.png"></img>
            <p>Add a post</p>
          </Link>
          <Link
            to="/"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <img src="/add.png"></img>
          </Link>

          <Link
            to="/username"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <Avatar.Root>
              <Avatar.Fallback name="Mohammad Ebadi" />
              <Avatar.Image src="/profile.png" />
            </Avatar.Root>
            <p>Profile</p>
          </Link>
          <Link
            to="/username"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
          >
            <Avatar.Root>
              <Avatar.Fallback name="Mohammad Ebadi" />
              <Avatar.Image src="/profile.png" />
            </Avatar.Root>
          </Link>


              {/* logout */}


          <Link
            to="/auth"
            as={RouterLink}
            pl={2}
            display={{ base: "none", md: "block" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
            onClick={()=>{handleLogout()}}
          >
            <img src="/logout.png"></img>
            <p>Logout</p>
          </Link>
          <Link
            to="/auth"
            as={RouterLink}
            pl={2}
            display={{ base: "block", md: "none" }}
            _hover={{ bg: "blackAlpha.500", borderRadius: 10 }}
            onClick={()=>{handleLogout()}}
          >
            <img src="/logout.png"></img>
          </Link>
        </Flex>
      </Box>
    </>
  );
}

export default Sidebar;
