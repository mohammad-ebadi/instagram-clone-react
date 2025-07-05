import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid black"}
      py={10}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex  gap={10} h={100}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
            <img src="/logo.png" alt="Instagram logo" />
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/icons8-instagram-50.png" alt="Instagram logo" />
        </Link>
      </Flex>


      <Flex  gap={10} h={100}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/home_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Home logo"/><p>Home</p>
        </Flex>
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/home_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Home logo" />
        </Link>
      </Flex>

      <Flex  gap={10} h={100}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/search_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Search logo"/><p>Search</p>
        </Flex>
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/search_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Search logo" />
        </Link>
      </Flex>


      <Flex  gap={10} h={100}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/favorite_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Notifications logo"/><p>Notifications</p>
        </Flex>
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/favorite_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Notifications logo" />
        </Link>
      </Flex>


      <Flex  gap={10} h={100}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/add_circle_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Add a Post logo"/><p>Add a Post</p>
        </Flex>
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/add_circle_30dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Add a Post logo" />
        </Link>
      </Flex>

      <Flex mb={20}>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/profilepic.png" alt="Profile logo" style={{width:"50px" , borderRadius:"50%"}}/><p>Profilee</p>
        </Flex>
        </Link>
        <Link to={"/"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}}>
            <img src="/profilepic.png" alt="Profile logo" style={{width:"50px" , borderRadius:"50%"}}/>
        </Link>
      </Flex>


        <Flex>
        <Link to={"/auth"} as={RouterLink} pl={2} display={{base:"none" , md:"block"}}>
        <Flex justifyContent={"center"} alignItems={"center"} p={5}>
            <img src="/logout_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Logout logo"/><p>Logout</p>
        </Flex>
        </Link>
        <Link to={"/auth"} as={RouterLink} pl={2} display={{base:"block" , md:"none"}} >
            <img src="/logout_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Logout logo"/>
        </Link>
      </Flex>


    </Box>
  );
}

export default Sidebar;
