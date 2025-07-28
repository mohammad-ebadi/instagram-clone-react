

// import { Avatar, VStack, Text, Flex, Button } from "@chakra-ui/react";

// function SuggestedUser({
//   userName,
//   avatar,
//   followersCount,
//   fullName,
//   isFollowing,
//   onToggleFollow,
// }) {
//   return (
//     <Flex w="full" justify="space-between" align="center" py={2}>
//       <Flex align="center" gap={3}>
//         {/* <Avatar size="sm" name={fullName} src={avatar} /> */}
//         <Avatar.Root size={"sm"}>
//           <Avatar.Fallback name={fullName} />
//           <Avatar.Image src={avatar} />
//         </Avatar.Root>
//         <VStack spacing={0} align="start">
//           <Text fontSize="sm" fontWeight="bold">
//             {userName}
//           </Text>
//           <Text fontSize="xs" color="gray.500">
//             {followersCount} followers
//           </Text>
//         </VStack>
//       </Flex>
//       <Button
//         size="sm"
//         colorScheme={isFollowing ? "gray" : "blue"}
//         onClick={onToggleFollow}
//       >
//         {isFollowing ? "Unfollow" : "Follow"}
//       </Button>
//     </Flex>
//   );
// }

// export default SuggestedUser;


import { Avatar, VStack, Text, Flex, Button } from "@chakra-ui/react";

function SuggestedUser({ userName, avatar, followersCount, fullName, isFollowing, onToggleFollow }) {
  return (
    <Flex w="full" justify="space-between" align="center" py={2}>
      <Flex align="center" gap={3}>
        {/* Avatar */}
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
      </Flex>

      <Button size="sm" colorScheme={isFollowing ? "gray" : "blue"} onClick={onToggleFollow}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
}

export default SuggestedUser;