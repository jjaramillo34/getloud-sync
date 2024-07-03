// Libs & utils
import React from "react";
import PropTypes from "prop-types";

// CSS
import "./PageHeader.css";

const PageHeader = ({ titleLeader, titleMain, titleAfter }) => {
  return (
    <div className="page-header">
      <div className="g-row">
        <div className="page-header-title">
          <span className="leader">{titleLeader}</span>
          <span className="title-main">{titleMain}</span>
          {titleAfter && <span className="title-after">{titleAfter}</span>}
        </div>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  titleLeader: PropTypes.string.isRequired,
  titleMain: PropTypes.string,
  titleAfter: PropTypes.string,
};

export default PageHeader;
