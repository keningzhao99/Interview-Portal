import VideoRecorder from "../components/VideoRecorder";
import { VideoProvider } from "../components/VideoContext";


export const SelfRecording = () => {

  return (
    <>
      <div>
        <VideoProvider>
          <VideoRecorder />
        </VideoProvider>
      </div>

      <div>
        
      </div>
    </>
  );
};
export default SelfRecording;
