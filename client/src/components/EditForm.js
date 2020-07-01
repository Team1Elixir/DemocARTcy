import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileData, editProfile } from '../store/actions'
import { storage } from '../firebase';

import '../assets/editform.css'

const EditForm = () => {
  const user = useSelector((state) => state.profiledata)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [bio, setBio] = useState(user.bio)
  const [website, setWebsite] = useState(user.website)
  const [password, setPassword] = useState('')
  const [cover_url, setCover_url] = useState(user.cover_url)
  const [profile_url, setProfile_url] = useState(user.profile_url)
  const dispatch = useDispatch()
  const history = useHistory()

  const setCoverForUpload = (event) => {
    const image = event.target.files[0];
    const storageRef = storage.ref(`${image.name}`).put(image)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setCover_url(url)
        })
      })
  }

  const setImageForUpload = (event) => {
    const image = event.target.files[0];
    const storageRef = storage.ref(`${image.name}`).put(image)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setProfile_url(url)
        })
      })
  }

  useEffect(() => {

    dispatch(getProfileData(localStorage.username))
  
  }, [])

  const submitEdit = (event) => {
    event.preventDefault()
    const payload = {
      id: user.id,
      data: {
        name: name || user.name,
        email: email || user.email,
        bio: bio || user.bio,
        website: website || user.website,
        cover_url: cover_url || user.cover_url,
        profile_url: profile_url || user.profile_url,
        password
      }
    }
    dispatch(editProfile(payload));
    history.push('/profile/' + localStorage.username)
  }

  const cancel = (event) => {
    event.preventDefault()
    history.push('/profile/'+user.name)
  }

  return(
    <div>
      <div style={{height: 10}}></div>
      <div className='editForm'>
        <h2>Edit Profile</h2>
        
        <div className='formEdit'>
          <form onSubmit={e => submitEdit(e)} style={{textAlign: 'center'}}>
            <p className='labelInputEdit'>Password Verification</p>
            <input type='password'
              value={password} 
              onChange={e => setPassword(e.target.value) } 
              placeholder={'Verify Password'}
              className='text-input'
              required='true' />

            <p className='labelInputEdit'>Cover URL</p>
            <input
            type="file"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            className='file-input'
            onChange={e => setCoverForUpload(e)} />
            
            <p className='labelInputEdit'>Profile Picture</p>
            <input
            type="file"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            className='file-input'
            onChange={e=> setImageForUpload(e)} />

            <p className='labelInputEdit'>Name</p>
            <input type='text'
              value={name} 
              onChange={e => setName(e.target.value) } 
              placeholder={'name'}
              className='text-input' />

            <p className='labelInputEdit'>E-mail</p>
            <input type='text'
              value={email} 
              onChange={e => setEmail(e.target.value) } 
              placeholder={user.email}
              className='text-input' />

            <p className='labelInputEdit'>Bio</p>
            <input type='text'
              value={bio} 
              onChange={e => setBio(e.target.value) } 
              placeholder={'bio'}
              className='text-input' />

            <p className='labelInputEdit'>Website</p>
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