import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      bg={"blue.100"}
      h={"100vh"}
      borderRight={"1px solid black"}
      py={10}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 3, md: 6 }}
    >
      <Flex gap={10} h={100}>
        <Link
          to={"/"}
          as={RouterLink}
          display={{ base: "none", md: "block" }}
          textDecoration="none"
        >
          <img src="/logo.png" alt="Instagram logo" />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          display={{ base: "block", md: "none" }}
          textDecoration="none"
        >
          <img src="/logo2.png" alt="Instagram logo" />
        </Link>
      </Flex>

      <Flex gap={10} h={100}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          textDecoration="none"
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/home.png" alt="Home logo" />
            <p>Home</p>
          </Flex>
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
          textDecoration="none"
        >
          <img src="/home.png" alt="Home logo" />
        </Link>
      </Flex>

      <Flex gap={10} h={100}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/search.png" alt="Search logo" />
            <p>Search</p>
          </Flex>
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
        >
          <img src="/search.png" alt="Search logo" />
        </Link>
      </Flex>

      <Flex gap={10} h={100}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/notifications.png" alt="Notifications logo" />
            <p>Notifications</p>
          </Flex>
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
        >
          <img src="/notifications.png" alt="Notifications logo" />
        </Link>
      </Flex>

      <Flex gap={10} h={100}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/add.png" alt="Add a Post logo" />
            <p>Add a Post</p>
          </Flex>
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
        >
          <img src="/add.png" alt="Add a Post logo" />
        </Link>
      </Flex>

      <Flex mb={10}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img
              src="/profile.png"
              alt="Profile logo"
              style={{ width: "30px", borderRadius: "50%" }}
            />
            <p>Profile</p>
          </Flex>
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "block", md: "none" }}
        >
          <img
            src="/profile.png"
            alt="Profile logo"
            style={{ width: "30px", borderRadius: "50%" }}
          />
        </Link>
      </Flex>

      <Flex>
        <Link
          to={"/auth"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
        >
          <Flex justifyContent={"center"} alignItems={"center"} p={6}>
            <img src="/logout.png" alt="Logout logo" />
            <p>Logout</p>
          </Flex>
        </Link>
        <Link
          to={"/auth"}
          as={RouterLink}
          pl={3}
          display={{ base: "block", md: "none" }}
          mt={10}
        >
          <img src="/logout.png" alt="Logout logo" />
        </Link>
      </Flex>
    </Box>
  );
}

export default Sidebar;
