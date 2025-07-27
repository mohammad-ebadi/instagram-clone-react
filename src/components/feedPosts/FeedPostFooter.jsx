import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants.jsx";
import { Box, Button, Flex, InputGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

const FeedPostFooter = ({username}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };
  return (
    <>
      <Box mb={20}>
        <Flex
          alignItems={"center"}
          gap={4}
          w={"full"}
          pt={0}
          mb={2}
          my={2}
          mt={4}
        >
          <Box onClick={handleLike} cursor={"pointer"}>
            {!liked ? (
              <NotificationsLogo></NotificationsLogo>
            ) : (
              <UnlikeLogo></UnlikeLogo>
            )}
          </Box>

          <Box cursor={"pointer"} fontSize={18}>
            <CommentLogo></CommentLogo>
          </Box>
        </Flex>
        <Text fontWeight={600} fontSize={"sm"}>
          {likes} Likes
        </Text>

        <Text fontSize={"sm"} fontWeight={700}>
          {username}{""}
          <Text as={"span"} fontWeight={400}>
            Feeling Good
          </Text>
        </Text>
        <Text color={"gray.700"}>View all 1,000 comments</Text>
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <Input
            placeholder="Comment ..."
            size={"sm"}
            variant={"flushed"}
            fontSize={14}
          ></Input>
          <Button
            fontSize={14}
            color={"blue.500"}
            background={"white"}
            fontWeight={"bold"}
            _hover={{ color: "black" }}
          >
            Post
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default FeedPostFooter;
