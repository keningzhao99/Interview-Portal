import { useContext, useEffect } from "react";
import axios from 'axios';

import VideoRecorder from "../components/VideoRecorder";
import { VideoContext } from "../components/VideoContext";
import { Box, Button } from "@chakra-ui/react";


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
      <Box>
        <VideoRecorder set={set} />
      </Box>

      <Box>
        <Button onClick={uploadVideo}>Submit Video</Button>
      </Box>
    </>
  );
};
export default SelfRecording;
