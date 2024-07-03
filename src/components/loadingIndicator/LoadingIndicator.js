// Libs & utils
import React from "react";
import PropTypes from "prop-types";

// CSS
import "./LoadingIndicator.css";

const LoadingIndicator = ({ showLoadingAnimation }) => {
  if (showLoadingAnimation) {
    return (
      <div className="loading-indicator">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    );
  } else {
    return null;
  }
};

LoadingIndicator.propTypes = {
  showLoadingAnimation: PropTypes.bool,
};

export default LoadingIndicator;
