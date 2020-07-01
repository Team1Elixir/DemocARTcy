import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import sample from "../samples/Raelaveire/1592696790749.jpg";
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions";
import { successAlert } from './alerts'
import './RegisterForm.css';

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const loading = useSelector(state => state.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  
  function register(event) {
    event.preventDefault()

    const data = {
      username,
      email,
      password,
    };

    dispatch(registerUser(data))
      .then(data => {
        if (data) {
          successAlert('Registration Success 😊' )
          history.push('/login');
        }
      })
  }

  useEffect(() => {
    if(localStorage.token) history.push('/');
  }, [])
  
  return (
    <div className='loginpage'>
        <div className='form-div'>
          <div className='log-header'>
            <p className="register-title mb-0">Register Page</p>
          </div>
          <div className='text-input'>
            <input type='text'
              className="registerForm"
              value={email} 
              onChange={e => setEmail(e.target.value) } 
              placeholder='email' />
            <input type='text'
              className="registerForm"
              value={username} 
              onChange={e => setUsername(e.target.value) } 
              placeholder='username' />
            <input type='password' 
              className="registerForm"
              value={password} 
              onChange={e => setPassword(e.target.value) } 
              placeholder='password' />
          </div>
          <button className='submitlogin btn btn-darker-blue mt-3' onClick={e => register(e)}>Register</button>
          <Link className='registerbutton text-darker-blue mb-0' to='/login'>I have an account</Link>
          {
            loading &&
            <Loader 
              type="ThreeDots"
              color="#023e8a"
              height={150}
              width={150}
            />
          }
        </div>
        <div className='image-div'>
        <img className='img-login' alt='sample' src={sample} style={{position: "relative",zIndex:-1}}></img>
          <button  className="btn btn-primary btn-lg" style={{opacity:0.5,backgroundColor: '#5c5c5c',color:'#ffffff',right: '25%',top: 550, position: "absolute"}}>Credits:Raelaveire</button>
        </div>
    </div>
  );
}
