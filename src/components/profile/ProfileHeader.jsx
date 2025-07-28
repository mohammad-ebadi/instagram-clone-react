import { Flex, Avatar, VStack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore.js";
import { auth, firestore } from "../../config/firebase.jsx";
import { doc, getDoc } from "firebase/firestore";

function ProfileHeader() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          setAuthUser(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);
  const {user} = useAuthStore()
  console.log(user)
  return (
    <Flex gap={{ base: 4, sm: 10 }} direction={{ base: "column", sm: "row" }}>
      <Avatar.Root size={"2xl"}>
        <Avatar.Fallback name={user?.userName} />
        <Avatar.Image src={authUser.profilePicURL } />
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
            <Button h={9} _hover={{ color: "blue.500" }}>
              Edit Profile
            </Button>
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
              {user?.followers}
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
               {user?.following}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
           {user?.fullName}
          </Text>
        </Flex>

        <Text fontSize={"sm"}>
          {user?.bio }
        </Text>
      </VStack>
    </Flex>
  );
}

export default ProfileHeader;
