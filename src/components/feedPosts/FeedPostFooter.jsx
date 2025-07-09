import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const FeedPostFooter = () => {
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
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"auto"}>
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
        userName{""}
        <Text as={"span"} fontWeight={400}>
          Feeling Good
        </Text>
      </Text>
      <Text>View all 1,000 comments</Text>
    </>
  );
};

export default FeedPostFooter;
