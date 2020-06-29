import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUserWorksAndCommissions, getUserWorks } from '../store/actions'
import { Link } from 'react-router-dom'
import WorkCard from './WorkCard'

const UserWork = () => {
  const works = useSelector((state) => state.works)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserWorks())
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
          <h2 style={{ textAlign: 'center' }}>My Portfolio</h2>
            <Link className='btn btn-primary add-new' to ='/works/add'>+ Add Portfolio</Link>
        </div>
        <WorkCard worksdata={works} />
    </div>
  );
}

export default UserWork;