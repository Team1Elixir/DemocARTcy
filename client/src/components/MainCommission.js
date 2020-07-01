import React, { useEffect } from 'react';
import { getAllCommissions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import CommissionCard from './CommissionCard'
import Loader from 'react-loader-spinner';
import './MainWorkCommission.css';

const MainCommission = () => {
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllCommissions())
  }, []);

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)
  // if(error) return (<div style={{ marginTop: 300, textAlign: 'center' }}><h3>Empty</h3></div>)
  return (
    <div style={{marginTop: 50}}>
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