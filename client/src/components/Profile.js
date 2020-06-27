import React from 'react';
import '../assets/profile.css'

const Profile = () => {

  const user = {
    id: 1,
    email: 'sample@mail.com',
    name: 'Yuumei Art',
    username: 'yuumeiART',
    rating: (48)/5,
    bio: 'Earth without "ART" is just "EH"',
    img: 'https://fc02.deviantart.net/fs71/f/2013/068/9/0/connection_by_yuumei-d5xh09x.jpg',
    cover_url: 'https://i1.wp.com/wallur.com/wp-content/uploads/2016/12/yuumei-background-1.jpg'

  }
  
  return (
    <div className='profileContent'>
      <div className='profile-cover'>
        <img className='cover-img' alt='profile-cover' src={user.cover_url} />
      </div>
      <div className='profile-data'>
        <div className='profile-img'>
          <img className='user-img' src={user.img} alt={user.name} />
        </div>
        <div className='profile-biodata'>
          <h3>{user.name}</h3>
          <p className='username'>@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
