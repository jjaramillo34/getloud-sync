// Libs & utils
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { videoUtils, generalUtils } from "../../core/utils";

// Constants
import { videoPlayerConfig } from "../../core/constants";

// CSS
import "./VideoPlayer.css";

// Components
import VideoPlayerControls from "../videoPlayerControls/VideoPlayerControls";
import MobileDevicePlayerDialog from "../mobileDevicePlayerDialog/MobileDevicePlayerDialog";

const VideoPlayer = ({
  selectedVideo,
  partyId,
  userName,
  videoPlayerIsMuted,
  videoPlayerIsMaximized,
  videoPlayerIsLoaded,
  videoProgress,
  userVideoPlayerState,
  partyVideoPlayerState,
  onPlayerStateChange,
  emitNewPlayerStateToServer,
  setPlayerMutedState,
  setPlayerProgress,
  setPlayerIsLoadedState,
  handleMaximizeBtnPressed,
}) => {
  const videoPlayerRef = useRef(null);
  const prevPartyPlayerStateRef = useRef(partyVideoPlayerState);

  useEffect(() => {
    setPlayerIsLoadedState(false);
  }, [setPlayerIsLoadedState]);

  useEffect(() => {
    const internalVideoPlayer = videoPlayerRef.current?.getInternalPlayer();

    const handleInitialPlayerStateSynchronization = (
      currentPartyPlayerState,
      internalVideoPlayer
    ) => {
      const isInitialPlayerStateForParty =
        currentPartyPlayerState.timeInVideo === 0;
      const isInitialPlayerStateForUser =
        internalVideoPlayer.getCurrentTime() === 0;
      if (!isInitialPlayerStateForParty && isInitialPlayerStateForUser) {
        internalVideoPlayer.seekTo(currentPartyPlayerState.timeInVideo);
      }
    };

    const handleSeekToCommandsFromServer = (
      prevPartyPlayerState,
      currentPartyPlayerState,
      internalVideoPlayer
    ) => {
      const partyPlayerStateUpdated =
        prevPartyPlayerState !== currentPartyPlayerState;
      const isInitialPlayerStateForParty =
        currentPartyPlayerState.timeInVideo === 0;
      const isNewPlayerState =
        prevPartyPlayerState.playerState !==
          currentPartyPlayerState.playerState ||
        prevPartyPlayerState.timeInVideo !==
          currentPartyPlayerState.timeInVideo;

      if (
        partyPlayerStateUpdated &&
        isNewPlayerState &&
        !isInitialPlayerStateForParty
      ) {
        internalVideoPlayer.seekTo(currentPartyPlayerState.timeInVideo + 0.1);
      }
    };

    if (
      videoPlayerIsLoaded &&
      internalVideoPlayer &&
      userVideoPlayerState.playerState !== "buffering"
    ) {
      handleInitialPlayerStateSynchronization(
        partyVideoPlayerState,
        internalVideoPlayer
      );
      handleSeekToCommandsFromServer(
        prevPartyPlayerStateRef.current,
        partyVideoPlayerState,
        internalVideoPlayer
      );
    }
  }, [videoPlayerIsLoaded, userVideoPlayerState, partyVideoPlayerState]);

  const constructUserPlayerState = (playerState, videoPlayer) => {
    return {
      playerState,
      timeInVideo: videoPlayer.getCurrentTime(),
    };
  };

  const videoUrl = videoUtils.getVideoUrl(
    selectedVideo.videoSource,
    selectedVideo.id
  );
  const videoIsPlaying = partyVideoPlayerState.playerState === "playing";
  const videoPlayerClassNames = classNames("video-player", {
    maximized: videoPlayerIsMaximized,
  });

  return (
    <div className={videoPlayerClassNames}>
      <ReactPlayer
        url={videoUrl}
        width={"100%"}
        height={"100%"}
        muted={videoPlayerIsMuted}
        playing={videoIsPlaying}
        ref={videoPlayerRef}
        onReady={() => {
          setPlayerIsLoadedState(true);
        }}
        onPlay={() => {
          if (!videoIsPlaying) {
            videoPlayerRef.current.getInternalPlayer().pauseVideo();
          }
          onPlayerStateChange(
            constructUserPlayerState("playing", videoPlayerRef.current)
          );
        }}
        onPause={() =>
          onPlayerStateChange(
            constructUserPlayerState("paused", videoPlayerRef.current)
          )
        }
        onBuffer={() =>
          onPlayerStateChange(
            constructUserPlayerState("buffering", videoPlayerRef.current)
          )
        }
        onProgress={setPlayerProgress}
        config={videoPlayerConfig}
        style={{ position: "absolute" }}
      />

      <VideoPlayerControls
        partyVideoPlayerState={partyVideoPlayerState}
        emitNewPlayerStateToServer={emitNewPlayerStateToServer}
        partyId={partyId}
        videoPlayerIsMuted={videoPlayerIsMuted}
        videoPlayerIsMaximized={videoPlayerIsMaximized}
        videoProgress={videoProgress}
        videoDuration={videoPlayerRef.current?.getDuration()}
        handleMuteBtnPressed={() => setPlayerMutedState(!videoPlayerIsMuted)}
        handleMaximizeBtnPressed={() =>
          handleMaximizeBtnPressed(
            videoPlayerIsMaximized,
            document.getElementsByClassName("video-player")[0]
          )
        }
      />

      {generalUtils.isMobileDevice() && (
        <MobileDevicePlayerDialog
          partyId={partyId}
          videoPlayer={videoPlayerRef.current}
          videoPlayerIsLoaded={videoPlayerIsLoaded}
          partyVideoPlayerState={partyVideoPlayerState}
          emitNewPlayerStateToServer={emitNewPlayerStateToServer}
        />
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  selectedVideo: PropTypes.object.isRequired,
  partyId: PropTypes.string.isRequired,
  userName: PropTypes.string,
  videoPlayerIsMuted: PropTypes.bool,
  videoPlayerIsMaximized: PropTypes.bool,
  videoPlayerIsLoaded: PropTypes.bool,
  videoProgress: PropTypes.number.isRequired,
  userVideoPlayerState: PropTypes.object.isRequired,
  partyVideoPlayerState: PropTypes.object.isRequired,
  onPlayerStateChange: PropTypes.func.isRequired,
  emitNewPlayerStateToServer: PropTypes.func.isRequired,
  setPlayerMutedState: PropTypes.func.isRequired,
  setPlayerProgress: PropTypes.func.isRequired,
  setPlayerIsLoadedState: PropTypes.func.isRequired,
  handleMaximizeBtnPressed: PropTypes.func.isRequired,
};

export default VideoPlayer;
