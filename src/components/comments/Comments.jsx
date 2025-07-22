import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

function Comments({ createdAt, userName, profilePic, text }) {
  return (
    <Flex gap={4}>
      <Avatar.Root size={"sm"}>
        <Avatar.Fallback name={userName} />
        <Avatar.Image src={profilePic} />
      </Avatar.Root>
      <Flex direction={"colum"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userName}
          </Text>
          <Text fontSize={14}>{text}</Text>
        </Flex>
        <Text fontSize={12} color={"gray.500"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Comments;
