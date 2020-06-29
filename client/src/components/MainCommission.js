import React, { useEffect } from 'react';
import { getAllCommissions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import CommissionCard from './CommissionCard'

const MainCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCommissions())
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <CommissionCard commissionsdata={commissions} />
    </div>
  )
}

export default MainCommission;