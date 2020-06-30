import React, { useEffect } from 'react';
import './DetailCommission.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getCommissionDetail, newProject, deleteData } from '../store/actions';
import accounting from 'accounting-js'
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';

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
          {
            commission.User.username === localStorage.username &&
            <div className='user-panel-detail d-flex justify-content-end'>
              <button className='delete-data-button btn btn-danger' onClick={e=> deleteHandler(e)}>Delete</button>
            </div>
          }
          <p className="com-title">{commission.title}</p>
          <p className="com-price">{accounting.formatMoney(commission.price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })}</p>
          <h3 className="text-left"><span className="badge badge-info p-2 com-category">{commission.category}</span></h3>
          {
            commission.User.username !== localStorage.username &&
            <div className="apply-button">
              <p className="mb-0" onClick={createProject}>Apply for Commission</p>
            </div>
          }
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
