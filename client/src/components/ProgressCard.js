import React from "react";
import Payment from "./Payment";
import { useHistory } from "react-router-dom";
import "./Progress.css";

const ProgressCard = ({ data }) => {
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

    history.push("/liveSketch/", dataForLiveSketch);
    console.log(dataForLiveSketch);
  };

  return (
    <div className="row w-100 progress-container d-flex align-items-center mt-3">
      <div className="col-3 d-flex flex-column align-items-center">
        <img
          src='https://avatarfiles.alphacoders.com/875/thumb-87589.png'
          alt="avatar"
          className="artist-ava"
          width="120"
        ></img>
        <p className="mb-0 text-bluish artist-name">{artist.username}</p>
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
          <div
            className="progress-button w-50 text-center"
            onClick={toLiveSketch}
          >
            <p className="mb-0">Live Sketch</p>
          </div>
        )}
        {status === "Done" && <Payment price={price} email={client.email} />}
      </div>
    </div>
  );
};

export default ProgressCard;
