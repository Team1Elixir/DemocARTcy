import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import Sketch from "react-p5";
import styled from "styled-components";
import "./LiveSketch.css";

const Video = styled.video`
  border: 1px solid #b9fffe;
  width: 100%;
  height: 75%;
`;
function LiveSketch() {
  const location = useLocation();
  const history = useHistory();
  const [yourID, setYourID] = useState("");
  const [room, setUserRoom] = useState(location.state.progressId + "Sketch");
  const [name, setUserName] = useState(localStorage.getItem("username"));
  const [users, setUsers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerName, setCallerName] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [statusCall, setStatusCall] = useState("Accept");
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    console.log("<><>", location.state);
    setUserName();
    // setUserRoom();
    // socket.current = io("http://localhost:3000/");
    // socket.current.emit("join"); //INITIAL ROOM
    console.log("name and room and socket", name, room, socket.current);
    if (socket.current === undefined) {
      // console.log("socket kosong");
      socket.current = io("https://shrouded-ridge-07983.herokuapp.com/");
    }
    socket.current.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    console.log("VideoCall/Skect Awal Awal run");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
    socket.current.on("yourID", (id) => {
      console.log("IDDDDD", id);
      setYourID(id);
    });
    socket.current.on("roomData", ({ users }) => {
      console.log("Data all user di room", users);
      setUsers(users);
    });
    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerName(data.fromName);
      setCallerSignal(data.signal);
    });

    socket.current.on("endVC", (data) => {
      setReceivingCall(false);
      setStatusCall("Accept");
    });
  }, []);

  //SKETCH LIVE
  //VIDEO LIVE
  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
        fromName: localStorage.getItem("username"),
      });
    });
    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });
    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }
  function acceptCall() {
    setStatusCall("Connected");
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }
  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h5>{callerName} is calling you</h5>
        <button
          className="editbtn btn btn-outline-primary"
          onClick={acceptCall}
        >
          {statusCall}
        </button>
      </div>
    );
  }

  function mouseDragged(P5) {
    // Draw
    P5.stroke("black");

    // P5.strokeWeight(strokeWidth);
    if (P5.mouseIsPressed) {
      P5.line(P5.mouseX, P5.mouseY, P5.pmouseX, P5.pmouseY);
      sendmouse(P5.mouseX, P5.mouseY, P5.pmouseX, P5.pmouseY);
    }
    // Send the mouse coordinates
  }
  // Sending data to the socket.current
  function sendmouse(x, y, pX, pY) {
    const data = {
      x: x,
      y: y,
      px: pX,
      py: pY,
      room: location.state.progressId + "Sketch", //RUBAH JIKA SUDAH ADA STATE ID PROGRESS
      // color: color,
      // strokeWidth: strokeWidth,
    };
    socket.current.emit("mouse", data);
  }
  const setup = (p5, canvasParentRef) => {
    socket.current = io("https://shrouded-ridge-07983.herokuapp.com/");
    socket.current.emit("room", location.state.progressId + "Sketch");
    p5.createCanvas(500, 500).parent("jumbo-canvas"); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.background(233, 233, 233);

    p5.saveBtn = p5.createButton("Save");
    p5.saveBtn.mousePressed(saveToFile);
    p5.saveBtn.parent("jumbo-canvas");
    p5.saveBtn.addClass("p5-button btn btn-outline-primary");

    p5.clearBtn = p5.createButton("Clear Canvas");
    p5.clearBtn.mousePressed(clearCanvas);
    p5.clearBtn.parent("jumbo-canvas");
    p5.clearBtn.addClass("p5-button btn btn-outline-primary");

    p5.exitBtn = p5.createButton("Exit");
    p5.exitBtn.mousePressed(exitlive);
    p5.exitBtn.parent("jumbo-canvas");
    p5.exitBtn.addClass("p5-button btn btn-outline-primary");

    socket.current.on("clear", () => {
      p5.clear();
      p5.background(233, 233, 233);
    });
    socket.current.on("mouse", (data) => {
      p5.line(data.x, data.y, data.px, data.py);
    });
    function clearCanvas() {
      p5.clear();
      p5.background(233, 233, 233);
      socket.current.emit("clear", {
        room: location.state.progressId + "Sketch",
      }); //RUBAH JIKA SUDAH ADA STATE ID PROGRESS
    }
    function saveToFile() {
      // Save the current canvas to file as png
      p5.saveCanvas("mycanvas", "png");
    }
    function exitlive() {
      userVideo.current.srcObject
        .getVideoTracks()
        .forEach((track) => track.stop());
      userVideo.current.srcObject
        .getAudioTracks()
        .forEach((track) => track.stop());

      socket.current.emit("exit", {
        room: location.state.progressId + "Sketch",
      });

      const { role } = localStorage;
      if (role === "Artist") {
        history.push("/progress-artist");
      } else if (role === "Client") {
        history.push("/progress-client");
      }
    }
  };
  return (
    <>
      <h1>live Sketch</h1>
      <div className="containerall">
        <div className="container_video">
          {/* <Row> */}
          <div className="video_box">
            {UserVideo}
            <div className="callbutton">
              {users.map((key) => {
                if (key.id === yourID) {
                  return null;
                }
                return (
                  <>
                    <button
                      className="editbtn btn btn-outline-primary"
                      onClick={() => callPeer(key.id)}
                      key={key.id}
                    >
                      Call {key.name}
                    </button>
                  </>
                );
              })}
            </div>
            {incomingCall}
          </div>
          <div id="jumbo-canvas">
            <Sketch setup={setup} draw={mouseDragged} />
          </div>
          <div className="video_box">{PartnerVideo}</div>
          {/* </Row> */}
        </div>
      </div>
    </>
  );
}
export default LiveSketch;
