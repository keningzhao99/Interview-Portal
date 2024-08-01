import { createContext, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [recordedVideo, setRecordedVideo] = useState(null);

	const set = (userVideo) => {
		setRecordedVideo(userVideo);
	};

	const clear = () => {
		setRecordedVideo(null);
	};

	return <VideoContext.Provider value={{ recordedVideo, set, clear }}>{children}</VideoContext.Provider>;
};

export { VideoContext, VideoProvider };