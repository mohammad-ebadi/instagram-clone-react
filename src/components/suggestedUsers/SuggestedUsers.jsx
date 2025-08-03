
import React, { useEffect, useState } from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser.jsx";
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../../config/firebase.jsx";
import SuggestedHeader from "./SuggestedHeader.jsx";

function SuggestedUsers() {
  const [users, setUsers] = useState([]);
  const currentUser = getAuth().currentUser;

  // بارگذاری کاربران (حداکثر ۱۰ کاربر)
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

  // نگهداری وضعیت فالو/آنفالو برای هر یوزر (true یعنی فالو شده)
  const [followState, setFollowState] = useState({});

  // مقداردهی اولیه وضعیت فالو بعد از دریافت کاربران
  useEffect(() => {
    if (!currentUser) return;
    const initialFollowState = {};
    users.forEach((user) => {
      initialFollowState[user.uid] = user.followers.includes(currentUser.uid);
    });
    setFollowState(initialFollowState);
  }, [users, currentUser]);

  // تابع تغییر وضعیت فالو/آنفالو و ذخیره تغییرات در Firestore
  const toggleFollow = async (uid) => {
    if (!currentUser) return;

    const isFollowing = followState[uid];

    // به‌روزرسانی محلی state برای نمایش سریع‌تر تغییرات
    setFollowState((prev) => ({ ...prev, [uid]: !isFollowing }));

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.uid === uid) {
          let updatedFollowers = [...user.followers];
          if (isFollowing) {
            // آنفالو - حذف currentUser.uid از followers
            updatedFollowers = updatedFollowers.filter((f) => f !== currentUser.uid);
          } else {
            // فالو - اضافه کردن currentUser.uid به followers
            updatedFollowers.push(currentUser.uid);
          }
          return { ...user, followers: updatedFollowers };
        }
        return user;
      })
    );

    // ریفرنس به داکیومنت‌های کاربران در Firestore
    const userDocRef = doc(firestore, "users", uid);
    const currentUserDocRef = doc(firestore, "users", currentUser.uid);

    try {
      if (isFollowing) {
        // Unfollow
        await updateDoc(userDocRef, {
          followers: arrayRemove(currentUser.uid),
        });
        await updateDoc(currentUserDocRef, {
          following: arrayRemove(uid),
        });
      } else {
        // Follow
        await updateDoc(userDocRef, {
          followers: arrayUnion(currentUser.uid),
        });
        await updateDoc(currentUserDocRef, {
          following: arrayUnion(uid),
        });
      }
    } catch (error) {
      console.error("خطا در به‌روزرسانی فالو:", error);
      // در صورت خطا می‌توان حالت قبلی را برگرداند (اختیاری)
      setFollowState((prev) => ({ ...prev, [uid]: isFollowing }));
    }
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
        Built by Mohammad Ebadi 2025
      </Box>
    </VStack>
  );
}

export default SuggestedUsers;