import { Flex, Avatar, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import useAuthStore from "../../store/useAuthStore.js";
import EditProfile from "./EditProfile.jsx";
import AddPost from "../sidebar/AddPost.jsx";
import Search from "../sidebar/Search.jsx";

function ProfileHeader() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <Flex gap={{ base: 4, sm: 10 }} direction={{ base: "column", sm: "row" }}>
      <Avatar.Root size={"2xl"}>
        <Avatar.Fallback name={user?.userName} />
        <Avatar.Image src={user.profilePicURL} />
      </Avatar.Root>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>{user?.userName}</Text>
          <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
            <EditProfile></EditProfile>
            <AddPost></AddPost>
            <Search></Search>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user?.posts}
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user?.followers.length}
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {user?.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user?.fullName}
          </Text>
        </Flex>

        <Text fontSize={"sm"}>{user?.bio}</Text>
      </VStack>
    </Flex>
  );
}

export default ProfileHeader;
