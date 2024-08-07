// Libs & utils
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// Assets
import logo from "../../assets/logo_white.svg";

// CSS
import "./AppHeader.css";

// Components
import SearchBar from "../searchBar/SearchBar";

const AppHeader = ({ search, user, toggleSearch, handleSearch }) => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate("/");
  };

  const renderSearchButton = (bool) => {
    return bool ? (
      <li>
        <span className="btn btn-icon fa fa-search" onClick={toggleSearch} />
      </li>
    ) : null;
  };

  return (
    <div className="app-header">
      <div className="g-row">
        <div className="g-col">
          <div className="header-title-wrapper" onClick={navigateToHomePage}>
            <img
              src={logo}
              className="content logo"
              alt="bramgiessen.com logo"
            />
            <span className="content">
              Youtube Video Sync • React, Redux & Socket.IO
            </span>
          </div>

          <ul className="header-actions">
            {renderSearchButton(user.userName)}
            <li>
              <a
                title="Visit my portfolio site"
                href="http://bramgiessen.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn btn-icon fa fa-globe" />
              </a>
            </li>
            <li>
              <a
                title="Open this project on Github"
                href="https://github.com/brambo48/react-youtube-sync"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn btn-icon fa fa-github" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="g-row">
        <div className="g-col">
          <SearchBar search={search} handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  search: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default AppHeader;
