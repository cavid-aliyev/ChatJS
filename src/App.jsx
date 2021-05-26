import React from "react";
import JoinBlock from "./Components/joinBlock";
import { reducer } from "./reducer";

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    isAuth: false,
  });

  const onLogin = () => {
    dispatch({
      type: "IS_AUTH",
      payload: true,
    });
  };

  return (
    <div className="wrapper">
     {!state.isAuth && <JoinBlock onLogin={onLogin}/>}
    </div>
  );
};

export default App;
