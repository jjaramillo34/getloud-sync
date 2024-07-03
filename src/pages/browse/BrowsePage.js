// Libs & utils
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// CSS
import "./BrowsePage.css";

// Constants
import { initialVideoQuery } from "../../core/constants";

// Actions
import { appActions } from "../../core/app";
import { userActions } from "../../core/user";
import { videoListActions } from "../../core/videoList";

// Components
import PageHeader from "../../components/pageHeader/PageHeader";
import VideoList from "../../components/videoList/VideoList";

const BrowsePage = ({
  isFetchingVideos,
  youtubeVideos,
  user,
  navigateToPath,
  disconnectFromAllParties,
  loadYoutubeVideos,
  handleVideoSelection,
}) => {
  useEffect(() => {
    // Load an initial set of movies from Youtube into Redux store
    loadYoutubeVideos(initialVideoQuery.query, initialVideoQuery.videoType);

    // Disconnect from any parties the user was still connected to
    disconnectFromAllParties();
  }, [loadYoutubeVideos, disconnectFromAllParties]);

  return (
    <div className="browse-page">
      <PageHeader
        titleLeader="Hi"
        titleMain={user.userName}
        titleAfter="watch any Youtube video in sync together with your friends!"
      />

      <div className="g-row">
        <div className="introduction-text">
          <p>3 easy steps to watch any Youtube video together with a friend:</p>
          <ol>
            <li>Search for & select any Youtube video</li>
            <li>Share the custom generated party URL with your friends</li>
            <li>Watch the video together in perfect sync!</li>
          </ol>
        </div>

        <VideoList
          showLoadingAnimation={isFetchingVideos}
          youtubeVideos={youtubeVideos}
          handleVideoSelection={handleVideoSelection}
        />
      </div>
    </div>
  );
};

BrowsePage.propTypes = {
  isFetchingVideos: PropTypes.bool.isRequired,
  youtubeVideos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  navigateToPath: PropTypes.func.isRequired,
  disconnectFromAllParties: PropTypes.func.isRequired,
  loadYoutubeVideos: PropTypes.func.isRequired,
  handleVideoSelection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFetchingVideos: state.videoList.isFetching,
  youtubeVideos: state.videoList.youtubeVideos,
  user: state.user,
});

const mapDispatchToProps = {
  navigateToPath: appActions.navigateToPath,
  disconnectFromAllParties: userActions.disconnectFromAllParties,
  loadYoutubeVideos: videoListActions.loadYoutubeVideos,
  handleVideoSelection: videoListActions.handleVideoSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
