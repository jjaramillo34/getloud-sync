// Libs & utils
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

// CSS
import "./PartyPage.css";

// Components
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import ChatBox from "../../components/chatBox/ChatBox";
import ShareablePartyUrl from "../../components/shareablePartyUrl/ShareablePartyUrl";
import UserList from "../../components/userList/UserList";

// Actions
import { partyActions } from "../../core/party";
import { userActions } from "../../core/user";
import { videoPlayerActions } from "../../core/videoPlayer";

const PartyPage = ({
  selectedVideo,
  userName,
  partyState,
  usersInParty,
  messagesInParty,
  partyVideoPlayerState,
  userVideoPlayerState,
  videoPlayerIsMuted,
  videoProgress,
  videoPlayerIsMaximized,
  videoPlayerIsLoaded,
  connectToParty,
  sendMessageToParty,
  emitNewPlayerStateForPartyToServer,
  onPlayerStateChange,
  setPlayerMutedState,
  setPlayerIsLoadedState,
  handleMaximizeBtnPressed,
  setPlayerProgress,
}) => {
  const { partyId: paramPartyId } = useParams();
  const navigate = useNavigate();
  const partyId = paramPartyId;

  useEffect(() => {
    // If this user has a userName -> try to connect to the selected party
    if (userName) {
      connectToParty(userName, partyId);
    }
  }, [userName, partyId, connectToParty]);

  useEffect(() => {
    if (!userName && partyId) {
      connectToParty(userName, partyId);
    }
  }, [userName, partyId, connectToParty]);

  const renderPartyPage = () => {
    const partyUrl = window.location.href.split("?")[0];

    return (
      <div className="party-page">
        <div className="g-row">
          <div className="g-col">
            <ShareablePartyUrl partyUrl={partyUrl} />
            <div className="content-flex-horizontal">
              <div className="player-container">
                <VideoPlayer
                  selectedVideo={selectedVideo}
                  partyId={partyId}
                  userName={userName}
                  videoPlayerIsMuted={videoPlayerIsMuted}
                  videoPlayerIsMaximized={videoPlayerIsMaximized}
                  videoPlayerIsLoaded={videoPlayerIsLoaded}
                  videoProgress={videoProgress}
                  userVideoPlayerState={userVideoPlayerState}
                  partyVideoPlayerState={partyVideoPlayerState}
                  onPlayerStateChange={onPlayerStateChange}
                  emitNewPlayerStateToServer={
                    emitNewPlayerStateForPartyToServer
                  }
                  setPlayerMutedState={setPlayerMutedState}
                  setPlayerProgress={setPlayerProgress}
                  setPlayerIsLoadedState={setPlayerIsLoadedState}
                  handleMaximizeBtnPressed={handleMaximizeBtnPressed}
                />
              </div>
              <UserList users={usersInParty} />
            </div>
            <ChatBox
              onMessageSend={sendMessageToParty}
              partyId={partyId}
              userName={userName}
              messagesInParty={messagesInParty}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPartyNotFoundMessage = () => (
    <div className="party-not-found-container">
      <h1 className="header">Whoops..</h1>
      <span className="description">
        The requested party with id <b>"{partyId}"</b> does not seem to exist
        (anymore).. sorry! Could you check if you entered the right party-url?
      </span>
      <div className="back-btn" onClick={() => navigate("/")}>
        Return
      </div>
    </div>
  );

  return partyState === "active"
    ? renderPartyPage()
    : renderPartyNotFoundMessage();
};

PartyPage.propTypes = {
  selectedVideo: PropTypes.object.isRequired,
  userName: PropTypes.string,
  partyState: PropTypes.string.isRequired,
  usersInParty: PropTypes.array.isRequired,
  messagesInParty: PropTypes.array.isRequired,
  partyVideoPlayerState: PropTypes.object.isRequired,
  userVideoPlayerState: PropTypes.object.isRequired,
  videoPlayerIsMuted: PropTypes.bool.isRequired,
  videoProgress: PropTypes.number.isRequired,
  videoPlayerIsMaximized: PropTypes.bool.isRequired,
  videoPlayerIsLoaded: PropTypes.bool.isRequired,
  connectToParty: PropTypes.func.isRequired,
  sendMessageToParty: PropTypes.func.isRequired,
  emitNewPlayerStateForPartyToServer: PropTypes.func.isRequired,
  onPlayerStateChange: PropTypes.func.isRequired,
  setPlayerMutedState: PropTypes.func.isRequired,
  setPlayerIsLoadedState: PropTypes.func.isRequired,
  handleMaximizeBtnPressed: PropTypes.func.isRequired,
  setPlayerProgress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedVideo: state.party.selectedVideo,
  userName: state.user.userName,
  partyId: state.party.partyId,
  partyState: state.party.partyState,
  usersInParty: state.party.usersInParty,
  messagesInParty: state.party.messagesInParty,
  partyVideoPlayerState: state.party.videoPlayerState,
  userVideoPlayerState: state.videoPlayer.videoPlayerState,
  videoPlayerIsMuted: state.videoPlayer.videoPlayerIsMuted,
  videoProgress: state.videoPlayer.videoProgress,
  videoPlayerIsMaximized: state.videoPlayer.videoPlayerIsMaximized,
  videoPlayerIsLoaded: state.videoPlayer.videoPlayerIsLoaded,
});

const mapDispatchToProps = {
  connectToParty: userActions.connectToParty,
  sendMessageToParty: partyActions.sendMessageToParty,
  emitNewPlayerStateForPartyToServer:
    partyActions.emitNewPlayerStateForPartyToServer,
  onPlayerStateChange: videoPlayerActions.onPlayerStateChange,
  setPlayerMutedState: videoPlayerActions.setPlayerMutedState,
  setPlayerIsLoadedState: videoPlayerActions.setPlayerIsLoadedState,
  handleMaximizeBtnPressed: videoPlayerActions.handleMaximizeBtnPressed,
  setPlayerProgress: videoPlayerActions.setPlayerProgress,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartyPage);
