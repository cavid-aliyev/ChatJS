import React from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8888");

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="join-block">
        <input type="text" placeholder="Room ID" />
        <input type="text" placeholder="Your Name" />
        <button className="btn btn-success">ENTER</button>
      </div>
    </div>
  );
};

export default App;
