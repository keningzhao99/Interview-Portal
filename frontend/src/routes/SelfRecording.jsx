import { useContext } from "react";
import axios from 'axios';

import VideoRecorder from "../components/VideoRecorder";
import { VideoContext } from "../components/VideoContext";
import { Box, Button } from "@chakra-ui/react";


export const SelfRecording = () => {
  const { recordedVideo, set, clear } = useContext(VideoContext);

  const uploadVideo = async (recordedVideo) => {
    try {
      // Fetch the Blob data from the URL
      const response = await fetch(recordedVideo);
      const blob = await response.blob();
  
      // Create a File object from the Blob
      const file = new File([blob], 'video.mp4', { type: blob.type });
  
      // Create FormData and append the File
      const formData = new FormData();
      formData.append('file', file);
  
      // Send the POST request to the server
      const result = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("result", result.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };
  

  return (
    <>
      <Box>
        <VideoRecorder recordedVideo={recordedVideo} set={set} clear={clear}/>
      </Box>

      <Box>
        <Button onClick={uploadVideo}>Submit Video</Button>
      </Box>
    </>
  );
};
export default SelfRecording;
