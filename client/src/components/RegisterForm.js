import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, Link } from 'react-router-dom'

import sample from "../samples/Raelaveire/1592696790749.jpg";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory()
  function register(event) {
    event.preventDefault()

    const data = {
      username,
      email,
      password,
    };

    Axios.post("http://localhost:4000/users/register", data)
      .then(({ data }) => {
        console.log("register completed");
        history.push('/login')
      })
      .catch(console.log);
  }

  useEffect(() => {
    if(localStorage.token) history.push('/')
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
        </div>
        <div className='image-div'>
          <img className='img-login' alt='sample' src={sample} />
        </div>
    </div>
  );
}
