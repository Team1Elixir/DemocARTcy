import React, { useEffect } from 'react';
import './DetailCommission.css';
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getCommissionDetail } from '../store/actions'

const DetailCommission = () => {
  const { id } = useParams()
  const commission = useSelector((state) => state.commissiondetail)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCommissionDetail(+id))
  console.log(commission)
  }, []);
  if (loading) return (
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>loading..</h6>
      </div>
    </div>
  )
  if (commission.username !== localStorage.username) return (
    <div style={{marginTop: 60}} className="container-fluid d-flex flex-column align-items-center pr-3 pl-3">
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6">
          <img
            src={commission.sample_img}
            width="80%"
            alt={commission.title}
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center justify-content-around p-3">
          <p className="com-title">{commission.title}</p>
          <p className="com-price">{commission.price}</p>
          <h3 className="text-left"><span class="badge badge-info p-2 com-category">{commission.category}</span></h3>
          <div className="apply-button">
            <p className="mb-0">Apply for Commission</p>
          </div>
        </div>
      </div>
      <div className="com-desc mt-3">
        <p className="com-desc-text">
          {commission.description}
        </p>
      </div>
    </div>
  );

  else return (
    <div style={{marginTop: 60}} className="container-fluid d-flex flex-column align-items-center pr-3 pl-3">
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6">
          <img
            src={commission.sample_img}
            width="80%"
            alt={commission.title}
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center justify-content-around p-3">
          <p className="com-title">{commission.title}</p>
          <p className="com-price">{commission.price}</p>
          <h3 className="text-left"><span class="badge badge-info p-2 com-category">{commission.category}</span></h3>
        </div>
      </div>
      <div className="com-desc mt-3">
        <p className="com-desc-text">
          {commission.description}
        </p>
      </div>
    </div>
  )
}

export default DetailCommission;
