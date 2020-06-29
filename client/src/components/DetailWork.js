import React, { useEffect } from 'react';
import './DetailWork.css';
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getWorkDetail } from '../store/actions'

const DetailWork = () => {
  const { id } = useParams()
  const work = useSelector((state) => state.work)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWorkDetail(+id))
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ marginTop: 75 }}>
      <div className="w-100 row">
        <div className="col-8 d-flex justify-content-center align-items-center work-image-container">
          <img
            src={work.image_url}
            alt={work.title}
            width="100%"
            className="work-image"
          ></img>
        </div>
        <div className="col-4 d-flex flex-column justify-content-start w-100 work-desc p-5">
          <p className="work-creator mb-5">Creator: <Link to={'/profile/'+work.User.username}><span>{work.User.username}</span></Link></p>
          <p className="work-title mb-5">{work.title}</p>
          <p className="work-story mb-5">{work.description}</p>
          <h4 className="work-category text-left">Category : <span class="badge badge-info p-2 work-category">{work.category}</span></h4>
        </div>
      </div>
    </div>
  );
}

export default DetailWork;