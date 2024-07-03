// Libs & utils
import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// CSS
import "./SearchBar.css";

const SearchBar = ({ search, handleSearch }) => {
  const searchBarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const searchBarElement = searchBarRef.current;
    const inputElement = inputRef.current;

    const handleTransitionEnd = () => {
      if (search.expanded) {
        inputElement.focus();
      }
    };

    searchBarElement.addEventListener(
      "transitionend",
      handleTransitionEnd,
      false
    );

    return () => {
      searchBarElement.removeEventListener(
        "transitionend",
        handleTransitionEnd,
        false
      );
    };
  }, [search.expanded]);

  useEffect(() => {
    if (search.expanded) {
      inputRef.current.value = "";
    }
  }, [search.expanded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value.trim();
    handleSearch(inputValue);
  };

  const cssClasses = classNames("search-bar", {
    open: search.expanded,
  });

  return (
    <div className={cssClasses} ref={searchBarRef}>
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <input
          ref={inputRef}
          autoComplete="off"
          className="input"
          maxLength="60"
          placeholder="Search Videos / Movies"
          tabIndex="0"
          type="text"
        />
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  search: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
