import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserWorks } from '../store/actions'
import { Link } from 'react-router-dom'
import WorkCard from './WorkCard'
import Loader from 'react-loader-spinner';
import './UserArea.css';

const UserWork = () => {
  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserWorks())
  },[])

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)

  if(error) return(
    <div style={{ marginTop: 50 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Portfolio</h2>
            <Link className='btn btn-primary add-new' to ='/works/add'>+ Add Portfolio</Link>
        </div>
    </div>
  )

  return (
      <div style={{ marginTop: 50 }}>
        <div className='buttonpanel d-flex flex-column'>
          <h2 style={{ textAlign: 'center'}} className="user-area-title mb-0">My Portfolios</h2>
          <Link className='btn btn-bluish add-new' to ='/works/add'><i class="fas fa-plus"></i> Add Portfolio</Link>
        </div>
        <div className='cards-content-holder mb-5'>
          {works.map(card => {
            return  <WorkCard card={card} key={card.id} />
            })
          }
        </div>
    </div>
  );
}

export default UserWork;