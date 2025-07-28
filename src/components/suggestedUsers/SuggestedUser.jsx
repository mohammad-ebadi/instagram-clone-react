// import { Flex, Avatar, Button, VStack, Box } from "@chakra-ui/react";
// import React, { useState } from "react";

// function SuggestedUser({ username, avatar, followers }) {
//   const [isFollow, setIsFollow] = useState(false);
//   return (
//     <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
//       <Flex alignItems={"center"} gap={4} pr={5}>
//         <Avatar.Root size={"sm"}>
//           <Avatar.Fallback name={username} />
//           <Avatar.Image src={avatar} />
//         </Avatar.Root>
//       </Flex>
//       <Flex>
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


import { HStack, Avatar, VStack, Text } from "@chakra-ui/react";

function SuggestedUser({ userName, avatar, followersCount, fullName }) {
  return (
    <HStack w="full" justify="space-between">
      <HStack>
        {/* <Avatar size="sm" name={fullName} src={avatar} /> */}
        <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={fullName} />
            <Avatar.Image src={avatar} />
          </Avatar.Root>
        <VStack spacing={0} align="start">
          <Text fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {followersCount} followers
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}

export default SuggestedUser;