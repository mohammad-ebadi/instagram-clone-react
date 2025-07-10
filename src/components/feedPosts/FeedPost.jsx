import React from "react";
import FeedPostHeader from "./FeedPostHeader";
import { Box, Image } from "@chakra-ui/react";
import FeedPostFooter from "./FeedPostFooter";
function FeedPost({img,username,avatar}) {
  return (
    <Box >
      <FeedPostHeader username={username} avatar={avatar}></FeedPostHeader>
      <Box my={2}>
        <Image src={img} borderRadius={5}></Image>
      </Box>
      <FeedPostFooter username={username}></FeedPostFooter>
    </Box>
  );
}

export default FeedPost;
