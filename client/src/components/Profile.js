import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProfileData } from '../store/actions'
import { useParams, Link } from 'react-router-dom'
import WorkCard from './WorkCard'
import CommissionCard from './CommissionCard'
import '../assets/profile.css'
import Loader from 'react-loader-spinner';

const Profile = () => {
  const [cardbg, setCardbg] = useState('#DBF5FA')
  const [fontcolor, setFontcolor] = useState('');
  const [mode, setMode] = useState('Dark');
  const [background, setBackground] = useState('');
  const user = useSelector((state) => state.profiledata)
  const works = useSelector((state) => state.works)
  const commissions = useSelector((state) => state.commissions)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const {username} = useParams()

//  #18195e63

  useEffect(() => {
    dispatch(getProfileData(username))
    if(localStorage.darkmode == 'dark') {
      setBackground('black')
      setFontcolor('white')
      setMode('Light')
      setCardbg('#18195e63')
    } else {
      setBackground('#DBF5FA')
      setMode('Dark')
      setFontcolor('')
      setCardbg('#DBF5FA')
    }
  }, [username])

  const toggleDarkMode = (e) => {
    e.preventDefault()
    if(background !== 'black') {
      setBackground('black')
      setFontcolor('white')
      setMode('Light')
      setCardbg('#18195e63')
      localStorage.setItem('darkmode', 'dark')
    } else {
      setBackground('#DBF5FA')
      setMode('Dark')
      setFontcolor('')
      setCardbg('#DBF5FA')
      localStorage.setItem('darkmode', 'light')
    }
  }

  if(loading) return (<div style={{ marginTop: 200, textAlign: 'center' }}> <Loader type='Grid' color='#023E8A' /> </div>)
  
  return (
      <div className='profileContent' style={{color: fontcolor}}>
{/*        <button onClick={e=> toggleDarkMode(e)} className='clientprogressbtn btn position-absolute' style={{ marginTop: 10 }}>{mode} Mode</button> */}
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
            { username === localStorage.username &&
              <div className='progress-button-panel'>
                <Link to='/progress-client' className='clientprogressbtn btn'>Client Progress</Link>
                <Link to='/progress-artist' className='editbtn btn'>Art Progress</Link>
              </div>
            }
          </div>
          { username === localStorage.username &&
            <div className='edit-button'>
                <Link to={'/profile/edit/'+user.username} className='edit-profile-btn btn btn-primary'>Edit Profile</Link>
            </div>
          }
          
        </div><br />
        <div className='profile-portofolio'>
            <br/><h5 className="profile-works mb-0">Portofolios</h5><br />
          <div className='work-data' style={{ background: cardbg }}>
            <div className='profile-card-container'>
            { works.map (card => {
              return <WorkCard card={card} key={card.id} />
              })}
            </div>
          </div>
            <br/><h5 style={{ marginBottom: -10, marginTop: 10 }} className="profile-works mb-1">Commissions</h5><br />
          <div className='work-data' style={{ background: cardbg }}>
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
