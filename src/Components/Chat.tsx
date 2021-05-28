import React from "react";
import { socket } from "../socket";

interface IChat {
  users: string[];
  messages: any;
  userName: string;
  roomId: string | number;
  onAddMessage: any;
}

const Chat: React.FC<IChat> = ({
  users,
  messages,
  userName,
  roomId,
  onAddMessage,
}) => {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef<string>(null);

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message: any) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows={3}
          ></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
