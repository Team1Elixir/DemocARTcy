import React from "react";
import Payment from "./Payment";
import { useHistory } from "react-router-dom";
import "./Progress.css";

const ProgressCard = ({ data, role }) => {
  const history = useHistory();
  const { id, title, price, status, client, artist } = data;

  const toLiveSketch = () => {
    const dataForLiveSketch = {
      progressId: id,
      clientId: client.id,
      clientUsername: client.username,
      artistId: artist.id,
      artistUsername: artist.username,
    };

    history.push("/livesketch/", dataForLiveSketch);
    console.log(dataForLiveSketch);
  };

  const toLiveChat = () => {
    const dataForLiveChat = {
      progressId: id,
      clientId: client.id,
      clientUsername: client.username,
      artistId: artist.id,
      artistUsername: artist.username,
    };

    history.push("/chat/", dataForLiveChat);
  };

  return (
    <div className="row w-100 progress-container d-flex align-items-center mt-3">
      <div className="col-3 d-flex flex-column align-items-center">
        <img
          src={role === 'Artist' ? client.profile_url : artist.profile_url}
          alt="avatar"
          className="artist-ava"
          width="120"
        ></img>
        <p className="mb-0 text-bluish artist-name">{role == 'Artist' ? client.username : artist.username}</p>
      </div>
      <div className="col-3">
        <p className="mb-0 text-bluish job-title text-center">{title}</p>
      </div>
      <div className="col-3">
        <h2 className="mb-0 job-status p-3 text-center">
          <span className="badge">{status}</span>
        </h2>
      </div>
      <div className="col-3 d-flex justify-content-center">
        {status === "onProgress" && (
          <>
          <div
            className="progress-button w-50 text-center"
            onClick={toLiveSketch}
          >
            <p className="mb-0">Sketch</p>
          </div>
          <div
          className="progress-button w-50 text-center"
          onClick={toLiveChat}
        >
          <p className="mb-0">Chat</p>
        </div>
        </>
        )}
        {status === "Done" && <Payment price={price} email={client.email} />}
      </div>
    </div>
  );
};

export default ProgressCard;
