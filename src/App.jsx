import React from "react";
import Chat from "./Components/Chat";
import JoinBlock from "./Components/joinBlock";
import { reducer } from "./reducer";
import { socket } from "./socket";

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
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
      dispatch({
        type: "SET_USERS",
        payload: users,
      });
    });
  }, []);

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
    </div>
  );
};

export default App;
