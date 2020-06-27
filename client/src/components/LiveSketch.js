import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import Sketch from "react-p5";
import styled from "styled-components";
// import Sketch from "./sketch";

const Container = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 100%;
`;

function LiveSketch() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [canvas, setCanvas] = useState();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000/");
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
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  //SKETCH LIVE

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
      // color: color,
      // strokeWidth: strokeWidth,
    };
    console.log("SEND CORDINATOR", data);

    socket.current.emit("mouse", data);
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    p5.background(233, 233, 233);

    p5.removeBtn = p5.createButton("Save Canvas");
    // p5.removeBtn.position(30, 200);
    p5.removeBtn.mousePressed(saveToFile);
    // p5.removeBtn.mousePressed(clearCanvas);
    p5.button = p5.createButton("Clear Canvas");
    p5.button.mousePressed(clearCanvas);
    socket.current.on("mouse", (data) => {
      p5.line(data.x, data.y, data.px, data.py);
    });
    socket.current.on("clear", () => {
      p5.clear();
      p5.background(233, 233, 233);
    });
    function clearCanvas() {
      p5.clear();
      p5.background(233, 233, 233);
      socket.current.emit("clear");
    }

    function saveToFile() {
      // Save the current canvas to file as png
      p5.saveCanvas("mycanvas", "png");
    }
  };

  // function savecanvas() {
  //   saveCanvas(canvas, "sketch", "jpg");
  // }
  //VIDEO LIVE

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
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
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <>
      <div className="allcontainer">
        <div>
          <Sketch setup={setup} draw={mouseDragged} />
        </div>
        <Container>
          <Row>
            {UserVideo}
            {PartnerVideo}
          </Row>
          <Row>
            {Object.keys(users).map((key) => {
              if (key === yourID) {
                return null;
              }
              return (
                <button onClick={() => callPeer(key)} key={key}>
                  Call {key}
                </button>
              );
            })}
          </Row>
          <Row>{incomingCall}</Row>
        </Container>
      </div>
    </>
  );
}

export default LiveSketch;
