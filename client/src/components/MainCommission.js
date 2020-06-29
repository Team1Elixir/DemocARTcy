import React, { useEffect } from 'react';
import { getAllCommissions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import CommissionCard from './CommissionCard'

const MainCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCommissions())
  }, []);

  if(loading) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Loading.....</h3></div>)
  if(loading) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Error.....</h3></div>)
  return (
    <div style={{ marginTop: 100 }}>
      <CommissionCard commissionsdata={commissions} />
    </div>
  )
}

export default MainCommission;