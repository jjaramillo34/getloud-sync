// Libs & utils
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// CSS
import "./ChatBox.css";

const ChatBox = ({ onMessageSend, partyId, userName, messagesInParty }) => {
  const messageBoxRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messagesInParty]);

  const renderMessages = (messages) => {
    return (
      <div className="messages-wrapper">
        {messages.map((message, index) => {
          const cssClasses = classNames("message", {
            self: userName === message.userName,
          });

          return (
            <div className="message-wrapper" key={index}>
              <div className={cssClasses}>
                <span className="username">{message.userName}: </span>
                <span className="body">{message.message}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const submitChatMessage = (event) => {
    event.preventDefault();
    const inputValue = messageInputRef.current.value.trim();
    if (inputValue) {
      onMessageSend(inputValue, userName, partyId);
      messageInputRef.current.value = "";
    }
  };

  return (
    <div className="chat-box">
      <div className="message-box" ref={messageBoxRef}>
        {renderMessages(messagesInParty)}
      </div>
      <form className="input-box" action="#" onSubmit={submitChatMessage}>
        <input
          type="text"
          ref={messageInputRef}
          className="input"
          placeholder="Say hello!"
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

ChatBox.propTypes = {
  onMessageSend: PropTypes.func.isRequired,
  partyId: PropTypes.string.isRequired,
  userName: PropTypes.string,
  messagesInParty: PropTypes.array,
};

export default ChatBox;
