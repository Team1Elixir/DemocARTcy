import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProfileData, getProfileCommissions,getProfileWorks } from '../store/actions'
import { useParams, Link } from 'react-router-dom'
import WorkCard from './WorkCard'
import CommissionCard from './CommissionCard'
import '../assets/profile.css'
import Loader from 'react-loader-spinner';

const Profile = () => {
  const user = useSelector((state) => state.profiledata)
  const works = useSelector((state) => state.works)
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const {username} = useParams()

  useEffect(() => {
    dispatch(getProfileData(username))
  }, [username])

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)
  
  return (
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
              <div className='progress-button-panel'>
            <Link to='/progress-client' className='clientprogressbtn btn'>Client Progress</Link>
            <Link to='/progress-artist' className='editbtn btn'>Art Progress</Link>
            </div>
          </div>
          { username === localStorage.username &&
            <div className='edit-button'>
                <Link to={'/profile/edit/'+user.username} className='edit-profile-btn btn btn-primary'>Edit Profile</Link>
            </div>
          }
          
        </div><br />
        <div className='profile-portofolio'>
          <div className='work-data'>
            <br/><h5>Portofolios</h5><br />
            <div className='profile-card-container'>

            { works.map (card => {
              return <WorkCard card={card} key={card.id} />
              })}
            </div>
          </div>
          <div className='work-data'>
            <br/><h5 style={{ marginBottom: -10, marginTop: 10 }}>Commissions</h5><br />
            <div className='profile-card-container'>
            {commissions.map(card => {
            return <CommissionCard card={card} key={card.id} />
            })}    
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile;
