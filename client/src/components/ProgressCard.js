import React from 'react';
import Payment from './Payment';
import './Progress.css';

const ProgressCard = ({ data }) => {
  const { id, title, price, status, client, artist } = data;

  const toLiveSketch = () => {
    const dataForLiveSketch = {
      progressId: id,
      clientId: client.id,
      clientUsername: client.username,
      artistId: artist.id,
      artistUsername: artist.username
    }

    console.log(dataForLiveSketch);
  }

  return (
    <div className="d-flex w-100 flex-column align-items-center mt-3">
      <div className="row w-100 progress-container d-flex align-items-center">
        <div className="col-3 d-flex flex-column align-items-center">
          <img src="https://avatarfiles.alphacoders.com/875/thumb-87589.png" alt="avatar" className="artist-ava" width="120"></img>
          <p className="mb-0 text-pinky artist-name">{artist.username}</p>
        </div>
        <div className="col-3">
          <p className="mb-0 text-pinky job-title text-center">{title}</p>
        </div>
        <div className="col-3">
          <h2 className="mb-0 job-status p-3 text-center"><span className="badge">{status}</span></h2>
        </div>
        <div className="col-3 d-flex justify-content-center">
          {
            status === 'onProgress' &&
            <div className="progress-button w-50 text-center" onClick={toLiveSketch}>
              <p className="mb-0">Sketch</p>
            </div>
          }
          {
            status === 'Done' &&
            <Payment price={price} email={client.email}/>
          }
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
