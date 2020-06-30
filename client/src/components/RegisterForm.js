import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import sample from "../samples/Raelaveire/1592696790749.jpg";
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions";

export default function RegisterForm() {
  const error = useSelector(state => state.error)
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
      .then(res => {
        console.log(res);
        // history.push('/login'); 
      })
  }

  useEffect(() => {
    if(localStorage.token) history.push('/');
  }, [])
  
  return (
    <div className='loginpage'>
        <div className='form-div'>
          <div className='log-header'>
            <h2>Register Page</h2>
          </div>
          <div className='text-input'>
            <input type='text'
              value={email} 
              onChange={e => setEmail(e.target.value) } 
              placeholder='email' />
            <input type='text'
              value={username} 
              onChange={e => setUsername(e.target.value) } 
              placeholder='username' />
            <input type='password' 
              value={password} 
              onChange={e => setPassword(e.target.value) } 
              placeholder='password' />
          </div>
          <button className='submitlogin btn btn-primary' onClick={e => register(e)}>Register</button>
          <Link className='registerbutton' to='/login'>I have an account</Link>
          {
            loading &&
            <Loader 
              type="ThreeDots"
              color="#F5C50E"
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
