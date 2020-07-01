import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/actions'
import Loader from 'react-loader-spinner';
import { successAlert } from './alerts'
import '../assets/loginform.css'
import sample from "../samples/Raelaveire/1592696790749.jpg";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(state => state.loading);
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.token) history.push('/')
  }, [])

  function login(event) {
    event.preventDefault()
    const payload = {
      username,
      password,
    };

    dispatch(loginUser(payload))
      .then((data) => {
        if(data) {
          successAlert('Login Successfully')
          history.push('/');
        }
      })
      .catch(err => {
        console.log(err.reponse);
      })
  }

  return (
    <div className='loginpage'>
        <div className='form-div'>
          <div className='log-header'>
            <h2>Login Page</h2>
          </div>
          <div className='text-input'>
            <input type='text'
              value={username} 
              onChange={e => setUsername(e.target.value) } 
              placeholder='username' />
            <input type='password' 
              value={password} 
              onChange={e => setPassword(e.target.value) } 
              placeholder='password' />
          </div>
          <button className='submitlogin btn btn-primary' onClick={e => login(e)}>Login</button>
          <Link className='registerbutton' to='/register'>Don't have an account?</Link>
          {
            loading &&
            <Loader 
              type="ThreeDots"
              color="#3FC4DE"
              height={150}
              width={150}
            /> 
          }
        </div>
        <div className='image-div'>
        <img className='img-login' alt='sample' src={sample} style={{position: "relative",zIndex:-1}}></img>
          <button  className="btn btn-primary btn-lg" style={{opacity:0.5,backgroundColor: '#5c5c5c',color:'#ffffff',right: '28%',top: 600, position: "absolute", color: "white"}}>Credits:Raelaveire</button>
        </div>
    </div>
  );
}
