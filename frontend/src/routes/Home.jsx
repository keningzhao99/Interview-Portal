import { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Heading, Flex, Card, CardHeader, CardBody, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const result = await axios.get('http://localhost:5001/video/');
    setVideos(result.data);
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">Home</Heading>
      <Flex direction="row" wrap="wrap" justify="center" gap={4}>
        {videos.map((video) => (
          <Box key={video.metadata.name} width="300px">
            <Link to={`/feedback-detail/${video.metadata.name}`}>
              <Card
                width="100%"
                borderWidth="1px"
                borderRadius="md"
                bg="gray.200"
                position="relative"
                _hover={{
                  bg: "gray.300",
                  boxShadow: "lg",
                  transform: "translateY(-4px)",
                  transition: "all 0.2s"
                }}
              >
                <CardBody p={0}>
                  {/* Display the video */}
                  <Box position="relative" width="100%" height="200px">
                    <video
                      src={video.url}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      controls={false}
                    />
                  </Box>
                </CardBody>
                <CardHeader>
                  <Flex direction="row" justify="space-between">
                    <Text fontSize="md" noOfLines={1} isTruncated>
                      {video.metadata.customMetadata.uploadedBy}
                    </Text>
                    <Text fontSize="md" noOfLines={1} isTruncated>
                      {video.metadata.customMetadata.description}
                    </Text>
                  </Flex>
                </CardHeader>
              </Card>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
export default Home;
