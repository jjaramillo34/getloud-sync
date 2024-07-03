// Libs & utils
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// CSS
import "./SearchPage.css";

// Actions
import { videoListActions } from "../../core/videoList/index";

// Components
import PageHeader from "../../components/pageHeader/PageHeader";
import VideoList from "../../components/videoList/VideoList";

const SearchPage = ({
  isFetchingVideos,
  youtubeVideos,
  user,
  loadYoutubeVideos,
  handleVideoSelection,
}) => {
  const { query } = useParams();

  useEffect(() => {
    // Load Youtube video search results into Redux store
    loadYoutubeVideos(query);
  }, [query, loadYoutubeVideos]);

  return (
    <div className="browse-page">
      <PageHeader titleLeader="Search results" titleMain={query} />

      <div className="g-row">
        <VideoList
          showLoadingAnimation={isFetchingVideos}
          youtubeVideos={youtubeVideos}
          handleVideoSelection={handleVideoSelection}
        />
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  isFetchingVideos: PropTypes.bool.isRequired,
  youtubeVideos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loadYoutubeVideos: PropTypes.func.isRequired,
  handleVideoSelection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isFetchingVideos: state.videoList.isFetching,
  youtubeVideos: state.videoList.youtubeVideos,
  user: state.user,
});

const mapDispatchToProps = {
  loadYoutubeVideos: videoListActions.loadYoutubeVideos,
  handleVideoSelection: videoListActions.handleVideoSelection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
