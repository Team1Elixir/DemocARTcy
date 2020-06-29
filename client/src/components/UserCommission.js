import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserCommissions,getUserData } from '../store/actions'
import { Link } from 'react-router-dom'
import CommissionCard from './CommissionCard'

const UserCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserData(localStorage.username))
    dispatch(getUserCommissions())
  },[])

  if(loading) return (
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>loading..</h6>
      </div>
    </div>
  )

  if (commissions) return (
   <div style={{ marginTop: 100 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Commissions</h2>
            <Link className='btn btn-primary add-new' to ='/commissions/add'>+ Add</Link>
        </div>
        <CommissionCard commissionsdata={commissions} />
    </div>
  );

  if(!commissions) return (
    <div style={{ marginTop: 100 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Commissions</h2>
            <Link className='btn btn-primary add-new' to ='/commissions/add'>+ Add</Link>
        </div>
        {/* <CommissionCard commissionsdata={commissionsdata} /> */}
    </div>
  )
}

export default UserCommission;