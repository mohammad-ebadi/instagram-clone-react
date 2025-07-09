import React from "react";
import FeedPostHeader from "./FeedPostHeader";
import { Box, Image } from "@chakra-ui/react";
import FeedPostFooter from "./FeedPostFooter";
function FeedPost() {
  return (
    <Box  borderRadius={10}  boxShadow={"0 0 10px"}>
      <FeedPostHeader></FeedPostHeader>
      <Image src="/img6.png"></Image>
      <FeedPostFooter></FeedPostFooter>
    </Box>
  );
}

export default FeedPost;
