import React, { useState } from "react";
import Payment from "./Payment";
import { useHistory } from "react-router-dom";
import "./Progress.css";
import { changeProjectStatus, addProjectResult } from "../store/actions";
import { useDispatch } from "react-redux";
import { storage } from '../firebase';
import Swal from "sweetalert2";

const ProgressCard = ({ data, role }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, title, price, client, artist, image_url } = data;
  const [status, setStatus] = useState(data.status);

  const toLiveSketch = () => {
    const dataForLiveSketch = {
      progressId: id,
      clientId: client.id,
      clientUsername: client.username,
      artistId: artist.id,
      artistUsername: artist.username,
    };

    localStorage.setItem('role', role);
    history.push("/livesketch/", dataForLiveSketch);
  };

  const toLiveChat = () => {
    const dataForLiveChat = {
      progressId: id,
      clientId: client.id,
      clientUsername: client.username,
      artistId: artist.id,
      artistUsername: artist.username,
    };

    localStorage.setItem('role', role);
    history.push("/chat/", dataForLiveChat);
  };

  const checkResult = () => {
    Swal.fire({
      title,
      imageUrl: image_url,
      imageHeight: 400,
      imageAlt: title,
      showCancelButton: image_url !== 'https://bit.ly/3iendMh' ? true : false,
      confirmButtonText: image_url !== 'https://bit.ly/3iendMh' ? 'Accept' : 'Close',
      cancelButtonText: 'Decline',
      customClass: {
        popup: 'popup-container'
      }
    })
      .then(result => {
        if(result.value && (image_url !== 'https://bit.ly/3iendMh')) {
          const payload = {
            id,
            status: 'Done'
          }
          dispatch(changeProjectStatus(payload))
            .then(data => {
              if (data) {
                //socket here to send new status
              }
            })
        } else if ((result.dismiss === Swal.DismissReason.cancel) && (image_url !== 'https://bit.ly/3iendMh')) {
          const payload = {
            id,
            status: 'Revision Required'
          }
          dispatch(changeProjectStatus(payload));
          Swal.fire(
            'Decline',
            'Result need revision',
            'info'
          )
        }
      })
  }

  const triggerFileButton = () => {
    document.getElementById('input-result').click();
  }

  const setUploadedImage = (event) => {
    let uploadProgress;
    const image = event.target.files[0];
    const storageRef = storage.ref(`${image.name}`).put(image)
    storageRef.on('state_changed', snapshot => {
      uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(uploadProgress)
    }, error => { console.log(error.message) },
    () => {
      uploadProgress = 100
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        console.log('patch')
        dispatch(addProjectResult({
          image_url: url,
          id
        }))
          .then(data => {
            if (data) {
              //socket here to send new result image
            }
          })
      })
    })
  }

  return (
    <div className="row w-100 progress-container d-flex align-items-center mt-3">
      <div className="col-2 d-flex flex-column align-items-center">
        <img
          src={role === 'Artist' ? client.profile_url : artist.profile_url}
          alt="avatar"
          className="artist-ava"
          width="120"
        ></img>
        <p className="mb-0 text-bluish artist-name">{role === 'Artist' ? client.username : artist.username}</p>
      </div>
      <div className="col-4">
        <p className="mb-0 text-bluish job-title text-center">{title}</p>
      </div>
      <div className="col-2">
        <h2 className="mb-0 job-status p-3 text-center">
          <span className="badge">{status}</span>
        </h2>
      </div>
      <div className="col-4 d-flex flex-column align-items-center">
        {status !== "Done" && (
          <>
            <div
              className="progress-button w-50 text-center"
              onClick={toLiveSketch}
            >
              <p className="mb-0">Sketch</p>
            </div>
            <div
              className="progress-button w-50 text-center"
              onClick={toLiveChat}
            >
              <p className="mb-0">Chat</p>
            </div>
            {
              role === 'Client' &&
              <div
                className="progress-button w-50 text-center"
                onClick={checkResult}
              >
                <p className="mb-0">Result</p>
              </div>
            }
            {
              role === 'Artist' &&
              <>
                <div
                  className="progress-button w-50 text-center"
                  onClick={triggerFileButton}
                >
                  <p className="mb-0">Result</p>
                </div>
                <input type="file" style={{ display: 'none' }} id="input-result" onChange={setUploadedImage}/>
              </>
            }
          </>
        )}
        {status === "Done" && <Payment price={price} email={client.email} id={id}/>}
      </div>
    </div>
  );
};

export default ProgressCard;
