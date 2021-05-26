import React from "react";
import axios from 'axios'

const JoinBlock: React.FC = () => {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const onEnter = () => {
    if(!roomId || !userName){
      return alert('Incorrect inputs')
    }
    axios.post('./rooms', {
      roomId,
      userName
    })
  }

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <button onClick={onEnter} className="btn btn-success">ENTER</button>
    </div>
  );
};

export default JoinBlock;
