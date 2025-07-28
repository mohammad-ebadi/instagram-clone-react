// import React, { useEffect, useState } from "react";
// import { VStack, Box, Text } from "@chakra-ui/react";
// import SuggestedUser from "./SuggestedUser.jsx";
// import { collection, getDocs } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { firestore } from "../../config/firebase.jsx";
// import SuggestedHeader from "./SuggestedHeader.jsx";

// function SuggestedUsers() {
//   const [users, setUsers] = useState([]);
//   const currentUser = getAuth().currentUser;

// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(firestore, "users"));
//       const usersData = querySnapshot.docs
//         .map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//         .filter((user) => user.uid !== currentUser?.uid)
//         .slice(0, 10); // محدود به ۱۰ کاربر
//       setUsers(usersData);
//     } catch (error) {
//       console.error("خطا در دریافت کاربران:", error);
//     }
//   };

//   fetchUsers();
// }, [currentUser]);

//   return (
//     <VStack w="full" align="start" spacing={4} px={4} py={4}>
//       <SuggestedHeader></SuggestedHeader>
//       <Text fontSize="sm" fontWeight="bold" color="gray.500">
//         Suggested Users
//       </Text>
//       {users.map((user) => (
//         <SuggestedUser
//           key={user.uid}
//           userName={user.userName}
//           avatar={user.profilePicURL}
//           followersCount={user.followers.length}
//           fullName={user.fullName}
//         />
//       ))}
//       <Box fontSize={12} color="gray.500" mt={5}>
//         Built by Mohammad Ebadi
//       </Box>
//     </VStack>
//   );
// }

// export default SuggestedUsers;

import React, { useEffect, useState } from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser.jsx";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../config/firebase.jsx";
import SuggestedHeader from "./SuggestedHeader.jsx";

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
          .filter((user) => user.uid !== currentUser?.uid)
          .slice(0, 10);
        setUsers(usersData);
      } catch (error) {
        console.error("خطا در دریافت کاربران:", error);
      }
    };
    fetchUsers();
  }, [currentUser]);

  // وضعیت فالو/آنفالو را در یک آبجکت نگه داریم: { uid: true/false }
  const [followState, setFollowState] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    // مقداردهی اولیه followState بر اساس اینکه uid در followers کاربر است یا نه
    const initialFollowState = {};
    users.forEach((user) => {
      initialFollowState[user.uid] = user.followers.includes(currentUser.uid);
    });
    setFollowState(initialFollowState);
  }, [users, currentUser]);

  // تابع تغییر وضعیت فالو/آنفالو
  const toggleFollow = (uid) => {
    setFollowState((prev) => {
      const isFollowing = prev[uid];
      // آپدیت آرایه کاربران برای تعداد فالوورها
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.uid === uid) {
            let updatedFollowers = [...user.followers];
            if (isFollowing) {
              // آنفالو - حذف currentUser.uid از followers
              updatedFollowers = updatedFollowers.filter(
                (f) => f !== currentUser.uid
              );
            } else {
              // فالو - اضافه کردن currentUser.uid به followers
              updatedFollowers.push(currentUser.uid);
            }
            return { ...user, followers: updatedFollowers };
          }
          return user;
        })
      );
      return { ...prev, [uid]: !isFollowing };
    });
  };

  return (
    <VStack w="full" align="start" spacing={4} px={4} py={4}>
      <SuggestedHeader />
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
          isFollowing={followState[user.uid]}
          onToggleFollow={() => toggleFollow(user.uid)}
        />
      ))}
      <Box fontSize={12} color="gray.500" mt={5}>
        Built by Mohammad Ebadi
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;
