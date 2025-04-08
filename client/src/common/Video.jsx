import { useRef, useEffect, useState } from "react";

const VideoMessage = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const [savedTime, setSavedTime] = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = savedTime; // Restore playback position
        }
    }, [videoSrc]); // Only run when the video source changes

    const handleTimeUpdate = () => {
        setSavedTime(videoRef.current?.currentTime || 0); 
    };

    return (
        <video
            ref={videoRef}
            src={videoSrc}
            controls
            className="media-message"
            onTimeUpdate={handleTimeUpdate} // Track playback position
        />
    );
};

export default VideoMessage;
