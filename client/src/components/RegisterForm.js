import React, { useState } from "react";
import Axios from "axios";

import sample from "../samples/Raelaveire/1592696790749.jpg";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function register() {
    const data = {
      username,
      email,
      password,
    };

    Axios.post("http://localhost:3000/users/register", data)
      .then(({ data }) => {
        console.log("register completed");
      })
      .catch(console.log);
  }

  return (
    <div class="">
      <div class="row justify-content-md-center">
        <div class="col-6 container">
          <div
            class="container"
            style={{ paddingTop: 100, paddingLeft: " 15%" }}
          >
            <h1 class="text-center">Register</h1>

            <div class="input-group-prepend">
              {" "}
              <span class="input-group-text">Username</span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setUsername(event.target.value)}
            />

            <div class="input-group-prepend">
              {" "}
              <span class="input-group-text">Email</span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setEmail(event.target.value)}
            />
            <div class="input-group-prepend">
              {" "}
              <span class="input-group-text">Password</span>
            </div>
            <input
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              onClick={register}
            >
              Login
            </button>
          </div>
        </div>
        <div className="col-1"></div>
        <div class="col d-none d-lg-block">
          <img
            src={sample}
            style={{ height: "100%", width: "100%", overflow: "hidden" }}
          />
        </div>
      </div>
    </div>
  );
}
