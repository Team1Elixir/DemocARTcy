import React, { useEffect } from 'react';
import { getAllWorks } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux';
import WorkCard from './WorkCard'
import Loader from 'react-loader-spinner';

const MainWork = () => {

  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getAllWorks())
  }, []);

  if(loading) return (<div style={{ marginTop: 300, textAlign: 'center' }}> <Loader/> </div>)
  // if(error) return (<div style={{ marginTop: 100, textAlign: 'center' }}><h3>Empty</h3></div>)
  return (
    <div style={{ marginTop: 100 }}>
      <h3 style={{ textAlign: 'center'}}>Portfolios</h3>
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