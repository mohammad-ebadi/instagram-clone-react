// import { Container } from '@chakra-ui/react'
// import React from 'react'
// import FeedPost from './FeedPost.jsx'

// function FeedPosts() {
//   return (
//     <Container maxW={"container.sm"} py={10} px={2}>
//       <FeedPost img="/img5.png" username="user1" avatar="/img5.png"></FeedPost>
//       <FeedPost img="/img6.png" username="user2" avatar="/img6.png"></FeedPost>
//       <FeedPost img="/img7.png" username="user3" avatar="/img7.png"></FeedPost>
//       <FeedPost img="/img8.png" username="user4" avatar="/img8.png"></FeedPost>
//     </Container>
//   )
// }

// export default FeedPosts


import React, { useEffect, useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import FeedPost from "./FeedPost.jsx";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase.jsx";

function FeedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // گرفتن همه کاربران
        const usersCol = collection(firestore, "users");
        const usersSnapshot = await getDocs(usersCol);

        let allPosts = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          const username = userData.userName || "unknown";
          const avatar = userData.profilePicURL || "";

          // آرایه posts کاربر
          if (Array.isArray(userData.posts)) {
            userData.posts.forEach((postUrl) => {
              allPosts.push({
                img: postUrl,
                username,
                avatar,
                // اگه بخوای زمان اضافه کن (مثلاً createdAt یا ...)
                // createdAt: userData.createdAt ?? null,
              });
            });
          }
        });

        // در صورت داشتن createdAt میتونی مرتب کنی، اینجا بر اساس ترتیب عکس‌ها برمیگردونیم
        // allPosts.sort((a,b) => b.createdAt - a.createdAt);

        // محدود کردن به 10 پست آخر
        allPosts = allPosts.slice(-10).reverse();

        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts from Firestore:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Text color="white" textAlign="center" mt={10}>Loading posts...</Text>;
  }

  if (posts.length === 0) {
    return <Text color="white" textAlign="center" mt={10}>No posts found.</Text>;
  }

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {posts.map(({ img, username, avatar }, idx) => (
        <FeedPost key={idx} img={img} username={username} avatar={avatar} />
      ))}
    </Container>
  );
}

export default FeedPosts;