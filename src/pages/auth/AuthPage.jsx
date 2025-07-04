import AuthForm from "@/components/authForm/AuthForm";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";

function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4} >
      <Container maxW={"container.md"} padding={0} >
        <Flex justifyContent={"center"} alignItems={"center"} gap={10} >
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone image"></Image>
          </Box>

          <VStack align={"stretch"}>
            <AuthForm></AuthForm>
            <Box textAlign={"center"}>Get the App</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={10} alt="Playstore logo"></Image>
              <Image src="/microsoft.png" h={10} alt="Microsoft logo"></Image>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
