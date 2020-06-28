import React, { useEffect } from 'react';
import './DetailCommission.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCommissionDetail, newProject } from '../store/actions';

const DetailCommission = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const commission = useSelector(state => state.comdetail);

  useEffect(() => {
    dispatch(getCommissionDetail(+id))
  }, [dispatch, id])

  const createProject = () => {
    const { title, price } = commission;
    console.log(title, price);
    dispatch(newProject({
      id,
      title,
      price
    }))
      .then(() => {
        history.push('/progress-client');
      })
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center pr-3 pl-3" style={{ marginTop: 75 }}>
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6">
          <img
            src={commission.image_url}
            width="80%"
            alt={commission.title}
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center justify-content-around p-3">
          <p className="com-title">{commission.title}</p>
          <p className="com-price">{commission.price}</p>
          <h3 className="text-left"><span className="badge badge-info p-2 com-category">{commission.category}</span></h3>
          <div className="apply-button">
            <p className="mb-0" onClick={createProject}>Apply for Commission</p>
          </div>
        </div>
      </div>
      <div className="com-desc mt-3">
        <p className="com-desc-text">{commission.description}</p>
      </div>
    </div>
  );
}

export default DetailCommission;
