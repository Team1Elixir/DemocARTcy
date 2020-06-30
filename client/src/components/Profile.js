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
  const error = useSelector((state) => state.error)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const {username} = useParams()

  useEffect(() => {
    dispatch(getProfileData(username))
  }, [username])

  if(loading) return (<div style={{ marginTop: 300, textAlign: 'center' }}> <Loader/> </div>)
  
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
          </div>
          { username === localStorage.username &&
          <div className='edit-button'>
            <Link to={'/profile/edit/'+user.username} className='editbtn btn btn-secondary'>Edit Profile</Link>
            <Link to='/progress-client' className='editbtn btn btn-secondary'>Client Progress</Link>
            <Link to='/progress-artist' className='editbtn btn btn-secondary'>Art Progress</Link>
          </div>
          }
        </div><br />
          <br/><h5>Portofolios</h5><br />
        <div className='work-data'>
          { works.map (card => {
            return <WorkCard card={card} key={card.id} />
            })}
        </div>
          
        <br/><h5 style={{ marginBottom: -10, marginTop: 10 }}>Commissions</h5><br />

        <div className='work-data'>
          { commissions.map (card => {
            return <CommissionCard card={card} key={card.id} />
            })}
        </div>
        <div style={{ height: 75}}></div>
      </div>
    )
}

export default Profile;
