import React from "react";


const JoinBlock: React.FC = () => {
  return (
    <div className="join-block">
      <input type="text" placeholder="Room ID" />
      <input type="text" placeholder="Your Name" />
      <button className="btn btn-success">ENTER</button>
    </div>
  );
};

export default JoinBlock;
