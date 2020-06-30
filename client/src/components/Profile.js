import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProfileData, getProfileCommissions,getProfileWorks } from '../store/actions'
import { useParams, Link } from 'react-router-dom'
import WorkCard from './WorkCard'
import CommissionCard from './CommissionCard'
import ProfileWork from './ProfileWork'
import '../assets/profile.css'

const Profile = () => {
  const user = useSelector((state) => state.profiledata)
  const works = useSelector((state) => state.works)
  const error = useSelector((state) => state.error)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const {username} = useParams()

  useEffect(() => {
    dispatch(getProfileData(username))
    localStorage.setItem('profileId', user.id)
    dispatch(getProfileWorks(user.id))
  }, [dispatch])
  
  if(loading) return (
    <div className='profileContent'>
      <div className='error-msg'>
        <h6>loading..</h6>
      </div>
    </div>
  )
  
  if (user.username == localStorage.username) return (
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
            <Link to='/progress-client' className='editbtn btn btn-secondary'>My Progress</Link>
          </div>
        </div><br />
        <div className='work-data'>
          <br/><h5>Works</h5><br />
          { works.map (card => {
            return <WorkCard card={card} />
            })}
        </div>
        <div className='work-data'>
          <br/><h5>Commissions</h5><br />
            {/* <CommissionCard commissionsdata={commissions} /> */}
        </div>
        <div style={{ height: 75}}></div>
      </div>
    )

  else return (
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
        </div><br />
        <div className='work-data'>
          <br/><h5>Works</h5><br />
            {/* <WorkCard worksdata={works} /> */}
        </div>
        <div className='work-data'>
          <br/><h5>Commissions</h5><br />
            {/* <CommissionCard commissionsdata={commissions} /> */}
        </div>
        <div style={{ height: 75}}></div>
      </div>
  )
  
}

export default Profile;
