import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddCommission() {
  const [title, setTitle] = useState("");
  const [sample_img, setsample_img] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] =useState('')
  const [category, setCategory] = useState("");

  const history = useHistory()

  const center= {
    display: 'block',
    marginleft: 'auto',
    marginright: 'auto',
    width: '100%',
    height: '100%',
    maxWidth: 550,
    maxHeight: 150
  }

  function addNew() {
    const data = {
      title,
      sample_img,
      price,
      category,
      description
    };
    console.log(data);

    Axios.post("http://localhost:3000/commissions/", data, {
      headers: {
        token: localStorage.token
      },
    })
      .then(({ data }) => {
        console.log("add commission completed");
        history.push('/login')
      })
      .catch(err => {
        console.log(err.response.data)
      });
  }

  return (
    <div class="container ">
      <div class="row justify-content-md-center">
        <div class="col col-lg-3"></div>
        <div class="col-6 ">
          <h1 class="text-center">Add Commission</h1>
          <img src={sample_img} style={center}/>
          <div class="input-group-prepend">
            {" "}
            <span class="input-group-text">Title</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setTitle(event.target.value)}
          />

          <div class="input-group-prepend">
            {" "}
            <span class="input-group-text">Image Url</span>
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setsample_img(event.target.value)}
          />

          <div class="input-group-prepend">
            {" "}
            <span class="input-group-text">Decription</span>
          </div>
          <textarea
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setDescription(event.target.value)}
          />
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Min Price</span>
              <span class="input-group-text">Rp.</span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Dollar amount (with dot and two decimal places)"
              onChange={(event) => {setPrice(event.target.value)}}
            />
          </div>

          <div class="input-group-prepend">
            {" "}
            <span class="input-group-text">Category</span>
          </div>
          <select
            name="category"
            class="form-control"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option defaultChecked>---select---</option>
            <option>2D Art</option>
            <option>3D Art</option>
          </select>
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block"
            onClick={addNew}
          >
            Add Work
          </button>
        </div>
        <div class="col col-lg-3"></div>
      </div>
    </div>
  );
}
