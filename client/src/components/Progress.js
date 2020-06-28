import React from 'react';
import ProgressCard from './/ProgressCard';
import './Progress.css';

const Progress = () => {
  const dummyProgress = [
    {
      id: 2,
      title: 'Doodle Art',
      status: 'onProgress',
      price: '120000',
      ClientId: 2,
      ArtistId: 1,
      client: {
        id: 2,
        username: 'heroman',
        email: 'heroman@mail.com'
      },
      artist: {
        id: 1,
        username: 'hueyguey',
        email: 'hueyguey@mail.com'
      }
    },
    {
      id: 2,
      title: '3D Character Design',
      status: 'Done',
      price: '500000',
      ClientId: 3,
      ArtistId: 6,
      client: {
        id: 3,
        username: 'dadaduy',
        email: 'dadaduy@mail.com'
      },
      artist: {
        id: 6,
        username: 'blackpatuy',
        email: 'patatuy@mail.com'
      }
    }

  ]
  return (
    <div className="container d-flex flex-column align-items-center mb-3">
      <h1>Progress Bar</h1>
      {
        dummyProgress.map(project => {
          return (
            <ProgressCard data={project} role="client" />
          )
        })
      }
    </div>
  );
}

export default Progress;
