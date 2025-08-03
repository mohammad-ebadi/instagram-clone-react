// import React, { useEffect, useState } from "react";
// import { Box, Grid, VStack } from "@chakra-ui/react";
// import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
// import ProfilePost from "./ProfilePost.jsx";

// function ProfilePosts() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   }, []);
//   return (
//     <Grid
//       templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
//       gap={1}
//       columnGap={1}
//     >
//       {isLoading &&
//         [0, 1, 2, 3, 4, 5].map((_, index) => (
//           <VStack key={index} alignItems={"flex-start"} gap={4}>
//             <Skeleton w={"full"} h={"100px"}>
//               <Box h={"30px"}>Content wrapped</Box>
//             </Skeleton>
//           </VStack>
//         ))}
//       {!isLoading && (
//         <>
//           <ProfilePost img="/img1.png"></ProfilePost>
//           <ProfilePost img="/img2.png"></ProfilePost>
//           <ProfilePost img="/img3.png"></ProfilePost>
//           <ProfilePost img="/img4.png"></ProfilePost>
//         </>
//       )}
//     </Grid>
//   );
// }

// export default ProfilePosts;


// import React, { useEffect, useState } from "react";
// import { Box, Grid, VStack, Image, Text } from "@chakra-ui/react";
// import { Skeleton } from "@chakra-ui/react";
// import useAuthStore from "../../store/useAuthStore.js";
// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../../config/firebase.jsx";

// function ProfilePosts() {
//   const { user } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (!user?.uid) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         const userRef = doc(firestore, "users", user.uid);
//         const docSnap = await getDoc(userRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           if (userData.posts && Array.isArray(userData.posts)) {
//             setPosts(userData.posts);
//           } else {
//             setPosts([]);
//           }
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error.message);
//         setPosts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [user]);

//   if (!user) {
//     return <Text color="white">Please log in to see your posts.</Text>;
//   }

//   return (
//     <Grid
//       templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
//       gap={4}
//     >
//       {isLoading
//         ? [0, 1, 2, 3, 4, 5].map((index) => (
//             <Skeleton key={index} height="150px" borderRadius="md" />
//           ))
//         : posts.length > 0
//         ? posts.map((imgUrl, idx) => (
//             <Box key={idx} borderRadius="md" overflow="hidden" boxShadow="md">
//               <Image src={imgUrl} alt={`Post ${idx + 1}`} objectFit="cover" w="100%" h="150px" />
//             </Box>
//           ))
//         : (
//           <Text color="white" gridColumn="1 / -1" textAlign="center" mt={4}>
//             No posts yet.
//           </Text>
//         )}
//     </Grid>
//   );
// }

// export default ProfilePosts;


import React, { useEffect, useState } from "react";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import useAuthStore from "../../store/useAuthStore.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.jsx";
import { supabase } from "../../config/supabase.js"; // اطمینان حاصل کن این مسیر درسته

function ProfilePosts() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.posts && Array.isArray(userData.posts)) {
            setPosts(userData.posts);
          } else {
            setPosts([]);
          }
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handleDeleteImage = async (imgUrl) => {
    const confirm = prompt("برای حذف تصویر y را وارد کن. برای لغو n یا Cancel را بزن.");
    if (confirm?.toLowerCase() !== "y") return;

    try {
      // مسیر فایل از URL استخراج شود
      const parts = imgUrl.split("/");
      const fileName = parts[parts.length - 1].split("?")[0]; // حذف پارامترها
      const { error } = await supabase.storage
        .from("post-images")
        .remove([fileName]);

      if (error) throw error;

      // به‌روزرسانی Firestore
      const updatedPosts = posts.filter((url) => url !== imgUrl);
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, { posts: updatedPosts });

      // به‌روزرسانی UI
      setPosts(updatedPosts);
    } catch (err) {
      console.error("خطا در حذف تصویر:", err.message);
    }
  };

  if (!user) {
    return <Text color="white">Please log in to see your posts.</Text>;
  }

  return (
    <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
      {isLoading
        ? [0, 1, 2, 3, 4, 5].map((index) => (
            <Skeleton key={index} height="150px" borderRadius="md" />
          ))
        : posts.length > 0
        ? posts.map((imgUrl, idx) => (
            <Box
              key={idx}
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              cursor="pointer"
              onClick={() => handleDeleteImage(imgUrl)}
            >
              <Image
                src={imgUrl}
                alt={`Post ${idx + 1}`}
                objectFit="cover"
                w="100%"
                h="150px"
              />
            </Box>
          ))
        : (
          <Text color="white" gridColumn="1 / -1" textAlign="center" mt={4}>
            No posts yet.
          </Text>
        )}
    </Grid>
  );
}

export default ProfilePosts;