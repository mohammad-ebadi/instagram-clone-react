import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import GoogleAuth from "./GoogleAuth.jsx";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack>
          <Image
            src="/logo.png"
            h={24}
            cursor={"pointer"}
            alt="Instagram logo"
          ></Image>
          {isLogin ? <Login></Login> : <Signup></Signup>}

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            my={4}
            gap={1}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
            <Text>Or</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"}></Box>
          </Flex>
          <GoogleAuth></GoogleAuth>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} my={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            color={"blue.500"}
            cursor={"pointer"}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
  
}

export default AuthForm;
