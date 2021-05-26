import React from "react";
import axios from "axios";

interface IJoin {
  onLogin: () => void;
}

const JoinBlock: React.FC<IJoin> = ({ onLogin }) => {
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert("Incorrect inputs");
    }
    setIsLoading(true);
    await axios.post("./rooms", {
      roomId,
      userName,
    });
    onLogin();
  };

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
      <button
        disabled={isLoading}
        onClick={onEnter}
        className="btn btn-success"
      >
        {isLoading ? "Loading...." : "Enter"}
      </button>
    </div>
  );
};

export default JoinBlock;
