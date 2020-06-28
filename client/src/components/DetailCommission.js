import React, { useEffect } from 'react';
import './DetailCommission.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCommissionDetail, newProject } from '../store/actions';
import accounting from 'accounting-js'

const DetailCommission = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const commission = useSelector(state => state.comdetail);

  useEffect(() => {
    dispatch(getCommissionDetail(+id))
  }, [dispatch, id])

  const createProject = () => {
    const { title, price, UserId } = commission;
    dispatch(newProject({
      id: UserId,
      title,
      price
    }))
      .then(() => {
        history.push('/progress-client');
      })
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center pr-3 pl-3 mb-3" style={{ marginTop: 75 }}>
      <div className="w-100 d-flex justify-content-center row">
        <div className="col-6 text-center">
          <img
            src={commission.image_url}
            width="80%"
            alt={commission.title}
            className="com-image"
          ></img>
        </div>
        <div className="col-6 com-detail d-flex flex-column align-items-center justify-content-around p-3">
          <p className="com-title">{commission.title}</p>
          <p className="com-price">{accounting.formatMoney(commission.price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })}</p>
          <h3 className="text-left"><span className="badge badge-info p-2 com-category">{commission.category}</span></h3>
          <div className="apply-button">
            <p className="mb-0" onClick={createProject}>Apply for Commission</p>
          </div>
        </div>
      </div>
      <div className="com-desc mt-3 d-flex flex-column align-items-center p-3">
        <h4>Description</h4>
        <p className="com-desc-text mb-0">{commission.description}</p>
      </div>
    </div>
  );
}

export default DetailCommission;
