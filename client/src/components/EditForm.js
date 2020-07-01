import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getProfileData, editProfile } from '../store/actions'
import { storage } from '../firebase';

import '../assets/editform.css'
import '../assets/forminputstyle.css'

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
      <div style={{height: 50}}></div>
      <div className='editForm'>
        <h2 style={{textAlign: 'center'}}>Edit Profile</h2>
        <div className='formEdit'>
          <form onSubmit={e => submitEdit(e)} style={{textAlign: 'center'}}>
			<div className='image-input-file-div'>
			  <img className='cover-zone' src={cover_url} alt={user.id}/>
				<input
				  type="file"
				  className='file-input-user-cover	'
				  onChange={e => setCoverForUpload(e)} />
				<p className='overlay-layer'>Cover URL</p>
			</div>
			<div className='image-input-file-div'>
				<img className='avatar-zone' src={profile_url} alt={user.name} />
				<input
				  type="file"
				  className='file-input-user-image'
				  onChange={e=> setImageForUpload(e)} />
			  <p className='overlay-layer'>Upload Photo</p>
			</div>
			<div>
			<label className="field a-field a-field_a1">
			  <input type='password' className="field__input a-field__input" 
			  placeholder="password"
			  value={password}
			  onChange={e=> setPassword(e.target.value)}
			  required />
			  <span className="a-field__label-wrap">
			    <span className="a-field__label">Verify Password</span>
			  </span>
			</label>
			<label className="field a-field a-field_a1">
			  <input type='text' className="field__input a-field__input" placeholder={user.bio}
			  value={bio}
			  onChange={e=> setBio(e.target.value)}
			  />
			  <span className="a-field__label-wrap">
			    <span className="a-field__label">Bio</span>
			  </span>
			</label>
			<label className="field a-field a-field_a1">
			  <input type='text' className="field__input a-field__input" 
			  placeholder={user.website}
			  value={website}
			  onChange={e=> setWebsite(e.target.value)}
			  />
			  <span className="a-field__label-wrap">
			    <span className="a-field__label">Website</span>
			  </span>
			</label>
			<div className='btn-panel'>
			  <input type='submit' className='submit-button btn' value='submit'/>
			</div>
			
			</div>
          </form>
        </div>
    </div>
    </div>
  )
}

export default EditForm