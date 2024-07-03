// Libs & utils
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// CSS
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

// Components
import AppHeader from "../appHeader/AppHeader";
import SetUserNamePopup from "../setUserNamePopup/SetUserNamePopup";

// Actions
import { appActions } from "../../core/app";
import { searchActions } from "../../core/search";
import { userActions } from "../../core/user";

const App = ({
  search,
  user,
  app,
  party,
  navigateToPath,
  handleSearch,
  toggleSearch,
  setUserName,
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (app.currentPath) {
      navigate(app.currentPath);
    }
  }, [app.currentPath, navigate]);

  useEffect(() => {
    if (party.partyId) {
      navigate(`/party/${party.partyId}`);
    }
  }, [party.partyId, navigate]);

  return (
    <div className="app grid">
      <AppHeader
        search={search}
        user={user}
        toggleSearch={toggleSearch}
        handleSearch={handleSearch}
      />

      <SetUserNamePopup
        isVisible={!user || !user.userName}
        handleSetUserName={setUserName}
      />

      <main className="main">{children}</main>
    </div>
  );
};

App.propTypes = {
  search: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  party: PropTypes.object.isRequired,
  navigateToPath: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  search: state.search,
  user: state.user,
  app: state.app,
  party: state.party,
});

const mapDispatchToProps = {
  navigateToPath: appActions.navigateToPath,
  handleSearch: searchActions.handleSearch,
  toggleSearch: searchActions.toggleSearchField,
  setUserName: userActions.setUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
