// Libs & utils
import React from "react";
import PropTypes from "prop-types";

// CSS
import "./VideoList.css";

// Components
import LoadingIndicator from "../../components/loadingIndicator/LoadingIndicator";
import VideoCard from "../../components/videoCard/VideoCard";

const VideoList = ({
  youtubeVideos,
  showLoadingAnimation,
  handleVideoSelection,
}) => {
  const renderVideoCards = (videos, source, handleVideoSelection) => {
    return videos.map((video, index) => (
      <VideoCard
        key={index}
        videoSource={source}
        video={video}
        handleVideoSelection={handleVideoSelection}
      />
    ));
  };

  return (
    <div className="video-list">
      <LoadingIndicator showLoadingAnimation={showLoadingAnimation} />
      {renderVideoCards(youtubeVideos, "youtube", handleVideoSelection)}
    </div>
  );
};

VideoList.propTypes = {
  youtubeVideos: PropTypes.array.isRequired,
  showLoadingAnimation: PropTypes.bool.isRequired,
  handleVideoSelection: PropTypes.func.isRequired,
};

export default VideoList;
