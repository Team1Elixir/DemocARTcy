import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWorksData } from '../store/actions'
import { Link } from 'react-router-dom'
import WorkCard from './WorkCard'

const UserWork = () => {
  const worksdata = useSelector((state) => state.worksdata)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getWorksData())
  },[])
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
