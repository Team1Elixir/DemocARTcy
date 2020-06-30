import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import sample from "../assets/displacement.2.png";

import { storage } from "../firebase";
import { useDispatch } from "react-redux";
import { addPortofolio } from "../store/actions";

export default function AddWork() {
  const [title, setTitle] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

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

  function addNew() {
    const data = {
      title,
      description,
      image_url,
      category,
    };

    dispatch(addPortofolio(data))
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const setImageForUpload = (event) => {
    const image = event.target.files[0];
    if (image) {
      const storageRef = storage.ref(`${image.name}`).put(image);
      storageRef.on("state_changed", () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          setImage_url(url);
        });
      });
    }
  };

  return (
    <div class="">
      <div class="row justify-content-md-center">
        <div class="col-1"></div>
        <div class="col-5">
          <div class="" style={{paddingLeft: 50, paddingRight: 50}}>
            <h1 class="text-center" style={{ marginTop: 50 }}>
              Add Portfolio
            </h1>
            <span
              style={{
                fontSize: 22,
                position: "relative",
                top: 35,
                left: 10,
                backgroundColor: "white",
                color: "#bfbfbf",
              }}
            >
              Title
            </span>
            <div class="input-group-prepend">
              {" "}
              <input
                style={{
                  height: 50,
                  WebkitBoxShadow: "0px 0px 1px 1px rgba(0,0,0,0.28)",
                  MozBoxShadow: "0px 0px 1px 1px rgba(0,0,0,0.28)",
                  boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.28)",
                }}
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <br />
            <span
              style={{
                fontSize: 22,
                position: "relative",
                top: 35,
                left: 10,
                backgroundColor: "white",
                color: "#bfbfbf",
              }}
            >
              ImageUrl
            </span>
            <div class="input-group-prepend">
              {" "}
              <input
                style={{ top: 10, height: 60, paddingTop: 20 }}
                type="file"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                onChange={setImageForUpload}
              />
            </div>
            <img
              src={image_url}
              style={center}
              onError={() =>
                setImage_url(
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                )
              }
            ></img>

            <br />
            <span
              style={{
                fontSize: 22,
                position: "relative",
                top: 15,
                left: 10,
                backgroundColor: "white",
                color: "#bfbfbf",
              }}
            >
              Decription
            </span>
            <div class="input-group-prepend"> </div>
            <textarea
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(event) => setDescription(event.target.value)}
            />
            <br />

            <span
              style={{
                fontSize: 22,
                position: "relative",
                top: 15,
                left: 10,
                backgroundColor: "white",
                color: "#bfbfbf",
              }}
            >
              Category
            </span>
            <div class="input-group-prepend">
              {" "}
              <select
                style={{ top: 10, height: 50, paddingTop: 10 }}
                name="category"
                class="form-control"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option defaultChecked>---select---</option>
                <option>2D Art</option>
                <option>3D Art</option>
              </select>
            </div>
            <br />
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              onClick={addNew}
            >
              Add Fortofolio
            </button>
          </div>
        </div>
        <div class="col-6">
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
                position: "absolute",
                color: "white",
              }}
            >
              Credits:laevenx(Grady Wicoady)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
