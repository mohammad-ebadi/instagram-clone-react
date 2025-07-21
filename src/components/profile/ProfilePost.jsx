import React from "react";
import { Button, Flex, GridItem, Text } from "@chakra-ui/react";
import { CommentLogo, NotificationsLogo } from "@/assets/constants";

function ProfilePost({ img }) {
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        position={"relative"}
        aspectRatio={1 / 1}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.500"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <NotificationsLogo></NotificationsLogo>
              <Text fontWeight={"bold"} ml={2}>7</Text>
            </Flex>
            <Flex>
              <CommentLogo></CommentLogo>
              <Text fontWeight={"bold"} ml={2}>9</Text>
            </Flex>
          </Flex>
        </Flex>
        <img src={img} alt="" />
      </GridItem>
    </>
  );
}

export default ProfilePost;
