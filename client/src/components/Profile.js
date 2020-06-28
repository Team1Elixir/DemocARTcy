import React, { useEffect } from 'react';
import '../assets/profile.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileData } from '../store/actions'
import { useParams, Link } from 'react-router-dom'

const Profile = () => {

  const dummycards = [
    { img: 'https://pm1.narvii.com/6505/21c144ad58b67039ab42ffed896c7c21f75c888c_hq.jpg' },
    { img: 'https://img.wethrift.com/yuumei-art.jpg'},
    { img: 'https://4.bp.blogspot.com/-Srvde-da9sc/UJiDbgmPLeI/AAAAAAAAANM/9CZGLWIwBMA/s1600/guilty-by-yuumei.jpg'}]
  const user = useSelector((state) => state.profiledata)
  const error = useSelector((state) => state.error)
  const loading = useSelector((state) => state.loading)
  console.log(user)
  const dispatch = useDispatch()
  const {username} = useParams()

  useEffect(() => {
    dispatch(getProfileData(username))
  }, [])
  
  if(loading) return (
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>loading..</h6>
      </div>
    </div>
  )
  
  if(user.name && user.username !== localStorage.username) return (
    <div className='profileContent'>
      <div className='profile-cover'>
        <img className='cover-img' alt='profile-cover' src={user.cover_url} />
      </div>
      <div className='profile-data'>
        <div className='profile-img'>
          <img className='user-img' src={user.profile_url} alt={user.name} />
        </div>
        <div className='profile-biodata'>
          <h3>{user.name}</h3>
          <p className='username'>@{user.username}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );

  if(user.name && user.username === localStorage.username) return (
    <div className='profileContent'>
      <div className='profile-cover'>
        <img className='cover-img' alt='profile-cover' src={user.cover_url} />
      </div>
      <div className='profile-data'>
        <div className='profile-img'>
          <img className='user-img' src={user.profile_url} alt={user.name} />
        </div>
        <div className='profile-biodata'>
          <h3>{user.name}</h3>
          <p className='username'>@{user.username}</p>
          <p>{user.bio}</p>
          <a href={'https://'+user.website} className='user-website'>{user.website}</a>
        </div>
        <div className='edit-button'>
          <Link to={'/profile/edit/'+user.username} className='editbtn btn btn-secondary'>Edit Profile</Link>
        </div>
      </div><br />
      <div className='work-data'>
        <h5>Works</h5><br />
        <div className='work-profile-cards'>
          { dummycards.map((card,i) => {
              return (
              <div className='cards'>
                <img className='img-card' alt={i} src={card.img} />
              </div>
              )
            })
          }
        </div>
      </div>
      <div style={{ height: 75}}></div>
    </div>
  )

  else if(error) return(
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>{error.message + ' : Not Found'}</h6>
      </div>
    </div>
  )
}

export default Profile;
