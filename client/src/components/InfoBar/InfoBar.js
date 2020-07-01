import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";
import { useHistory } from "react-router-dom";

const InfoBar = ({ room, socket }) => {
  const history = useHistory();

  const toClient = () => {
    socket.emit("exit", {
      room: "None",
    });
    history.push("/progress-client");
  };

  const toArtist = () => {
    socket.emit("exit", {
      room: "None",
    });
    history.push("/progress-artist");
  };
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Room {room}</h3>
      </div>
      <div className="rightInnerContainer">
        {localStorage.role === "Client" && (
          <img
            className="exit-btn"
            src={closeIcon}
            alt="close icon"
            onClick={toClient}
          />
        )}
        {localStorage.role === "Artist" && (
          <img
            className="exit-btn"
            src={closeIcon}
            alt="close icon"
            onClick={toArtist}
          />
        )}
      </div>
    </div>
  );
};

export default InfoBar;
