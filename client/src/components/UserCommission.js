import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserCommissions,getUserData } from '../store/actions'
import { Link } from 'react-router-dom'
import CommissionCard from './CommissionCard'
import Loader from 'react-loader-spinner';
import './UserArea.css';

const UserCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserData(localStorage.username))
    dispatch(getUserCommissions())
  },[])

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)

  if (error) return (
    <div>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Commissions</h2>
            <Link className='btn btn-primary add-new' to ='/commissions/add'>+ Add</Link>
        </div>
        {/* <CommissionCard commissionsdata={commissionsdata} /> */}
    </div>
  )

   return (
   <div>
		<div style={{height: 100}}></div>
        <div className='buttonpanel d-flex flex-column'>
          <h2 style={{ textAlign: 'center' }} className="user-area-title mb-0">My Commissions</h2>
            <Link className='btn btn-bluish add-new' to ='/commissions/add'><i class="fas fa-plus"></i> Add Commission</Link>
        </div>
        <div className='cards-content-holder mb-5' style={{ height: 'inherit' }}>
          {commissions.map(card => {
            return  <CommissionCard card={card} key={card.id} />
          })
          }
        </div>
    </div>
  );

}

export default UserCommission;