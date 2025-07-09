import FeedPosts from "@/components/feedPosts/FeedPosts";
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
          bg={"red.200"}
          flex={3}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300"}
        >
          <h1>Suggested user</h1>
        </Box>
      </Flex>
    </Container>
  );
}

export default Home;
