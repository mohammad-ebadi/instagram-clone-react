import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function GoogleAuth() {
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
        <Image src="/google.png" w={5} alt="Google logo"></Image>
        <Text mx={2} color={"blue.500"}>
          Login with Google
        </Text>
      </Flex>
    </>
  );
}

export default GoogleAuth;
