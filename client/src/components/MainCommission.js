import React, { useEffect, useState } from 'react';
import { getAllCommissions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import CommissionCard from './CommissionCard'
import Loader from 'react-loader-spinner';
import './MainWorkCommission.css';

const MainCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const [cardbg, setCardbg] = useState('#DBF5FA')
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCommissions())
  }, []);

  if(loading) return (<div className='loadingscreen' style={{ textAlign: 'center' }}><div style={{marginTop: 200}}><Loader type='Grid' color='#023E8A' /></div></div>)
  // if(error) return (<div style={{ marginTop: 300, textAlign: 'center' }}><h3>Empty</h3></div>)
  return (
    <div style={{background: cardbg }}>
        <div style={{height: 50}}></div>
        <p className="text-center main-porto-title mb-0">Commissions</p>
      <div className='cards-content-holder'>
          {commissions.map(card => {
            return  <CommissionCard card={card} key={card.id} />
          })
          }
        </div>
        <div style={{ height: 75}}></div>
    </div>
  )
}

export default MainCommission;