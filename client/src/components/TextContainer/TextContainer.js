import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h1 style={{paddingTop: 10,margin: 20}}>People currently chatting:</h1>
        <div className="activeContainer">
          <br/>
          <h2 style={{paddingTop: 30, marginLeft: 20}}>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                + {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
