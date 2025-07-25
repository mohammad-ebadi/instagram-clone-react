import { Flex, Avatar, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";

function ProfileHeader() {
  return (
    <Flex gap={{ base: 4, sm: 10 }} direction={{ base: "column", sm: "row" }}>
      <Avatar.Root size={"sm"}>
        <Avatar.Fallback name="Profile" />
        <Avatar.Image src={"/profile.png"} />
      </Avatar.Root>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>Username</Text>
          <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
            <Button h={9} _hover={{ color: "blue.500" }}>
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              245
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              34
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              75
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            test lorem ipsoooom
          </Text>
        </Flex>

        <Text fontSize={"sm"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
          aliquam?
        </Text>
      </VStack>
    </Flex>
  );
}

export default ProfileHeader;
