import { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Flex, Image, Text, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

export const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const result = await axios.get('http://localhost:5001/video/');
    setVideos(result.data);
    console.log(videos);
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">Home</Heading>
      <Flex direction="row" wrap="wrap" justify="center" gap={4}>
        {videos.map((video) => (
          <Card key={video.name} width="300px" height="200px" borderWidth="1px" borderRadius="md">
            <CardHeader>
              <Image src={video.url} alt={video.name} borderRadius="md" />
            </CardHeader>
            <CardBody>
              <Text fontSize="md" noOfLines={1} isTruncated>
                {video.name}
              </Text>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}
export default Home;
