import React from "react";
import JoinBlock from "./Components/joinBlock";
import { reducer } from "./reducer";
import { socket } from "./socket";

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
  });

  const onLogin = (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });

    socket.emit("ROOM_JOIN", obj);
  };

  React.useEffect(() => {
    socket.on("ROOM_JOINED", (users) => {
      console.log("new users", users);
    });
  }, [])

  return (
    <div className="wrapper">
      {!state.joined && <JoinBlock onLogin={onLogin} />}
    </div>
  );
};

export default App;
