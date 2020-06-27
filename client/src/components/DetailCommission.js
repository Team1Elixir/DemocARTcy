import React from 'react';
import './DetailCommission';

const DetailCommission = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center p-3">
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6">
          <img
            src="https://justiciaparaloscinco.files.wordpress.com/2017/11/coloring-page-adults-doodle-art-rachel.jpg?w=1100"
            width="80%"
            alt="doodle"
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center p-3">
          <p>Draw a 2D Doodle Art</p>
          <p>Rp 110000</p>
          <h4 className="text-left">Category: <span class="badge badge-info p-2 work-category">2D Art</span></h4>
        </div>
      </div>
      <div className="com-desc">

      </div>
    </div>
  );
}

export default DetailCommission;
