import React,{ useState } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import OpenTok from 'opentok'
import '../assets/sharescreen.css'
const API_KEY= 46811824
const SECRET = '72f834f4e36bc711c3891ef0728690e055608e0b'

const publisherEventHandler = {
  streamCreated: event => {
    console.log('Stream Created!')
  },
  streamDestroyed: event => {
    console.log('Stream ended')
  }
}

const LiveSketch = () => {
  const opentok = new OpenTok(API_KEY,SECRET)
  const [sessionId, setSessionId] = useState('');
  const [token, setToken] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(false)
  const [height,setHeight] = useState(480)
  const [width, setWidth] = useState(640)

  const publisherProps = {
  publishAudio: true,
  videoSource: 'screen',
  height: height,
  width: width,
  name: localStorage.username
}

  const startSession = (event) => {
  event.preventDefault()
  opentok.createSession ({mediaMode: 'relayed'},(err,session) => {
    if(err) console.log(err)
    setSessionId(session.sessionId)
    setToken(session.generateToken({
      role: 'moderator',
      expireTime: (new Date().getTime / 1000)+(1 * 24 * 60 * 60),
      data: 'name=Artist',
      initialLayoutClassList: ['focus']
    }))
    setConnectionStatus(true)
    })
  }

  const endSession = (event) => {
    event.preventDefault()
    
    setConnectionStatus(false)
    setSessionId('')
    setToken('')
  }
  
  if(connectionStatus) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <p>Session ID: {sessionId}</p>
      </div>
      <OTSession
        apiKey={API_KEY}
        sessionId={sessionId}
        token={token}
      >
        <button onClick={event => endSession(event)}>Stop Session</button>
        <OTPublisher
          properties={publisherProps}
          eventHandlers={publisherEventHandler}
        />
        <OTStreams>
          <OTSubscriber

          />
        </OTStreams>
      </OTSession>
    </div>
  )

  else return (
    <div>
    <div>
      </div>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label>Screen Width : </label>
            <input style={{ width: 100 }} type="number" value={width} onChange={e => setWidth(e.target.value)} /><br/>
          <label>Screen Height : </label>
            <input style={{ width: 100 }} type="number" value={height} onChange={e => setHeight(e.target.value)} />
        </form><br/>
      <button onClick={event => startSession(event)}>Start New Session</button>
    </div>
  );
}

export default LiveSketch;
