// Libs & utils
import React from "react";
import PropTypes from "prop-types";

// CSS
import "./UserList.css";

const UserList = ({ users }) => {
  const usersInList = users.map((user, index) => (
    <div className="user" key={index}>
      <span className="user-name">{user.userName}</span>
    </div>
  ));

  return (
    <div className="users-in-party-list">
      <h2 className="title">Users in party</h2>
      {usersInList}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
