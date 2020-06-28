import React from 'react';
import ProgressCard from './/ProgressCard';
import './Progress.css';

const Progress = () => {
  return (
    <div className="container d-flex flex-column align-items-center mb-3">
      <h1>Progress Bar</h1>
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
      <ProgressCard />
    </div>
  );
}

export default Progress;
