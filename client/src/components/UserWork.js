import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWorksData } from '../store/actions'
import { Link } from 'react-router-dom'
import WorkCard from './WorkCard'

const UserWork = () => {
  const worksdata = useSelector((state) => state.worksdata)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getWorksData())
  },[])

  if(loading) return (
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>loading..</h6>
      </div>
    </div>
  )
  
  return (
      <div style={{ marginTop: 100 }}>
        <div className='buttonpanel'>
          <h2 style={{ textAlign: 'center' }}>My Works</h2>
            <Link className='btn btn-primary add-new' to ='/works/add'>+ Add</Link>
        </div>
        <WorkCard worksdata={worksdata} />
    </div>
  );
}

export default UserWork;
