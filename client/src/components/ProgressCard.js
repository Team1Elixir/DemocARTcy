import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import { useHistory } from "react-router-dom";
import "./Progress.css";
import { changeProjectStatus, addProjectResult, getProgressArtist, getProgressClient } from "../store/actions";
import { useDispatch } from "react-redux";
import { storage } from '../firebase';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import accounting from 'accounting-js'
import io from "socket.io-client";
// import moment from 'moment-timezone'

toast.configure();
const ProgressCard = ({ data, role }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, title, price, client, artist, sample_url } = data;
  const [status, setStatus] = useState(data.status);
  const [image_url, setImage_url] = useState(data.image_url);
  const socket = io("https://whispering-woodland-44131.herokuapp.com/");

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
      imageAlt: image_url !== 'https://bit.ly/3iendMh' ? "" : title,
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
                console.log('status', data)
                socket.emit('status', data.progress);
              }
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          const payload = {
            id,
            status: 'Revision Required'
          }
          dispatch(changeProjectStatus(payload))
            .then(data => {
              if (data) {
                console.log('status', data)
                socket.emit('status', data.progress);
              }
            })
          Swal.fire(
            'Decline',
            'Result need revision',
            'info'
          )
        }
      })
  }

  const triggerFileButton = () => {
    document.getElementById(`result${id}`).click();
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
        dispatch(addProjectResult({
          image_url: url,
          id
        }))
          .then(data => {
            if (data) {
              console.log('result', data);
              socket.emit('result image', data.progress);
            }
          })
      })
    })
  }
  
  useEffect(() => {

    let fired = false;

    socket.on('new status', data => {
      if (data.id === id && role === 'Artist') {
        setStatus(data.status)
        // dispatch(getProgressArtist());
        if (data.status === 'Revision Required') {
          if (!fired) {
            fired = true
            toast.info('Client demand some revision', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 4500,
              pauseOnFocusLoss: false
            })
            fired = false;
          }
        } else if (data.status === 'Done') {
          if (!fired) {
            fired = true
            toast.success('Your work has been accepted by Client, now waiting for payment', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 4500,
              pauseOnFocusLoss: false
            })
            fired = false;
          }
        }
      }
    })
    
    socket.on('result', data => {
      if (data.id === id && role === 'Client') {
        console.log('change image', role, id, data)
        setImage_url(data.image_url)
        // dispatch(getProgressClient());
        if(!fired) {
          fired = true;
          toast.info('Artist have submit project result', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4500,
            pauseOnFocusLoss: false
          })
          fired = false;
        }
      }
    })

    socket.on('paid', data => {
      if (data === id && role === 'Artist') {
        console.log('masuk')
        if (!fired) {
          toast.success('ITS PAYDAY!. Client have complete their payment', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 4500,
            pauseOnFocusLoss: false
          })
          dispatch(getProgressArtist());
        }
      }
    })
  }, [])

  return (
    <div className="progress-card row m-3">
      <div className="col-5 d-flex justify-content-center align-items-center p-1">
          <img className="progress-img" src={sample_url} alt="card" height="250" />
      </div>
      <div className="col-7 d-flex flex-column align-items-start p-2">
          <div className="d-flex flex-column justify-content-center">
              <p className="title-project mb-2">{title}</p>
          </div>
          <div className="d-flex flex-column justify-content-center">
              <p className="price-project mb-2">{accounting.formatMoney(price, { symbol: 'Rp ', precision: 2, thousand: '.', decimal: ',' })}</p>
          </div>
          <div className="d-flex flex-column justify-content-center">
            {
              role === "Client" &&
              <p className="project-relation mb-2">Artist: {artist.username}</p>
            }
            {
              role === "Artist" &&
              <p className="project-relation mb-2">Order by: {client.username}</p>
            }
          </div>
          <div className="d-flex flex-column justify-content-center">
              <h4 className="project-status mb-4">
                <span 
                  className={"badge" + (status === 'Done' ? " badge-done" : status === 'onProgress' ? " badge-current" : " badge-reject")}>{status}
                </span>
              </h4>
          </div>
          <div className="button-container d-flex align-items-center mb-2">
            {
              status !== 'Done' &&
              <>
                <div className="progress-button" onClick={toLiveSketch}>
                    <p className="mb-0">Live Sketch</p>
                </div>
                <div className="progress-button" onClick={toLiveChat}>
                    <p className="mb-0">Chat</p>
                </div>
                {
                  role === 'Client' &&
                  <div className="progress-button" onClick={checkResult}>
                      <p className="mb-0">See Result</p>
                  </div>
                }
                {
                  role === 'Artist' &&
                  <>
                    <div className="progress-button" onClick={triggerFileButton}>
                        <p className="mb-0">Add Result</p>
                    </div>
                    <input type="file" style={{ display: 'none' }} id={`result${id}`} onChange={setUploadedImage}/>
                  </>
                }
              </>
            }
            {(status === "Done" && role === 'Client') && <Payment price={price} email={client.email} id={id}/>}
            {(status === "Done" && role === 'Artist') && <p className="mb-0 text-bluish wait-payment">Waiting for Payment</p>}
          </div>
          <div className="w-100">
              <p className="order-date text-right">Order at: {new Date(data.createdAt).toString().substring(4, 15)}</p>
          </div>
      </div>
  </div>

    // <div className="row w-100 progress-container d-flex align-items-center mt-3">
    //   <div className="col-2 d-flex flex-column align-items-center">
    //     <img
    //       src={role === 'Artist' ? client.profile_url : artist.profile_url}
    //       alt="avatar"
    //       className="artist-ava"
    //       width="120"
    //     ></img>
    //     <p className="mb-0 text-bluish artist-name">{role === 'Artist' ? client.username : artist.username}</p>
    //   </div>
    //   <div className="col-3">
    //     <p className="mb-0 text-bluish job-title text-center">{title}</p>
    //   </div>
    //   <div className="col-3">
    //     <h2 className="mb-0 job-status p-3 text-center">
    //       <span className="badge">{status}</span>
    //     </h2>
    //   </div>
    //   <div className="col-4 d-flex flex-column align-items-center">
    //     {status !== "Done" && (
    //       <>
    //         <div
    //           className="progress-button w-50 text-center"
    //           onClick={toLiveSketch}
    //         >
    //           <p className="mb-0">Sketch</p>
    //         </div>
    //         <div
    //           className="progress-button w-50 text-center"
    //           onClick={toLiveChat}
    //         >
    //           <p className="mb-0">Chat</p>
    //         </div>
    //         {
    //           role === 'Client' &&
    //           <div
    //             className="progress-button w-50 text-center"
    //             onClick={checkResult}
    //           >
    //             <p className="mb-0">Result</p>
    //           </div>
    //         }
    //         {
    //           role === 'Artist' &&
    //           <>
    //             <div
    //               className="progress-button w-50 text-center"
    //               onClick={triggerFileButton}
    //             >
    //               <p className="mb-0">Result</p>
    //             </div>
    //             <input type="file" style={{ display: 'none' }} id={`result${id}`} onChange={setUploadedImage}/>
    //           </>
    //         }
    //       </>
    //     )}
    //     {(status === "Done" && role === 'Client') && <Payment price={price} email={client.email} id={id}/>}
    //     {(status === "Done" && role === 'Artist') && <p className="mb-0 text-bluish artist-name">Waiting for Payment</p>}
    //   </div>
    // </div>
  );
};

export default ProgressCard;
