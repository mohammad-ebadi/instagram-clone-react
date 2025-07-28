import { Flex, Avatar, Box, Text, Button } from "@chakra-ui/react";

const SearchResult = ({ user }) => {
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
      <Flex align="center" mr={5}>
        <Box mr={3} p={3}>
          <Avatar.Root size={"sm"}>
            <Avatar.Fallback name={user.fullName} />
            <Avatar.Image src={user.profilePicURL} />
          </Avatar.Root>
        </Box>

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

export default SearchResult;
