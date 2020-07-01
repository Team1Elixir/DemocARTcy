import React, { useEffect,useState } from 'react';
import { getAllWorks } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import WorkCard from './WorkCard'
import Loader from 'react-loader-spinner';
import './MainWorkCommission.css';

const MainWork = () => {
  const [cardbg, setCardbg] = useState('#DBF5FA')
  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.darkmode =='dark') {
        setCardbg('black')
      } else {
        setCardbg('#DBF5FA')
      }
      dispatch(getAllWorks())
  }, []);

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)
  // if(error) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Empty</h3></div>)
  return (
    <div style={{ background: cardbg }}>
      <div style={{height: 50}}></div>
      <p className="text-center main-porto-title mb-0">Portfolios</p>
      <div className='cards-content-holder'>
          {works.map(card => {
            return  <WorkCard card={card} key={card.id} />
            })
          }
      </div>
      <div style={{ height: 75}}></div>
    </div>
  )
}

export default MainWork;