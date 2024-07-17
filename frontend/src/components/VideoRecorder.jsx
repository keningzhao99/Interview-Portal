import { useState, useRef } from "react";
import { Box, Button, Flex, Heading, Link, Card, CardHeader, CardBody } from "@chakra-ui/react";

export const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const mimeType = "video/webm";

  const getCameraPermission = async () => {
    setRecordedVideo(null);
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
    setRecordedVideo(null); // Clear the previously recorded video
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
      setRecordedVideo(videoUrl);
      setVideoChunks([]);
    };
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>Video Recorder</Heading>
      <Flex gap={15}>

        <Card>
          <CardHeader>
            <Heading size="md">Recorder</Heading>
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
                <Button onClick={stopRecording} colorScheme="red">
                  Stop Recording
                </Button>
              ) : null}
            </Flex>
            <Box className="live-player" border="1px" borderColor="gray.300" p={2} mt={4}>
              <video ref={liveVideoFeed} autoPlay width="400" height="200"></video>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Recorded Video</Heading>
          </CardHeader>
          <CardBody>
            {recordedVideo ? (
              <Box className="recorded-player">
                <video src={recordedVideo} controls width="400" height="200"></video>
                <Link href={recordedVideo} download color="purple.500" mt={2} display="block">
                  Download Recording
                </Link>
              </Box>
            ) : (
              <Box>No video recorded yet.</Box>
            )}
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default VideoRecorder;
