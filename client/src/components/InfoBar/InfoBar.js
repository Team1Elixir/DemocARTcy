import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      {
        localStorage.role === 'Client' &&
        <a href="/progress-client">
          <img src={closeIcon} alt="close icon" />
        </a>
      }
      {
        localStorage.role === 'Artist' &&
        <a href="/progress-artist">
          <img src={closeIcon} alt="close icon" />
        </a>
      }
    </div>
  </div>
);

export default InfoBar;
