// import { Flex, Avatar, Button, VStack, Box } from "@chakra-ui/react";
// import React, { useState } from "react";

// function SuggestedUser({ username, avatar, followers }) {
//   const [isFollow, setIsFollow] = useState(false);
//   return (
//     <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
//       <Flex alignItems={"center"} gap={4}>
//         <Avatar.Root size={"sm"}>
//           <Avatar.Fallback name={username} />
//           <Avatar.Image src={avatar} />
//         </Avatar.Root>

//         <VStack gap={2} alignItems={"flex-start"}>
//           <Box fontSize={12} fontWeight={"bold"}>
//             {username}
//           </Box>
//           <Box fontSize={10} fontWeight={"bold"} color={"gray.500"}>
//             {followers} Followers
//           </Box>
//         </VStack>
//       </Flex>
//       <Button
//         h={6}
//         color={"blue.500"}
//         bg={"white"}
//         _hover={{ color: "orange.400" }}
//         onClick={() => setIsFollow(!isFollow)}
//       >
//         {isFollow ? "Unfollow" : "Follow"}
//       </Button>
//     </Flex>
//   );
// }

// export default SuggestedUser;

import { Flex, Avatar, Box, Text, Button } from "@chakra-ui/react";

const SuggestedUser = ({ user }) => {
  if (!user) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      mb={4}
      p={3}
      borderWidth="1px"
      borderRadius="lg"
      bg="gray.800"
      _hover={{ bg: "gray.700" }}
    >
      <Flex align="center">
        <Avatar src={user.profilePicURL} name={user.fullName} size="md" mr={3} />
        <Box>
          <Text fontWeight="bold" color="white">
            {user.userName}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {user.fullName || "No full name"}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {user.followers?.length || 0} followers
          </Text>
        </Box>
      </Flex>

      {/* اگر خواستی دکمه فالو هم اضافه کن */}
      <Button size="sm" colorScheme="teal">
        View Profile
      </Button>
    </Flex>
  );
};

export default SuggestedUser;