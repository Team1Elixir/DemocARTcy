import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserWorks } from '../store/actions'
import { Link } from 'react-router-dom'
import WorkCard from './WorkCard'
import Loader from 'react-loader-spinner';

const UserWork = () => {
  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserWorks())
  },[])

  if(loading) return (<div style={{ marginTop: 300, textAlign: 'center' }}> <Loader/> </div>)

  if(error) return(
    <div style={{ marginTop: 100 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Portfolio</h2>
            <Link className='btn btn-primary add-new' to ='/works/add'>+ Add Portfolio</Link>
        </div>
        
    </div>
  )

  return (
      <div style={{ marginTop: 100 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Portfolio</h2>
            <Link className='btn btn-primary add-new' to ='/works/add'>+ Add Portfolio</Link>
        </div>
        <div className='cards-content-holder'>
          {works.map(card => {
            return  <WorkCard card={card} key={card.id} />
            })
          }
        </div>
    </div>
  );
}

export default UserWork;