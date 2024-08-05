import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, VStack, HStack, Button, Textarea } from '@chakra-ui/react';

const FeedbackDetail = () => {
  const location = useLocation();
  const { videoURL, videoMetadata } = location.state || {};
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = () => {
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4} textAlign="center">Feedback Detail</Heading>
      <HStack spacing={8}>
        <Box flex="1" maxW="50%">
          {/* Video Section */}
          {videoURL && videoMetadata ? (
            <Box>
              <video src={videoURL} controls style={{ width: '100%', height: 'auto' }} />
              <Text mt={4}>Uploaded By: {videoMetadata.uploadedBy}</Text>
              <Text>Description: {videoMetadata.description}</Text>
            </Box>
          ) : (
            <Text>No video data found.</Text>
          )}
        </Box>
        <Box flex="1" maxW="50%">
          {/* Comment Section */}
          <VStack spacing={4} align="stretch">
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
              <Heading as="h2" size="md" mb={2}>Leave a Comment</Heading>
              <Textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your comment here..."
                mb={2}
              />
              <Button colorScheme="purple" onClick={handleCommentSubmit}>
                Submit Comment
              </Button>
            </Box>
            <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
              <Heading as="h2" size="md" mb={2}>Previous Comments</Heading>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <Text key={index} mb={2}>{comment}</Text>
                ))
              ) : (
                <Text>No comments yet.</Text>
              )}
            </Box>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default FeedbackDetail;
