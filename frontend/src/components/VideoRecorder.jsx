import { useState, useRef } from "react";
import { Box, Button, Flex, Heading, Link, Card, CardHeader, CardBody } from "@chakra-ui/react";
//import { VideoContext } from "./VideoContext";

export const VideoRecorder = ( { recordedVideo, set, clear } ) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  //const [recordedVideo, setRecordedVideo] = useState(null);
  //const { recordedVideo, set, clear } = useContext(VideoContext);
  const mimeType = "video/webm";

  const getCameraPermission = async () => {
    clear();
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = { audio: false, video: true };
        const audioConstraints = { audio: true };

        const audioStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
        const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);

        setPermission(true);
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        setStream(combinedStream);
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    clear(); // Clear the previously recorded video
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localVideoChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localVideoChunks.push(event.data);
      }
    };

    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      //setRecordedVideo(videoUrl);
      set(videoUrl);
      setVideoChunks([]);
    };
  };

  
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} textAlign="center">Video Recorder</Heading>
      <Flex gap={15} align="center" justify="center" flexWrap="wrap">
        <Card width="400px" minHeight="450px">
          <CardHeader>
            <Heading size="md" textAlign="center">Recorder</Heading>
          </CardHeader>
          <CardBody>
            <Flex className="video-controls" direction="column" align="center" justify="center">
              {!permission ? (
                <Button onClick={getCameraPermission} colorScheme="purple" mb={2}>
                  Get Camera
                </Button>
              ) : null}
              {permission && recordingStatus === "inactive" ? (
                <Button onClick={startRecording} colorScheme="purple" mb={2}>
                  Start Recording
                </Button>
              ) : null}
              {recordingStatus === "recording" ? (
                <Button onClick={stopRecording} colorScheme="red" mb={2}>
                  Stop Recording
                </Button>
              ) : null}
            </Flex>
            <Box className="live-player" height="275" border="1px" borderColor="gray.300" p={2} mt={4}>
              <video ref={liveVideoFeed} autoPlay width="100%" height="200"></video>
            </Box>
          </CardBody>
        </Card>

        <Card width="400px" minHeight="450px">
          <CardHeader>
            <Heading size="md" textAlign="center">Recorded Video</Heading>
          </CardHeader>
          <CardBody>
            {recordedVideo ? (
              <Box className="recorded-player">
                <video src={recordedVideo} controls width="100%" height="200"></video>
                <Link href={recordedVideo} download color="purple.500" mt={2} display="block" textAlign="center">
                  Download Recording
                </Link>
              </Box>
            ) : (
              <Box textAlign="center">No video recorded yet.</Box>
            )}
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );

};

export default VideoRecorder;
