// import { Box, Flex, Image, Text } from "@chakra-ui/react";
// import React from "react";
// import { Avatar } from "@chakra-ui/react";

// function FeedPostHeader({username,avatar}) {
//   return (
//     <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
//       <Flex alignItems={"center"} gap={2}>
//         <Avatar.Root size={"sm"}>
//           <Avatar.Fallback name="Profile" />
//           <Avatar.Image src={avatar} />
//         </Avatar.Root>
//         <Flex fontSize={12} fontWeight={"bold"} gap={2}>
//           <h3>{username}</h3>
//           <Box color={"gray.500"}>
//             <h4>.1w</h4>
//           </Box>
//         </Flex>
//       </Flex>

//       <Box fontSize={12} cursor={"pointer"} color={"blue.500"} fontWeight={"bold"} _hover={{color:"black"}} transition={"0.2s"}>
//         <Text>Unfollow</Text>
//       </Box>
//     </Flex>
//   );
// }

// export default FeedPostHeader;


// import { Box, Button, Flex, Text } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { Avatar } from "@chakra-ui/react";
// import { firestore } from "../../config/firebase.jsx";
// import {
//   doc,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from "firebase/firestore";
// import useAuthStore from "../../store/useAuthStore.js";

// function FeedPostHeader({ username, avatar }) {
//   const { user } = useAuthStore();
//   const currentUsername = user?.username;

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const followDocId = `${currentUsername}_${username}`;

//   useEffect(() => {
//     const checkFollowStatus = async () => {
//       if (!currentUsername || currentUsername === username) return;
//       const ref = doc(firestore, "followers", followDocId);
//       const snap = await getDoc(ref);
//       setIsFollowing(snap.exists());
//       setLoading(false);
//     };
//     checkFollowStatus();
//   }, [currentUsername, username,followDocId]);

//   const handleFollowToggle = async () => {
//     const ref = doc(firestore, "followers", followDocId);
//     try {
//       if (isFollowing) {
//         await deleteDoc(ref);
//         setIsFollowing(false);
//       } else {
//         await setDoc(ref, {
//           follower: currentUsername,
//           following: username,
//           timestamp: Date.now(),
//         });
//         setIsFollowing(true);
//       }
//     } catch (err) {
//       console.error("Follow toggle failed:", err);
//     }
//   };

//   return (
//     <Flex justifyContent="space-between" alignItems="center" w="full" my={2}>
//       <Flex alignItems="center" gap={2}>
//         <Avatar.Root size="sm">
//           <Avatar.Fallback name="Profile" />
//           <Avatar.Image src={avatar} />
//         </Avatar.Root>

//         <Flex fontSize={12} fontWeight="bold" gap={2}>
//           <h3>{username}</h3>
//           <Box color="gray.500">
//             <h4>.1w</h4>
//           </Box>
//         </Flex>
//       </Flex>

//       {currentUsername !== username && !loading && (
//         <Button
//           fontSize={12}
//           cursor="pointer"
//           color={isFollowing ? "blue.500" : "green.500"}
//           fontWeight="bold"
//           _hover={{ color: "black" }}
//           transition="0.2s"
//           onClick={handleFollowToggle}
//         >
//           {isFollowing ? "Unfollow" : "Follow"}
//         </Button>
//       )}
//     </Flex>
//   );
// }

// export default FeedPostHeader;



import { Box, Button, Flex, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { firestore } from "../../config/firebase.jsx";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import useAuthStore from "../../store/useAuthStore.js";

function FeedPostHeader({ username, avatar, uid }) {
  const { user } = useAuthStore();
  const currentUid = user?.uid;
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!currentUid || currentUid === uid) return;

      const targetUserRef = doc(firestore, "users", uid);
      const snap = await getDoc(targetUserRef);

      if (snap.exists()) {
        const followers = snap.data().followers || [];
        setIsFollowing(followers.includes(currentUid));
      }

      setLoading(false);
    };

    checkFollowStatus();
  }, [currentUid, uid]);

  const handleFollowToggle = async () => {
    const targetUserRef = doc(firestore, "users", uid);

    try {
      if (isFollowing) {
        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUid),
        });
        setIsFollowing(false);
      } else {
        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUid),
        });
        setIsFollowing(true);
      }
    } catch (err) {
      console.error("Error updating followers:", err);
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" my={2}>
      <Flex alignItems="center" gap={2}>
        {/* <Avatar name={username} src={avatar} size="sm" /> */}
        <Avatar.Root size="sm">
          <Avatar.Fallback name={username} />
          <Avatar.Image src={avatar} />
        </Avatar.Root>
        <Box fontSize={12} fontWeight="bold">{username}</Box>
      </Flex>

      {currentUid !== uid && !loading && (
        <Button
          fontSize={12}
          color={isFollowing ? "blue.500" : "green.500"}
          fontWeight="bold"
          _hover={{ color: "black" }}
          transition="0.2s"
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
}

export default FeedPostHeader;