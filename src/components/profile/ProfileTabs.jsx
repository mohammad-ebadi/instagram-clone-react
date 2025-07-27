import {
  CreatePostLogo,
  NotificationsLogo,
  ReelsLogo,
} from "../../assets/constants.jsx";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

function ProfileTabs() {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex
        borderTop={"3px solid black"}
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
        _hover={{ borderTop: "3px solid red" }}
        
      >
        <Box fontSize={20}>
          <CreatePostLogo></CreatePostLogo>
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Posts
        </Text>
      </Flex>

      <Flex
        borderTop={"3px solid black"}
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
        _hover={{ borderTop: "3px solid red" }}
      >
        <Box fontSize={20}>
          <ReelsLogo></ReelsLogo>
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Saved
        </Text>
      </Flex>

      <Flex
        borderTop={"3px solid black"}
        alignItems={"center"}
        p={3}
        gap={1}
        cursor={"pointer"}
        _hover={{ borderTop: "3px solid red" }}
      >
        <Box fontSize={20}>
          <NotificationsLogo></NotificationsLogo>
        </Box>
        <Text fontSize={12} display={{ base: "none", sm: "block" }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
}

export default ProfileTabs;
