import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { For, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
function SuggestedHeader() {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar.Root size={"sm"}>
          <Avatar.Fallback name="Profile" />
          <Avatar.Image src="/profile.png" />
        </Avatar.Root>
        <Text fontSize={12} fontWeight={"bold"}>
          UserName
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        cursor={"pointer"}
        textDecoration={"none"}
        _hover={{ color: "red.500", transition: "0.2s" }}
        fontWeight="bold"
      >
        Log out
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
