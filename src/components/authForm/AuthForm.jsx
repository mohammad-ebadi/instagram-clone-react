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
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleAuth = () => {
    // console.log("inputs", inputs);
    if (!inputs.email || !inputs.password) {
      alert("Please fill the fields");
      return;
    }
    navigate("/");
  };
  return (
    <div>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack>
          <Image
            src="/logo.png"
            h={24}
            cursor={"pointer"}
            alt="Instagram logo"
          ></Image>
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

          {!isLogin ? (
            <Input
              placeholder="Confirm Password"
              fontSize={"14"}
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            ></Input>
          ) : null}
          <Button
            width={"full"}
            colorScheme={"blue"}
            size={"sm"}
            fontSize={14}
            onClick={handleAuth}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
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
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
          >
            <Image src="/google.png" w={5} alt="Google logo"></Image>
            <Text mx={2} color={"blue.500"}>
              Login with Google
            </Text>
          </Flex>
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
    </div>
  );
}

export default AuthForm;
