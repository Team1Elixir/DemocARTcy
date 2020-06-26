import React from 'react';
import '../assets/profile.css'

const Profile = () => {

  const user = {
    id: 1,
    email: 'sample@mail.com',
    fullname: 'Yuumei Art',
    rating: (48)/5,
    bio: 'Earth without "ART" is just "EH"',
    img: 'https://fc02.deviantart.net/fs71/f/2013/068/9/0/connection_by_yuumei-d5xh09x.jpg',
    dob: '15 June 1990'
  }
  
  return (
    <div className='profileContent'>
      <div style={{ textAlign: "center" }}>
        <h1>Profile</h1>
      </div>
      <div className='profileCard'>
        <div className='userImage'>
          <img className='profilePicture' src={user.img} alt={user.fullname} />
          <div className='rating'>
            <h6>MY RATING : {user.rating}/10</h6>
          </div>
        </div>
        <div className='profileBio'>
          <div className='biodata'>
            <div className='note'>
              <h6>Username</h6>
            </div>
            <div className='noteValue'>
              <h6>: {user.fullname}</h6>
            </div>
          </div>
          <div className='biodata'>
            <div className='note'>
              <h6>E-mail</h6>
            </div>
            <div className='noteValue'>
              <h6>: {user.email}</h6>
            </div>
          </div>
          <div className='biodata'>
            <div className='note'>
              <h6>Date of Birth</h6>
            </div>
            <div className='noteValue'>
              <h6>: {user.dob}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
