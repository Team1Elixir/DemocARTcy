import React, { useEffect } from 'react';
import { getAllCommissions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import CommissionCard from './CommissionCard'

const MainCommission = () => {
  const commissionsdata = useSelector((state) => state.allcommissions)
  const dispatch = useDispatch()
  console.log(commissionsdata)

  useEffect(() => {
      dispatch(getAllCommissions())
  }, []);

  return (
    <div style={{ marginTop: 100 }}>
      <CommissionCard commissionsdata={commissionsdata} />
    </div>
  );
}

export default MainCommission;
