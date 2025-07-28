// import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
// import React from "react";
// import SuggestedHeader from "./SuggestedHeader.jsx";
// import SuggestedUser from "./SuggestedUser.jsx";

// function SuggestedUsers() {
//   return (
//     <VStack py={8} px={6} gap={4}>
//       <SuggestedHeader></SuggestedHeader>
//       <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
//         <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
//           Suggested Users
//         </Text>
//         <Text
//           fontSize={12}
//           fontWeight={"bold"}
//           cursor={"pointer"}
//           _hover={{ color: "blue.500" }}
//         >
//           See all
//         </Text>
//       </Flex>

//       <SuggestedUser
//         username="user5"
//         followers={234}
//         avatar="/img5.png"
//       ></SuggestedUser>
//       <SuggestedUser
//         username="user6"
//         followers={646}
//         avatar="/img6.png"
//       ></SuggestedUser>
//       <SuggestedUser
//         username="user7"
//         followers={8697}
//         avatar="/img7.png"
//       ></SuggestedUser>

//       <Box fontSize={12} color={"gray.500"} mt={5}>
//         © 2025 Built by Mohammad Ebadi
//       </Box>
//     </VStack>
//   );
// }

// export default SuggestedUsers;

// 
import React, { useEffect, useState } from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser.jsx";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../config/firebase.jsx";

function SuggestedUsers() {
  const [users, setUsers] = useState([]);
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const usersData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.uid !== currentUser?.uid); // حذف کاربر فعلی
        setUsers(usersData);
      } catch (error) {
        console.error("خطا در دریافت کاربران:", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  return (
    <VStack w="full" align="start" spacing={4} px={4} py={4}>
      <Text fontSize="sm" fontWeight="bold" color="gray.500">
        Suggested Users
      </Text>
      {users.map((user) => (
        <SuggestedUser
          key={user.uid}
          userName={user.userName}
          avatar={user.profilePicURL}
          followersCount={user.followers.length}
          fullName={user.fullName}
        />
      ))}
      <Box fontSize={12} color="gray.500" mt={5}>
        Built by Mohammad Ebadi
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;