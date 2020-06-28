import React, { useEffect } from 'react';
import ProgressCard from './/ProgressCard';
import './Progress.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProgressClient } from '../store/actions';

const Progress = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.progressClient)

  useEffect(() => {
    dispatch(getProgressClient());
  }, [dispatch])

  return (
    <div className="container d-flex flex-column align-items-center mb-5" style={{ marginTop: 75 }}>
      <h1 className="progress-main-title">Progress Bar</h1>
      {
        projects.map(project => {
          return (
            <ProgressCard data={project} role="client" key={project.id}/>
          )
        })
      }
    </div>
  );
}

export default Progress;
