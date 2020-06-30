import React, { useEffect, useState } from 'react';
import ProgressCard from './ProgressCard';
import Loader from 'react-loader-spinner';
import './Progress.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProgressClient, getProgressArtist } from '../store/actions';
import { useLocation } from 'react-router-dom';

const Progress = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const projects = useSelector(state => state.progress);
  const loading = useSelector(state => state.loading);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (location.pathname.includes('artist')) {
      dispatch(getProgressArtist());
      setRole('Artist');
    } 
    else if (location.pathname.includes('client')) {
      setRole('Client');
      dispatch(getProgressClient());
    } 
  }, [dispatch, location.pathname])
  
  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)

  return (
    <div className="container-fluid w-100 d-flex flex-column align-items-center mb-5" style={{ marginTop: 50 }}>
      <h1 className="progress-main-title mb-5">Progress {role}</h1>
      <div class="w-100 d-flex justify-content-center flex-wrap">
        {
          loading &&
          <Loader 
            type="ThreeDots"
            color="#73CDD1"
            height={150}
            width={150}
          />
        }
        { 
          !loading &&
          projects.map((project, index) => {
            return (
              <ProgressCard data={project} role={role} key={index} />
            )
          })
        }
      </div>
    </div>
  );
}

export default Progress;
