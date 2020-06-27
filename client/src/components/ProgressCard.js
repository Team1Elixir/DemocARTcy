import React from 'react';
import './Progress.css';

const ProgressCard = () => {
  return (
    <div className="d-flex w-100 flex-column align-items-center mt-3">
      <div className="row w-100 progress-container d-flex align-items-center">
        <div className="col-3 d-flex flex-column align-items-center">
          <img src="https://avatarfiles.alphacoders.com/875/thumb-87589.png" alt="avatar" className="artist-ava" width="120"></img>
          <p className="mb-0 text-pinky artist-name">Hueyguey</p>
        </div>
        <div className="col-3">
          <p className="mb-0 text-pinky job-title">2D Doodle Art</p>
        </div>
        <div className="col-3">
          <h2 className="mb-0 job-status p-3  "><span className="badge">onRequest</span></h2>
        </div>
        <div className="col-3 d-flex justify-content-center">
          <div className="progress-button w-50 text-center">
            <p className="mb-0">Sketch</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
