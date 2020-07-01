import React, { useEffect } from 'react';
import './DetailCommission.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCommissionDetail, newProject, deleteData } from '../store/actions';
import accounting from 'accounting-js'
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';
import {errorAlert} from './alerts'

const DetailCommission = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const commission = useSelector(state => state.commission)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getCommissionDetail(+id))
  }, [dispatch, id])

  const createProject = () => {
    if(!localStorage.token) {
        history.push('/login')
        errorAlert('You must Login First!')
      } else {
      const { title, price, UserId, image_url } = commission;
      dispatch(newProject({
        id: UserId,
        title,
        price,
        sample_url: image_url
      }))
      .then(data => {
        if (data) {
          history.push('/progress-client');
        }
      })
    }
  }

  const deleteHandler = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteData('commission', id))
        .then(() => {
          history.push('/commissions')
        })
      }
    })
  }

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)

  return (
    <div className="container-fluid d-flex flex-column align-items-center pr-3 pl-3 mb-3" style={{ marginTop: 50 }}>
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
          <div className="d-flex flex-column align-items-center">
            <p className="com-title mb-0">{commission.title}</p>
            <p className="com-creator">by {commission.User.username}</p>
          </div>
          <p className="com-price">
            {accounting.formatMoney(commission.price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })}
          </p>
          <div className="com-desc d-flex flex-column align-items-center p-3 text-center">
            <p className="desc-title">Description</p>
            <p className="desc-content">{commission.description}</p>
          </div>
          <h3 className="text-left">
            <span className="badge badge-blue p-2 com-category">{commission.category}</span>
          </h3>
          {
            commission.User.username !== localStorage.username &&
            <div className="apply-button">
              <p className="mb-0" onClick={createProject}>Apply for Commission</p>
            </div>
          }
          {
            commission.User.username === localStorage.username &&
            <div className="delete-button">
              <p className="mb-0" onClick={e=> deleteHandler(e)}>Delete This Commission</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DetailCommission;
