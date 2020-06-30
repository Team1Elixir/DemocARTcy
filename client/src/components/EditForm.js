import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileData, editProfile } from '../store/actions'
import '../assets/editform.css'

const EditForm = () => {
  const user = useSelector((state) => state.profiledata)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [password, setPassword] = useState('')
  const [cover_url, setCover_url] = useState('')
  const [profile_url, setProfile_url] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {

    dispatch(getProfileData(localStorage.username))
  
  }, [])

  const submitEdit = (event) => {
    event.preventDefault()
    const data = {
      name: name || user.name,
      email: email || user.email,
      bio: bio || user.bio,
      website: website || user.website,
      cover_url: cover_url || user.cover_url,
      profile_url: profile_url || user.profile_url,
      password
    }
    dispatch(editProfile(data));
    history.push('/profile/' + localStorage.username)
  }

  const cancel = (event) => {
    event.preventDefault()
    history.push('/profile/'+user.name)
  }

  return(
    <div style={{marginTop: 50, background: 'url('+cover_url+')' }}>
      <div style={{height: 10}}></div>
      <div className='editForm'>
        <h2>Edit Profile</h2>
        <div className='formEdit'>
          <form onSubmit={e => submitEdit(e)}>
            <input type='password'
              value={password} 
              onChange={e => setPassword(e.target.value) } 
              placeholder={'Verify Password'}
              className='text-input'
              required='true' />
            <input type='text'
              value={cover_url} 
              onChange={e => setCover_url(e.target.value) } 
              placeholder={'cover url'}
              className='text-input' />
            <input type='text'
              value={profile_url} 
              onChange={e => setProfile_url(e.target.value) } 
              placeholder={'profile image url'}
              className='text-input' />
            <input type='text'
              value={name} 
              onChange={e => setName(e.target.value) } 
              placeholder={'name'}
              className='text-input' />
            <input type='text'
              value={email} 
              onChange={e => setEmail(e.target.value) } 
              placeholder={user.email}
              className='text-input' />
            <input type='text'
              value={bio} 
              onChange={e => setBio(e.target.value) } 
              placeholder={'bio'}
              className='text-input' />
            <input type='text'
              value={website} 
              onChange={e => setWebsite(e.target.value) } 
              placeholder={'website'}
              className='text-input' />
              <div className='button'>
                <input className='submit-btn btn btn-primary' type='submit' value='Submit' />
              </div>
          </form>
              <div className='button'>
                <button onClick={e => cancel(e)} className='cancel-btn btn btn-secondary'>Cancel</button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default EditForm