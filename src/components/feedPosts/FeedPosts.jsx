
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
          const uid = userData.uid || "";

          // آرایه posts کاربر
          if (Array.isArray(userData.posts)) {
            userData.posts.forEach((postUrl) => {
              allPosts.push({
                img: postUrl,
                username,
                avatar,
                uid,
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
      {posts.map(({ img, username, avatar ,uid}, idx) => (
        <FeedPost key={idx} img={img} username={username} avatar={avatar} uid={uid}/>
      ))}
    </Container>
  );
}

export default FeedPosts;



