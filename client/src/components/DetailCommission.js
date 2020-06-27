import React from 'react';
import './DetailCommission.css';

const DetailCommission = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center pr-3 pl-3">
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6">
          <img
            src="https://justiciaparaloscinco.files.wordpress.com/2017/11/coloring-page-adults-doodle-art-rachel.jpg?w=1100"
            width="80%"
            alt="doodle"
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center justify-content-around p-3">
          <p className="com-title">Draw a 2D Doodle Art</p>
          <p className="com-price">Rp 110000</p>
          <h3 className="text-left"><span class="badge badge-info p-2 com-category">2D Art</span></h3>
          <div className="apply-button">
            <p className="mb-0">Apply for Commission</p>
          </div>
        </div>
      </div>
      <div className="com-desc mt-3">
        <p className="com-desc-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper velit eu sem tincidunt, in rhoncus turpis feugiat. Donec quis diam ipsum. Nunc dignissim pharetra massa, vel mollis lacus blandit id. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus pellentesque mattis magna, vel aliquet dolor maximus scelerisque. Suspendisse potenti. Proin ac pharetra eros. Phasellus ac velit metus. Suspendisse id nunc quis risus ultricies aliquam et ut velit. Nulla facilisi.
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies nulla tortor, sit amet laoreet sapien sagittis tincidunt. Mauris ullamcorper venenatis porttitor. Integer vel ligula varius, sagittis odio eget, sollicitudin purus. Vestibulum in elit est. Pellentesque faucibus odio arcu, ac dictum velit efficitur vel. Cras suscipit odio et pulvinar mollis. Proin aliquet semper nunc, vel laoreet nulla congue at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean pellentesque, velit sed faucibus sodales, lorem sapien eleifend metus, a feugiat justo metus nec enim. Phasellus aliquam, justo eu vulputate placerat, leo massa dapibus risus, eget iaculis ante nisl sit amet quam. Sed egestas tellus id dui viverra, in convallis purus aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
        </p>
      </div>
    </div>
  );
}

export default DetailCommission;
