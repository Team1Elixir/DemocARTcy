import React, { useState } from "react";
import Axios from "axios";

export default function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  
  function login(){

    const data = {
      username,
      password
    }

    Axios.post('http://localhost:3000/users/login',data)
      .then(({data}) => {
        console.log('login completed')
      })
      .catch(console.log)
  }

  return (
    <div class="container ">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3"></div>
        <div class="col-6  py-md-5 bg-light shadow-lg p-3 mb-5 bg-white rounded">
            <h1 class="text-center">Login</h1>
            
              <div class="input-group-prepend"> <span class="input-group-text">Username</span></div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setUsername(event.target.value)}
            />
            
            <div class="input-group-prepend"> <span class="input-group-text">Password</span></div>
            <input
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={login}>
              Login
            </button>
        </div>
        <div class="col col-lg-3"></div>
      </div>
    </div>
  );
}
