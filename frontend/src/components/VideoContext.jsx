import { createContext, useState } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [savedVideo, setSavedVideo] = useState(null);

	const set = (userVideo) => {
		setSavedVideo(userVideo);
	};

	const clear = () => {
		setSavedVideo(null);
	};

	return <VideoContext.Provider value={{ savedVideo, set, clear }}>{children}</VideoContext.Provider>;
};

export { VideoContext, VideoProvider };