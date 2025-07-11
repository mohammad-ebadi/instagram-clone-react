import React, { useEffect, useState } from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost.jsx";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <Grid
      templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2, 3, 4, 5].map((_, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"} h={"100px"}>
              <Box h={"30px"}>Content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading && (
        <>
          <ProfilePost img="/img1.png"></ProfilePost>
          <ProfilePost img="/img2.png"></ProfilePost>
          <ProfilePost img="/img3.png"></ProfilePost>
          <ProfilePost img="/img4.png"></ProfilePost>
        </>
      )}
    </Grid>
  );
}

export default ProfilePosts;
