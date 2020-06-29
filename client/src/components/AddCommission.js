import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { storage } from '../firebase';
import { useDispatch } from "react-redux";
import { addCommission } from "../store/actions";

export default function AddCommission() {
  const [title, setTitle] = useState("");
  const [image_url, setImage_url] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] =useState('')
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()

  const center = {
    display: "block",
    marginTop: 50,
    marginleft: "auto",
    marginright: "auto",
    width: "100%",
    height: "100%",
    maxWidth: 200,
    maxHeight: 200,
  };

  function addNewCommission() {
    const data = {
      title,
      image_url,
      price,
      category,
      description
    };

    dispatch(addCommission(data))
      // .then(() => {
        history.push('/')
      // })
      // .catch(err => {
      //   console.log(err.response);
      // })
  }

  const setUploadedImage = (event) => {
    const image = event.target.files[0];
    const storageRef = storage.ref(`${image.name}`).put(image)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setImage_url(url)
        })
      })
  }

  return (
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-6">

        </div>
        <div class="col-12">
          <h1 class="text-center"  style={{marginTop: 50}}>Add Commission</h1>
          
          <div class="input-group-prepend">
            {" "}
            <span style={{fontSize: 22, marginRight: 80}}>Title</span>
            <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setTitle(event.target.value)}
          />
          </div>
          <br/>

          <div class="input-group-prepend">
            {" "}
            <span style={{fontSize: 22, marginRight: 32}}>ImageUrl</span>
            <input
            type="file"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={setUploadedImage}
          />
          </div>
          <img src={image_url} style={center} alt="imageUpload"></img>
          <br/>

          <div class="input-group-prepend">
            {" "}
            <span style={{fontSize: 22, marginRight: 10}}>Decription</span>
          </div>
          <textarea
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onChange={(event) => setDescription(event.target.value)}
          />
          <br/>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span style={{fontSize: 22, marginRight: 10}}>Price</span>
              <span style={{fontSize: 22, marginRight: 40}}>Rp.</span>
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
            <span style={{fontSize: 22, marginRight: 40}}>Category</span>
            <select
            name="category"
            class="form-control"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option defaultChecked>---select---</option>
            <option>2D Art</option>
            <option>3D Art</option>
          </select>
          </div>
          <br/>
         
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block"
            onClick={addNewCommission}
          >
            Add Commission
          </button>
        </div>
        <div class="col col-lg-3"></div>
      </div>
    </div>
  );
}