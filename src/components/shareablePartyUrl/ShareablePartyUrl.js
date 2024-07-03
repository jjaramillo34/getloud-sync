// Libs & utils
import React from "react";
import PropTypes from "prop-types";

// CSS
import "./ShareablePartyUrl.css";

const ShareablePartyUrl = ({ partyUrl }) => {
  const handleFocus = (event) => {
    // we use setSelectionRange() because select() doesn't work on IOS
    event.target.setSelectionRange(0, 9999);
  };

  return (
    <div className="share-party-url">
      <h2 className="title">Your shareable party URL:</h2>
      <input type="text" readOnly value={partyUrl} onClick={handleFocus} />
    </div>
  );
};

ShareablePartyUrl.propTypes = {
  partyUrl: PropTypes.string.isRequired,
};

export default ShareablePartyUrl;
