import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getWorksData } from '../store/actions'
import { Link } from 'react-router-dom'

const UserWork = () => {
  const worksdata = useSelector((state) => state.worksdata)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getWorksData())
  },[])
  return (
      <div style={{ marginTop: 100 }}>
      <h2>My Works</h2>
      <div className='add-button'>
        <Link to ='/works/add'>Add Work</Link>
      </div>
      <div className='work-profile-cards'>
          { worksdata.map((card,i) => {
              return (
              <div className='cards'>
                <img className='img-card' alt={i} src={card.image_url} />
              </div>
              )
            })
          }
        </div>
    </div>
  );
}

export default UserWork;
