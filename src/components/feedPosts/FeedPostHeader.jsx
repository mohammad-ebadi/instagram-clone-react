
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.jsx";
import useAuthStore from "../../store/useAuthStore.js";

function FeedPostHeader({ username, avatar, uid }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const checkFollowing = async () => {
      if (!user || !uid) return;
      try {
        const currentUserRef = doc(firestore, "users", user.uid);
        const currentUserSnap = await getDoc(currentUserRef);
        if (currentUserSnap.exists()) {
          const following = currentUserSnap.data().following || [];
          setIsFollowed(following.includes(uid));
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkFollowing();
  }, [user, uid]);

  const handleFollow = async () => {
    if (!user || !uid) return;
    try {
      const currentUserRef = doc(firestore, "users", user.uid);
      const targetUserRef = doc(firestore, "users", uid);

      const [currentUserSnap, targetUserSnap] = await Promise.all([
        getDoc(currentUserRef),
        getDoc(targetUserRef),
      ]);

      if (!currentUserSnap.exists() || !targetUserSnap.exists()) return;

      const currentUserData = currentUserSnap.data();
      const targetUserData = targetUserSnap.data();

      let currentFollowing = currentUserData.following || [];
      let targetFollowers = targetUserData.followers || [];

      if (isFollowed) {
        currentFollowing = currentFollowing.filter((id) => id !== uid);
        targetFollowers = targetFollowers.filter((id) => id !== user.uid);
      } else {
        if (!currentFollowing.includes(uid)) currentFollowing.push(uid);
        if (!targetFollowers.includes(user.uid)) targetFollowers.push(user.uid);
      }

      await Promise.all([
        setDoc(currentUserRef, { following: currentFollowing }, { merge: true }),
        setDoc(targetUserRef, { followers: targetFollowers }, { merge: true }),
      ]);

      setIsFollowed((prev) => !prev);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar.Root size={"sm"}>
          <Avatar.Fallback name={username} />
          <Avatar.Image src={avatar} />
        </Avatar.Root>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <h3>{username}</h3>
          <Box color={"gray.500"}>
            <h4>.1w</h4>
          </Box>
        </Flex>
      </Flex>
      {user?.uid !== uid && (
        <Box
          fontSize={12}
          cursor={"pointer"}
          color={isFollowed ? "red.500" : "blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "black" }}
          transition={"0.2s"}
          onClick={handleFollow}
        >
          <Text>{isFollowed ? "Unfollow" : "Follow"}</Text>
        </Box>
      )}
    </Flex>
  );
}

export default FeedPostHeader;