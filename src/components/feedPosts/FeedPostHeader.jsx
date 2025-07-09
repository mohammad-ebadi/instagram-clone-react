import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar, For, HStack } from "@chakra-ui/react";

function FeedPostHeader() {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar.Root size={"sm"}>
          <Avatar.Fallback name="Profile" />
          <Avatar.Image src="/profile.png" />
        </Avatar.Root>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <h3>UserName</h3>
          <Box color={"gray.500"}>
            <h4>.1w</h4>
          </Box>
        </Flex>
      </Flex>

      <Box fontSize={12} cursor={"pointer"} color={"blue.500"} fontWeight={"bold"} _hover={{color:"black"}} transition={"0.2s"}>
        <Text>Unfollow</Text>
      </Box>
    </Flex>
  );
}

export default FeedPostHeader;
