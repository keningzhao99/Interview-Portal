import { useContext, useEffect } from "react";
import axios from 'axios';

import VideoRecorder from "../components/VideoRecorder";
import { VideoContext } from "../components/VideoContext";
import { Box, Button, Flex } from "@chakra-ui/react";


export const SelfRecording = () => {
  const { savedVideo, set, clear } = useContext(VideoContext);

  useEffect(() => {
    console.log('Component mounted');
    clear();
  }, []);

  const uploadVideo = async () => {
    try {

      const blob = savedVideo;
      console.log('Blob size:', blob.size); // Check the size of the Blob
      console.log(blob);
  
      const file = new File([blob], 'video.webm', { type: blob.type });
      console.log('File size:', file.size); // Check the size of the File
      console.log(file);
  
      const formData = new FormData();
      formData.append('file', file);
  
      const result = await axios.post('http://localhost:5001/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Upload result:", result.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  
  

  return (
    <>
    <Flex direction="column" gap={2} height="100vh">
      <Box>
        <VideoRecorder set={set} />
      </Box>

      <Box alignSelf="flex-end" margin='10'>
        <Button onClick={uploadVideo} alignSelf="flex-end">
          Submit Video
        </Button>
      </Box>
    </Flex>
    </>
  );
};
export default SelfRecording;
