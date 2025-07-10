import FeedPosts from "@/components/feedPosts/FeedPosts";
import SuggestedUsers from "@/components/suggestedUsers/SuggestedUsers.jsx";
import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";

function Home() {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts></FeedPosts>
        </Box>

        <Box
          flex={1}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300"}
        >
          <SuggestedUsers></SuggestedUsers>
        </Box>
      </Flex>
    </Container>
  );
}

export default Home;
