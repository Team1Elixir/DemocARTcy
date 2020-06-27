import React from 'react';
import './DetailWork.css';

const DetailWork = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="w-100 row">
        <div className="col-8 d-flex justify-content-center align-items-center work-image-container">
          <img
            src="https://justiciaparaloscinco.files.wordpress.com/2017/11/coloring-page-adults-doodle-art-rachel.jpg?w=1100"
            alt="doodle"
            width="100%"
            className="work-image"
          ></img>
        </div>
        <div className="col-4 d-flex flex-column justify-content-start w-100 work-desc p-5">
          <p className="work-creator mb-5">Creator: <span>Hueyguey</span></p>
          <p className="work-title mb-5">Doodle Art</p>
          <p className="work-story mb-5">A random doodle art i create on my spare time <span role="img" aria-label="heart">💗</span> </p>
          <h4 className="work-category text-left">Category :<span class="badge badge-info p-2 work-category">2D Art</span></h4>
        </div>
      </div>
    </div>
  );
}

export default DetailWork;
