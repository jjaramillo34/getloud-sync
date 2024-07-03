// Libs & utils
import React from "react";
import PropTypes from "prop-types";

import { videoUtils } from "../../core/utils/index";

// CSS
import "./VideoCard.css";

const VideoCard = ({ video, videoSource, handleVideoSelection }) => {
  const videoDetails = videoUtils.getVideoDetails(video, videoSource);

  return (
    <div
      className="video-card g-col card"
      title={videoDetails.title}
      onClick={() => {
        handleVideoSelection(videoDetails, videoSource);
      }}
    >
      <div className="card-content">
        <div className="thumbnail">
          <img src={videoDetails.thumbnailSrc} alt="Video thumbnail" />
          <div className="video-description">
            <p>
              {videoDetails.description.length > 50
                ? videoDetails.description.substring(0, 50) + "..."
                : videoDetails.description}
            </p>
          </div>
        </div>
        <div className="main">
          <h1 className="video-title">
            <p>
              {videoDetails.title.length > 25
                ? videoDetails.title.substring(0, 25) + "..."
                : videoDetails.title}
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.object.isRequired,
  videoSource: PropTypes.string.isRequired,
  handleVideoSelection: PropTypes.func.isRequired,
};

export default VideoCard;
