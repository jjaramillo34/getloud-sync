// Libs & utils
import React, { useState } from "react";
import PropTypes from "prop-types";

// CSS
import "./MobileDevicePlayerDialog.css";

const MobileDevicePlayerDialog = ({
  partyId,
  videoPlayer,
  videoPlayerIsLoaded,
  partyVideoPlayerState,
  emitNewPlayerStateToServer,
}) => {
  const [videoPlayerStarted, setVideoPlayerStarted] = useState(false);

  const startVideoPlayer = (
    internalVideoPlayer,
    partyVideoPlayerState,
    emitNewPlayerStateToServer,
    partyId
  ) => {
    setVideoPlayerStarted(true);
    internalVideoPlayer.playVideo();
    emitNewPlayerStateToServer(
      {
        playerState: "playing",
        timeInVideo: partyVideoPlayerState.timeInVideo,
      },
      partyId
    );
  };

  if (videoPlayer && videoPlayerIsLoaded && !videoPlayerStarted) {
    const internalVideoPlayer = videoPlayer.getInternalPlayer();

    return (
      <div className="mobile-device-dialog-wrapper">
        <div className="mobile-device-dialog">
          <h1 className="header">Hi there!</h1>
          <span className="description">
            We see that you're on a mobile device, cool! We just need you to
            press the button below to start the videoplayer, have fun!
          </span>
          <div
            className="start-player-btn"
            onClick={() =>
              startVideoPlayer(
                internalVideoPlayer,
                partyVideoPlayerState,
                emitNewPlayerStateToServer,
                partyId
              )
            }
          >
            Start videoplayer
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

MobileDevicePlayerDialog.propTypes = {
  partyId: PropTypes.string.isRequired,
  videoPlayer: PropTypes.object,
  videoPlayerIsLoaded: PropTypes.bool.isRequired,
  partyVideoPlayerState: PropTypes.object.isRequired,
  emitNewPlayerStateToServer: PropTypes.func.isRequired,
};

export default MobileDevicePlayerDialog;
