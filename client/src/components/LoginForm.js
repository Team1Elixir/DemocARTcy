import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserData } from '../store/actions'
import '../assets/loginform.css'
import sample from "../samples/Raelaveire/1592696790749.jpg";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    axios.post("http://localhost:3000/users/login", payload)
      .then(({ data }) => {
        console.log("login completed");
        localStorage.setItem("token", data.token);
        localStorage.setItem('username', username)
        dispatch(getUserData(username))
        history.push('/')
      })
      .catch(console.log);
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
        </div>
        <div className='image-div'>
          <img className='img-login' alt='sample' src={sample} />
        </div>
    </div>
  );
}
