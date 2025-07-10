import { Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import FeedPost from './FeedPost'

function FeedPosts() {
  const [isLoading , setLoading] = useState(true)
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      <FeedPost img="/img5.png" username="user1" avatar="/img5.png"></FeedPost>
      <FeedPost img="/img6.png" username="user2" avatar="/img6.png"></FeedPost>
      <FeedPost img="/img7.png" username="user3" avatar="/img7.png"></FeedPost>
      <FeedPost img="/img8.png" username="user4" avatar="/img8.png"></FeedPost>
    </Container>
  )
}

export default FeedPosts
