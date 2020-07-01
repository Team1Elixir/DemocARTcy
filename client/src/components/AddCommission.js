import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { storage } from '../firebase';
import { useDispatch } from "react-redux";
import { addCommission } from "../store/actions";
import '../assets/addform.css'

import sample from "../assets/displacement.2.png";
import { successAlert } from "./alerts";

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
      .then(data => {
        if (data) {
          successAlert(`${data.commission.title} successfully added to your commission list`)
          history.push('/commissions/user/'+localStorage.username)
        }
      })
  }

  const setUploadedImage = (event) => {
    const image = event.target.files[0];
    let uploadProgress;
    if(image){
      const storageRef = storage.ref(`${image.name}`).put(image)
      storageRef.on('state_changed', snapshot => {
        uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(uploadProgress)
      }, error => { console.log(error.message) },
      () => {
        uploadProgress = 100
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setImage_url(url)
        })
      })
    }
  }
    

  return (
    <div class="">
      <div class="row justify-content-md-center">
      <div class="col-1"></div>
        <div class="col-6 mb-5">
          <h1 class="text-center mb-0 add-title" style={{marginTop: 25}}>Add Commission</h1>
          
          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              position: "relative",
              top: 15,
              left: 10,
              backgroundColor: "transparent",
              color: '#023e8a'
            }}
          >
            Title
          </span>
          <div class="input-group-prepend">
            {" "}
            <input
              style={{ height: 50 }}
              type="text"
              className="form-control form-add"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Your Commission Title"
            />
          </div>
          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              position: "relative",
              top: 15,
              left: 10,
              backgroundColor: "transparent",
              color: '#023e8a'
            }}
          >
            ImageUrl
          </span>
          <div class="input-group-prepend">
            {" "}
            <input
              style={{ top: 10, height: 60, textAlign: 'center', paddingTop: 10 }}
              type="file"
              className="form-control form-add"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={setUploadedImage}
            />
          </div>
          <img
            className="mb-3 mt-5"
            src={image_url}
            alt=""
            style={center}
            onError={() =>
              setImage_url(
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              )
            }
          />
          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              position: "relative",
              top: -5,
              left: 10,
              backgroundColor: "transparent",
              color: '#023e8a'
            }}
          >
            Description
          </span>
          <div class="input-group-prepend">
            <textarea
              type="text"
              className="form-control form-add text-center desc-form"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Your Commission Description"
            />
          </div>

          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              position: "relative",
              top: 15,
              left: 10,
              backgroundColor: "transparent",
              color: '#023e8a'
            }}
          >
            Price (Rp.)
          </span>
          <div class="input-group-prepend">
            <input
              style={{ height: 50 }}
              type="number"
              min="10000"
              max="999999"
              class="form-control form-add"
              aria-label="Dollar amount (with dot and two decimal places)"
              placeholder="Your Commission Fee"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>

          <span
            style={{
              fontSize: 25,
              fontWeight: 700,
              position: "relative",
              top: 12,
              left: 10,
              backgroundColor: "transparent",
              color: '#023e8a'
            }}
          >
            Category
          </span>
          <div class="input-group-prepend mt-3">
            {" "}
            <select
              style={{ top: 10, height: 50, paddingTop: 10, textAlignLast: 'center' }}
              name="category"
              class="form-control form-add"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option defaultChecked>---Select Category---</option>
              <option>2D Art</option>
              <option>3D Art</option>
            </select>
          </div>
          <br />
          <button
            type="button"
            className="btn btn-blue-add btn-lg btn-block"
            onClick={addNewCommission}
          >
            Add Commission
          </button>
        </div>
        {/* <div class="col-6">
          <div className="image-div">
            <img
              className="img-login"
              alt="sample"
              src={sample}
              style={{ position: "relative",left:'50%',width:800,height:950,zIndex: -1 }}
            ></img>
            <button
              className="btn btn-primary btn-lg"
              style={{
                opacity: 0.5,
                backgroundColor: "#5c5c5c",
                color: "#ffffff",
                right: "28%",
                top: 700,
                position: "absolute"
              }}
            >
              Credits:laevenx(Grady Wicoady)
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}