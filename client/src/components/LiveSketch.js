import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import Sketch from "react-p5";
import styled from "styled-components";
import "./LiveSketch.css";

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

function LiveSketch() {
  const location = useLocation();
  const history = useHistory();
  const [yourID, setYourID] = useState("");
  const [room, setUserRoom] = useState(location.state.progressId);
  const [name, setUserName] = useState(localStorage.getItem("username"));
  const [users, setUsers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerName, setCallerName] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    console.log("<><>", location.state);
    setUserName();
    // setUserRoom();
    // socket.current = io("http://localhost:3000/");
    // socket.current.emit("join"); //INITIAL ROOM
    console.log("name and room", name, room);

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
        <button onClick={acceptCall}>Accept</button>
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
      room: location.state.progressId, //RUBAH JIKA SUDAH ADA STATE ID PROGRESS
      // color: color,
      // strokeWidth: strokeWidth,
    };

    socket.current.emit("mouse", data);
  }

  const setup = (p5, canvasParentRef) => {
    socket.current = io("http://localhost:3000/");
    socket.current.emit("room", location.state.progressId);

    p5.createCanvas(500, 500).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.background(233, 233, 233);
    p5.removeBtn = p5.createButton("Save Canvas");
    p5.removeBtn.mousePressed(saveToFile);
    p5.removeBtn.parent(canvasParentRef);

    p5.button = p5.createButton("Clear Canvas");
    p5.button.mousePressed(clearCanvas);
    p5.button.parent(canvasParentRef);
    p5.exitBtn = p5.createButton("Exit");
    p5.exitBtn.mousePressed(exitlive);
    p5.exitBtn.parent(canvasParentRef);
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
      socket.current.emit("clear", { room: location.state.progressId }); //RUBAH JIKA SUDAH ADA STATE ID PROGRESS
    }

    function saveToFile() {
      // Save the current canvas to file as png
      p5.saveCanvas("mycanvas", "png");
    }

    function exitlive() {
      socket.current.emit("exit", { name: name });
      userVideo.current.srcObject
        .getVideoTracks()
        .forEach((track) => track.stop());

      history.push("/progress-client");
    }
  };

  return (
    <>
      <div className="containerall">
        <div className="container_video">
          {/* <Row> */}
          <div className="video_box">
            {UserVideo}
            {incomingCall}
          </div>
          <div className="canvas">
            <Sketch setup={setup} draw={mouseDragged} />
          </div>
          <div className="video_box">{PartnerVideo}</div>
          {/* </Row> */}
        </div>
        <Row>
          {users.map((key) => {
            if (key.id === yourID) {
              return null;
            }
            return (
              <>
                <button onClick={() => callPeer(key.id)} key={key.id}>
                  Call {key.name}
                </button>
              </>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default LiveSketch;
