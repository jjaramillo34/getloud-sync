// Libs & utils
import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// CSS
import "./SetUserNamePopup.css";

const SetUserNamePopup = ({ isVisible, handleSetUserName }) => {
  const inputRef = useRef(null);

  const handleContinue = () => {
    const userName = inputRef.current.value.trim();
    handleSetUserName(userName);
  };

  const setUserNamePopupCssClasses = classNames("set-username-popup-wrapper", {
    hidden: !isVisible,
  });

  return (
    <div className={setUserNamePopupCssClasses}>
      <div className="set-username-popup">
        <span className="create-username-header">Who are you ?</span>
        <span className="create-username-description">
          Let other people know who you are by choosing a display / username
        </span>
        <div className="username-details">
          <input
            ref={inputRef}
            autoComplete="off"
            className="input user-name"
            maxLength="60"
            placeholder="Username / display name"
            tabIndex="0"
            type="text"
          />
        </div>
        <div className="create-username button" onClick={handleContinue}>
          Continue
        </div>
      </div>
    </div>
  );
};

SetUserNamePopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleSetUserName: PropTypes.func.isRequired,
};

export default SetUserNamePopup;
