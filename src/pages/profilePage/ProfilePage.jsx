import ProfileHeader from "@/components/profile/ProfileHeader";
import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import ProfileTabs from "../../components/profile/ProfileTabs.jsx";
import ProfilePosts from "../../components/profile/ProfilePosts.jsx";

function ProfilePage() {
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <ProfileHeader></ProfileHeader>
      </Flex>

      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        direction={"column"}
      >
        <ProfileTabs></ProfileTabs>
        <ProfilePosts></ProfilePosts>
      </Flex>
    </Container>
  );
}

export default ProfilePage;
